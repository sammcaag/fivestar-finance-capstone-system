"use client";

import { ContentLayout } from "@/components/staff-panel/content-layout";
import BreadcrumbPages from "@/components/BreadcrumbPages";
import MainHeader from "@/components/MainHeader";
import { ClientTableProps } from "@/features/clients/types/client-types";
import { useEffect } from "react";
import { Search, UserPlus } from "lucide-react";
import { MainTableComp } from "@/components/tables/MainTableComp";
import { clientsColumnDefinition } from "@/features/clients/components/tables/ClientsColumnDefinition";
import { useQuery } from "@tanstack/react-query";
import { getClients } from "@/features/clients/api/client-service";

const quickActions = [
  {
    label: "Register New Client",
    href: "/clients/register",
    icon: UserPlus,
  },
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

  // ✅ Fetch clients using React Query
  const clientData = useQuery<ClientTableProps[]>({
    queryKey: ["clients"],
    queryFn: getClients,
  });

  useEffect(() => {
    console.log("THIS IS THE CLIENT DATA", clientData);
  }, [clientData]);

  return (
    <ContentLayout title="Clients Overview">
      <BreadcrumbPages
        links={[
          { href: "/dashboard", label: "Home" },
          { href: "/clients", label: "Clients" },
        ]}
      />
      <MainHeader
        title="Clients Overview"
        description="Manage your client portfolio and loan statuses"
        quickActions={quickActions}
      />
      <MainTableComp<ClientTableProps>
        title="Clients Overview"
        description="View and manage the complete list of clients across all branches."
        data={clientData.data ?? []}
        columns={clientsColumnDefinition(false)}
        filterColumns={["name", "status", "branch"]}
        emptyTitle="No Clients Found"
        emptyDescription="There are no clients recorded yet. Add a client to get started."
        emptyActionLabel="Register New Client"
        emptyOnAction={() => (window.location.href = "/clients/register")}
      />
    </ContentLayout>
  );
}
