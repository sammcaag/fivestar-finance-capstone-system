"use client";
import { ContentLayout } from "@/components/staff-panel/content-layout";
import BreadcrumbPages from "@/components/BreadcrumbPages";
import ClientInformation from "@/features/clients/components/ClientInformation";
import ClientHistoryTable from "@/features/clients/components/profile/ClientHistoryTable";
import ClientProfileHeader from "@/features/clients/components/profile/ProfileHeader";
import { loanHistory } from "@/features/clients/data/client-mock";
import { useEffect } from "react";

export default function ClientInfoPage() {
  useEffect(() => {
    document.title = "Client Information - Stella | Five Star Finance Inc.";
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
      <div className="mx-auto py-6">
        <ClientProfileHeader />
        <ClientInformation />
        <ClientHistoryTable records={loanHistory} />
      </div>
    </ContentLayout>
  );
}
