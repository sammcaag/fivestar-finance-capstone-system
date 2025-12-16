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
import { useRouter } from "next/navigation";

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
  const router = useRouter(); // initialize router

  useEffect(() => {
    document.title = "Clients Overview | Stella - Five Star Finance Inc.";
  }, []);

  const { data: clientsData, isLoading } = useQuery<ClientTableProps[]>({
    queryKey: ["clients"],
    queryFn: getClients,
  });

  useEffect(() => {
    console.log("THE DATA IS:", clientsData);
  }, [clientsData]);

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
        data={clientsData ?? []}
        isLoading={isLoading}
        columns={clientsColumnDefinition(false)}
        filterColumns={["name", "status", "branchName"]}
        emptyTitle="No Clients Found"
        emptyDescription="There are no clients recorded yet. Add a client to get started."
        emptyActionLabel="Register New Client"
        emptyOnAction={() => {
          router.push("/clients/register");
        }}
        onRowDoubleClick={(client) => {
          // Navigate to dynamic route [id]/page.tsx using the client (id = serial number)
          router.push(`/clients/${client.id}`);
        }}
      />
    </ContentLayout>
  );
}
