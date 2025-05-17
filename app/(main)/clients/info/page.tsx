"use client";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import BreadcrumbPages from "@/components/BreadcrumbPages";
import ClientProfile from "@/features/clients/components/ClientProfile";

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
      <ClientProfile />
    </ContentLayout>
  )
}
