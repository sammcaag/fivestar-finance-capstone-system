// src/app/(main)/clients/[id]/page.tsx
"use client";

import BreadcrumbPages from "@/components/BreadcrumbPages";
import Loading from "@/components/LoadingPage";
import NotFoundPage from "@/components/NotFoundPage";
import { ContentLayout } from "@/components/staff-panel/content-layout";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useDialog } from "@/contexts/DialogContext";
import {
  getClientBySerialNumber,
  updateClientApprovalStatusApi,
} from "@/features/clients/api/client-service";
import ClientInformation from "@/features/clients/components/ClientInformation";
import ClientProfileHeaderSkeleton from "@/features/clients/components/skeletons/ClientProfileHeaderSkeleton";
import { ApprovalStatus, ClientPayload } from "@/features/clients/types/client-types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { CheckCircle, UserX, XCircle } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

export default function ClientVerificationInfoPage() {
  useEffect(() => {
    document.title = "Client Verification Information | Stella - Five Star Finance Inc.";
  }, []);

  const params = useParams();
  const serialNumber = params.id as string;
  const router = useRouter();
  const queryClient = useQueryClient();
  const { showDialog } = useDialog();

  const [open, setOpen] = useState(false);
  const [remarks, setRemarks] = useState("");
  const [status, setStatus] = useState<ApprovalStatus | null>(null);
  const [error, setError] = useState("");

  const {
    data: clientData,
    isLoading,
    refetch,
  } = useQuery<ClientPayload>({
    queryKey: ["clientBySerialNumber", serialNumber],
    queryFn: () => getClientBySerialNumber(serialNumber),
    refetchOnWindowFocus: true,
  });

  const { mutateAsync: updateClientApprovalStatus, isPending } = useMutation({
    mutationKey: ["updateClientApprovalStatus"],
    mutationFn: ({
      serialNumber,
      patchPayload,
    }: {
      serialNumber: string;
      patchPayload: {
        approvalStatus: ApprovalStatus;
        remarks: string;
      };
    }) => updateClientApprovalStatusApi(serialNumber, patchPayload),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["clientBySerialNumber", variables.serialNumber],
      });
      setOpen(false);
      setRemarks("");
      setStatus(null);
    },
  });

  useEffect(() => {
    refetch();
  }, [serialNumber]);

  const today = new Date("2025-11-13");
  today.setHours(0, 0, 0, 0);

  const handleOpen = (approvalStatus: ApprovalStatus) => {
    setStatus(approvalStatus);
    setOpen(true);
  };

  const handleSubmit = async () => {
    if (remarks.length < 8 || remarks.length > 200) {
      setError("Remarks must be between 8 and 200 characters.");
      return;
    }

    setError("");

    try {
      const result = await updateClientApprovalStatus({
        serialNumber,
        patchPayload: {
          approvalStatus: status!,
          remarks,
        },
      });
      console.log("Result:", result);
      showDialog("Client information registered successfully!", "success");
      refetch();
    } catch (error) {
      console.log("Error:", error);

      const errorMessage = axios.isAxiosError(error)
        ? error.response?.data?.error || "Request failed"
        : "Unexpected error";

      showDialog(errorMessage, "error");
    }
  };

  return (
    <ContentLayout title="Client Information">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <BreadcrumbPages
          links={[
            { href: "/", label: "Verification" },
            { href: "/finance/clients", label: "Clients" },
            { href: `/finance/clients/${serialNumber}`, label: serialNumber },
          ]}
        />

        <div className="flex gap-3 w-full sm:w-auto">
          <Button
            className="flex-1 sm:flex-none
                    bg-slate-50 hover:bg-slate-100
                    text-slate-700 border border-slate-200
                    dark:bg-slate-950 dark:hover:bg-slate-900
                    dark:text-slate-300 dark:border-slate-800
                        transition-all duration-200 shadow-sm hover:shadow-md font-medium"
            onClick={() => handleOpen("DECEASED")}
            disabled={isLoading}
          >
            <UserX className="mr-2 h-4 w-4" />
            Deceased
          </Button>

          <Button
            className="flex-1 sm:flex-none bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 dark:bg-red-950 dark:hover:bg-red-900 dark:text-red-300 dark:border-red-800 transition-all duration-200 shadow-sm hover:shadow-md font-medium"
            onClick={() => handleOpen("DISAPPROVED")}
            disabled={isLoading}
          >
            <XCircle className="mr-2 h-4 w-4" />
            Disapprove
          </Button>

          <Button
            className="flex-1 sm:flex-none bg-green-50 hover:bg-green-100 text-green-700 border border-green-200 dark:bg-green-950 dark:hover:bg-green-900 dark:text-green-300 dark:border-green-800 transition-all duration-200 shadow-sm hover:shadow-md font-medium"
            onClick={() => handleOpen("APPROVED")}
            disabled={isLoading}
          >
            <CheckCircle className="mr-2 h-4 w-4" />
            Approve
          </Button>
        </div>
      </div>

      <div className="space-y-10">
        {isLoading ? (
          <div className="p-6">
            <ClientProfileHeaderSkeleton />
          </div>
        ) : clientData ? (
          <ClientInfoInSuspense client={clientData} serialNumber={serialNumber} />
        ) : (
          <div className="p-6">
            <NotFoundPage title="Client" />
          </div>
        )}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md rounded-2xl border-0 shadow-2xl p-0 gap-0">
          <DialogHeader className="px-6 pt-6 pb-4 border-b border-gray-100 dark:border-gray-800">
            <DialogTitle className="text-xl font-semibold text-gray-900 dark:text-gray-100">
              {status === "APPROVED" ? "Approve Client" : "Disapprove Client"}
            </DialogTitle>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              {status === "APPROVED"
                ? "Provide approval remarks for this client"
                : "Provide reasons for disapproval"}
            </p>
          </DialogHeader>

          <div className="px-6 py-5 space-y-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Remarks <span className="text-red-500">*</span>
              </Label>

              <Textarea
                placeholder="Enter your remarks here (minimum 8 characters)..."
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
                className="min-h-[140px] resize-none border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-offset-0 focus:ring-blue-500 dark:focus:ring-blue-600 rounded-lg text-sm leading-relaxed break-all"
                maxLength={200}
              />

              <div className="flex justify-between items-center text-xs">
                {error ? (
                  <p className="text-red-600 dark:text-red-400 font-medium">{error}</p>
                ) : (
                  <p className="text-gray-500 dark:text-gray-400">Minimum 8 characters required</p>
                )}
                <p className="text-gray-400 dark:text-gray-500">{remarks.length}/200</p>
              </div>
            </div>
          </div>

          <DialogFooter className="px-6 py-4 bg-gray-50 dark:bg-gray-800/50 border-t border-gray-100 dark:border-gray-800 rounded-b-2xl flex flex-row justify-end gap-3">
            <Button
              variant="outline"
              onClick={() => setOpen(false)}
              className="rounded-lg border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              Cancel
            </Button>

            <Button
              onClick={handleSubmit}
              disabled={isPending}
              className={
                status === "APPROVED"
                  ? "bg-green-600 hover:bg-green-700 text-white dark:bg-green-700 dark:hover:bg-green-800 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 font-medium"
                  : "bg-red-600 hover:bg-red-700 text-white dark:bg-red-700 dark:hover:bg-red-800 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 font-medium"
              }
            >
              {isPending ? "Updating..." : "Update Status"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </ContentLayout>
  );
}

const ClientInfoInSuspense = ({
  client,
  serialNumber,
}: {
  client: ClientPayload;
  serialNumber: string;
}) => (
  <Suspense fallback={<Loading />}>
    <ClientInformation client={client} serialNumber={serialNumber} />
  </Suspense>
);
