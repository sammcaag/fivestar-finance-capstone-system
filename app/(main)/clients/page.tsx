"use client";

import { ContentLayout } from "@/components/staff-panel/content-layout";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { ClientsTable } from "@/features/clients/components/ClientsTable";
import BreadcrumbPages from "@/components/BreadcrumbPages";
import { clientsOverviewStatistics } from "@/features/clients/data/client-mock-stats";
import TabListCustomComp from "@/components/TabListCustomComp";
import StatisticsCard from "@/components/StatisticsCard";
import MainHeader from "@/components/MainHeader";

const tabs = [
  { value: "overview", label: "All Clients" },
  { value: "active", label: "Active Loans" },
  { value: "inactive", label: "Inactive Loans" },
  { value: "processed", label: "Processed Loans" },
  { value: "released", label: "Released Loans" },
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
          <ClientsTable
            title="All Clients"
            description="Manage your client portfolio and loan statuses"
          />
        </TabsContent>
        <TabsContent value="active" className="space-y-4">
          <ClientsTable
            filterStatus="active"
            title="Active Loans"
            description="View and manage all active loans in your portfolio"
          />
        </TabsContent>
        <TabsContent value="inactive" className="space-y-4">
          <ClientsTable
            filterStatus="inactive"
            title="Inactive Loans"
            description="Review and process loan applications awaiting approval"
          />
        </TabsContent>
        <TabsContent value="processed" className="space-y-4">
          <ClientsTable
            filterStatus="processed"
            title="Processed Loans"
            description="View and manage all processed loans in your portfolio"
          />
        </TabsContent>
        <TabsContent value="released" className="space-y-4">
          <ClientsTable
            filterStatus="released"
            title="Released Loans"
            description="View and manage all released loans in your portfolio"
          />
        </TabsContent>
      </Tabs>
    </ContentLayout>
  );
}
