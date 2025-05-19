"use client";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import BreadcrumbPages from "@/components/BreadcrumbPages";
import ClientInformation from "@/features/clients/components/ClientInformation";
import ClientProfileHeader from "@/features/clients/components/profile/ProfileHeader";

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
      <div className="mx-auto py-6 space-y-6">
        <ClientProfileHeader />
        <ClientInformation />
        
      </div>
    </ContentLayout>
  );
}
