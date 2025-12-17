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

export default function ClientsVerificationPage() {
  const router = useRouter(); // initialize router

  useEffect(() => {
    document.title = "For Validation | Stella - Five Star Finance Inc.";
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
    <ContentLayout title="For Validation">
      <BreadcrumbPages
        links={[
          { href: "/finance/client/overview", label: "Verification" },
          { href: "/finance/clients/overview", label: "Clients" },
          { href: "/finance/clients/validation", label: "For Validation" },
        ]}
      />
      <MainHeader
        title="For Validation"
        description="Manage pending clients and validate their information"
      />
      <MainTableComp<ClientTableProps>
        title="For Validation"
        description="View and manage the complete list of pending clients."
        data={pendingClients ?? []}
        isLoading={isLoading}
        columns={clientsColumnDefinition(false)}
        filterColumns={["name", "branchName"]}
        emptyTitle="No Pending Clients Found"
        emptyDescription="There are no pending clients yet."
        onRowDoubleClick={(client) => {
          // Navigate to dynamic route [id]/page.tsx using the client (id = serial number)
          router.push(`/finance/clients/validation/${client.id}`);
        }}
      />
    </ContentLayout>
  );
}
