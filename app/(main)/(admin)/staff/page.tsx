"use client";

import BreadcrumbPages from "@/components/BreadcrumbPages";
import MainHeader from "@/components/MainHeader";
import { ContentLayout } from "@/components/staff-panel/content-layout";
import { MainTableComp } from "@/components/tables/MainTableComp";
import { getStaffs } from "@/features/staff/api/staff-service";
import { staffColumnDefinition } from "@/features/staff/component/tables/StaffColumnDefinition";
import { StaffTableProps } from "@/features/staff/types/staff-types";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function StaffManagementPage() {
  const router = useRouter();
  useEffect(() => {
    document.title = "Staff Overview | Stella - Five Star Finance Inc.";
  }, []);

  const { data: staffstData, isLoading } = useQuery<StaffTableProps[]>({
    queryKey: ["staffs"],
    queryFn: getStaffs,
  });

  return (
    <ContentLayout title="Staff Overview">
      <BreadcrumbPages
        links={[
          { href: "/", label: "Home" },
          { href: "/staff", label: "Staff" },
        ]}
      />
      <MainHeader
        title="Staff Overview"
        description="Manage branch staff accounts, roles, and permissions. Add new team members, update information, or deactivate users when needed."
      />
      <MainTableComp<StaffTableProps>
        title="Staff Overview"
        description="Manage branch staff accounts, roles, and permissions."
        data={staffstData ?? []}
        isLoading={isLoading}
        columns={staffColumnDefinition}
        filterColumns={["name", "role", "status", "branch"]}
        initialSort={[{ id: "name", desc: false }]}
        emptyActionLabel="Register New Staff"
        emptyOnAction={() => {
          router.push("/staff/register");
        }}
        emptyTitle="No Staff Data Found"
        emptyDescription="There are no staff members recorded yet. Add staff to see them here."
        onRowDoubleClick={(staff) => {
          // Navigate to dynamic route [id]/page.tsx using the client (id = serial number)
          router.push(`/staff/${staff.id}`);
        }}
      />
    </ContentLayout>
  );
}
