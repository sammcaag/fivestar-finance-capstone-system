import type { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MoreHorizontal, Eye, Edit, Trash2 } from "lucide-react";
import { LoanTableProps } from "../../types/loan-types";
import { FilterFn } from "@tanstack/react-table";
import { formatToPhCurrency } from "@/utils/format-to-ph-currency";

const statusConfig = {
  "Approved by HQ": {
    bg: "bg-blue-100",
    text: "text-blue-800",
    label: "Approved by HQ",
  },
  Pending: { bg: "bg-yellow-100", text: "text-yellow-800", label: "Pending" },
  Disbursed: {
    bg: "bg-purple-100",
    text: "text-purple-800",
    label: "Disbursed",
  },
  Completed: { bg: "bg-green-100", text: "text-green-800", label: "Completed" },
  Rejected: { bg: "bg-destructive", text: "text-white", label: "Rejected" },
  "Forwarded to HQ": {
    bg: "bg-blue-100",
    text: "text-blue-800",
    label: "Forwarded to HQ",
  },
};

// Custom filter function for multi-column searching
const nameSearchFilterFn: FilterFn<LoanTableProps> = (
  row,
  columnId,
  filterValue
) => {
  const searchableRowContent = `${row.original.name}`.toLowerCase();
  const searchTerm = (filterValue ?? "").toLowerCase();
  return searchableRowContent.includes(searchTerm);
};

const statusFilterFn: FilterFn<LoanTableProps> = (
  row,
  columnId,
  filterValue: string[]
) => {
  if (!filterValue?.length) return true;
  const status = row.getValue(columnId) as string;
  return filterValue.includes(status);
};

export const loansColumnDefinition: ColumnDef<LoanTableProps>[] = [
  {
    accessorKey: "name",
    header: "Client",
    filterFn: nameSearchFilterFn,
    cell: ({ row }) => {
      const loan = row.original;
      return (
        <div className="flex items-center gap-3">
          <Avatar className="size-12 border border-primary/10 flex-shrink-0">
            <AvatarImage src={`/avatar.png`} alt={row.getValue("name")} />
            <AvatarFallback className="bg-primary/5 text-primary">
              {(row.getValue("name") as string).substring(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="font-medium text-sm">{loan.name}</span>
            <span className="text-xs text-muted-foreground">{loan.id}</span>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: ({ row }) => {
      const amount = row.original.amount;
      return (
        <span className="font-semibold text-sm">{formatToPhCurrency(amount)}</span>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    filterFn: statusFilterFn,
    cell: ({ row }) => {
      const status = row.original.status;
      const config = statusConfig[status];
      if (!config) return <Badge>{status}</Badge>;
      return (
        <Badge className={`${config.bg} ${config.text}`}>{config.label}</Badge>
      );
    },
  },
  {
    accessorKey: "interestRate",
    header: "Interest Rate",
    cell: ({ row }) => (
      <span className="text-sm">{row.original.interestRate}%</span>
    ),
  },
  {
    accessorKey: "term",
    header: "Term (months)",
    cell: ({ row }) => (
      <span className="text-sm font-medium">{row.original.term}</span>
    ),
  },
  {
    accessorKey: "startDate",
    header: "Start Date",
    cell: ({ row }) => {
      const date = new Date(row.original.startDate);
      return <span className="text-sm">{date.toLocaleDateString()}</span>;
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
            <Eye className="h-4 w-4" />
            View Details
          </DropdownMenuItem>
          <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
            <Edit className="h-4 w-4" />
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem className="flex items-center gap-2 cursor-pointer text-destructive">
            <Trash2 className="h-4 w-4" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
];
