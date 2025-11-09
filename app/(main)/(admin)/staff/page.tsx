"use client";

import BreadcrumbPages from "@/components/BreadcrumbPages";
import MainHeader from "@/components/MainHeader";
import { ContentLayout } from "@/components/staff-panel/content-layout";
import { MainTableComp } from "@/components/tables/MainTableComp";
import { staffColumnDefinition } from "@/features/staff/component/tables/StaffColumnDefinition";
import { mockStaffData } from "@/features/staff/data/mock-staff-data";
import { StaffTableProps } from "@/features/staff/types/staff-types";
import { useEffect } from "react";

export default function StaffManagementPage() {
  useEffect(() => {
    document.title = "Staff Management | Stella - Five Star Finance Inc.";
  }, []);

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
        data={mockStaffData}
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
