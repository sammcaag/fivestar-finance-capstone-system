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
import { Client } from "../../types/client-types";
import { clientTableData } from "../../data/client-mock";
import { clientsColumnDefinition } from "./ClientsTableDefinition";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export default function MainDashboardTable({
  title,
  description,
  href,
}: {
  title: string;
  description: string;
  href?: string;
}) {
  const { table, isLoading } = useDataTable<Client>({
    data: clientTableData,
    columns: clientsColumnDefinition(true),
  });
  if (isLoading) {
    return <TableRowLoadingState dashboard={true} />;
  }
  return (
    <Card className="overflow-hidden border flex-1">
      {/* Table Card Header */}
      <CardHeader className="flex-row items-center justify-between bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-950/40 dark:to-cyan-950/40">
        <div className="space-y-2">
          <CardTitle className="h4">{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </div>
        {href && (
          <Button
            variant="outline"
            icon={ChevronRight}
            iconPlacement="right"
            effect="expandIcon"
          >
            <Link href={href}>View All</Link>
          </Button>
        )}
      </CardHeader>

      {/* Table Card Content */}
      <CardContent className="p-0 border-t">
        <Table>
          <TableHeaderComp table={table} />
          <TableBodyComp table={table} />
        </Table>
      </CardContent>
    </Card>
  );
}
