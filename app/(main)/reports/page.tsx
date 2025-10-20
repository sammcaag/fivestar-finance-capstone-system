import React from "react";
import { ContentLayout } from "@/components/staff-panel/content-layout";
import BreadcrumbPages from "@/components/BreadcrumbPages";
import MainHeader from "@/components/MainHeader";

export default function Reports() {
  return (
    <ContentLayout title="Reports & Analytics">
      <BreadcrumbPages
        links={[
          { href: "/dashboard", label: "Home" },
          { href: "/reports", label: "Reports & Analytics" },
        ]}
      />
      <MainHeader
        title="Reports and Analytics"
        description="Generate detailed summaries of loan activities by branch, type, or status. Gain insights through monthly analytics and exportable reports."
      />
      <div>Stats go here</div>
      <div>Tabs Go here</div>
      <div>Tables go here</div>
    </ContentLayout>
  );
}
