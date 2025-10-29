"use client";
import { Table } from "@/components/ui/table";
import TableHeaderComp from "@/components/tables/TableHeaderComp";
import TableBodyComp from "@/components/tables/TableBodyComp";
import { useDataTable } from "@/hooks/use-data-table";
import TableRowLoadingState from "@/components/tables/TableRowLoadingState";
import { loanHistory } from "../../data/loans-mock-data";
import { LoanRecord } from "../../types/loan-types";
import { loansColumnDefinition } from "../tables/LoansHistoryColumnDefinition";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ClipboardList } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export function MainLoansHistoryTable() {
  const { table, isLoading, data } = useDataTable<LoanRecord>({
    data: [],
    columns: loansColumnDefinition,
  });

  if (isLoading) {
    return <TableRowLoadingState dashboard={false} />;
  }
  return (
    <Card className="border">
      <CardHeader className="flex gap-4 flex-row items-center">
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
          <ClipboardList className="h-5 w-5" />
        </span>
        <div>
          <CardTitle className="text-xl">Loan History</CardTitle>
          <CardDescription>
            View and verify the client&apos;s loan history.
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="px-0 pb-0">
        <Table className="border-t">
          <TableHeaderComp table={table} />
          <TableBodyComp table={table} />
        </Table>
      </CardContent>
    </Card>
  );
}
