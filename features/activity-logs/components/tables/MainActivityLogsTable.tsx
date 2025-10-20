"use client";
import { Table } from "@/components/ui/table";
import TablePagination from "@/components/tables/TablePagination";
import TableHeaderComp from "@/components/tables/TableHeaderComp";
import TableBodyComp from "@/components/tables/TableBodyComp";
import { useDataTable } from "@/hooks/use-data-table";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import TableRowLoadingState from "@/components/tables/TableRowLoadingState";
import { mockAuditLogs } from "@/features/activity-logs/data/mock-data";
import { ActivityLog } from "@/features/activity-logs/types/audit-types";

import { activityLogsColumnDefinition } from "./ActivityLogsColumnDefinition";

export function MainActivityLogsTable() {
  const { table, isLoading, data } = useDataTable<ActivityLog>({
    data: mockAuditLogs,
    columns: activityLogsColumnDefinition(),
  });

  if (isLoading) {
    return <TableRowLoadingState dashboard={false} />;
  }
  return (
    <Card className="overflow-hidden border flex-1">
      {/* Table Card Header */}
      <CardContent className="px-0 min-h-[700px]">
        <Table>
          <TableHeaderComp table={table} />
          <TableBodyComp table={table} />
        </Table>
      </CardContent>
      <CardFooter className="pt-4">
        <TablePagination table={table} totalCount={data.length} />
      </CardFooter>
    </Card>
  );
}
