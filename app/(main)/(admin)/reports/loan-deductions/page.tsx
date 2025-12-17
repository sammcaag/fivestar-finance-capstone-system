"use client";

import BreadcrumbPages from "@/components/BreadcrumbPages";
import MainHeader from "@/components/MainHeader";
import { ContentLayout } from "@/components/staff-panel/content-layout";
import { TableOnlyComp } from "@/components/tables/TableOnlyComp";
import { loanDeductionsColumnDefinition } from "@/features/reports/components/tables/LoanDeductionsColumnDefinition";
import { getUserLoanDeductions } from "@/features/reports/services/loan-deductions-service";
import { LoanDeductionTableRow } from "@/features/reports/types/loan-deductions-types";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

export default function ReportsPage() {
  useEffect(() => {
    document.title = "Reports | Stella - Five Star Finance Inc.";
  }, []);

  const { data: loanDeductionsData, isLoading } = useQuery<LoanDeductionTableRow[]>({
    queryKey: ["loan-deductions"],
    queryFn: getUserLoanDeductions,
  });

  return (
    <ContentLayout title="Reports">
      <BreadcrumbPages
        links={[
          { href: "/", label: "Home" },
          { href: "/reports", label: "Reports" },
        ]}
      />
      <MainHeader
        title="Loan Deductions"
        description="Track how many automatic deductions have been applied per client based on their loan start date."
      />
      <TableOnlyComp<LoanDeductionTableRow>
        title="Loan Deductions"
        description="Loan started date, current deduction count, and monthly amortization per client."
        data={loanDeductionsData ?? []}
        isLoading={isLoading}
        columns={loanDeductionsColumnDefinition}
        filterColumns={["name", "deductNumber"]}
        initialSort={[{ id: "loanStarted", desc: true }]}
        emptyTitle="No Loan Deductions Found"
        emptyDescription="There are no approved client loans available to compute deductions."
      />
    </ContentLayout>
  );
}
