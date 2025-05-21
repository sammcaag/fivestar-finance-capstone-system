import { ContentLayout } from "@/components/admin-panel/content-layout";
import BreadcrumbPages from "@/components/BreadcrumbPages";
import ClientStatistics from "@/features/clients/components/ClientStatistics";
import { ClientsTable } from "@/features/clients/components/ClientsTable";
import { dashboardStatistics } from "@/features/clients/data/client-mock-stats";

export default function DashboardPage() {
  return (
    <ContentLayout title="Dashboard">
      <BreadcrumbPages
        links={[
          { href: "/", label: "Home" },
          { href: "/dashboard", label: "Dashboard" },
        ]}
      />
      <div className="flex flex-col gap-6 mt-6">
        <ClientStatistics statistics={dashboardStatistics} />
        <ClientsTable />
      </div>
    </ContentLayout>
  );
}
