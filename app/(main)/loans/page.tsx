"use client";
import { ContentLayout } from "@/components/staff-panel/content-layout";
import BreadcrumbPages from "@/components/BreadcrumbPages";
import MainHeader from "@/components/MainHeader";
import { MainLoansTable } from "@/features/loans/components/tables/MainLoansTable";
import { useEffect } from "react";
import { Calculator, FilePlus2 } from "lucide-react";

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

      <MainLoansTable
        title="Loans Overview"
        description="View and manage all loan records across every status and branch."
      />
    </ContentLayout>
  );
}
