import React from "react";
import { TableBody } from "../ui/table";
import { AnimatePresence, motion } from "framer-motion";
import { flexRender, Table } from "@tanstack/react-table";
import { getStatusRowClass } from "@/utils/get-status-row-class";
import clsx from "clsx";
import EmptyTableState from "./EmptyTableState";

export default function TableBodyComp<TData>({
  table,
}: {
  table: Table<TData>;
}) {
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
              className={clsx(
                "border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted framer-motion-fix",
                getStatusRowClass(row)
              )}
              data-state={row.getIsSelected() && "selected"}
              layout
            >
              {row.getVisibleCells().map((cell) => (
                <motion.td key={cell.id} className="p-4">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </motion.td>
              ))}
            </motion.tr>
          ))
        ) : (
          <motion.tr>
            <motion.td
              colSpan={table.getAllColumns().length}
              className="h-[500px] text-center framer-motion-fix"
            >
              <EmptyTableState actionLabel="Add Loan" onAction={() => {}} />
            </motion.td>
          </motion.tr>
        )}
      </AnimatePresence>
    </TableBody>
  );
}
