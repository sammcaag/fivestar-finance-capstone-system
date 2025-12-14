"use client";

import BreadcrumbPages from "@/components/BreadcrumbPages";
import NotFoundPage from "@/components/NotFoundPage";
import { ContentLayout } from "@/components/staff-panel/content-layout";
import { Button } from "@/components/ui/button";
import { getBranchById } from "@/features/branch/api/branch-service";
import BranchInformation from "@/features/branch/components/BranchInformation";
import BranchProfileHeader from "@/features/branch/components/BranchProfileHeader";
import { BranchPayload } from "@/features/branch/types/branch-types";
import ClientProfileHeaderSkeleton from "@/features/clients/components/skeletons/ClientProfileHeaderSkeleton";
import { useQuery } from "@tanstack/react-query";
import { Pencil } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ClientInfoPage() {
  useEffect(() => {
    document.title = "Branch Information | Stella - Five Star Finance Inc.";
  }, []);

  const params = useParams();
  const id = Number(params.id);

  const { data: branchData, isLoading } = useQuery<BranchPayload>({
    queryKey: ["branchById", id],
    queryFn: () => getBranchById(id),
    enabled: !isNaN(id), // query only if id is a number
  });

  const router = useRouter();

  return (
    <ContentLayout title={"Branch Information"}>
      <div className="flex justify-between items-center mb-4">
        <BreadcrumbPages
          links={[
            { href: "/", label: "Home" },
            { href: "/branch", label: "Branch" },
            { href: `/branch/${id}`, label: String(id) },
          ]}
        />

        <Button
          variant="default"
          size="sm"
          onClick={() => router.push(`/branch/${id}/edit`)}
          className="gap-2 p-5 rounded-lg"
          disabled={isLoading || !branchData}
        >
          <Pencil className="h-4 w-4" />
          Edit Branch Info
        </Button>
      </div>
      {isLoading ? (
        <ClientProfileHeaderSkeleton />
      ) : branchData ? (
        <>
          <BranchProfileHeader
            id={branchData.id!}
            name={branchData.name}
            email={branchData.email}
            status={branchData.status || "INACTIVE"}
          />
          <BranchInformation
            name={branchData.name}
            email={branchData.email}
            primaryContact={branchData.contactInfo.primary_contact}
            secondaryContact={branchData.contactInfo.secondary_contact ?? undefined}
            users={branchData.users ?? []}
          />
        </>
      ) : (
        <NotFoundPage title={"Client"} />
      )}
    </ContentLayout>
  );
}
