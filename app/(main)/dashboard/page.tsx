"use client";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { ContentLayout } from "@/components/staff-panel/content-layout";
import BreadcrumbPages from "@/components/BreadcrumbPages";
import { dashboardStatistics } from "@/features/clients/data/client-mock-stats";
import ClientStatusReport from "@/features/clients/components/ClientStatusReport";
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

const dashboardTabs = [
  { value: "overview", label: "Overview" },
  { value: "loans", label: "Loans" },
  { value: "appointments", label: "Appointments" },
  { value: "clients", label: "Clients" },
  { value: "reports", label: "Report" },
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
              />
              <div className="md:max-w-[550px] flex-1">
                <ClientStatusReport />
              </div>
            </TabsContent>

            <TabsContent value="loans" className="mt-4">
              <MainDashboardTable
                title="Recent Loans"
                description="View the most recently processed or approved loans across all branches. Access full details in the Loans tab."
                href="/loans"
              />
            </TabsContent>

            <TabsContent value="appointments" className="mt-4">
              <MainDashboardTable
                title="Recent Appointments"
                description="See the latest scheduled and completed client appointments. Visit the Appointments tab for the full schedule."
                href="loans/appointments"
              />
            </TabsContent>

            <TabsContent value="clients" className="mt-4">
              <MainDashboardTable
                title="Recently Registered Clients"
                description="Monitor newly added clients and their latest loan activities. View the complete client list in the Clients tab."
                href="/clients"
              />
            </TabsContent>

            <TabsContent value="reports" className="mt-4">
              <Card className="border-none shadow-md">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-950/40 dark:to-cyan-950/40">
                  <CardTitle className="h4">Detailed Reports</CardTitle>
                  <CardDescription>
                    View and generate detailed reports
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="flex flex-col items-center justify-center space-y-4 py-12">
                    <p className="text-muted-foreground">
                      Select a report type to generate
                    </p>
                    <div className="flex flex-wrap gap-3">
                      <Button
                        onClick={() =>
                          (window.location.href = "/reports/monthly")
                        }
                      >
                        Monthly Summary
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() =>
                          (window.location.href = "/reports/client-performance")
                        }
                      >
                        Client Performance
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() =>
                          (window.location.href = "/reports/loan-distribution")
                        }
                      >
                        Loan Distribution
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </motion.div>
    </ContentLayout>
  );
}
