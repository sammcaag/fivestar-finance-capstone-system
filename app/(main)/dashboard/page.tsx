import { ContentLayout } from "@/components/admin-panel/content-layout";
import BreadcrumbPages from "@/components/BreadcrumbPages";
import ClientStatistics from "@/features/clients/components/ClientStatistics";
import { ClientsTable } from "@/features/clients/components/ClientsTable";
import { dashboardStatistics } from "@/features/clients/data/client-mock-stats";
import ClientStatusReport from "@/features/clients/components/ClientStatusReport";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ClientsFilter } from "@/features/clients/components/ClientsFilter";

export default function DashboardPage() {
  return (
    <ContentLayout title="Dashboard">
      <BreadcrumbPages
        links={[
          { href: "/", label: "Home" },
          { href: "/dashboard", label: "Dashboard" },
        ]}
      />
      <ClientStatistics statistics={dashboardStatistics} />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7 mt-6">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Clients</CardTitle>
            <CardDescription>
              Manage your client portfolio and loan statuses
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ClientsFilter dashboard />
            <ClientsTable />
          </CardContent>
        </Card>
        <ClientStatusReport />
      </div>
      <ClientsTable />
    </ContentLayout>
  );
}
