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
}: TableBodyCompProps<TData>) {
  // Check if any filter is applied across filterColumns
  const isFiltered = filterColumns.some(
    (col) => !!table.getColumn(col)?.getFilterValue()
  );
  const searchValue = isFiltered
    ? filterColumns
        .map((col) => table.getColumn(col)?.getFilterValue() as string)
        .find((val) => val) || ""
    : "";

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
                  : "bg-gray-100" // Fallback if neither dedCode nor status
              )}
              data-state={row.getIsSelected() && "selected"}
            >
              {row.getVisibleCells().map((cell) => (
                <motion.td
                  key={cell.id}
                  className="p-4 align-middle"
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
