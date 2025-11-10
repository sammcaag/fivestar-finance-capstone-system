"use client";
import { ContentLayout } from "@/components/staff-panel/content-layout";
import BreadcrumbPages from "@/components/BreadcrumbPages";
import ClientInformation from "@/features/clients/components/ClientInformation";
import ClientProfileHeader from "@/features/clients/components/profile/ClientProfileHeader";
import { useEffect } from "react";
import { Suspense } from "react";
import { MainLoansHistoryTable } from "@/features/loans/components/tables/MainLoansHistoryTable";

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
      <MainLoansHistoryTable />
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
