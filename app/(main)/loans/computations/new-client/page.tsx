"use client";
import RegularLoanCalculator from "@/features/loans/computations/components/RegularLoanCalculator";
import { ContentLayout } from "@/components/staff-panel/content-layout";
import BreadcrumbPages from "@/components/BreadcrumbPages";
import { useEffect } from "react";

export default function NewClient() {
  useEffect(() => {
    document.title = "New Client Computation | Stella - Five Star Finance Inc.";
  }, []);

  return (
    <ContentLayout title="New Client Computation">
      <BreadcrumbPages
        links={[
          { href: "/", label: "Home" },
          { href: "/loan-computations/new-client", label: "Loan Computations" },
          { href: "/loan-computations", label: "New Client" },
        ]}
      />
      <RegularLoanCalculator clientType="New Client" />
    </ContentLayout>
  );
}
