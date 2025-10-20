"use client";
import { Table } from "@/components/ui/table";
import TablePagination from "@/components/tables/TablePagination";
import TableHeaderComp from "@/components/tables/TableHeaderComp";
import TableBodyComp from "@/components/tables/TableBodyComp";
import { useDataTable } from "@/hooks/use-data-table";
import { staffColumnDefinition } from "@/features/staff/component/tables/StaffColumnDefinition";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import TableRowLoadingState from "@/components/tables/TableRowLoadingState";
import { mockStaff } from "../../data/mock-data";
import { Staff } from "../../types/staff-types";

export function MainStaffTable() {
  const { table, isLoading, data } = useDataTable<Staff>({
    data: mockStaff,
    columns: staffColumnDefinition(),
  });

  if (isLoading) {
    return <TableRowLoadingState dashboard={false} />;
  }
  return (
    <Card className="overflow-hidden border flex-1">
      {/* Table Card Header */}
      {/* <CardHeader>
        <CardTitle className="h4">Staff Management</CardTitle>
        <CardDescription>
          Manage branch staff accounts, roles, and permissions. Add new team
          members, update information, or deactivate users when needed.
        </CardDescription>
        <TableFilter />
      </CardHeader> */}
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
