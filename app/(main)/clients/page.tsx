"use client";

import { ContentLayout } from "@/components/staff-panel/content-layout";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { MainClientsTable } from "@/features/clients/components/tables/MainClientsTable";
import BreadcrumbPages from "@/components/BreadcrumbPages";
import { clientsOverviewStatistics } from "@/features/clients/data/client-mock-stats";
import TabListCustomComp from "@/components/TabListCustomComp";
import StatisticsCard from "@/components/StatisticsCard";
import MainHeader from "@/components/MainHeader";
import { useEffect } from "react";

const tabs = [
  { value: "overview", label: "Overview" },
  { value: "new", label: "Newly Registered" },
  { value: "issues", label: "With Issues" },
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
      />
      <StatisticsCard statistics={clientsOverviewStatistics} />

      <Tabs defaultValue="overview" className="space-y-4">
        <TabListCustomComp tabs={tabs} />
        <TabsContent value="overview" className="space-y-4">
          <MainClientsTable
            title="Clients Overview"
            description="View and manage the complete list of clients across all branches."
          />
        </TabsContent>

        <TabsContent value="new" className="space-y-4">
          <MainClientsTable
            title="Newly Registered"
            description="Track and manage clients who were recently added to the system."
          />
        </TabsContent>

        <TabsContent value="issues" className="space-y-4">
          <MainClientsTable
            title="Clients With Issues"
            description="Identify and address clients with incomplete records or flagged accounts."
          />
        </TabsContent>
      </Tabs>
    </ContentLayout>
  );
}
