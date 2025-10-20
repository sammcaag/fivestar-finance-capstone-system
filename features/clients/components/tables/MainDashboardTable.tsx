import React from "react";
import TableRowLoadingState from "@/components/tables/TableRowLoadingState";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import TableHeaderComp from "@/components/tables/TableHeaderComp";
import TableBodyComp from "@/components/tables/TableBodyComp";
import { Table } from "@/components/ui/table";
import { useDataTable } from "@/hooks/use-data-table";
import { Client } from "../../types/types-clients";
import { clientTableData } from "../../data/client-mock";
import { clientsColumnDefinition } from "./ClientsTableDefinition";

export default function MainDashboardTable({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  const { table, isLoading, data } = useDataTable<Client>({
    data: clientTableData,
    columns: clientsColumnDefinition(true),
  });
  if (isLoading) {
    return <TableRowLoadingState dashboard={true} />;
  }
  return (
    <Card className="overflow-hidden flex-1">
      {/* Table Card Header */}
      <CardHeader className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-950/40 dark:to-cyan-950/40">
        <CardTitle className="h4">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>

      {/* Table Card Content */}
      <CardContent className="p-0  border rounded-b-xl">
        <Table>
          <TableHeaderComp table={table} />
          <TableBodyComp table={table} />
        </Table>
      </CardContent>
    </Card>
  );
}
