"use client";
import { Table } from "@/components/ui/table";
import { Client } from "../types/types-clients";
import TableRowLoadingState from "@/components/tables/TableRowLoadingState";
import { useClientTable } from "../hooks/use-client-table";
import { Card } from "@/components/ui/card";
import TablePagination from "@/components/tables/TablePagination";
import TableHeaderComp from "@/components/tables/TableHeaderComp";
import TableBodyComp from "@/components/tables/TableBodyComp";

export function ClientsTable({
  filterStatus,
  dashboard = false,
}: {
  filterStatus?: Client["status"];
  dashboard?: boolean;
}) {
  const { table, isLoading, filteredData } = useClientTable({
    filterStatus,
    dashboard,
  });

  if (isLoading) {
    return <TableRowLoadingState dashboard={dashboard} />;
  }

  return (
    <div className="w-full">
      <Card className="border overflow-hidden">
        <Table className="">
          <TableHeaderComp table={table} />
          <TableBodyComp table={table} />
        </Table>
      </Card>

      {!dashboard && (
        <TablePagination table={table} filteredData={filteredData} />
      )}
    </div>
  );
}
