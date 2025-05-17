"use client";

import { useState } from "react";
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
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
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

export type Client = {
  id: string;
  name: string;
  email: string;
  loanAmount: number;
  loanType: string;
  status: "active" | "pending" | "overdue" | "completed" | "rejected";
  lastPayment: string;
  nextPayment: string;
};

const data: Client[] = [
  {
    id: "728ed52f",
    name: "John Smith",
    email: "john.smith@example.com",
    loanAmount: 25000,
    loanType: "Personal",
    status: "active",
    lastPayment: "2023-11-10",
    nextPayment: "2023-12-10",
  },
  {
    id: "489e1d42",
    name: "Sarah Johnson",
    email: "sarah.j@example.com",
    loanAmount: 150000,
    loanType: "Mortgage",
    status: "active",
    lastPayment: "2023-11-15",
    nextPayment: "2023-12-15",
  },
  {
    id: "573a1a8c",
    name: "Michael Brown",
    email: "m.brown@example.com",
    loanAmount: 5000,
    loanType: "Personal",
    status: "overdue",
    lastPayment: "2023-10-05",
    nextPayment: "2023-11-05",
  },
  {
    id: "632b9a1f",
    name: "Emily Davis",
    email: "emily.d@example.com",
    loanAmount: 75000,
    loanType: "Business",
    status: "pending",
    lastPayment: "",
    nextPayment: "",
  },
  {
    id: "892c7d3e",
    name: "Robert Wilson",
    email: "r.wilson@example.com",
    loanAmount: 200000,
    loanType: "Mortgage",
    status: "active",
    lastPayment: "2023-11-20",
    nextPayment: "2023-12-20",
  },
  {
    id: "912e5f8b",
    name: "Jennifer Lee",
    email: "j.lee@example.com",
    loanAmount: 15000,
    loanType: "Auto",
    status: "completed",
    lastPayment: "2023-11-25",
    nextPayment: "",
  },
  {
    id: "342a9c7d",
    name: "David Martinez",
    email: "d.martinez@example.com",
    loanAmount: 10000,
    loanType: "Personal",
    status: "rejected",
    lastPayment: "",
    nextPayment: "",
  },
  {
    id: "762d4e8a",
    name: "Lisa Thompson",
    email: "lisa.t@example.com",
    loanAmount: 50000,
    loanType: "Business",
    status: "active",
    lastPayment: "2023-11-05",
    nextPayment: "2023-12-05",
  },
  {
    id: "219f6b3c",
    name: "James Anderson",
    email: "j.anderson@example.com",
    loanAmount: 8000,
    loanType: "Personal",
    status: "overdue",
    lastPayment: "2023-10-15",
    nextPayment: "2023-11-15",
  },
  {
    id: "538e2a7f",
    name: "Patricia Garcia",
    email: "p.garcia@example.com",
    loanAmount: 120000,
    loanType: "Mortgage",
    status: "active",
    lastPayment: "2023-11-12",
    nextPayment: "2023-12-12",
  },
];

export const columns: ColumnDef<Client>[] = [
  {
    accessorKey: "name",
    header: "Client",
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src={`/avatar.png`} alt={row.getValue("name")} />
            <AvatarFallback>
              {(row.getValue("name") as string).substring(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="font-medium">{row.getValue("name")}</span>
            <span className="text-xs text-muted-foreground">
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
        >
          Loan Amount
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const amount = Number.parseFloat(row.getValue("loanAmount"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);

      return <div>{formatted}</div>;
    },
  },
  {
    accessorKey: "loanType",
    header: "Loan Type",
    cell: ({ row }) => <div>{row.getValue("loanType")}</div>,
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
        }
      > = {
        active: { label: "Active", variant: "default" },
        pending: { label: "Pending", variant: "secondary" },
        overdue: { label: "Overdue", variant: "destructive" },
        completed: { label: "Completed", variant: "outline" },
        rejected: { label: "Rejected", variant: "outline" },
      };

      const { label, variant } = statusMap[status] || {
        label: status,
        variant: "default",
      };

      return <Badge variant={variant}>{label}</Badge>;
    },
  },
  {
    accessorKey: "nextPayment",
    header: "Next Payment",
    cell: ({ row }) => {
      const nextPayment = row.getValue("nextPayment") as string;
      if (!nextPayment)
        return <span className="text-muted-foreground">N/A</span>;

      const date = new Date(nextPayment);
      const formatted = new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      }).format(date);

      return <div>{formatted}</div>;
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const client = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(client.id)}
            >
              Copy client ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View client details</DropdownMenuItem>
            <DropdownMenuItem>View loan details</DropdownMenuItem>
            <DropdownMenuItem>Edit client</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive">
              Flag for review
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export function ClientsTable({
  filterStatus,
}: {
  filterStatus?: Client["status"];
}) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  // Filter data based on status if filterStatus is provided
  const filteredData = filterStatus
    ? data.filter((client) => client.status === filterStatus)
    : data;

  const table = useReactTable({
    data: filteredData,
    columns,
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

  return (
    <div className="w-full">
      <div className="flex items-center justify-between py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              {/* This causes the Hydration Error due to const column */}
              Columns <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
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
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
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
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
