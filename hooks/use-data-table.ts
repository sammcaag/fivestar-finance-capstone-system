import { useEffect, useMemo, useState } from "react";
import {
  ColumnDef,
  getFacetedUniqueValues,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  Table,
  Row,
  SortingState,
  ColumnFiltersState,
  VisibilityState,
  PaginationState,
} from "@tanstack/react-table";
import { useReactTable } from "@tanstack/react-table";
import { TableData } from "@/types/global-types";

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
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const memoColumns = useMemo(
    () =>
      columns.map((col) => {
        if (col.enableColumnFilter) {
          return {
            ...col,
            filterFn: (
              row: Row<TData>,
              id: string,
              filterValue: string | string[] | undefined
            ) => {
              const rowValue = row.getValue(id);
              const rowStr = String(rowValue ?? "").toLowerCase();
              if (Array.isArray(filterValue)) {
                if (filterValue.length === 0) return true;
                return filterValue.some(
                  (v) => String(v).toLowerCase() === rowStr
                );
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
    globalFilterFn: (
      row: Row<TData>,
      columnId: string,
      filterValue: string
    ) => {
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

  const uniqueStatusValues = useMemo(() => {
    const statusColumn = table.getColumn("status");
    if (!statusColumn) return [];
    const values = Array.from(statusColumn.getFacetedUniqueValues().keys());
    return values.sort();
  }, [table]);

  const statusCounts = useMemo(() => {
    const statusColumn = table.getColumn("status");
    if (!statusColumn) return new Map();
    return statusColumn.getFacetedUniqueValues();
  }, [table]);

  const selectedStatuses = useMemo(() => {
    const filterValue = table.getColumn("status")?.getFilterValue() as
      | string[]
      | undefined;
    return filterValue ?? [];
  }, [table]);

  const handleStatusChange = (checked: boolean, value: string) => {
    const filterValue = table.getColumn("status")?.getFilterValue() as
      | string[]
      | undefined;
    const newFilterValue = filterValue ? [...filterValue] : [];

    if (checked) {
      newFilterValue.push(value);
    } else {
      const index = newFilterValue.indexOf(value);
      if (index > -1) {
        newFilterValue.splice(index, 1);
      }
    }

    table
      .getColumn("status")
      ?.setFilterValue(newFilterValue.length ? newFilterValue : undefined);
  };

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
