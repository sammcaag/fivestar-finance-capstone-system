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
import { useRef, useState } from "react";
import { ColumnDef, SortingState } from "@tanstack/react-table";
import { TableData } from "@/types/global-types";

interface MainTableProps<TData extends TableData> {
  title: string;
  description: string;
  data: TData[];
  columns: ColumnDef<TData>[];
  filterColumns: string[];
  initialSort?: SortingState;
  emptyActionLabel?: string;
  emptyOnAction?: () => void;
  emptyTitle?: string;
  emptyDescription?: string;
  dashboard?: boolean; // Add dashboard prop
}

export function MainTableComp<TData extends TableData>({
  title,
  description,
  data,
  columns,
  filterColumns,
  initialSort,
  emptyActionLabel,
  emptyOnAction,
  emptyTitle,
  emptyDescription,
}: MainTableProps<TData>) {
  const { table, isLoading } = useDataTable<TData>({
    data,
    columns,
    filterColumns,
    initialSort,
  });

  const inputRef = useRef<HTMLInputElement>(null);
  const [hoverColumn, setHoverColumn] = useState<string | null>(null);

  if (isLoading) {
    return <TableRowLoadingState columns={columns} />;
  }

  return (
    <Card className="overflow-hidden border flex-1">
      <CardHeader>
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-2">
            <CardTitle className="h4">{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </div>
          <TableFilter
            table={table}
            inputRef={inputRef}
            filterColumns={filterColumns}
          />
        </div>
      </CardHeader>
      <CardContent className="px-0 min-h-[500px] border-t">
        <Table className="table-fixed">
          <TableHeaderComp
            table={table}
            hoverColumn={hoverColumn}
            setHoverColumn={setHoverColumn}
          />
          <TableBodyComp
            table={table}
            inputRef={inputRef}
            filterColumns={filterColumns}
            emptyActionLabel={emptyActionLabel}
            emptyOnAction={emptyOnAction}
            emptyTitle={emptyTitle}
            emptyDescription={emptyDescription}
            hoverColumn={hoverColumn}
          />
        </Table>
      </CardContent>
      <CardFooter className="pt-4">
        <TablePagination table={table} totalCount={data.length} />
      </CardFooter>
    </Card>
  );
}
