import type { ColumnDef, FilterFn } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { MoreHorizontal, Eye, Edit, Trash2, MapPin } from "lucide-react";
import { LoanTableProps } from "../../types/loan-types";
import { formatToPhCurrency } from "@/utils/format-to-ph-currency";
import { formatDateToReadable } from "@/utils/format-date-to-readable";
import { getProductTypeClass } from "@/utils/get-product-type-class";
import { cn } from "@/lib/utils";
import { loanStatusClassNames } from "../../utils/loan-status-classnames";

// Custom filter function for multi-column searching (name and id)
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

// Custom filter function for status
const statusFilterFn: FilterFn<LoanTableProps> = (
  row,
  columnId,
  filterValue: string[]
) => {
  if (!filterValue?.length) return true;
  const status = row.getValue(columnId) as string;
  return filterValue.includes(status);
};

// Custom filter function for productType
const productTypeFilterFn: FilterFn<LoanTableProps> = (
  row,
  columnId,
  filterValue: string[]
) => {
  if (!filterValue?.length) return true;
  const productType = row.getValue(columnId) as string;
  return filterValue.includes(productType);
};

export const loansColumnDefinition: ColumnDef<LoanTableProps>[] = [
  // CLIENT
  {
    accessorKey: "name",
    header: "Client",
    filterFn: nameSearchFilterFn,
    enableColumnFilter: false,
    enableSorting: true,
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
    filterFn: productTypeFilterFn,
    enableColumnFilter: true,
    enableSorting: true,
    size: 150,
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
    enableColumnFilter: false,
    enableSorting: true,
    size: 120,
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
    enableColumnFilter: true,
    enableSorting: true,
    size: 150,
    cell: ({ row }) => {
      const status = row.original.status;
      const config = loanStatusClassNames(status);
      return (
        <Badge
          className={cn(
            "text-xs font-medium px-2 py-1",
            config ? `${config.bg} ${config.text}` : ""
          )}
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
    enableColumnFilter: true,
    enableSorting: true,
    size: 150,
    cell: ({ row }) => (
      <div className="truncate max-w-[150px] overflow-hidden text-ellipsis whitespace-nowrap">
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <MapPin className="h-3.5 w-3.5 flex-shrink-0" />
          <span>{row.original.branch}</span>
        </div>
      </div>
    ),
  },
  // TERM
  {
    accessorKey: "term",
    header: "Term",
    enableColumnFilter: false,
    enableSorting: true,
    size: 100,
    cell: ({ row }) => (
      <span className="text-sm font-medium">{row.original.term} months</span>
    ),
  },
  // START DATE
  {
    accessorKey: "startDate",
    header: "Start Date",
    enableColumnFilter: false,
    enableSorting: true,
    size: 120,
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
    enableColumnFilter: false,
    enableSorting: true,
    size: 120,
    cell: ({ row }) => {
      const date = new Date(row.original.applicationDate);
      return (
        <span className="text-sm text-muted-foreground">
          {formatDateToReadable(date, true)}
        </span>
      );
    },
  },
  {
    id: "actions",
    header: "Actions",
    enableColumnFilter: false,
    enableSorting: false,
    size: 100,
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
