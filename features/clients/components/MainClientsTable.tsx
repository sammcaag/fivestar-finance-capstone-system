"use client";
import { Table } from "@/components/ui/table";
import { Client } from "../types/types-clients";
import TablePagination from "@/components/tables/TablePagination";
import TableHeaderComp from "@/components/tables/TableHeaderComp";
import TableBodyComp from "@/components/tables/TableBodyComp";
import { useDataTable } from "@/hooks/use-data-table";
import { clientTableData } from "../data/client-mock";
import { clientsColumnDefinition } from "./tables/ClientTableDefinition";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ClientsFilter } from "./ClientsFilter";
import TableRowLoadingState from "@/components/tables/TableRowLoadingState";

export function MainClientsTable({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  const { table, isLoading, data } = useDataTable<Client>({
    data: clientTableData,
    columns: clientsColumnDefinition(false),
  });

  if (isLoading) {
    return <TableRowLoadingState dashboard={false} />;
  }
  return (
    <Card className="overflow-hidden flex-1">
      {/* Table Card Header */}
      <CardHeader>
        <CardTitle className="h4">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
        <ClientsFilter />
      </CardHeader>
      <CardContent className="px-0  border-t">
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
