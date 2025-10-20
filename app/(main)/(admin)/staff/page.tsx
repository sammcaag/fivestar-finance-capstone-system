"use client";

import BreadcrumbPages from "@/components/BreadcrumbPages";
import MainHeader from "@/components/MainHeader";
import { ContentLayout } from "@/components/staff-panel/content-layout";
import { MainStaffTable } from "@/features/staff/component/tables/MainStaffTable";

export default function StaffManagementPage() {
  return (
    <ContentLayout title="Staff Management">
      <BreadcrumbPages
        links={[
          { href: "/", label: "Home" },
          { href: "/staff", label: "Staff Management" },
        ]}
      />
      {/* Header */}
      <MainHeader
        title="Staff Management"
        description="Manage branch staff accounts, roles, and permissions. Add new team members, update information, or deactivate users when needed."
      />
      <MainStaffTable />
    </ContentLayout>
  );
}
