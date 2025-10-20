import React from "react";
import { ContentLayout } from "@/components/staff-panel/content-layout";
import BreadcrumbPages from "@/components/BreadcrumbPages";
import MainHeader from "@/components/MainHeader";

export default function LoanAppointments() {
  return (
    <ContentLayout title="Loan Appointments">
      <BreadcrumbPages
        links={[
          { href: "/", label: "Home" },
          { href: "/appointments", label: "Loan Appointments" },
        ]}
      />

      <MainHeader
        title="Loan Appointments"
        description="Manage loan appointments"
      />
      <div>Tabs Go here</div>
      <div>Tables go here</div>
    </ContentLayout>
  );
}
