"use client";

import React, { useEffect } from "react";
import { useParams } from "next/navigation";
import { ContentLayout } from "@/components/staff-panel/content-layout";
import BreadcrumbPages from "@/components/BreadcrumbPages";
import RegularLoanCalculator from "@/features/loans/computations/components/RegularLoanCalculator";
import ExtensionLoanCalculator from "@/features/loans/computations/components/ExtensionLoanCalculator";
import { hyphenToTitle } from "@/utils/hyphen-to-title";
import NotFoundPage from "@/components/NotFoundPage";

export default function LoanComputationPage() {
  const params = useParams();
  const productType = params.productType;

  const clientTypeMap = {
    "new-client": "New Client",
    renewal: "Renewal",
    reloan: "Reloan",
    additional: "Additional",
  } as const;

  const type = hyphenToTitle(String(productType));

  useEffect(() => {
    document.title = `${type} Computation | Stella - Five Star Finance Inc.`;
  }, [type]);

  return (
    <ContentLayout title={`${type} Computation`}>
      <BreadcrumbPages
        links={[
          { href: "/", label: "Home" },
          {
            href: `/loan-computations/${productType}`,
            label: "Loan Computations",
          },
          { href: "", label: `${type}` },
        ]}
      />

      {productType === "extension" ? (
        <ExtensionLoanCalculator />
      ) : Object.keys(clientTypeMap).includes(String(productType)) ? (
        <RegularLoanCalculator
          clientType={clientTypeMap[productType as keyof typeof clientTypeMap]}
        />
      ) : (
        <NotFoundPage title={`${type} Computation`} />
      )}
    </ContentLayout>
  );
}
