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
import { LoanTableProps } from "../../types/loan-types";
import { mockLoansData } from "../../data/loans-mock-data";
import { loansColumnDefinition } from "./LoansColumnDefinition";
import { useRef } from "react";

export function MainLoansTable({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  const { table, isLoading, data } = useDataTable<LoanTableProps>({
    data: mockLoansData,
    columns: loansColumnDefinition,
  });

  const inputRef = useRef<HTMLInputElement>(null);

  if (isLoading) {
    return <TableRowLoadingState dashboard={false} />;
  }

  return (
    <Card className="overflow-hidden border flex-1">
      {/* Table Card Header */}
      <CardHeader>
        <CardTitle className="h4">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
        <TableFilter
          table={table}
          inputRef={inputRef}
          filterColumns={["name", "productType"]} // Pass filterColumns to TableFilter
        />
      </CardHeader>
      <CardContent className="px-0 min-h-[500px] border-t">
        <Table className="table-fixed">
          <TableHeaderComp table={table} />
          <TableBodyComp
            table={table}
            inputRef={inputRef}
            filterColumns={["name", "productType"]}
          />
        </Table>
      </CardContent>
      <CardFooter className="pt-4">
        <TablePagination table={table} totalCount={data.length} />
      </CardFooter>
    </Card>
  );
}
