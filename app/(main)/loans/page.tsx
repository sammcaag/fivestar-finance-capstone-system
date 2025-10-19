import React from "react";
import { ContentLayout } from "@/components/staff-panel/content-layout";
import BreadcrumbPages from "@/components/BreadcrumbPages";

export default function Loans() {
  return (
    <ContentLayout title="All Loans">
      <BreadcrumbPages
        links={[
          { href: "/dashboard", label: "Home" },
          { href: "/loans", label: "Loans" },
        ]}
      />
      Loans Section
    </ContentLayout>
  );
}
