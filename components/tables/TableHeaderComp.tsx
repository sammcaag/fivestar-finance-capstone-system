import React, { useState } from "react";
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
import { TableData } from "@/types/global-types";

export default function TableHeaderComp<TData extends TableData>({
  table,
  hoverColumn,
  setHoverColumn,
}: {
  table: Table<TData>;
  hoverColumn: string | null;
  setHoverColumn: (column: string | null) => void;
}) {
  const [filterOpenStates, setFilterOpenStates] = useState<
    Map<string, boolean>
  >(new Map());

  return (
    <TableHeader>
      {table.getHeaderGroups().map((headerGroup) => (
        <TableRow key={headerGroup.id}>
          {headerGroup.headers.map((header) => {
            const canSort = header.column.columnDef.enableSorting ?? false;
            const sortDirection = header.column.getIsSorted();
            const isSorted = sortDirection !== false;
            const canFilter =
              header.column.columnDef.enableColumnFilter ?? false;
            const uniqueValues = canFilter
              ? Array.from(header.column.getFacetedUniqueValues().keys()).sort()
              : [];
            const filterValue = header.column.getFilterValue() as
              | string[]
              | undefined;
            const isFiltered = !!filterValue?.length;
            const isActive = isFiltered || isSorted;
            const isFilterOpen = filterOpenStates.get(header.id) ?? false;
            const isHovered = header.id === hoverColumn;
            const hasIcons = canSort || canFilter;

            const toggleFilterOpen = (open: boolean) => {
              setFilterOpenStates((prev) => new Map(prev).set(header.id, open));
            };

            return (
              <TableHead
                key={header.id}
                style={{ width: `${header.getSize()}px` }}
                className={cn(
                  "h-14 text-left align-middle font-semibold px-4",
                  "border-b group transition-colors duration-300 ease-out",
                  "hover:bg-primary/20"
                )}
                onMouseEnter={() => setHoverColumn(header.id)}
                onMouseLeave={() => setHoverColumn(null)}
              >
                <div className="flex items-center justify-between w-full flex-nowrap">
                  <span
                    className={cn(
                      "font-medium flex-1",
                      isHovered && hasIcons && "truncate"
                    )}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </span>
                  {hasIcons && (
                    <div
                      className={cn(
                        "flex items-center gap-1 shrink-0",
                        "opacity-0 group-hover:opacity-100 transition-opacity duration-200",
                        isActive && "opacity-100"
                      )}
                    >
                      {canFilter && uniqueValues.length > 0 && (
                        <DropdownMenu
                          open={isFilterOpen}
                          onOpenChange={toggleFilterOpen}
                        >
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="p-1 shrink-0"
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
                                onSelect={(e) => e.preventDefault()}
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
                          className="p-1 shrink-0"
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
                              className="size-4 text-muted-foreground/60"
                              aria-hidden="true"
                            />
                          )}
                        </Button>
                      )}
                    </div>
                  )}
                </div>
              </TableHead>
            );
          })}
        </TableRow>
      ))}
    </TableHeader>
  );
}
