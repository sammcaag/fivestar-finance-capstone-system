"use client";

import BreadcrumbPages from "@/components/BreadcrumbPages";
import MainHeader from "@/components/MainHeader";
import { ContentLayout } from "@/components/staff-panel/content-layout";
import { MainTableComp } from "@/components/tables/MainTableComp";
import { activityLogsColumnDefinition } from "@/features/activity-logs/components/tables/ActivityLogsColumnDefinition";
import { mockActivityLogsData } from "@/features/activity-logs/data/mock-activity-logs-data";
import { ActivityLog } from "@/features/activity-logs/types/audit-types";
import { useEffect } from "react";

export default function ActivityLogsPage() {
  useEffect(() => {
    document.title =
      "Activity and Audit Logs | Stella - Five Star Finance Inc.";
  }, []);

  return (
    <ContentLayout title="Activity and Audit Logs">
      <BreadcrumbPages
        links={[
          { href: "/", label: "Home" },
          { href: "/activity-logs", label: "Activity and Audit Logs" },
        ]}
      />
      <MainHeader
        title="Activity and Audit Logs"
        description="Review a complete record of admin activities for accountability and transparency. Track who made changes, when, and to which records."
      />
      <MainTableComp<ActivityLog>
        title="Activity and Audit Logs"
        description="Review a complete record of admin activities for accountability and transparency."
        data={mockActivityLogsData}
        columns={activityLogsColumnDefinition}
        filterColumns={["userName", "action", "resource"]}
        initialSort={[{ id: "timestamp", desc: true }]}
        emptyTitle="No Activity Logs Found"
        emptyDescription="There are no activity logs recorded yet. Activities will appear here once actions are performed."
        emptyActionLabel="No Actions Available"
        emptyOnAction={() => {}}
      />
    </ContentLayout>
  );
}
