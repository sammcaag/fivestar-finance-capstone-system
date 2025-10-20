import { useEffect, useState } from "react";
import {
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
} from "@tanstack/react-table";
import { Client } from "../types/types-clients";
import { data } from "../data/client-mock";
import { clientsColumnDefinition } from "../components/tables/ClientTableDefinition";
import { useReactTable } from "@tanstack/react-table";
import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
} from "@tanstack/react-table";

export const useClientTable = ({
  filterStatus,
  dashboard = false,
}: {
  filterStatus?: Client["status"];
  dashboard?: boolean;
}) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Filter data based on status if filterStatus is provided
  const filteredData = filterStatus
    ? data.filter((client) => client.status === filterStatus)
    : data;

  const table = useReactTable({
    data: filteredData,
    columns: clientsColumnDefinition(dashboard),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return {
    table,
    isLoading,
    rowSelection,
    columnVisibility,
    columnFilters,
    sorting,
    filteredData,
  };
};
