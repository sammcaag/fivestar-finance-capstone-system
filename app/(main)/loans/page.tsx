"use client";
import { ContentLayout } from "@/components/staff-panel/content-layout";
import BreadcrumbPages from "@/components/BreadcrumbPages";
import MainHeader from "@/components/MainHeader";
import { loansColumnDefinition } from "@/features/loans/components/tables/LoansColumnDefinition";
import { mockLoansData } from "@/features/loans/data/loans-mock-data";
import { LoanTableProps } from "@/features/loans/types/loan-types";
import { useEffect } from "react";
import { Calculator, FilePlus2 } from "lucide-react";
import { MainTableComp } from "@/components/tables/MainTableComp";

const quickActions = [
  {
    label: "Add New Loan for a Client",
    href: "/loans/new",
    icon: FilePlus2,
  },
  {
    label: "New Client Computation",
    href: "/loans/computations/new-client",
    icon: Calculator,
  },
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
        quickActions={quickActions}
      />
      <MainTableComp<LoanTableProps>
        title="Loans Overview"
        description="View and manage all loan records across every status and branch."
        data={mockLoansData}
        columns={loansColumnDefinition}
        filterColumns={["name", "productType"]}
        initialSort={[{ id: "name", desc: false }]}
        emptyActionLabel="No Loans Data"
        emptyOnAction={() => {}}
        emptyTitle="No Loans Data Found"
        emptyDescription="There are no loan records available. Add a loan to get started."
      />
    </ContentLayout>
  );
}
