import { ContentLayout } from "@/components/admin-panel/content-layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CalendarDays, CreditCard, DollarSign, Users } from "lucide-react";
import { ClientsFilter } from "@/features/clients/components/ClientsFilter";
import { ClientsTable } from "@/features/clients/components/ClientsTable";
import { ClientsOverviewCards } from "@/features/clients/components/ClientsOverviewCards";
import BreadcrumbPages from "@/components/BreadcrumbPages";
import { AnimatedBackground } from "@/components/motion-primitives/animated-background";

const tabs = [
  { value: "overview", label: "Overview" },
  { value: "active", label: "Active Loans" },
  { value: "pending", label: "Pending Approval" },
  { value: "overdue", label: "Overdue" },
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
          <Tabs defaultValue="overview" className="space-y-4 ">
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
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Total Clients
                    </CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">1,248</div>
                    <p className="text-xs text-muted-foreground">
                      +12% from last month
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Active Loans
                    </CardTitle>
                    <CreditCard className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">842</div>
                    <p className="text-xs text-muted-foreground">
                      +4% from last month
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Total Portfolio
                    </CardTitle>
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">$4.2M</div>
                    <p className="text-xs text-muted-foreground">
                      +8% from last month
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Overdue Payments
                    </CardTitle>
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">$24,500</div>
                    <p className="text-xs text-muted-foreground">
                      -2% from last month
                    </p>
                  </CardContent>
                </Card>
              </div>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
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
                <Card className="col-span-3">
                  <CardHeader>
                    <CardTitle>Client Status Overview</CardTitle>
                    <CardDescription>
                      Distribution of clients by loan status
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ClientsOverviewCards />
                  </CardContent>
                </Card>
              </div>
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
            <TabsContent value="pending" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Pending Approval</CardTitle>
                  <CardDescription>
                    Review and process loan applications awaiting approval
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ClientsFilter />
                  <ClientsTable filterStatus="pending" />
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="overdue" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Overdue Payments</CardTitle>
                  <CardDescription>
                    Manage clients with overdue loan payments
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ClientsFilter />
                  <ClientsTable filterStatus="overdue" />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </ContentLayout>
  );
}
