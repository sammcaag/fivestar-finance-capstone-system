"use client";
import { Table } from "@/components/ui/table";
import TablePagination from "@/components/tables/TablePagination";
import TableHeaderComp from "@/components/tables/TableHeaderComp";
import TableBodyComp from "@/components/tables/TableBodyComp";
import { useDataTable } from "@/hooks/use-data-table";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import TableRowLoadingState from "@/components/tables/TableRowLoadingState";
import { TableFilter } from "@/components/tables/TableFilter";
import { ActivityLog } from "../../types/audit-types";
import { activityLogsColumnDefinition } from "./ActivityLogsColumnDefinition";
import { useRef } from "react";
import { activityLogs } from "../../data/mock-activity-data";

export function MainActivityLogsTable({
  title = "Activity and Audit Logs",
  description = "Review a complete record of admin activities for accountability and transparency.",
}: {
  title?: string;
  description?: string;
}) {
  const {
    table,
    isLoading,
    data,
    selectedStatuses,
    handleStatusChange,
    uniqueStatusValues,
  } = useDataTable<ActivityLog>({
    data: activityLogs,
    columns: activityLogsColumnDefinition(),
    initialSort: [{ id: "timestamp", desc: true }],
  });

  const inputRef = useRef<HTMLInputElement>(null);

  if (isLoading) {
    return <TableRowLoadingState dashboard={false} />;
  }

  return (
    <Card className="overflow-hidden border flex-1">
      <CardHeader>
        <CardTitle className="h4">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
        <TableFilter
          table={table}
          inputRef={inputRef}
          selectedStatuses={selectedStatuses}
          handleStatusChange={handleStatusChange}
          uniqueStatusValues={uniqueStatusValues}
        />
      </CardHeader>
      <CardContent className="px-0 min-h-[500px] border-t">
        <Table className="table-fixed">
          <TableHeaderComp table={table} />
          <TableBodyComp
            table={table}
            inputRef={inputRef}
            emptyActionLabel="No Actions Available"
            emptyOnAction={() => {}}
            emptyTitle="No Activity Logs Found"
            emptyDescription="There are no activity logs recorded yet. Activities will appear here once actions are performed."
          />
        </Table>
      </CardContent>
      <CardFooter className="pt-4">
        <TablePagination table={table} totalCount={data.length} />
      </CardFooter>
    </Card>
  );
}
