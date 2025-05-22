"use client";

import RegularLoanCalculator from "@/features/loan-calculators/components/regular/RegularLoanCalculator";
import React from "react";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import BreadcrumbPages from "@/components/BreadcrumbPages";

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
