import { TableData } from "@/types/global-types";
import {
  ColumnDef,
  ColumnFiltersState,
  getCoreRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  PaginationState,
  Row,
  SortingState,
  Table,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";
import { useMemo, useState } from "react";

export function useDataTable<TData extends TableData>({
  data,
  columns,
  filterColumns = [],
  initialSort,
}: {
  data: TData[];
  columns: ColumnDef<TData>[];
  filterColumns?: string[];
  initialSort?: SortingState;
}) {
  const [sorting, setSorting] = useState<SortingState>(initialSort ?? []);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState<string>("");
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  // Set isLoading to false since data is provided
  const isLoading = !data;

  const memoColumns = useMemo(
    () =>
      columns.map((col) => {
        if (col.enableColumnFilter) {
          return {
            ...col,
            filterFn: (row: Row<TData>, id: string, filterValue: string | string[] | undefined) => {
              const rowValue = row.getValue(id);
              const rowStr = String(rowValue ?? "").toLowerCase();
              if (Array.isArray(filterValue)) {
                if (filterValue.length === 0) return true;
                return filterValue.some((v) => String(v).toLowerCase() === rowStr);
              } else if (typeof filterValue === "string") {
                return rowStr.includes(filterValue.toLowerCase());
              }
              return true;
            },
          };
        }
        return col;
      }),
    [columns]
  );

  const table: Table<TData> = useReactTable({
    data,
    columns: memoColumns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    enableSortingRemoval: false,
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getFilteredRowModel: getFilteredRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: (row: Row<TData>, columnId: string, filterValue: string) => {
      if (!filterValue) return true;
      const search = filterValue.toLowerCase();
      return filterColumns.some((col) => {
        const value = row.getValue(col);
        return String(value ?? "")
          .toLowerCase()
          .includes(search);
      });
    },
    state: {
      sorting,
      pagination,
      columnFilters,
      columnVisibility,
      globalFilter,
    },
    initialState: {
      sorting,
    },
  });

  return {
    table,
    isLoading,
    columnVisibility,
    columnFilters,
    sorting,
    data,
    pagination,
  };
}
