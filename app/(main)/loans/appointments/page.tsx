"use client";

import BreadcrumbPages from "@/components/BreadcrumbPages";
import MainHeader from "@/components/MainHeader";
import { ContentLayout } from "@/components/staff-panel/content-layout";
import { MainTableComp } from "@/components/tables/MainTableComp";
import { getAllAppointments } from "@/features/loans/api/appointments-api";
import { mobileAppointmentsColumnDefinition } from "@/features/loans/appointments/components/MobileAppointmentsColumnDefinition";
import { AppointmentTableProps } from "@/features/loans/appointments/types/appointment-types";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

export default function LoanAppointments() {
  useEffect(() => {
    document.title = "Mobile Loan Appointments | Stella - Five Star Finance Inc.";
  }, []);

  const { data: appointmentsData, isLoading } = useQuery<AppointmentTableProps[]>({
    queryKey: ["appointments"],
    queryFn: getAllAppointments,
  });

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
      />
      <MainTableComp<AppointmentTableProps>
        title="Appointments Overview"
        description="Review all upcoming loan appointments and ensure client documents are complete before each meeting."
        data={appointmentsData ?? []}
        columns={mobileAppointmentsColumnDefinition(false)}
        filterColumns={["name", "status", "productType", "type"]}
        emptyTitle="No Appointments Found"
        emptyDescription="There are no appointments scheduled. Add a new appointment to get started."
        emptyActionLabel="Add New Appointment"
        isLoading={isLoading}
        emptyOnAction={() => (window.location.href = "/appointments/new")}
      />
    </ContentLayout>
  );
}
