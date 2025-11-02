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
import { MoreHorizontal, Printer } from "lucide-react";
import { Eye } from "lucide-react";
import { Edit } from "lucide-react";
import { Trash2 } from "lucide-react";
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
  },
  {
    accessorKey: "productType",
    header: "Product Type",
    cell: ({ row }) => (
      <Badge className={cn(getProductTypeClass(row.original.productType))}>
        {row.original.productType}
      </Badge>
    ),
  },
  {
    accessorKey: "amount",
    header: "MA",
    cell: ({ row }) => (
      <span className="whitespace-nowrap font-semibold text-sm">
        {formatToPhCurrency(row.original.amount)}
      </span>
    ),
  },
  {
    accessorKey: "term",
    header: "Term",
    cell: ({ row }) => (
      <span className="whitespace-nowrap">{row.original.term} Months</span>
    ),
  },
  {
    accessorKey: "releasedDate",
    header: "Released Date",
    cell: ({ row }) => (
      <span className="whitespace-nowrap">
        {formatDateToReadable(row.original.madeDate, true)}
      </span>
    ),
  },
  {
    accessorKey: "valueDate",
    header: "Value Date",
    cell: ({ row }) => (
      <span className="whitespace-nowrap">
        {formatDateToReadable(row.original.valueDate, true)}
      </span>
    ),
  },
  {
    accessorKey: "maturityDate",
    header: "Maturity Date",
    cell: ({ row }) => (
      <span className="whitespace-nowrap">
        {formatDateToReadable(row.original.maturityDate, true)}
      </span>
    ),
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
  },
  {
    accessorKey: "action",
    header: "Action",
    size: 80,
    cell: ({ row }) => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {/* View Documents */}
          <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
            <Printer className="h-4 w-4" />
            Print Documents
          </DropdownMenuItem>
          {/* Separator */}
          <DropdownMenuSeparator />
          {/* View Details */}
          <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
            <Eye className="h-4 w-4" />
            View Details
          </DropdownMenuItem>
          {/* Edit */}
          <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
            <Edit className="h-4 w-4" />
            Edit
          </DropdownMenuItem>
          {/* Delete */}
          <DropdownMenuItem className="flex items-center gap-2 cursor-pointer text-destructive">
            <Trash2 className="h-4 w-4" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
];
