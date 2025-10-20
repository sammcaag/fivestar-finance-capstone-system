"use client";
import { Table } from "@/components/ui/table";
import { Client } from "../types/types-clients";
import { useClientTable } from "../hooks/use-client-table";
import TablePagination from "@/components/tables/TablePagination";
import TableHeaderComp from "@/components/tables/TableHeaderComp";
import TableBodyComp from "@/components/tables/TableBodyComp";
import TableLayout from "@/components/tables/TableLayout";

export function ClientsTable({
  filterStatus,
  dashboard = false,
  title,
  description,
}: {
  filterStatus?: Client["status"];
  dashboard?: boolean;
  title: string;
  description: string;
}) {
  const { table, isLoading, filteredData } = useClientTable({
    filterStatus,
    dashboard,
  });

  return (
    <TableLayout
      title={title}
      description={description}
      isLoading={isLoading}
      dashboard={dashboard}
    >
      <Table >
        <TableHeaderComp table={table} />
        <TableBodyComp table={table} />

        {!dashboard && (
          <TablePagination table={table} filteredData={filteredData} />
        )}
      </Table>
    </TableLayout>
  );
}
