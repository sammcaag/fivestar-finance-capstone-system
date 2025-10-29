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
import { Appointment } from "../types/appointment-types";
import { appointmentsData } from "../data/appointments-mock-data";
import { appointmentsColumnDefinition } from "./LoanAppointmentsColumnDefinition";
import { useRef } from "react";

export function MainAppointmentsTable({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  const {
    table,
    isLoading,
    data,
    selectedStatuses,
    handleStatusChange,
    uniqueStatusValues,
  } = useDataTable<Appointment>({
    data: appointmentsData,
    columns: appointmentsColumnDefinition(),
  });

  const inputRef = useRef<HTMLInputElement>(null);

  if (isLoading) {
    return <TableRowLoadingState dashboard={false} />;
  }
  return (
    <Card className="overflow-hidden flex-1 border">
      {/* Table Card Header */}
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
      <CardContent className="px-0  border-t min-h-[500px]">
        <Table className="table-fixed">
          <TableHeaderComp table={table} />
          <TableBodyComp table={table} inputRef={inputRef} />
        </Table>
      </CardContent>
      <CardFooter className="pt-4">
        <TablePagination table={table} totalCount={data.length} />
      </CardFooter>
    </Card>
  );
}
