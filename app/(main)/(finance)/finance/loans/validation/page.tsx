"use client";

import BreadcrumbPages from "@/components/BreadcrumbPages";
import MainHeader from "@/components/MainHeader";
import { ContentLayout } from "@/components/staff-panel/content-layout";
import { MainTableComp } from "@/components/tables/MainTableComp";
import { loansColumnDefinition } from "@/features/loans/components/tables/LoansColumnDefinition";
import { getClientLoanHistories } from "@/features/loans/history/api/loan-history-service";
import { LoanTableProps } from "@/features/loans/types/loan-types";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect, useMemo } from "react";

export default function LoansVerificationPage() {
  const router = useRouter(); // initialize router

  useEffect(() => {
    document.title = "Loans Pending Validation | Stella - Five Star Finance Inc.";
  }, []);

  const { data: loanClientHistoriesData, isLoading } = useQuery<LoanTableProps[]>({
    queryKey: ["loanHistories"],
    queryFn: getClientLoanHistories,
  });

  const pendingLoans = useMemo(() => {
    return (
      loanClientHistoriesData?.filter(
        (loans) => loans.approvalStatus?.toUpperCase() === "PENDING"
      ) ?? []
    );
  }, [loanClientHistoriesData]);

  useEffect(() => {
    console.log("THE DATA IS:", loanClientHistoriesData);
  }, [loanClientHistoriesData]);

  return (
    <ContentLayout title="Loans For Validation">
      <BreadcrumbPages
        links={[
          { href: "/finance/client/overview", label: "Verification" },
          { href: "/finance/loans/overview", label: "Loans" },
          { href: "/finance/loans/validation", label: "Loans Pending Validation" },
        ]}
      />
      <MainHeader
        title="Loans Pending Validation"
        description="Manage client loans and verify information"
      />
      <MainTableComp<LoanTableProps>
        title="Clients Pending Validation"
        description="View and manage the complete list of pending laons."
        data={pendingLoans ?? []}
        isLoading={isLoading}
        columns={loansColumnDefinition}
        filterColumns={["name", "branchName"]}
        emptyTitle="No Pending Loans Found"
        emptyDescription="There are no pending laons yet."
        onRowDoubleClick={(loan) => {
          // Navigate to dynamic route [id]/page.tsx using the client (id = serial number)
          router.push(`/finance/loans/overview/${loan.serialNumber}`);
        }}
      />
    </ContentLayout>
  );
}
