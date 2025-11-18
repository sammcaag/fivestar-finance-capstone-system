"use client";

import { Tabs, TabsContent } from "@/components/ui/tabs";
import { ContentLayout } from "@/components/staff-panel/content-layout";
import BreadcrumbPages from "@/components/BreadcrumbPages";
import MainHeader from "@/components/MainHeader";
import { dashboardStatistics } from "@/features/clients/data/mock-clients-stats";
import StatisticsCard from "@/components/StatisticsCard";
import TabListCustomComp from "@/components/TabListCustomComp";
import {
  Calculator,
  FileChartColumn,
  MapPin,
  Search,
  UserPlus,
} from "lucide-react";
import { ClientTableProps } from "@/features/clients/types/client-types";
import { AppointmentTableProps } from "@/features/loans/appointments/types/appointment-types";
import { useEffect } from "react";
import { MainTableComp } from "@/components/tables/MainTableComp";
import { clientsColumnDefinition } from "@/features/clients/components/tables/ClientsColumnDefinition";
import { mobileAppointmentsColumnDefinition } from "@/features/loans/appointments/components/MobileAppointmentsColumnDefinition";
import { mockAppointmentsData } from "@/features/loans/appointments/data/mock-appointments-data";
import { useQuery } from "@tanstack/react-query";
import { getClients } from "@/features/clients/api/client-service";

// Filter data for the last 30 days
const thirtyDaysAgo = new Date();
thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

const recentAppointments = mockAppointmentsData.filter(
  (appointment) => new Date(appointment.appointmentDate) >= thirtyDaysAgo
);

const dashboardTabs = [
  { value: "overview", label: "Overview" },
  { value: "appointments", label: "Mobile Appointments" },
];

const dashboardQuickActions = [
  {
    label: "Register New Client",
    href: "/clients/register",
    icon: UserPlus,
  },
  {
    label: "New Client Computation",
    href: "/loans/computations/new-client",
    icon: Calculator,
  },
  {
    label: "View Reports",
    href: "/reports",
    icon: FileChartColumn,
  },
  {
    label: "Search Client",
    href: "/#",
    icon: Search,
  },
];

export default function DashboardPage() {
  useEffect(() => {
    document.title = "Dashboard | Stella - Five Star Finance Inc.";
  }, []);

  const { data: clientsData, isLoading } = useQuery<ClientTableProps[]>({
    queryKey: ["clients"],
    queryFn: getClients,
  });

  // Compute recentClients safely, always defined as an array
  const recentClients = (clientsData || []).filter(
    (client) => new Date(client.createdAt) >= thirtyDaysAgo
  );

  return (
    <ContentLayout title="Dashboard">
      <BreadcrumbPages
        links={[
          { href: "/", label: "Home" },
          { href: "/dashboard", label: "Dashboard" },
        ]}
      />
      <MainHeader
        title="Welcome to STELLA!"
        description="Branch of Cagayan de Oro"
        quickActions={dashboardQuickActions}
        icon={MapPin}
      />
      <StatisticsCard statistics={dashboardStatistics} />
      <Tabs defaultValue="overview" className="w-full">
        <TabListCustomComp tabs={dashboardTabs} />
        <TabsContent
          value="overview"
          className="mt-4 flex flex-col md:flex-row gap-8"
        >
          <MainTableComp<ClientTableProps>
            title="Recent Client & Loan Activities"
            description="A quick overview of your most recent client transactions, loan updates, and payment statuses."
            data={recentClients}
            isLoading={isLoading}
            columns={clientsColumnDefinition(true)}
            filterColumns={["name", "status"]}
            emptyTitle="No Recent Clients"
            emptyDescription="No clients have been registered in the last 30 days."
            emptyActionLabel="Register New Client"
            emptyOnAction={() => (window.location.href = "/clients/register")}
            dashboard={true}
            dashboardButtonContent="Clients"
          />
        </TabsContent>
        <TabsContent value="appointments" className="mt-4">
          <MainTableComp<AppointmentTableProps>
            title="Recent Mobile Appointments"
            description="See the latest scheduled and completed client appointments. Visit the Appointments tab for the full schedule."
            data={recentAppointments}
            columns={mobileAppointmentsColumnDefinition(true)}
            filterColumns={["name", "status"]}
            emptyTitle="No Recent Appointments"
            emptyDescription="No appointments have been scheduled in the last 30 days."
            emptyActionLabel="Add New Appointment"
            emptyOnAction={() => (window.location.href = "/appointments/new")}
            dashboard={true}
            dashboardButtonContent="Appointments"
          />
        </TabsContent>
      </Tabs>
    </ContentLayout>
  );
}
