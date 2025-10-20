"use client";
import Link from "next/link";
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
import { ClientsFilter } from "@/features/clients/components/ClientsFilter";
import { ClientsTable } from "@/features/clients/components/ClientsTable";
import ClientStatusReport from "@/features/clients/components/ClientStatusReport";
import MainHeader from "@/components/MainHeader";
import {
  dashboardQuickActions,
  dashboardMotionContainer,
  dashboardTabs,
  dashboardMotionItem,
} from "@/lib/dashboard-vars";
import StatisticsCard from "@/components/StatisticsCard";
import TabListCustomComp from "@/components/TabListCustomComp";
import { MapPin } from "lucide-react";

export default function DashboardPage() {
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
              className="mt-4 grid gap-6 md:grid-cols-2 lg:grid-cols-7"
            >
              <Card className="col-span-4 overflow-hidden border-none shadow-md">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-950/40 dark:to-cyan-950/40">
                  <CardTitle className="h4">Clients Status</CardTitle>
                  <CardDescription>
                    Manage your client portfolio and loan statuses
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <ClientsFilter dashboard />
                  <ClientsTable dashboard />
                </CardContent>
              </Card>
              <ClientStatusReport />
            </TabsContent>

            <TabsContent value="clients" className="mt-4">
              <Card className="border-none shadow-md">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-950/40 dark:to-cyan-950/40">
                  <div className="flex flex-col space-y-1.5 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
                    <div>
                      <CardTitle className="h4">
                        Recently Registered Clients
                      </CardTitle>
                      <CardDescription>
                        View the recently registered clients
                      </CardDescription>
                    </div>
                    <Button
                      variant="outline"
                      asChild
                      className="mt-2 sm:mt-0"
                      onClick={() => (window.location.href = "/clients")}
                    >
                      <Link href="/clients">View All Registered Clients</Link>
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <ClientsTable dashboard />
                </CardContent>
              </Card>
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
