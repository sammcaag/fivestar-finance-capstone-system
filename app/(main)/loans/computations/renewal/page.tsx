"use client";
import RegularLoanCalculator from "@/features/loans/computations/components/RegularLoanCalculator";
import { ContentLayout } from "@/components/staff-panel/content-layout";
import BreadcrumbPages from "@/components/BreadcrumbPages";
import { useEffect } from "react";

export default function Renewal() {
  useEffect(() => {
    document.title = "Renewal Computation - Stella | Five Star Finance Inc.";
  }, []);

  return (
    <ContentLayout title="Renewal Computation">
      <BreadcrumbPages
        links={[
          { href: "/", label: "Home" },
          { href: "/loan-computations/renewal", label: "Loan Computations" },
          { href: "/loan-computations", label: "Renewal" },
        ]}
      />
      <RegularLoanCalculator clientType="Renewal" />
    </ContentLayout>
  );
}
