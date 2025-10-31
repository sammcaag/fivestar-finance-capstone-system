"use client";
import React, { useEffect } from "react";
import { ContentLayout } from "@/components/staff-panel/content-layout";
import BreadcrumbPages from "@/components/BreadcrumbPages";
import MainHeader from "@/components/MainHeader";
import { MainAppointmentsTable } from "@/features/loans/appointments/components/MainAppointmentsTable";
import { ClipboardPlus } from "lucide-react";

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

      <MainAppointmentsTable
        title="Appointments Overview"
        description="Review all upcoming loan appointments and ensure client documents are complete before each meeting."
      />
    </ContentLayout>
  );
}
