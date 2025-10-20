"use client";
import React from "react";
import ExtensionLoanCalculator from "@/features/loans/computations/components/ExtensionLoanCalculator";
import { ContentLayout } from "@/components/staff-panel/content-layout";
import BreadcrumbPages from "@/components/BreadcrumbPages";
import { useEffect } from "react";

export default function Extension() {
  useEffect(() => {
    document.title = "Extension Computation - Stella | Five Star Finance Inc.";
  }, []);

  return (
    <ContentLayout title="Extension Computation">
      <BreadcrumbPages
        links={[
          { href: "/", label: "Home" },
          { href: "/loan-computations/extension", label: "Loan Computations" },
          { href: "/loan-computations", label: "Extension" },
        ]}
      />
      <ExtensionLoanCalculator />
    </ContentLayout>
  );
}
