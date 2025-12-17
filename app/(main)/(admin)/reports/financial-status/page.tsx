"use client";

import BreadcrumbPages from "@/components/BreadcrumbPages";
import MainHeader from "@/components/MainHeader";
import { ContentLayout } from "@/components/staff-panel/content-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getAnnualReports } from "@/features/reports/services/annual-reports-service";
import { AnnualReportRow } from "@/features/reports/types/annual-report-types";
import { formatToPhCurrency } from "@/utils/format-to-ph-currency";
import { useQuery } from "@tanstack/react-query";
import { Banknote, CalendarRange, CircleDollarSign, CreditCard, Users } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

type StatCardProps = {
  title: string;
  value: string;
  summary: string;
  icon: React.ElementType;
};

function StatCard({ title, value, summary, icon: Icon }: StatCardProps) {
  return (
    <Card className="relative overflow-hidden rounded-lg border bg-card shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-card-foreground">{title}</CardTitle>
        <div className="rounded-full bg-primary/10 p-2 text-primary">
          <Icon className="h-4 w-4" />
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

  const stats = useMemo(() => {
    const year = selectedReport?.year;
    const yearLabel = year ? String(year) : "-";

    return [
      {
        title: "Reporting Year",
        value: yearLabel,
        summary: "Latest available annual report",
        icon: CalendarRange,
      },
      {
        title: "Total Loans",
        value: selectedReport ? formatToPhCurrency(Number(selectedReport.totalLoans)) : "-",
        summary: "Sum of net proceeds (approved loans)",
        icon: Banknote,
      },
      {
        title: "Total Accounts",
        value: selectedReport ? String(selectedReport.totalAccounts) : "-",
        summary: "Approved loan history count",
        icon: Users,
      },
      {
        title: "Total Payments",
        value: selectedReport ? formatToPhCurrency(Number(selectedReport.totalPayments)) : "-",
        summary: "Sum of monthly amortizations",
        icon: CreditCard,
      },
      {
        title: "Deceased Amortizations",
        value: selectedReport
          ? formatToPhCurrency(Number(selectedReport.totalDeceasedAmortizations))
          : "-",
        summary: "Deficiency payments from deceased clients",
        icon: CircleDollarSign,
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

      <div className="flex items-center justify-end pb-4">
        <Select
          value={selectedYear ? String(selectedYear) : undefined}
          onValueChange={(val) => setSelectedYear(Number(val))}
          disabled={!years.length}
        >
          <SelectTrigger className="w-[180px]">
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
      </div>

      {isLoading ? (
        <div className="grid gap-4 md:grid-cols-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <Card key={String(i)} className="rounded-lg border bg-card shadow-sm">
              <CardHeader className="space-y-2">
                <div className="h-4 w-32 rounded bg-muted" />
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="h-7 w-40 rounded bg-muted" />
                <div className="h-4 w-56 rounded bg-muted" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-3">
          {stats.map((s) => (
            <StatCard
              key={s.title}
              title={s.title}
              value={s.value}
              summary={s.summary}
              icon={s.icon}
            />
          ))}
        </div>
      )}
    </ContentLayout>
  );
}
