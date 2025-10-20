"use client";

import BreadcrumbPages from "@/components/BreadcrumbPages";
import MainHeader from "@/components/MainHeader";
import { ContentLayout } from "@/components/staff-panel/content-layout";
import { MainActivityLogsTable } from "@/features/activity-logs/components/tables/MainActivityLogsTable";

export default function ActivityLogsPage() {
  return (
    <ContentLayout title="Activity and Audit Logs">
      <BreadcrumbPages
        links={[
          { href: "/", label: "Home" },
          { href: "/activity-logs", label: "Activity and Audit Logs" },
        ]}
      />
      {/* Header */}
      <MainHeader
        title="Activity and Audit Logs"
        description="Review a complete record of admin activities for accountability and transparency. Track who made changes, when, and to which records."
      />
      <MainActivityLogsTable />
    </ContentLayout>
  );
}
