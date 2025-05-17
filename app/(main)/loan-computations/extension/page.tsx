import React from 'react'
import ExtensionLoanCalculator from '@/features/loan-calculators/components/extension/ExtensionLoanCalculator'
import { ContentLayout } from '@/components/admin-panel/content-layout'
import BreadcrumbPages from '@/components/BreadcrumbPages'

export default function Extension() {
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
