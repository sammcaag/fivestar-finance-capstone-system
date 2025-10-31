"use client";

import { ContentLayout } from "@/components/staff-panel/content-layout";
import { MainClientsTable } from "@/features/clients/components/tables/MainClientsTable";
import BreadcrumbPages from "@/components/BreadcrumbPages";
import MainHeader from "@/components/MainHeader";
import { useEffect } from "react";
import { Search, UserPlus } from "lucide-react";

const quickActions = [
  {
    label: "Register New Client",
    href: "/clients/register",
    icon: UserPlus,
  },
  // find a user
  {
    label: "Search Client",
    href: "/#",
    icon: Search,
  },
];

export default function ClientsPage() {
  useEffect(() => {
    document.title = "Clients Overview | Stella - Five Star Finance Inc.";
  }, []);

  return (
    <ContentLayout title="Clients Overview">
      <BreadcrumbPages
        links={[
          {
            href: "/dashboard",
            label: "Home",
          },
          {
            href: "/clients",
            label: "Clients",
          },
        ]}
      />

      <MainHeader
        title="Clients Overview"
        description="Manage your client portfolio and loan statuses"
        quickActions={quickActions}
      />

      <MainClientsTable
        title="Clients Overview"
        description="View and manage the complete list of clients across all branches."
      />
    </ContentLayout>
  );
}
