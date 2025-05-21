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
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function DashboardPage() {
  return (
    <ContentLayout title="Dashboard" className="space-y-6">
      <BreadcrumbPages
        links={[
          { href: "/", label: "Home" },
          { href: "/dashboard", label: "Dashboard" },
        ]}
      />
      <div>
        <h1 className="h2 pb-0">Welcome!</h1>
        <p className="lead">
          Branch of Cagayan de Oro City
        </p>
      </div>
      <ClientStatistics statistics={dashboardStatistics} />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7 ">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle className="h4">Clients Status</CardTitle>
            <CardDescription>
              Manage your client portfolio and loan statuses
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ClientsFilter dashboard />
            <ClientsTable dashboard />
          </CardContent>
        </Card>
        <ClientStatusReport />
      </div>
      <Card className="">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="h4">Recently Registered Clients</CardTitle>
            <CardDescription>
              View the recently registered clients
            </CardDescription>
          </div>
          <Button variant="outline" asChild>
            <Link href="/clients">View All Registered Clients</Link>
          </Button>
        </CardHeader>
        <CardContent>
          <ClientsTable dashboard />
        </CardContent>
      </Card>
    </ContentLayout>
  );
}
