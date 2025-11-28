// src/features/clients/components/ClientInfoPage.tsx
"use client";
import { ContentLayout } from "@/components/staff-panel/content-layout";
import BreadcrumbPages from "@/components/BreadcrumbPages";
import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import ClientProfileHeaderSkeleton from "@/features/clients/components/skeletons/ClientProfileHeaderSkeleton";
import NotFoundPage from "@/components/NotFoundPage";
import { Pencil } from "lucide-react";
import { BranchPayload } from "@/features/branch/types/branch-types";
import { getBranchById } from "@/features/branch/api/branch-service";
import BranchProfileHeader from "@/features/branch/components/BranchProfileHeader";
import BranchInformation from "@/features/branch/components/BranchInformation";

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
            { href: "/branch", label: "Branch Management" },
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
            contactNumber={branchData.contactInfo.primary_contact}
            status={branchData.status || "INACTIVE"}
          />
          <BranchInformation users={branchData.users ?? []} />
        </>
      ) : (
        <NotFoundPage title={"Client"} />
      )}
    </ContentLayout>
  );
}
