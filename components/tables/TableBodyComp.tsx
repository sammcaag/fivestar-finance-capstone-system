import React from "react";
import { TableBody } from "../ui/table";
import { AnimatePresence, motion } from "framer-motion";
import { flexRender, Table, Row } from "@tanstack/react-table";
import { getStatusRowClass } from "@/utils/get-status-row-class";
import clsx from "clsx";
import EmptyTableState from "./EmptyTableState";
import { EmptyStateProps } from "@/types/global-types";
import EmptySearchTableState from "./EmptySearchTableState";
import { fiRowColors } from "@/features/loans/utils/fi-row-colors";
import { LoanHistory } from "@/features/loans/types/loan-types";

// Fixed: Use LoanHistory as the constraint for TData
interface TableBodyCompProps<TData extends LoanHistory>
  extends EmptyStateProps {
  table: Table<TData>;
  searchQuery?: string;
  onClearSearch?: () => void;
  inputRef?: React.RefObject<HTMLInputElement | null>;
}

export default function TableBodyComp<TData extends LoanHistory>({
  table,
  emptyTitle,
  emptyDescription,
  emptyActionLabel,
  emptyOnAction,
  emptySecondaryActionLabel,
  emptyOnSecondaryAction,
  inputRef,
}: TableBodyCompProps<TData>) {
  const nameColumn = table.getAllColumns().find((col) => col.id === "name");
  const nameSearchValue = nameColumn?.getFilterValue?.() ?? "";

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
                "border-b transition-colors data-[state=selected]:bg-muted hover:bg-muted/50",
                getStatusRowClass(row), // Type-safe with TData extends LoanHistory
                fiRowColors(row) // Type-safe if fiRowColors accepts Row<LoanHistory>
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
        ) : nameSearchValue ? (
          <motion.tr>
            <motion.td
              colSpan={table.getAllColumns().length}
              className="h-96 text-center"
            >
              <EmptySearchTableState
                searchQuery={nameSearchValue as string}
                onClearSearch={() => {
                  table.getColumn("name")?.setFilterValue("");
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
