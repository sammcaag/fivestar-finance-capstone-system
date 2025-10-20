"use client";
import { ContentLayout } from "@/components/staff-panel/content-layout";
import BreadcrumbPages from "@/components/BreadcrumbPages";
import MainHeader from "@/components/MainHeader";
import { Tabs } from "@radix-ui/react-tabs";
import TabListCustomComp from "@/components/TabListCustomComp";
import { TabsContent } from "@/components/ui/tabs";
import LoanPerformanceTab from "@/features/reports/components/LoanPerformanceTab";
import ClientActivityTab from "@/features/reports/components/ClientActivityTab";
import FinancialPortfolioTab from "@/features/reports/components/FinancialPortfolioTab";
import StatisticsCard from "@/components/StatisticsCard";
import { mockReportCardData } from "@/features/reports/components/data/mock-report-card-data";
import ReportFiltersSection from "@/features/reports/components/ReportFiltersSection";
import { useEffect } from "react";

export default function Reports() {
  useEffect(() => {
    document.title = "Reports & Analytics | Stella - Five Star Finance Inc.";
  }, []);

  return (
    <ContentLayout title="Reports & Analytics">
      <BreadcrumbPages
        links={[
          { href: "/dashboard", label: "Home" },
          { href: "/reports", label: "Reports & Analytics" },
        ]}
      />
      <MainHeader
        title="Reports and Analytics"
        description="Generate detailed summaries of loan activities by branch, type, or status. Gain insights through monthly analytics and exportable reports."
      />

      {/* KPI Summary Cards */}
      <StatisticsCard statistics={mockReportCardData} />
      {/* Filters */}
      <ReportFiltersSection />
      {/* Tabbed Reports */}
      <Tabs defaultValue="loan-performance" className="space-y-4">
        <TabListCustomComp
          tabs={[
            { value: "loan-performance", label: "Loan Performance" },
            { value: "client-activity", label: "Client & Activity" },
            { value: "financial-portfolio", label: "Financial & Portfolio" },
          ]}
        />

        <TabsContent value="loan-performance">
          <LoanPerformanceTab />
        </TabsContent>

        <TabsContent value="client-activity">
          <ClientActivityTab />
        </TabsContent>

        <TabsContent value="financial-portfolio">
          <FinancialPortfolioTab />
        </TabsContent>
      </Tabs>
    </ContentLayout>
  );
}
