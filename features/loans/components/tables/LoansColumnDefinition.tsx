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
import { MoreHorizontal, Eye, Edit, Trash2, MapPin } from "lucide-react";
import { LoanTableProps } from "../../types/loan-types";
import { FilterFn } from "@tanstack/react-table";
import { formatToPhCurrency } from "@/utils/format-to-ph-currency";
import { formatDateToReadable } from "@/utils/format-date-to-readable";
import { getProductTypeClass } from "@/utils/get-product-type-class";
import { cn } from "@/lib/utils";

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
  const searchableRowContent =
    `${row.original.name} ${row.original.id}`.toLowerCase();
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
  // CLIENT
  {
    accessorKey: "name",
    header: "Client",
    filterFn: nameSearchFilterFn,
    size: 250,
    cell: ({ row }) => {
      const loan = row.original;
      return (
        <div className="flex items-center gap-3">
          <Avatar className="size-10 border border-primary/10 flex-shrink-0">
            <AvatarImage src="/avatar.png" alt={loan.name} />
            <AvatarFallback className="bg-primary/5 text-primary text-xs font-semibold">
              {loan.name.substring(0, 2).toUpperCase()}
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

  // LOAN TYPE
  {
    accessorKey: "productType",
    header: "Product Type",
    cell: ({ row }) => (
      <Badge className={cn(getProductTypeClass(row.original.productType))}>
        {row.original.productType}
      </Badge>
    ),
  },

  // AMOUNT
  {
    accessorKey: "amount",
    header: "Amount",
    cell: ({ row }) => (
      <span className="font-semibold text-sm">
        {formatToPhCurrency(row.original.amount)}
      </span>
    ),
  },

  // STATUS
  {
    accessorKey: "status",
    header: "Status",
    filterFn: statusFilterFn,
    cell: ({ row }) => {
      const status = row.original.status;
      const config = statusConfig[status];
      return (
        <Badge
          className={`text-xs font-medium px-2 py-1 ${
            config ? `${config.bg} ${config.text}` : ""
          }`}
        >
          {config?.label || status}
        </Badge>
      );
    },
  },

  // BRANCH
  {
    accessorKey: "branch",
    header: "Branch",
    cell: ({ row }) => (
      <div className="flex items-center gap-1 text-xs text-muted-foreground">
        <MapPin className="h-3.5 w-3.5" />
        <span>{row.original.branch}</span>
      </div>
    ),
  },

  // TERM
  {
    accessorKey: "term",
    header: "Term",
    cell: ({ row }) => (
      <span className="text-sm font-medium">{row.original.term} months</span>
    ),
  },

  // START DATE
  {
    accessorKey: "startDate",
    header: "Start Date",
    cell: ({ row }) => {
      const date = new Date(row.original.startDate);
      return (
        <span className="text-sm">{formatDateToReadable(date, true)}</span>
      );
    },
  },

  // APPLICATION DATE
  {
    accessorKey: "applicationDate",
    header: "Applied On",
    cell: ({ row }) => {
      const date = new Date(row.original.applicationDate);
      return (
        <span className="text-sm text-muted-foreground">
          {formatDateToReadable(date, true)}
        </span>
      );
    },
  },

  // ACTIONS
  {
    id: "actions",
    header: "Actions",
    cell: () => (
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
