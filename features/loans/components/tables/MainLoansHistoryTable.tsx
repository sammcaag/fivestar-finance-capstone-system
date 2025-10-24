"use client";
import { Table } from "@/components/ui/table";
import TableHeaderComp from "@/components/tables/TableHeaderComp";
import TableBodyComp from "@/components/tables/TableBodyComp";
import { useDataTable } from "@/hooks/use-data-table";
import { clientTableData } from "@/features/clients/data/client-mock";
import { clientsColumnDefinition } from "@/features/clients/components/tables/ClientsTableDefinition";
import TableRowLoadingState from "@/components/tables/TableRowLoadingState";
import { Client } from "@/features/clients/types/types-clients";

export function MainLoansHistoryTable() {
  const { table, isLoading, data } = useDataTable<Client>({
    data: clientTableData,
    columns: clientsColumnDefinition(false),
  });

  if (isLoading) {
    return <TableRowLoadingState dashboard={false} />;
  }
  return (
    <Table>
      <TableHeaderComp table={table} />
      <TableBodyComp table={table} />
    </Table>
  );
}
