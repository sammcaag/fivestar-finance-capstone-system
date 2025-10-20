import React from "react";
import { TableHeader, TableRow, TableHead } from "@/components/ui/table";
import { flexRender, Table } from "@tanstack/react-table";

export default function TableHeaderComp<TData>({
  table,
}: {
  table: Table<TData>;
}) {
  return (
    <TableHeader>
      {table.getHeaderGroups().map((headerGroup) => (
        <TableRow key={headerGroup.id}>
          {headerGroup.headers.map((header) => {
            return (
              <TableHead key={header.id} className="whitespace-nowrap">
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
