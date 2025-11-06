"use client";
import { motion } from "framer-motion";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { ContentLayout } from "@/components/staff-panel/content-layout";
import BreadcrumbPages from "@/components/BreadcrumbPages";
import { dashboardStatistics } from "@/features/clients/data/client-mock-stats";
import MainHeader from "@/components/MainHeader";
import {
  dashboardQuickActions,
  dashboardMotionContainer,
  dashboardMotionItem,
} from "@/lib/dashboard-vars";
import StatisticsCard from "@/components/StatisticsCard";
import TabListCustomComp from "@/components/TabListCustomComp";
import { MapPin } from "lucide-react";
import MainDashboardTable from "@/features/clients/components/tables/MainDashboardTable";
import { useEffect } from "react";
import { clientTableData } from "@/features/clients/data/client-mock";
import { clientsColumnDefinition } from "@/features/clients/components/tables/ClientsColumnDefinition";
import { appointmentsData } from "@/features/loans/appointments/data/appointments-mock-data";
import { appointmentsColumnDefinition } from "@/features/loans/appointments/components/LoanAppointmentsColumnDefinition";

const dashboardTabs = [
  { value: "overview", label: "Overview" },
  { value: "appointments", label: "Mobile Appointments" },
];

export default function DashboardPage() {
  useEffect(() => {
    document.title = "Dashboard | Stella - Five Star Finance Inc.";
  }, []);

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

      <motion.div
        variants={dashboardMotionContainer}
        initial="hidden"
        animate="show"
      >
        <StatisticsCard statistics={dashboardStatistics} />

        <motion.div variants={dashboardMotionItem} className="mt-10">
          <Tabs defaultValue="overview" className="w-full">
            {/* Tab List */}
            <TabListCustomComp tabs={dashboardTabs} />
            {/* Tab Content */}
            <TabsContent
              value="overview"
              className="mt-4 flex flex-col md:flex-row gap-8"
            >
              <MainDashboardTable
                title="Recent Client & Loan Activities"
                description="A quick overview of your most recent client transactions, loan updates, and payment statuses."
                href="/clients"
                data={clientTableData}
                columns={clientsColumnDefinition(true)}
              />
            </TabsContent>

            <TabsContent value="appointments" className="mt-4">
              <MainDashboardTable
                title="Recent Mobile Appointments"
                description="See the latest scheduled and completed client appointments. Visit the Appointments tab for the full schedule."
                href="loans/appointments"
                data={appointmentsData}
                columns={appointmentsColumnDefinition(true)}
              />
            </TabsContent>
          </Tabs>
        </motion.div>
      </motion.div>
    </ContentLayout>
  );
}
