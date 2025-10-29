"use client";
import { Table } from "@/components/ui/table";
import TablePagination from "@/components/tables/TablePagination";
import TableHeaderComp from "@/components/tables/TableHeaderComp";
import TableBodyComp from "@/components/tables/TableBodyComp";
import { useDataTable } from "@/hooks/use-data-table";
import { clientTableData } from "@/features/clients/data/client-mock";
import { clientsColumnDefinition } from "@/features/clients/components/tables/ClientsTableDefinition";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import TableRowLoadingState from "@/components/tables/TableRowLoadingState";
import { Client } from "@/features/clients/types/client-types";
import { TableFilter } from "@/components/tables/TableFilter";
import { Loan } from "../../types/loan-types";
import { loansData } from "../../data/loans-mock-data";
import { loansColumnDefinition } from "./LoansColumnDefinition";

export function MainLoansTable({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  const { table, isLoading, data } = useDataTable<Loan>({
    data: loansData,
    columns: loansColumnDefinition,
  });

  if (isLoading) {
    return <TableRowLoadingState dashboard={false} />;
  }
  return (
    <Card className="overflow-hidden border flex-1">
      {/* Table Card Header */}
      <CardHeader>
        <CardTitle className="h4">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
        <TableFilter />
      </CardHeader>
      <CardContent className="px-0  border-t">
        <Table className="table-fixed">
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
