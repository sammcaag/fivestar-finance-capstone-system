"use client";

import { ContentLayout } from "@/components/staff-panel/content-layout";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { MainClientsTable } from "@/features/clients/components/MainClientsTable";
import BreadcrumbPages from "@/components/BreadcrumbPages";
import { clientsOverviewStatistics } from "@/features/clients/data/client-mock-stats";
import TabListCustomComp from "@/components/TabListCustomComp";
import StatisticsCard from "@/components/StatisticsCard";
import MainHeader from "@/components/MainHeader";

const tabs = [
  { value: "overview", label: "All Clients" },
  { value: "active", label: "Active Clients" },
  { value: "inactive", label: "Inactive Clients" },
  { value: "new", label: "Newly Registered" },
  { value: "issues", label: "With Issues" },
];

export default function ClientsPage() {
  return (
    <ContentLayout title="All Clients">
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
        title="Clients"
        description="Manage your client portfolio and loan statuses"
      />
      <StatisticsCard statistics={clientsOverviewStatistics} />

      <Tabs defaultValue="overview" className="space-y-4">
        <TabListCustomComp tabs={tabs} />
        <TabsContent value="overview" className="space-y-4">
          <MainClientsTable
            title="All Clients"
            description="View and manage the complete list of clients across all branches."
          />
        </TabsContent>

        <TabsContent value="active" className="space-y-4">
          <MainClientsTable
            title="Active Clients"
            description="Monitor clients with ongoing or recently approved loan accounts."
          />
        </TabsContent>

        <TabsContent value="inactive" className="space-y-4">
          <MainClientsTable
            title="Inactive Clients"
            description="Review clients with no active loans or recent transactions."
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
