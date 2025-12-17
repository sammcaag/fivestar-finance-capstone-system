"use client";

import BreadcrumbPages from "@/components/BreadcrumbPages";
import MainHeader from "@/components/MainHeader";
import { ContentLayout } from "@/components/staff-panel/content-layout";
import { TableOnlyComp } from "@/components/tables/TableOnlyComp";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { loanDeductionsColumnDefinition } from "@/features/reports/components/tables/LoanDeductionsColumnDefinition";
import { getAnnualReportClients } from "@/features/reports/services/annual-report-clients-service";
import { getAnnualReports } from "@/features/reports/services/annual-reports-service";
import { AnnualReportRow } from "@/features/reports/types/annual-report-types";
import { LoanDeductionTableRow } from "@/features/reports/types/loan-deductions-types";
import { formatToPhCurrency } from "@/utils/format-to-ph-currency";
import { useQuery } from "@tanstack/react-query";
import { Banknote, CircleDollarSign, CreditCard, Users } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

type AnnualReportClientMetric = "loans" | "accounts" | "payments" | "deceased";

type StatCardProps = {
  title: string;
  value: string;
  summary: string;
  icon: React.ElementType;
  isActive?: boolean;
  onClick?: () => void;
};

function StatCard({ title, value, summary, icon: Icon, isActive, onClick }: StatCardProps) {
  return (
    <Card
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      onClick={onClick}
      onKeyDown={(e) => {
        if (!onClick) return;
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick();
        }
      }}
      className={
        isActive
          ? "overflow-hidden relative rounded-lg border ring-1 shadow-sm cursor-pointer bg-card ring-primary"
          : "overflow-hidden relative rounded-lg border shadow-sm cursor-pointer bg-card"
      }
    >
      <CardHeader className="flex flex-row justify-between items-center pb-2 space-y-0">
        <CardTitle className="text-sm font-medium text-card-foreground">{title}</CardTitle>
        <div className="p-2 rounded-full bg-primary/10 text-primary">
          <Icon className="w-4 h-4" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-card-foreground">{value}</div>
        <p className="muted">{summary}</p>
      </CardContent>
    </Card>
  );
}

export default function FinancialStatus() {
  useEffect(() => {
    document.title = "Financial Status | Stella - Five Star Finance Inc.";
  }, []);

  const { data: annualReports, isLoading } = useQuery<AnnualReportRow[]>({
    queryKey: ["annual-reports"],
    queryFn: getAnnualReports,
  });

  const years = useMemo(() => {
    if (!annualReports?.length) return [];
    return [...annualReports].map((r) => r.year).sort((a, b) => b - a);
  }, [annualReports]);

  const [selectedYear, setSelectedYear] = useState<number | null>(null);

  useEffect(() => {
    if (!years.length) return;
    setSelectedYear((prev) => prev ?? years[0]);
  }, [years]);

  const selectedReport = useMemo(() => {
    if (!annualReports?.length || !selectedYear) return null;
    return annualReports.find((r) => r.year === selectedYear) ?? null;
  }, [annualReports, selectedYear]);

  const [selectedMetric, setSelectedMetric] = useState<AnnualReportClientMetric>("loans");

  const { data: annualReportClients, isLoading: isClientsLoading } = useQuery<
    LoanDeductionTableRow[]
  >({
    queryKey: ["annual-report-clients", selectedYear, selectedMetric],
    queryFn: () =>
      getAnnualReportClients({
        year: selectedYear as number,
        metric: selectedMetric as AnnualReportClientMetric,
      }),
    enabled: Boolean(selectedYear && selectedMetric),
  });

  const stats = useMemo(() => {
    return [
      {
        title: "Total Loans",
        value: selectedReport ? String(selectedReport.totalLoans) : "-",
        summary: "Active loan records for the selected year",
        icon: Banknote,
        metric: "loans" as const,
      },
      {
        title: "Total Accounts",
        value: selectedReport ? String(selectedReport.totalAccounts) : "-",
        summary: "Loan history account records for the selected year",
        icon: Users,
        metric: "accounts" as const,
      },
      {
        title: "Total Payments",
        value: selectedReport ? formatToPhCurrency(selectedReport.totalPayments) : "-",
        summary: "Payment-related loan records for the selected year",
        icon: CreditCard,
        metric: "payments" as const,
      },
      {
        title: "Deceased Amortizations",
        value: selectedReport ? String(selectedReport.totalDeceasedAmortizations) : "-",
        summary: "Loan records for deceased clients for the selected year",
        icon: CircleDollarSign,
        metric: "deceased" as const,
      },
    ];
  }, [selectedReport]);

  return (
    <ContentLayout title="Reports">
      <BreadcrumbPages
        links={[
          { href: "/", label: "Home" },
          { href: "/reports", label: "Reports" },
          { href: "/reports/financial-status", label: "Financial Status" },
        ]}
      />
      <MainHeader
        title="Financial Status"
        description="Annual breakdown of loans, accounts, payments, and deficiencies."
      />

      <Card className="flex flex-row justify-between items-center">
        <CardHeader>
          <CardTitle className="text-4xl">{selectedYear}</CardTitle>
          <CardDescription>Financial Year</CardDescription>
        </CardHeader>
        <CardContent>
          <Select
            value={selectedYear ? String(selectedYear) : undefined}
            onValueChange={(val) => setSelectedYear(Number(val))}
            disabled={!years.length}
          >
            <SelectTrigger className="w-[180px] h-12!">
              <SelectValue placeholder="Select year" />
            </SelectTrigger>
            <SelectContent>
              {years.map((y) => (
                <SelectItem key={String(y)} value={String(y)}>
                  {y}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {isLoading ? (
        <div className="grid gap-4 md:grid-cols-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <Card key={String(i)} className="rounded-lg border shadow-sm bg-card">
              <CardHeader className="space-y-2">
                <div className="w-32 h-4 rounded bg-muted" />
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="w-40 h-7 rounded bg-muted" />
                <div className="w-56 h-4 rounded bg-muted" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-4">
          {stats.map((s) => (
            <StatCard
              key={s.title}
              title={s.title}
              value={s.value}
              summary={s.summary}
              icon={s.icon}
              isActive={selectedMetric === s.metric}
              onClick={() => {
                if (!selectedYear) return;
                setSelectedMetric((prev) => (prev === s.metric ? "loans" : s.metric));
              }}
            />
          ))}
        </div>
      )}

      {selectedMetric ? (
        <div className="pt-6">
          <TableOnlyComp<LoanDeductionTableRow>
            title={stats.find((s) => s.metric === selectedMetric)?.title ?? "Results"}
            description={`Clients included for ${selectedYear} based on the selected metric.`}
            data={annualReportClients ?? []}
            isLoading={isClientsLoading}
            columns={loanDeductionsColumnDefinition}
            filterColumns={["name", "deductNumber"]}
            initialSort={[{ id: "loanStarted", desc: true }]}
            emptyTitle="No Clients Found"
            emptyDescription="No matching clients were found for the selected year and metric."
          />
        </div>
      ) : null}
    </ContentLayout>
  );
}
