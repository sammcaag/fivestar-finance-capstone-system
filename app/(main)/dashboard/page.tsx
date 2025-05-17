import { ContentLayout } from "@/components/admin-panel/content-layout";
import BreadcrumbPages from "@/components/BreadcrumbPages";
import Statistics from "@/features/clients/components/Statistics";
import RecentProcessTrail from "@/features/clients/components/RecentProcessTrail";
import RecentClients from "@/features/clients/components/RecentClients";

export default function DashboardPage() {
  return (
    <ContentLayout title="Dashboard">
      <BreadcrumbPages
        links={[
          { href: "/", label: "Home" },
          { href: "/dashboard", label: "Dashboard" },
        ]}
      />
      <Statistics />
      <RecentProcessTrail />
      <RecentClients />
    </ContentLayout>
  );
}
