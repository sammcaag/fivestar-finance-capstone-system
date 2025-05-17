import React from "react";
import { BounceLoader } from "react-spinners";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import BreadcrumbPages from "@/components/BreadcrumbPages";

export default function loading() {
  return (
    <ContentLayout title="Additional Computation">
      <BreadcrumbPages
        links={[
          { href: "/", label: "Home" },
          { href: "/loan-computations", label: "Loan Computations" },
          { href: "/loan-computations/additional", label: "Additional" },
        ]}
      />
      <BounceLoader />
    </ContentLayout>
  );
}
