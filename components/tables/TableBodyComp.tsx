import React from "react";
import { TableBody } from "../ui/table";
import { AnimatePresence, motion } from "framer-motion";
import { flexRender, Table, Row } from "@tanstack/react-table";
import { getStatusRowClass } from "@/utils/get-status-row-class";
import { getFiRowColors } from "@/features/loans/utils/get-fi-row-colors";
import clsx from "clsx";
import EmptyTableState from "./EmptyTableState";
import { EmptyStateProps } from "@/types/global-types";
import EmptySearchTableState from "./EmptySearchTableState";

interface TableData {
  status?: string | undefined;
  action?: string | undefined;
  dedCode?: string | undefined;
}

interface TableBodyCompProps<TData extends TableData> extends EmptyStateProps {
  table: Table<TData>;
  searchQuery?: string;
  onClearSearch?: () => void;
  inputRef?: React.RefObject<HTMLInputElement | null>;
  filterColumns?: string[];
  hoverColumn?: string | null;
}

// Type guard for status
const hasStatus = <TData extends TableData>(
  data: TData
): data is TData & { status: string } => {
  return typeof data.status === "string";
};

export default function TableBodyComp<TData extends TableData>({
  table,
  emptyTitle,
  emptyDescription,
  emptyActionLabel,
  emptyOnAction,
  emptySecondaryActionLabel,
  emptyOnSecondaryAction,
  inputRef,
  filterColumns = [],
  hoverColumn,
}: TableBodyCompProps<TData>) {
  // Get all active column filters
  const columnFilters = table.getState().columnFilters;
  const activeColumnFilters = columnFilters.filter((f) => {
    const v = f.value;
    return (
      v != null &&
      (typeof v === "string"
        ? v !== ""
        : Array.isArray(v)
        ? v.length > 0
        : false)
    );
  });

  const isFiltered = activeColumnFilters.length > 0;

  let searchValue = "";
  if (isFiltered) {
    // Check if it's a global search (same string value across filterColumns)
    const allGlobalSearch = activeColumnFilters.every(
      (f) => filterColumns.includes(f.id) && typeof f.value === "string"
    );
    const valuesSet = new Set(
      activeColumnFilters.map((f) => f.value as string)
    );
    if (allGlobalSearch && valuesSet.size === 1) {
      searchValue = activeColumnFilters[0].value as string;
    } else {
      // Per-column or mixed filters: summarize with column names and OR within column
      searchValue = activeColumnFilters
        .map((f) => {
          const header =
            (table.getColumn(f.id)?.columnDef.header as string) || f.id;
          const val = Array.isArray(f.value)
            ? f.value.join(" or ")
            : (f.value as string);
          return `${header} (${val})`;
        })
        .join(" and ");
    }
  }

  // Type guard for dedCode
  const hasDedCode = (data: TData): data is TData & { dedCode: string } => {
    return typeof data.dedCode === "string";
  };

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
                  ? getFiRowColors(row as Row<{ dedCode: string }>) // Safer cast
                  : hasStatus(row.original)
                  ? getStatusRowClass(row as Row<{ status: string }>) // Use type guard
                  : "hover:bg-primary/20" // Fallback if neither dedCode nor status
              )}
              data-state={row.getIsSelected() && "selected"}
            >
              {row.getVisibleCells().map((cell) => (
                <motion.td
                  key={cell.id}
                  className={clsx(
                    "p-4 align-middle",
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
            <motion.td
              colSpan={table.getAllColumns().length}
              className="h-96 text-center"
            >
              <EmptySearchTableState
                searchQuery={searchValue}
                onClearSearch={() => {
                  filterColumns.forEach((col) => {
                    const column = table.getColumn(col);
                    if (column) {
                      column.setFilterValue("");
                    }
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
            <motion.td
              colSpan={table.getAllColumns().length}
              className="h-96 text-center"
            >
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
