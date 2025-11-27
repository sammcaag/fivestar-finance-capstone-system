"use client";

import BreadcrumbPages from "@/components/BreadcrumbPages";
import MainHeader from "@/components/MainHeader";
import { ContentLayout } from "@/components/staff-panel/content-layout";
import { MainTableComp } from "@/components/tables/MainTableComp";
import { getBranches } from "@/features/branch/api/branch-service";
import { branchColumnDefinition } from "@/features/branch/components/tables/BranchColumnDefinition";
import { BranchTableProps } from "@/features/branch/types/branch-types";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function BranchOverview() {
  const router = useRouter();
  useEffect(() => {
    document.title = "Branch Overview | Stella - Five Star Finance Inc.";
  }, []);

  const { data: branchesData, isLoading } = useQuery<BranchTableProps[]>({
    queryKey: ["branches"],
    queryFn: getBranches,
  });

  return (
    <ContentLayout title="Branch Overview">
      <BreadcrumbPages
        links={[
          { href: "/", label: "Home" },
          { href: "/branch", label: "Branch" },
        ]}
      />
      <MainHeader
        title="Branch Overview"
        description="Easily manage branch information, see which staff are assigned where, and keep your branch data up to date in one place."
      />
      <MainTableComp<BranchTableProps>
        title="Branch Overview"
        description="Manage branch data and maintain accurate records across all locations."
        data={branchesData ?? []}
        isLoading={isLoading}
        columns={branchColumnDefinition}
        filterColumns={["name", "email", "status", "contactNumber"]}
        initialSort={[{ id: "name", desc: false }]}
        emptyActionLabel="Create New Branch"
        emptyOnAction={() => {
          router.push("/branch/register");
        }}
        emptyTitle="No Branch Data Found"
        emptyDescription="There are no branch recorded yet. Add branch to see them here."
        onRowDoubleClick={(branch) => {
          // Navigate to dynamic route [id]/page.tsx using the client (id = serial number)
          router.push(`/branch/${branch.id}`);
        }}
      />
    </ContentLayout>
  );
}
