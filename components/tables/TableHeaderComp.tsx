import React from "react";
import { TableHeader, TableRow, TableHead } from "@/components/ui/table";
import { flexRender, Table } from "@tanstack/react-table";
import { cn } from "@/lib/utils";

export default function TableHeaderComp<TData>({
  table,
}: {
  table: Table<TData>;
}) {
  return (
    <TableHeader className="">
      {table.getHeaderGroups().map((headerGroup) => (
        <TableRow key={headerGroup.id}>
          {headerGroup.headers.map((header, index) => {
            return (
              <TableHead
                key={header.id}
                className={cn(
                  "whitespace-nowrap",
                  (index === 0 || index === -1) && "px-4"
                )}
              >
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
              </TableHead>
            );
          })}
        </TableRow>
      ))}
    </TableHeader>
  );
}
