"use client";

import BreadcrumbPages from "@/components/BreadcrumbPages";
import MainHeader from "@/components/MainHeader";
import { ContentLayout } from "@/components/staff-panel/content-layout";
import { MainTableComp } from "@/components/tables/MainTableComp";
import { getClients } from "@/features/clients/api/client-service";
import { clientsColumnDefinition } from "@/features/clients/components/tables/ClientsColumnDefinition";
import { ClientTableProps } from "@/features/clients/types/client-types";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect, useMemo } from "react";

export default function ClientsPage() {
  const router = useRouter(); // initialize router

  useEffect(() => {
    document.title = "Clients Overview | Stella - Five Star Finance Inc.";
  }, []);

  const { data: clientsData, isLoading } = useQuery<ClientTableProps[]>({
    queryKey: ["clients"],
    queryFn: getClients,
  });

  const pendingClients = useMemo(() => {
    return (
      clientsData?.filter((client) => client.approvalStatus?.toUpperCase() === "PENDING") ?? []
    );
  }, [clientsData]);

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
        description="Manage client portfolio and verify information"
      />
      <MainTableComp<ClientTableProps>
        title="Clients Overview"
        description="View and manage the complete list of pending clients."
        data={pendingClients ?? []}
        isLoading={isLoading}
        columns={clientsColumnDefinition(false)}
        filterColumns={["name", "branchName"]}
        emptyTitle="No Pending Clients Found"
        emptyDescription="There are no pending clients yet."
        onRowDoubleClick={(client) => {
          // Navigate to dynamic route [id]/page.tsx using the client (id = serial number)
          router.push(`/finance/clients/${client.id}`);
        }}
      />
    </ContentLayout>
  );
}
