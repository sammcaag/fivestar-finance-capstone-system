import React from "react";
import RegularLoanCalculator from "@/features/loans/computations/components/RegularLoanCalculator";
import { ContentLayout } from "@/components/staff-panel/content-layout";
import BreadcrumbPages from "@/components/BreadcrumbPages";

export default function Reloan() {
  return (
    <ContentLayout title="Reloan Computation">
      <BreadcrumbPages
        links={[
          { href: "/", label: "Home" },
          { href: "/loan-computations/reloan", label: "Loan Computations" },
          { href: "/loan-computations", label: "Reloan" },
        ]}
      />
      <RegularLoanCalculator clientType="Reloan" />
    </ContentLayout>
  );
}
