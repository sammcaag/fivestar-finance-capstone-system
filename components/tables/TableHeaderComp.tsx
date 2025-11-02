import React from "react";
import { TableHeader, TableRow, TableHead } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { flexRender, Table } from "@tanstack/react-table";
import { ArrowUpDown, ChevronDown, ChevronUp, Filter } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

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
            const canFilter = header.column.getCanFilter();
            const uniqueValues = Array.from(
              header.column.getFacetedUniqueValues().keys()
            ).sort();
            const filterValue = header.column.getFilterValue() as
              | string[]
              | undefined;

            return (
              <TableHead
                key={header.id}
                style={{ width: `${header.getSize()}px` }}
                className={cn(
                  "h-14 text-left align-middle font-semibold px-4",
                  "border-b"
                )}
              >
                <div className="flex items-center gap-2">
                  <span className="font-medium">
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </span>
                  <div className="flex items-center gap-1 ml-auto">
                    {canFilter && uniqueValues.length > 0 && (
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="p-1"
                            aria-label={`Filter by ${header.column.columnDef.header}`}
                          >
                            <Filter className="size-4 text-muted-foreground" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          {uniqueValues.map((value) => (
                            <DropdownMenuCheckboxItem
                              key={value}
                              checked={filterValue?.includes(value) ?? false}
                              onCheckedChange={(checked) => {
                                const currentFilters = filterValue
                                  ? [...filterValue]
                                  : [];
                                if (checked) {
                                  currentFilters.push(value);
                                } else {
                                  const index = currentFilters.indexOf(value);
                                  if (index > -1) {
                                    currentFilters.splice(index, 1);
                                  }
                                }
                                header.column.setFilterValue(
                                  currentFilters.length
                                    ? currentFilters
                                    : undefined
                                );
                              }}
                            >
                              {value}
                            </DropdownMenuCheckboxItem>
                          ))}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    )}
                    {canSort && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="p-1"
                        onClick={header.column.getToggleSortingHandler()}
                        aria-label={`Sort by ${header.column.columnDef.header}`}
                      >
                        {sortDirection === "asc" ? (
                          <ChevronUp
                            className="size-4 text-primary"
                            aria-hidden="true"
                          />
                        ) : sortDirection === "desc" ? (
                          <ChevronDown
                            className="size-4 text-primary"
                            aria-hidden="true"
                          />
                        ) : (
                          <ArrowUpDown
                            className="size-4 text-muted-foreground/60 group-hover:opacity-100 transition-opacity duration-200"
                            aria-hidden="true"
                          />
                        )}
                      </Button>
                    )}
                  </div>
                </div>
              </TableHead>
            );
          })}
        </TableRow>
      ))}
    </TableHeader>
  );
}
