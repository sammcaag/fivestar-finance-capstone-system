import type { ColumnDef } from "@tanstack/react-table";
import { LoanHistory } from "../../types/loan-types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Printer, Eye, Edit, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { getProductTypeClass } from "@/utils/get-product-type-class";
import { formatToPhCurrency } from "@/utils/format-to-ph-currency";
import { formatDateToReadable } from "@/utils/format-date-to-readable";

export const loansHistoryColumnDefinition: ColumnDef<LoanHistory>[] = [
  {
    accessorKey: "dedCode",
    header: "DED Code",
    cell: ({ row }) => (
      <span className="whitespace-nowrap">{row.original.dedCode}</span>
    ),
    size: 150,
    enableColumnFilter: true,
    enableSorting: true,
  },
  {
    accessorKey: "productType",
    header: "Product Type",
    cell: ({ row }) => (
      <Badge className={cn(getProductTypeClass(row.original.productType))}>
        {row.original.productType}
      </Badge>
    ),
    enableColumnFilter: false,
    enableSorting: true,
  },
  {
    accessorKey: "amount",
    header: "MA",
    cell: ({ row }) => (
      <span className="whitespace-nowrap font-semibold text-sm">
        {formatToPhCurrency(row.original.amount)}
      </span>
    ),
    enableColumnFilter: false,
    enableSorting: true,
  },
  {
    accessorKey: "term",
    header: "Term",
    cell: ({ row }) => (
      <span className="whitespace-nowrap">{row.original.term} Months</span>
    ),
    enableColumnFilter: false,
    enableSorting: true,
  },
  {
    accessorKey: "madeDate",
    header: "Made Date",
    cell: ({ row }) => (
      <span className="whitespace-nowrap">
        {formatDateToReadable(row.original.madeDate, true)}
      </span>
    ),
    enableColumnFilter: false,
    enableSorting: true,
  },
  {
    accessorKey: "valueDate",
    header: "Value Date",
    cell: ({ row }) => (
      <span className="whitespace-nowrap">
        {formatDateToReadable(row.original.valueDate, true)}
      </span>
    ),
    enableColumnFilter: false,
    enableSorting: true,
  },
  {
    accessorKey: "maturityDate",
    header: "Maturity Date",
    cell: ({ row }) => (
      <span className="whitespace-nowrap">
        {formatDateToReadable(row.original.maturityDate, true)}
      </span>
    ),
    enableColumnFilter: false,
    enableSorting: true,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status;
      if (status === "PROCESS") {
        return <Badge className="bg-amber-400">{status}</Badge>;
      }
      return <Badge>{status}</Badge>;
    },
    enableColumnFilter: true,
    enableSorting: true,
  },
  {
    accessorKey: "action",
    header: "Action",
    size: 80,
    cell: () => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
            <Printer className="h-4 w-4" />
            Print Documents
          </DropdownMenuItem>
          <DropdownMenuSeparator />
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
    enableColumnFilter: false,
    enableSorting: false,
  },
];
