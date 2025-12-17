import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { formatDateToReadable } from "@/utils/format-date-to-readable";
import { formatToPhCurrency } from "@/utils/format-to-ph-currency";
import { getProductTypeClass } from "@/utils/get-product-type-class";
import type { ColumnDef, FilterFn } from "@tanstack/react-table";
import { MapPin } from "lucide-react";
import { LoanTableProps } from "../../types/loan-types";
import { loanStatusClassNames } from "../../utils/loan-status-classnames";

// Custom filter function for multi-column searching (name and id)
const nameSearchFilterFn: FilterFn<LoanTableProps> = (row, columnId, filterValue) => {
  const searchableRowContent = `${row.original.name} ${row.original.id}`.toLowerCase();
  const searchTerm = (filterValue ?? "").toLowerCase();
  return searchableRowContent.includes(searchTerm);
};

// Custom filter function for status
const statusFilterFn: FilterFn<LoanTableProps> = (row, columnId, filterValue: string[]) => {
  if (!filterValue?.length) return true;
  const status = row.getValue(columnId) as string;
  return filterValue.includes(status);
};

// Custom filter function for productType
const productTypeFilterFn: FilterFn<LoanTableProps> = (row, columnId, filterValue: string[]) => {
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
          <Avatar className="size-12 border border-primary/10 flex-shrink-0">
            <AvatarImage src="/avatar.png" alt={loan.name} />
            <AvatarFallback className="bg-primary/5 text-primary text-xs font-semibold">
              {loan.name.substring(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="font-medium text-sm">{loan.name}</span>
            <span className="text-xs text-muted-foreground">Loan ID: {loan.id}</span>
            <span className="text-xs text-muted-foreground">
              Serial Number: {loan.serialNumber}
            </span>
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
    cell: ({ row }) => (
      <Badge className={cn(getProductTypeClass(row.original.productType))}>
        {row.original.productType}
      </Badge>
    ),
  },
  // AMOUNT
  {
    accessorKey: "monthlyAmortization",
    header: "M . A .",
    enableColumnFilter: false,
    enableSorting: true,
    cell: ({ row }) => (
      <span className="font-semibold text-sm">
        {formatToPhCurrency(row.original.monthlyAmortization)}
      </span>
    ),
  },

  // BRANCH
  {
    accessorKey: "branchName",
    header: "Branch",
    enableColumnFilter: true,
    enableSorting: true,
    cell: ({ row }) => (
      <div className="flex items-center gap-1.5 text-[15px] text-foreground">
        <MapPin className="h-4 w-4 text-primary" />
        <span>{String(row.getValue("branchName"))?.replace(/\s*Branch$/, "") || "N/A"}</span>
      </div>
    ),
  },
  // TERM
  {
    accessorKey: "term",
    header: "Term",
    enableColumnFilter: false,
    enableSorting: true,
    cell: ({ row }) => <span className="text-sm font-medium">{row.original.term} months</span>,
  },
  // APPROVAL STATUS
  {
    accessorKey: "approvalStatus",
    header: "Approval Status",
    filterFn: statusFilterFn,
    enableColumnFilter: true,
    enableSorting: true,
    cell: ({ row }) => {
      const approvalStatus = row.original.approvalStatus;
      const config = loanStatusClassNames(approvalStatus);
      return (
        <Badge
          className={cn(
            "text-xs font-medium px-2 py-1",
            config ? `${config.bg} ${config.text}` : ""
          )}
        >
          {approvalStatus}
        </Badge>
      );
    },
  },
  // APPLICATION DATE
  {
    accessorKey: "createdAt",
    header: "Applied On",
    enableColumnFilter: false,
    enableSorting: true,
    cell: ({ row }) => {
      return (
        <span className="text-sm text-muted-foreground">
          {formatDateToReadable(row.getValue("createdAt"), true)}
        </span>
      );
    },
  },
];
