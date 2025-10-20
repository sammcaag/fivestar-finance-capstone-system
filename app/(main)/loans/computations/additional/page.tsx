"use client";

import React from "react";
import { ContentLayout } from "@/components/staff-panel/content-layout";
import BreadcrumbPages from "@/components/BreadcrumbPages";
import RegularLoanCalculator from "@/features/loans/computations/components/RegularLoanCalculator";
import { useEffect } from "react";

export default function Additional() {
  useEffect(() => {
    document.title = "Additional Computation | Stella - Five Star Finance Inc.";
  }, []);

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
