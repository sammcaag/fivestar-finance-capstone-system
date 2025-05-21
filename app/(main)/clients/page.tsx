"use client";

import { ContentLayout } from "@/components/admin-panel/content-layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CalendarDays } from "lucide-react";
import { ClientsFilter } from "@/features/clients/components/ClientsFilter";
import { ClientsTable } from "@/features/clients/components/ClientsTable";
import BreadcrumbPages from "@/components/BreadcrumbPages";
import { AnimatedBackground } from "@/components/motion-primitives/animated-background";
import ClientStatistics from "@/features/clients/components/ClientStatistics";
import { clientsOverviewStatistics } from "@/features/clients/data/client-mock-stats";

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
            href: "/dashboard",
            label: "Dashboard",
          },
          {
            href: "/clients",
            label: "Clients",
          },
        ]}
      />

      <div className="flex flex-col">
        <div className="flex-1 space-y-4 pt-6">
          <div className="flex items-center justify-between space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">
              Clients Overview
            </h2>
            <div className="flex items-center space-x-2">
              <CalendarDays className="h-4 w-4" />
              <span className="text-sm text-muted-foreground">
                {new Date().toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>
          </div>
          <ClientStatistics statistics={clientsOverviewStatistics} />

          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList className="tabs-container ">
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
            <TabsContent value="overview" className="space-y-4">
              <Card className="col-span-4">
                <CardHeader>
                  <CardTitle>Clients</CardTitle>
                  <CardDescription>
                    Manage your client portfolio and loan statuses
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ClientsFilter />
                  <ClientsTable />
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="active" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Active Loans</CardTitle>
                  <CardDescription>
                    View and manage all active loans in your portfolio
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ClientsFilter />
                  <ClientsTable filterStatus="active" />
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="inactive" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Inactive Loans</CardTitle>
                  <CardDescription>
                    Review and process loan applications awaiting approval
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ClientsFilter />
                  <ClientsTable filterStatus="inactive" />
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="processed" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Processed Loans</CardTitle>
                  <CardDescription>
                    View and manage all processed loans in your portfolio
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ClientsFilter />
                  <ClientsTable filterStatus="processed" />
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="released" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Released Loans</CardTitle>
                  <CardDescription>
                    View and manage all released loans in your portfolio
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ClientsFilter />
                  <ClientsTable filterStatus="released" />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </ContentLayout>
  );
}
