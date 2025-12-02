// src/features/clients/components/ClientInfoPage.tsx
"use client";
import BreadcrumbPages from "@/components/BreadcrumbPages";
import Loading from "@/components/LoadingPage";
import NotFoundPage from "@/components/NotFoundPage";
import { ContentLayout } from "@/components/staff-panel/content-layout";
import { Button } from "@/components/ui/button";
import { getClientBySerialNumber } from "@/features/clients/api/client-service";
import ClientInformation from "@/features/clients/components/ClientInformation";
import ClientProfileHeaderSkeleton from "@/features/clients/components/skeletons/ClientProfileHeaderSkeleton";
import { ClientPayload } from "@/features/clients/types/client-types";
import LoanActionModal from "@/features/loans/components/LoanActionModal";
import LoanHistoryTabs from "@/features/loans/components/LoanHistoryTabs";
import { mockLoanHistoryData } from "@/features/loans/data/mock-loans-data";
import { useLoanLogic } from "@/features/loans/hooks/use-loan-logic";
import { LoanHistory } from "@/features/loans/types/loan-types";
import { useQuery } from "@tanstack/react-query";
import { Pencil } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

export default function ClientInfoPage() {
  useEffect(() => {
    document.title = "Client Information | Stella - Five Star Finance Inc.";
  }, []);

  const params = useParams();
  const serialNumber = params.id as string;

  const { data: clientData, isLoading } = useQuery<ClientPayload>({
    queryKey: ["clientBySerialNumber", serialNumber],
    queryFn: () => getClientBySerialNumber(serialNumber),
  });

  const router = useRouter();
  const [loanHistory] = useState<LoanHistory[]>(mockLoanHistoryData);
  const [selectedLoan, setSelectedLoan] = useState<LoanHistory | null>(null);
  const today = new Date("2025-11-13");
  today.setHours(0, 0, 0, 0);

  const { loanSets, buttonLabel } = useLoanLogic(loanHistory, today);

  // Add this function inside your ClientInfoPage component
  const handleAddNewLoan = (type: "new-client" | "reloan" | "additional") => {
    sessionStorage.setItem("fromClientProfile", "true");
    router.push(`/loans/computations/${type}?clientId=${serialNumber}`);
  };

  // Replace your customHeaderRight with this:
  const customHeaderRight = (
    <Button
      onClick={() =>
        handleAddNewLoan(
          buttonLabel.toLowerCase().includes("new")
            ? "new-client"
            : buttonLabel.toLowerCase().includes("reloan")
              ? "reloan"
              : "additional"
        )
      }
    >
      {buttonLabel}
    </Button>
  );

  useEffect(() => {
    console.log("THIS IS THE DATA PASSED", clientData);
  }, [clientData]);

  return (
    <ContentLayout title={"Client Information"}>
      <div className="flex justify-between items-center mb-4">
        <BreadcrumbPages
          links={[
            { href: "/", label: "Home" },
            { href: "/clients", label: "Clients" },
            { href: `/clients/${serialNumber}`, label: serialNumber },
          ]}
        />

        <Button
          variant="default"
          size="sm"
          onClick={() => router.push(`/clients/${serialNumber}/edit`)}
          className="gap-2 p-5 rounded-lg"
          disabled={isLoading || !clientData}
        >
          <Pencil className="h-4 w-4" />
          Edit Client Info
        </Button>
      </div>
      {isLoading ? (
        <ClientProfileHeaderSkeleton />
      ) : clientData ? (
        <>
          <ClientInfoInSuspense client={clientData as ClientPayload} />
          <LoanHistoryTabs
            loanSets={loanSets}
            loanHistory={loanHistory}
            isLoading={isLoading}
            customHeaderRight={customHeaderRight}
            setSelectedLoan={setSelectedLoan}
            handleAddLoan={handleAddNewLoan}
            totalSets={loanSets.length}
          />
          <LoanActionModal
            selectedLoan={selectedLoan}
            setSelectedLoan={setSelectedLoan}
            today={today}
          />
        </>
      ) : (
        <NotFoundPage title={"Client"} />
      )}
    </ContentLayout>
  );
}

const ClientInfoInSuspense = ({ client }: { client: ClientPayload }) => {
  return (
    <Suspense fallback={<Loading />}>
      <ClientInformation client={client} />
    </Suspense>
  );
};
