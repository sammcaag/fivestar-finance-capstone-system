"use client";

import TableBodyComp from "@/components/tables/TableBodyComp";
import { TableFilter } from "@/components/tables/TableFilter";
import TableHeaderComp from "@/components/tables/TableHeaderComp";
import TablePagination from "@/components/tables/TablePagination";
import TableRowLoadingState from "@/components/tables/TableRowLoadingState";
import { Table } from "@/components/ui/table";
import { useDataTable } from "@/hooks/use-data-table";
import { TableData } from "@/types/global-types";
import { ColumnDef, SortingState } from "@tanstack/react-table";
import { useRef, useState } from "react";

interface TableOnlyProps<TData extends TableData> {
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
  customHeaderRight?: React.ReactNode;
  onRowDoubleClick?: (data: TData) => void;
  isLoading?: boolean;
}

export function TableOnlyComp<TData extends TableData>({
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
  customHeaderRight,
  onRowDoubleClick,
  isLoading: externalIsLoading,
}: TableOnlyProps<TData>) {
  const { table, isLoading: hookIsLoading } = useDataTable<TData>({
    data,
    columns,
    filterColumns,
    initialSort,
  });

  const inputRef = useRef<HTMLInputElement>(null);
  const [hoverColumn, setHoverColumn] = useState<string | null>(null);

  const isLoading = externalIsLoading ?? hookIsLoading;

  if (isLoading) {
    return <TableRowLoadingState columns={columns} />;
  }

  return (
    <div className="overflow-hidden border rounded-lg flex-1">
      <div className="p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-2">
            <h3 className="h4">{title}</h3>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>
          {customHeaderRight ?? (
            <TableFilter table={table} inputRef={inputRef} filterColumns={filterColumns} />
          )}
        </div>
      </div>
      <div className="px-0 min-h-[500px] border-t">
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
            onRowDoubleClick={onRowDoubleClick}
          />
        </Table>
      </div>
      <div className="p-6 pt-4">
        <TablePagination table={table} totalCount={data.length} />
      </div>
    </div>
  );
}
