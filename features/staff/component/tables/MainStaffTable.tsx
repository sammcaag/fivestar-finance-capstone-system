"use client";
import { Table } from "@/components/ui/table";
import TablePagination from "@/components/tables/TablePagination";
import TableHeaderComp from "@/components/tables/TableHeaderComp";
import TableBodyComp from "@/components/tables/TableBodyComp";
import { useDataTable } from "@/hooks/use-data-table";
import { staffColumnDefinition } from "@/features/staff/component/tables/StaffColumnDefinition";
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
import { StaffTableProps } from "../../types/staff-types";
import { mockStaffData } from "../../data/mock-staff-data"; // Updated import
import { useRef } from "react";

export function MainStaffTable({
  title = "Staff Management",
  description = "Manage branch staff accounts, roles, and permissions.",
}: {
  title?: string;
  description?: string;
}) {
  const { table, isLoading, data } = useDataTable<StaffTableProps>({
    data: mockStaffData, // Updated to mockStaffData
    columns: staffColumnDefinition(),
    initialSort: [{ id: "role", desc: false }],
  });

  const inputRef = useRef<HTMLInputElement>(null);

  if (isLoading) {
    return <TableRowLoadingState dashboard={false} />;
  }

  return (
    <Card className="overflow-hidden border flex-1">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="h4">{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </div>
          <TableFilter
            table={table}
            inputRef={inputRef}
            filterColumns={["name", "role", "status", "branch"]} // Added branch
          />
        </div>
      </CardHeader>
      <CardContent className="px-0 min-h-[500px] border-t">
        <Table className="table-fixed">
          <TableHeaderComp table={table} />
          <TableBodyComp
            table={table}
            inputRef={inputRef}
            filterColumns={["name", "role", "status", "branch"]} // Added branch
            emptyActionLabel="No Staff Available"
            emptyOnAction={() => {}}
            emptyTitle="No Staff Found"
            emptyDescription="There are no staff members recorded yet. Add staff to see them here."
          />
        </Table>
      </CardContent>
      <CardFooter className="pt-4">
        <TablePagination table={table} totalCount={data.length} />
      </CardFooter>
    </Card>
  );
}
