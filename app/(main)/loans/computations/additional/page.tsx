"use client";


import React from "react";
import { ContentLayout } from "@/components/staff-panel/content-layout";
import BreadcrumbPages from "@/components/BreadcrumbPages";
import RegularLoanCalculator from "@/features/loans/computations/components/regular/RegularLoanCalculator";

export default function Additional() {
  return (
    <ContentLayout title="Additional Computation">
      <BreadcrumbPages
        links={[
          { href: "/", label: "Home" },
          { href: "/loan-computations/additional", label: "Loan Computations" },
          { href: "", label: "Additional" },
        ]}
      />
      <RegularLoanCalculator clientType="Additional" />
    </ContentLayout>
  );
}
