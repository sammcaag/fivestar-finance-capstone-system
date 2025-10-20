"use client";
import { ContentLayout } from "@/components/staff-panel/content-layout";
import BreadcrumbPages from "@/components/BreadcrumbPages";
import MainHeader from "@/components/MainHeader";
import StatisticsCard from "@/components/StatisticsCard";
import { loansOverviewStatistics } from "@/features/loans/lib/loans-mock-data";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import TabListCustomComp from "@/components/TabListCustomComp";
import { MainLoansTable } from "@/features/loans/components/tables/MainLoansTable";
import { useEffect } from "react";

const tabs = [
  { value: "overview", label: "Overview" },
  { value: "pending", label: "Pending Loans" },
  { value: "approved", label: "Approved Loans" },
  { value: "active", label: "Active Loans" },
  { value: "closed", label: "Closed Loans" },
  { value: "rejected", label: "Rejected Loans" },
];

export default function Loans() {
  useEffect(() => {
    document.title = "Loans Overview | Stella - Five Star Finance Inc.";
  }, []);

  return (
    <ContentLayout title="Loans Overview">
      <BreadcrumbPages
        links={[
          { href: "/dashboard", label: "Home" },
          { href: "/loans", label: "Loans Overview" },
        ]}
      />
      <MainHeader
        title="Loans Overview"
        description="Oversee and manage all active, pending, and completed loan records within your branch."
      />
      <StatisticsCard statistics={loansOverviewStatistics} />
      <Tabs defaultValue="overview" className="space-y-4">
        <TabListCustomComp tabs={tabs} />
        <TabsContent value="overview" className="space-y-4">
          <MainLoansTable
            title="Loans Overview"
            description="View and manage all loan records across every status and branch."
          />
        </TabsContent>

        <TabsContent value="pending" className="space-y-4">
          <MainLoansTable
            title="Pending Loans"
            description="Monitor loan applications that are awaiting review or approval."
          />
        </TabsContent>

        <TabsContent value="approved" className="space-y-4">
          <MainLoansTable
            title="Approved Loans"
            description="Track loans that have been approved and are ready for release."
          />
        </TabsContent>

        <TabsContent value="active" className="space-y-4">
          <MainLoansTable
            title="Active Loans"
            description="Manage loans that are currently disbursed and being repaid."
          />
        </TabsContent>

        <TabsContent value="closed" className="space-y-4">
          <MainLoansTable
            title="Closed Loans"
            description="Review fully paid or completed loan accounts."
          />
        </TabsContent>

        <TabsContent value="rejected" className="space-y-4">
          <MainLoansTable
            title="Rejected Loans"
            description="View loan applications that were declined or cancelled."
          />
        </TabsContent>
      </Tabs>
    </ContentLayout>
  );
}
