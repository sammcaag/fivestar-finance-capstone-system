"use client";
import { flexRender } from "@tanstack/react-table";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Client } from "../types/types-clients";
import TableRowLoadingState from "@/components/tables/TableRowLoadingState";
import { useClientTable } from "../hooks/use-client-table";

export function ClientsTable({
  filterStatus,
  dashboard = false,
}: {
  filterStatus?: Client["status"];
  dashboard?: boolean;
}) {
  const { table, isLoading, filteredData } = useClientTable({
    filterStatus,
    dashboard,
  });

  if (isLoading) {
    return <TableRowLoadingState dashboard={dashboard} />;
  }

  return (
    <div className="w-full">
      <div className="rounded-md border">
        <Table>
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
                    className={`
                      border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted framer-motion-fix
                      ${
                        row.original.status === "active"
                          ? "bg-green-50/50 dark:bg-green-950/10"
                          : ""
                      }
                      ${
                        row.original.status === "pending"
                          ? "bg-yellow-50/50 dark:bg-yellow-950/10"
                          : ""
                      }
                      ${
                        row.original.status === "inactive"
                          ? "bg-red-50/50 dark:bg-red-950/10"
                          : ""
                      }
                    `}
                    data-state={row.getIsSelected() && "selected"}
                    layout
                  >
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id} className="p-4">
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    ))}
                  </motion.tr>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={table.getAllColumns().length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </AnimatePresence>
          </TableBody>
        </Table>
      </div>
      {!dashboard && (
        <div className="flex items-center justify-end space-x-2 py-4">
          <div className="flex-1 text-sm text-muted-foreground">
            Showing {table.getRowModel().rows.length} of {filteredData.length}{" "}
            clients
          </div>
          <div className="space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className="transition-all duration-200 hover:bg-primary hover:text-white"
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className="transition-all duration-200 hover:bg-primary hover:text-white"
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
