"use client";

import { useState, useEffect } from "react";
import {
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowUpDown,
  MoreHorizontal,
  Eye,
  Pencil,
  Flag,
  Copy,
  FileText,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Skeleton } from "@/components/ui/skeleton";
import { Client } from "../types/types-clients";
import { data } from "../data/client-mock";

const getColumns = (dashboard = false): ColumnDef<Client>[] => {
  const baseColumns: ColumnDef<Client>[] = [
    {
      accessorKey: "name",
      header: "Client",
      cell: ({ row }) => {
        return (
          <div className="flex items-center gap-2 max-w-[200px]">
            <Avatar className="size-12 border border-primary/10 flex-shrink-0">
              <AvatarImage src={`/avatar.png`} alt={row.getValue("name")} />
              <AvatarFallback className="bg-primary/5 text-primary">
                {(row.getValue("name") as string).substring(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col min-w-0">
              <span className="font-medium truncate">
                {row.getValue("name")}
              </span>
              <span className="text-xs text-muted-foreground truncate">
                {row.original.email}
              </span>
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "loanAmount",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="group whitespace-nowrap"
          >
            Loan Amount
            <ArrowUpDown className="ml-2 h-4 w-4 transition-transform group-hover:scale-125" />
          </Button>
        );
      },
      cell: ({ row }) => {
        const amount = Number.parseFloat(row.getValue("loanAmount"));
        const formatted = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(amount);

        return (
          <div className="font-medium text-right whitespace-nowrap">
            {formatted}
          </div>
        );
      },
    },
    {
      accessorKey: "loanType",
      header: "Loan Type",
      cell: ({ row }) => {
        const loanType = row.getValue("loanType") as string;
        const loanTypeColorMap: Record<string, string> = {
          Mortgage:
            "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
          Personal:
            "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
          Business:
            "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300",
          Auto: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300",
        };

        return (
          <div
            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium whitespace-nowrap ${
              loanTypeColorMap[loanType] || ""
            }`}
          >
            {loanType}
          </div>
        );
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.getValue("status") as string;

        const statusMap: Record<
          string,
          {
            label: string;
            variant: "default" | "destructive" | "outline" | "secondary";
            className?: string;
          }
        > = {
          active: {
            label: "Active",
            variant: "default",
            className:
              "bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-900/30 dark:text-green-300 dark:hover:bg-green-900/40",
          },
          pending: {
            label: "Pending",
            variant: "secondary",
            className:
              "bg-yellow-100 text-yellow-800 hover:bg-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-300 dark:hover:bg-yellow-900/40",
          },
          inactive: {
            label: "Inactive",
            variant: "destructive",
            className:
              "bg-red-100 text-red-800 hover:bg-red-200 dark:bg-red-900/30 dark:text-red-300 dark:hover:bg-red-900/40",
          },
          processed: {
            label: "Processed",
            variant: "outline",
            className:
              "bg-blue-100 text-blue-800 hover:bg-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:hover:bg-blue-900/40",
          },
          released: {
            label: "Released",
            variant: "outline",
            className:
              "bg-purple-100 text-purple-800 hover:bg-purple-200 dark:bg-purple-900/30 dark:text-purple-300 dark:hover:bg-purple-900/40",
          },
        };

        const { label, variant, className } = statusMap[status] || {
          label: status,
          variant: "default",
          className: "",
        };

        return (
          <Badge variant={variant} className={`${className} whitespace-nowrap`}>
            {label}
          </Badge>
        );
      },
    },
    {
      accessorKey: "nextPayment",
      header: "Next Payment",
      cell: ({ row }) => {
        const nextPayment = row.getValue("nextPayment") as string;
        if (!nextPayment)
          return (
            <span className="text-muted-foreground whitespace-nowrap">N/A</span>
          );

        const date = new Date(nextPayment);
        const today = new Date();
        const isUpcoming =
          date.getTime() - today.getTime() < 7 * 24 * 60 * 60 * 1000; // 7 days

        const formatted = new Intl.DateTimeFormat("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        }).format(date);

        return (
          <div
            className={`font-medium whitespace-nowrap ${
              isUpcoming ? "text-amber-600 dark:text-amber-400" : ""
            }`}
          >
            {formatted}
            {isUpcoming && (
              <span className="ml-2 inline-flex items-center rounded-full bg-amber-100 px-1.5 py-0.5 text-xs font-medium text-amber-800 dark:bg-amber-900/30 dark:text-amber-300">
                Soon
              </span>
            )}
          </div>
        );
      },
    },
  ];

  if (dashboard) {
    return baseColumns;
  }

  return [
    ...baseColumns,
    {
      id: "actions",
      header: "Actions",
      enableHiding: false,
      cell: ({ row }) => {
        const client = row.original;

        return (
          <TooltipProvider>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[180px]">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem
                  onClick={() => {
                    navigator.clipboard.writeText(client.id);
                    alert(`Client ID ${client.id} copied to clipboard`);
                  }}
                  className="flex cursor-pointer items-center"
                >
                  <Copy className="mr-2 h-4 w-4" />
                  Copy client ID
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="flex cursor-pointer items-center"
                  onClick={() =>
                    (window.location.href = `/clients/${client.id}`)
                  }
                >
                  <Eye className="mr-2 h-4 w-4" />
                  View client details
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="flex cursor-pointer items-center"
                  onClick={() => (window.location.href = `/loans/${client.id}`)}
                >
                  <FileText className="mr-2 h-4 w-4" />
                  View loan details
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="flex cursor-pointer items-center"
                  onClick={() =>
                    (window.location.href = `/clients/${client.id}/edit`)
                  }
                >
                  <Pencil className="mr-2 h-4 w-4" />
                  Edit client
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="flex cursor-pointer items-center text-destructive"
                  onClick={() => {
                    if (confirm(`Flag ${client.name} for review?`)) {
                      alert(`${client.name} has been flagged for review`);
                    }
                  }}
                >
                  <Flag className="mr-2 h-4 w-4" />
                  Flag for review
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </TooltipProvider>
        );
      },
    },
  ];
};

export function ClientsTable({
  filterStatus,
  dashboard = false,
}: {
  filterStatus?: Client["status"];
  dashboard?: boolean;
}) {
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
    columns: getColumns(dashboard),
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

  if (isLoading) {
    return (
      <div className="w-full space-y-4">
        {!dashboard && (
          <div className="flex items-center justify-between py-4">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-10 w-[100px]" />
          </div>
        )}
        <div className="rounded-md border">
          <div className="h-10 border-b bg-muted/30">
            <div className="grid grid-cols-5 gap-4 px-4 py-3">
              {Array(5)
                .fill(0)
                .map((_, i) => (
                  <Skeleton key={i} className="h-4 w-full" />
                ))}
            </div>
          </div>
          <div className="divide-y">
            {Array(dashboard ? 3 : 5)
              .fill(0)
              .map((_, i) => (
                <div key={i} className="grid grid-cols-5 gap-4 px-4 py-4">
                  {Array(5)
                    .fill(0)
                    .map((_, j) => (
                      <Skeleton key={j} className="h-8 w-full" />
                    ))}
                </div>
              ))}
          </div>
        </div>
      </div>
    );
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
