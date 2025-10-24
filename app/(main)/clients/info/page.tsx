"use client";
import { ContentLayout } from "@/components/staff-panel/content-layout";
import BreadcrumbPages from "@/components/BreadcrumbPages";
import ClientInformation from "@/features/clients/components/ClientInformation";
import ClientHistoryTable from "@/features/clients/components/profile/ClientHistoryTable";
import ClientProfileHeader from "@/features/clients/components/profile/ClientProfileHeader";
import { loanHistory } from "@/features/clients/data/client-mock";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

export default function ClientInfoPage() {
  useEffect(() => {
    document.title = "Client Information | Stella - Five Star Finance Inc.";
  }, []);

  const searchParams = useSearchParams();
  const currentTab = searchParams.get("tab");
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
      <ClientInformation />
      {currentTab !== "loan-history" && (
        <ClientHistoryTable records={loanHistory} />
      )}
    </ContentLayout>
  );
}
