"use client";

import { ContentLayout } from "@/components/staff-panel/content-layout";
import BreadcrumbPages from "@/components/BreadcrumbPages";
import MainHeader from "@/components/MainHeader";
import { AppointmentTableProps } from "@/features/loans/appointments/types/appointment-types";
import { useEffect } from "react";
import { ClipboardPlus } from "lucide-react";
import { MainTableComp } from "@/components/tables/MainTableComp";
import { mobileAppointmentsColumnDefinition } from "@/features/loans/appointments/components/MobileAppointmentsColumnDefinition";
import { mockAppointmentsData } from "@/features/loans/appointments/data/mock-appointments-data";

const quickActions = [
  {
    label: "Add New Appointment",
    href: "/appointments/new",
    icon: ClipboardPlus,
  },
];

export default function LoanAppointments() {
  useEffect(() => {
    document.title =
      "Mobile Loan Appointments | Stella - Five Star Finance Inc.";
  }, []);

  return (
    <ContentLayout title="Mobile Loan Appointments">
      <BreadcrumbPages
        links={[
          { href: "/", label: "Home" },
          { href: "/appointments", label: "Mobile Loan Appointments" },
        ]}
      />
      <MainHeader
        title="Mobile Loan Appointments"
        description="Coordinate and review upcoming loan appointments to help your branch prepare client documents in advance."
        quickActions={quickActions}
      />
      <MainTableComp<AppointmentTableProps>
        title="Appointments Overview"
        description="Review all upcoming loan appointments and ensure client documents are complete before each meeting."
        data={mockAppointmentsData}
        columns={mobileAppointmentsColumnDefinition(false)}
        filterColumns={["name", "status", "productType", "type"]}
        emptyTitle="No Appointments Found"
        emptyDescription="There are no appointments scheduled. Add a new appointment to get started."
        emptyActionLabel="Add New Appointment"
        emptyOnAction={() => (window.location.href = "/appointments/new")}
      />
    </ContentLayout>
  );
}
