import React from "react";
import { TableBody } from "../ui/table";
import { AnimatePresence, motion } from "framer-motion";
import { flexRender, Table } from "@tanstack/react-table";
import { getStatusRowClass } from "@/utils/get-status-row-class";
import clsx from "clsx";
import EmptyTableState from "./EmptyTableState";
import { EmptyStateProps } from "@/types/global-types";
import EmptySearchTableState from "./EmptySearchTableState";

interface TableBodyCompProps<TData> extends EmptyStateProps {
  table: Table<TData>;
  searchQuery?: string;
  onClearSearch?: () => void;
  inputRef?: React.RefObject<HTMLInputElement | null>;
}

export default function TableBodyComp<TData>({
  table,
  emptyTitle,
  emptyDescription,
  emptyActionLabel,
  emptyOnAction,
  emptySecondaryActionLabel,
  emptyOnSecondaryAction,
  inputRef,
}: TableBodyCompProps<TData>) {
  const nameSearchValue = table.getColumn("name")?.getFilterValue();
  return (
    <TableBody>
      <AnimatePresence>
        {table.getRowModel().rows?.length ? (
          table.getRowModel().rows.map((row, i) => (
            <motion.tr
              key={row.id}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{
                duration: 0.15,
                delay: i * 0.03,
                ease: "easeOut",
              }}
              layout
              className={clsx(
                "border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted framer-motion-fix",
                getStatusRowClass(row)
              )}
              data-state={row.getIsSelected() && "selected"}
            >
              {row.getVisibleCells().map((cell) => (
                <motion.td
                  key={cell.id}
                  className="p-4"
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
              className="h-[500px] text-center framer-motion-fix"
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
              className="h-[500px] text-center framer-motion-fix"
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
