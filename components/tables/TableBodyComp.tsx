"use client";
import React, { useEffect } from "react";
import { TableBody } from "../ui/table";
import { AnimatePresence, motion } from "framer-motion";
import { flexRender, Table, Row } from "@tanstack/react-table";
import { getStatusRowClass } from "@/utils/get-status-row-class";
import { getFiRowColors } from "@/features/loans/utils/get-fi-row-colors";
import clsx from "clsx";
import EmptyTableState from "./EmptyTableState";
import { EmptyStateProps } from "@/types/global-types";
import EmptySearchTableState from "./EmptySearchTableState";
import { TableData } from "@/types/global-types";

export default function TableBodyComp<TData extends TableData>({
  table,
  emptyTitle,
  emptyDescription,
  emptyActionLabel,
  emptyOnAction,
  emptySecondaryActionLabel,
  emptyOnSecondaryAction,
  inputRef,
  hoverColumn,
  onRowDoubleClick,
}: EmptyStateProps & {
  table: Table<TData>;
  inputRef?: React.RefObject<HTMLInputElement | null>;
  filterColumns?: string[];
  hoverColumn?: string | null;
  onRowDoubleClick?: (data: TData) => void;
}) {
  const globalFilter = table.getState().globalFilter as string | undefined;
  const columnFilters = table.getState().columnFilters;
  const activeColumnFilters = columnFilters.filter((f) => {
    const v = f.value;
    return (
      v != null && (typeof v === "string" ? v !== "" : Array.isArray(v) ? v.length > 0 : false)
    );
  });

  const isFiltered = activeColumnFilters.length > 0 || !!globalFilter;

  const parts: string[] = [];
  if (globalFilter) {
    parts.push(`Search: ${globalFilter}`);
  }
  activeColumnFilters.forEach((f) => {
    const header = (table.getColumn(f.id)?.columnDef.header as string) || f.id;
    const val = Array.isArray(f.value) ? f.value.join(" or ") : String(f.value);
    parts.push(`${header} (${val})`);
  });
  const searchValue = parts.join(" and ");

  const hasDedCode = (data: TData): data is TData & { dedCode: string } => {
    return typeof data.dedCode === "string";
  };

  const hasStatus = (data: TData): data is TData & { status: string } => {
    return typeof data.status === "string";
  };

  useEffect(() => {
    console.log(
      "TableBodyComp - rows:",
      table.getRowModel().rows,
      "isFiltered:",
      isFiltered,
      "globalFilter:",
      globalFilter,
      "columnFilters:",
      columnFilters
    );
  }, [table.getRowModel().rows, isFiltered, globalFilter, columnFilters]);

  return (
    <TableBody>
      <AnimatePresence>
        {table.getRowModel().rows?.length ? (
          table.getRowModel().rows.map((row: Row<TData>, i) => (
            <motion.tr
              key={row.id}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{
                duration: 0.2,
                delay: i * 0.05,
                ease: "easeOut",
              }}
              className={clsx(
                "border-b transition-colors",
                hasDedCode(row.original)
                  ? getFiRowColors(row as Row<{ dedCode: string }>)
                  : hasStatus(row.original)
                    ? getStatusRowClass(row as Row<{ status: string }>)
                    : "hover:bg-primary/20"
              )}
              data-state={row.getIsSelected() && "selected"}
              onDoubleClick={() => onRowDoubleClick?.(row.original)}
            >
              {row.getVisibleCells().map((cell) => (
                <motion.td
                  key={cell.id}
                  className={clsx(
                    "p-4 align-middle cursor-pointer",
                    cell.column.id === hoverColumn && "bg-primary/10"
                  )}
                  style={{ width: `${cell.column.getSize()}px` }}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </motion.td>
              ))}
            </motion.tr>
          ))
        ) : isFiltered ? (
          <motion.tr>
            <motion.td colSpan={table.getAllColumns().length} className="h-96 text-center">
              <EmptySearchTableState
                searchQuery={searchValue}
                onClearSearch={() => {
                  table.setGlobalFilter("");
                  table.getAllColumns().forEach((column) => {
                    column.setFilterValue(undefined);
                  });
                  if (inputRef?.current) {
                    inputRef.current.focus();
                  }
                }}
              />
            </motion.td>
          </motion.tr>
        ) : (
          <motion.tr>
            <motion.td colSpan={table.getAllColumns().length} className="h-96 text-center">
              <EmptyTableState
                emptyTitle={emptyTitle}
                emptyDescription={emptyDescription}
                emptyActionLabel={emptyActionLabel}
                emptyOnAction={emptyOnAction}
                emptySecondaryActionLabel={emptySecondaryActionLabel}
                emptyOnSecondaryAction={emptyOnSecondaryAction}
              />
            </motion.td>
          </motion.tr>
        )}
      </AnimatePresence>
    </TableBody>
  );
}
