"use client";
import { Table } from "@/components/ui/table";
import TableHeaderComp from "@/components/tables/TableHeaderComp";
import TableBodyComp from "@/components/tables/TableBodyComp";
import { useDataTable } from "@/hooks/use-data-table";
import TableRowLoadingState from "@/components/tables/TableRowLoadingState";
import { loanHistory } from "../../data/loans-mock-data";
import { LoanHistory } from "../../types/loan-types";
import { loansHistoryColumnDefinition } from "../tables/LoansHistoryColumnDefinition";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ClipboardList, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

export function MainLoansHistoryTable() {
  const { table, isLoading } = useDataTable<LoanHistory>({
    data: loanHistory,
    columns: loansHistoryColumnDefinition,
    initialSort: [
      { id: "dedCode", desc: false },
      { id: "status", desc: false },
    ],
  });

  if (isLoading) {
    return <TableRowLoadingState dashboard={false} />;
  }

  return (
    <Card className="border">
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="flex gap-4 items-center">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
            <ClipboardList className="h-5 w-5" />
          </span>
          <div>
            <CardTitle className="text-xl">Loan History</CardTitle>
            <CardDescription>
              View and verify the client&apos;s loan history.
            </CardDescription>
          </div>
        </div>
        <Button icon={Plus} iconPlacement="left">
          Add Client Loan
        </Button>
      </CardHeader>
      <CardContent className="px-0 pb-0">
        <Table className="w-full border-t">
          <TableHeaderComp table={table} />
          <TableBodyComp
            table={table}
            emptyActionLabel="Add Client Loan"
            emptyOnAction={() => {}}
            emptyTitle="No Client Loan Added Yet."
            emptyDescription="Start by creating your first loan entry. The client's loan history will appear here once you add something."
          />
        </Table>
      </CardContent>
    </Card>
  );
}
