"use client"
import RegularLoanCalculator from "@/features/loan-calculators/components/regular/RegularLoanCalculator";
import React, { useState, useEffect } from "react";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import BreadcrumbPages from "@/components/BreadcrumbPages";

export default function Additional() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => setLoading(false), 5000);
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
