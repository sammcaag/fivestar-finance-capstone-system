"use client";
import { useState, useEffect } from "react";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Calculator,
  CalendarDays,
  FileChartColumn,
  MapPin,
  Users,
} from "lucide-react";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import BreadcrumbPages from "@/components/BreadcrumbPages";
import ClientStatistics from "@/features/clients/components/ClientStatistics";
import { dashboardStatistics } from "@/features/clients/data/client-mock-stats";
import { ClientsFilter } from "@/features/clients/components/ClientsFilter";
import { ClientsTable } from "@/features/clients/components/ClientsTable";
import ClientStatusReport from "@/features/clients/components/ClientStatusReport";
import RealTime from "@/components/RealTime";
import { AnimatedBackground } from "@/components/motion-primitives/animated-background";

const tabs = [
  { value: "overview", label: "Overview" },
  { value: "clients", label: "Clients" },
  { value: "reports", label: "Report" },
];

export default function DashboardPage() {
  const [mounted, setMounted] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    setMounted(true);
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        ease: "easeOut",
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 10 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
  };

  if (!mounted) return null;

  return (
    <ContentLayout title="Dashboard" className="space-y-8">
      <BreadcrumbPages
        links={[
          { href: "/", label: "Home" },
          { href: "/dashboard", label: "Dashboard" },
        ]}
      />

      <motion.div
        className="relative overflow-hidden rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 p-8 text-white shadow-lg framer-motion-fix"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10 blur-3xl"></div>
        <div className="absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-white/10 blur-3xl"></div>

        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-wide text-white md:text-4xl">
              Welcome to STELLA!
            </h1>
            <div className="flex items-center space-x-2">
              <MapPin className="h-5 w-5 text-blue-200" />
              <p className="text-xl font-medium text-blue-100">
                Branch of Cagayan de Oro
              </p>
            </div>
          </div>

          <div className="mt-4 flex flex-col items-end space-y-2 md:mt-0">
            <div className="flex items-center space-x-2 text-lg text-background">
              <CalendarDays className="h-4 w-4" />
              <span>
                {currentTime.toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>
            <div className="flex items-center space-x-2 text-lg text-background">
              <RealTime />
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <Button
            variant="secondary"
            className="bg-white/20 text-white hover:bg-white/30"
            asChild
          >
            <Link href={"/clients"}>
              <Users className="h-4 w-4" />
              Add New Client
            </Link>
          </Button>
          <Button
            variant="secondary"
            className="bg-white/20 text-white hover:bg-white/30"
            asChild
          >
            <Link href={"/loan-computations/new-client"}>
              <Calculator className="h-4 w-4" />
              New Client Computation
            </Link>
          </Button>
          <Button
            variant="secondary"
            className="bg-white/20 text-white hover:bg-white/30"
            asChild
          >
            <Link href={"/reports"}>
              <FileChartColumn className="h-4 w-4" />
              View Reports
            </Link>
          </Button>
        </div>
      </motion.div>

      <motion.div variants={container} initial="hidden" animate="show">
        <motion.div variants={item}>
          <ClientStatistics statistics={dashboardStatistics} />
        </motion.div>

        <motion.div variants={item} className="mt-10">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="tabs-container w-1/2">
              <AnimatedBackground
                className="bg-primary-hover"
                transition={{
                  type: "spring",
                  bounce: 0.2,
                  duration: 0.6,
                }}
                enableHover
              >
                {tabs.map((tab, index) => (
                  <TabsTrigger
                    key={tab.value}
                    value={tab.value}
                    data-id={index}
                    className="tabs-trigger-style"
                  >
                    {tab.label}
                  </TabsTrigger>
                ))}
              </AnimatedBackground>
            </TabsList>

            <TabsContent value="overview" className="mt-4 space-y-6">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
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
              </div>
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
