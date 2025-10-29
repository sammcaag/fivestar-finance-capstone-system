import React from "react";
import { TableHeader, TableRow, TableHead } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { flexRender } from "@tanstack/react-table";
import { ArrowUpDown, ChevronDown, ChevronUp } from "lucide-react";
import { Table } from "@tanstack/react-table";

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
            const canSort = header.column.getCanSort();
            const sortDirection = header.column.getIsSorted();

            return (
              <TableHead
                key={header.id}
                style={{ width: `${header.getSize()}px` }}
                className={cn("h-14 text-left align-middle font-semibold")}
              >
                {header.isPlaceholder ? null : canSort ? (
                  <div
                    className={cn(
                      "flex h-full cursor-pointer items-center gap-2 select-none",
                      "hover:text-foreground transition-colors duration-200",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 rounded-sm",
                      "group relative"
                    )}
                    onClick={header.column.getToggleSortingHandler()}
                    onKeyDown={(e) => {
                      if (canSort && (e.key === "Enter" || e.key === " ")) {
                        e.preventDefault();
                        header.column.getToggleSortingHandler()?.(e);
                      }
                    }}
                    tabIndex={canSort ? 0 : undefined}
                    role="button"
                    aria-label={`Sort by ${header.column.columnDef.header}`}
                  >
                    <span className="font-medium">
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </span>

                    <div className="flex items-center justify-center size-5 ml-auto">
                      {sortDirection === "asc" ? (
                        <ChevronUp
                          className="size-5 text-primary transition-transform duration-200"
                          aria-hidden="true"
                        />
                      ) : sortDirection === "desc" ? (
                        <ChevronDown
                          className="size-5 text-primary transition-transform duration-200"
                          aria-hidden="true"
                        />
                      ) : (
                        <ArrowUpDown
                          className="size-4 text-muted-foreground/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                          aria-hidden="true"
                        />
                      )}
                    </div>
                  </div>
                ) : (
                  <span className="font-medium text-muted-foreground">
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </span>
                )}
              </TableHead>
            );
          })}
        </TableRow>
      ))}
    </TableHeader>
  );
}
