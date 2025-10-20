import React from "react";
import { ContentLayout } from "@/components/staff-panel/content-layout";
import BreadcrumbPages from "@/components/BreadcrumbPages";
import MainHeader from "@/components/MainHeader";

export default function Settings() {
  return (
    <ContentLayout title="Settings ">
      <BreadcrumbPages
        links={[
          { href: "/", label: "Home" },
          { href: "/settings", label: "Settings" },
        ]}
      />
      <MainHeader
        title="Settings"
        description="Update your branch details, manage notification preferences, and customize your account settings."
      />
      <div>Stats go here</div>
      <div>Tabs Go here</div>
      <div>Tables go here</div>
    </ContentLayout>
  );
}
