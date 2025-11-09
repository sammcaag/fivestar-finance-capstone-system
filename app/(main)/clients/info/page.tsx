"use client";
import { ContentLayout } from "@/components/staff-panel/content-layout";
import BreadcrumbPages from "@/components/BreadcrumbPages";
import ClientInformation from "@/features/clients/components/ClientInformation";
import ClientProfileHeader from "@/features/clients/components/profile/ClientProfileHeader";
import { useEffect } from "react";
import { Suspense } from "react";
import { MainTableComp } from "@/components/tables/MainTableComp";
import { LoanHistory } from "@/features/loans/types/loan-types";
import { mockLoanHistoryData } from "@/features/loans/data/mock-loans-data";
import { loansHistoryColumnDefinition } from "@/features/loans/components/tables/LoansHistoryColumnDefinition";

export default function ClientInfoPage() {
  useEffect(() => {
    document.title = "Client Information | Stella - Five Star Finance Inc.";
  }, []);

  return (
    <ContentLayout title="Client Information">
      <BreadcrumbPages
        links={[
          { href: "/", label: "Home" },
          { href: "/clients", label: "Clients" },
          { href: "/clients/info", label: "Client Information" },
        ]}
      />
      <ClientProfileHeader />
      <ClientInfoInSuspense />
      <MainTableComp<LoanHistory>
        title="Appointments Overview"
        description="Review all upcoming loan appointments and ensure client documents are complete before each meeting."
        data={mockLoanHistoryData}
        columns={loansHistoryColumnDefinition}
        filterColumns={["dedCode", "productType", "term", "status"]}
        initialSort={[
          { id: "dedCode", desc: false },
          { id: "maturityDate", desc: false },
        ]}
        emptyTitle="No Appointments Found"
        emptyDescription="There are no appointments scheduled. Add a new appointment to get started."
        emptyActionLabel="Add New Appointment"
        emptyOnAction={() => (window.location.href = "/appointments/new")}
      />
    </ContentLayout>
  );
}

function ClientInfoInSuspense() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ClientInformation />
    </Suspense>
  );
}
