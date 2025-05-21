"use client";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import BreadcrumbPages from "@/components/BreadcrumbPages";
import ClientInformation from "@/features/clients/components/ClientInformation";
import ClientHistoryTable from "@/features/clients/components/profile/ClientHistoryTable";
import ClientProfileHeader from "@/features/clients/components/profile/ProfileHeader";
import { loanHistory } from "@/features/clients/data/client-mock";

export default function FindClient() {
  return (
    <ContentLayout title="Find Client">
      <BreadcrumbPages
        links={[
          { href: "/", label: "Home" },
          { href: "/clients", label: "Clients" },
          { href: "/clients/find", label: "Find Client" },
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
