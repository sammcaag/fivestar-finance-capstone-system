import React from "react";
import { ContentLayout } from "@/components/staff-panel/content-layout";
import BreadcrumbPages from "@/components/BreadcrumbPages";
import MainHeader from "@/components/MainHeader";

export default function Loans() {
  return (
    <ContentLayout title="All Loans">
      <BreadcrumbPages
        links={[
          { href: "/dashboard", label: "Home" },
          { href: "/loans", label: "Loans" },
        ]}
      />
      <MainHeader
        title="All Loans"
        description="Oversee and manage all active, pending, and completed loan records within your branch."
      />
      <div>Stats go here</div>
      <div>Tabs Go here</div>
      <div>Tables go here</div>
    </ContentLayout>
  );
}
