"use client";

import BreadcrumbPages from "@/components/BreadcrumbPages";
import MainHeader from "@/components/MainHeader";
import { ContentLayout } from "@/components/staff-panel/content-layout";
import { MainTableComp } from "@/components/tables/MainTableComp";
import { getStaffs } from "@/features/staff/api/staff-service";
import { staffColumnDefinition } from "@/features/staff/component/tables/StaffColumnDefinition";
import { StaffTableProps } from "@/features/staff/types/staff-types";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

export default function StaffManagementPage() {
  useEffect(() => {
    document.title = "Staff Management | Stella - Five Star Finance Inc.";
  }, []);

  const { data: staffstData, isLoading } = useQuery<StaffTableProps[]>({
    queryKey: ["staffs"],
    queryFn: getStaffs,
  });

  return (
    <ContentLayout title="Staff Management">
      <BreadcrumbPages
        links={[
          { href: "/", label: "Home" },
          { href: "/staff", label: "Staff Management" },
        ]}
      />
      <MainHeader
        title="Staff Management"
        description="Manage branch staff accounts, roles, and permissions. Add new team members, update information, or deactivate users when needed."
      />
      <MainTableComp<StaffTableProps>
        title="Staff Management"
        description="Manage branch staff accounts, roles, and permissions."
        data={staffstData ?? []}
        isLoading={isLoading}
        columns={staffColumnDefinition}
        filterColumns={["name", "role", "status", "branch"]}
        initialSort={[{ id: "name", desc: false }]}
        emptyActionLabel="No Staff Data"
        emptyOnAction={() => {}}
        emptyTitle="No Staff Data Found"
        emptyDescription="There are no staff members recorded yet. Add staff to see them here."
      />
    </ContentLayout>
  );
}
