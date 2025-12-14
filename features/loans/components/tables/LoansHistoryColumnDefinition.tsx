import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { formatDateToReadable } from "@/utils/format-date-to-readable";
import { formatToPhCurrency } from "@/utils/format-to-ph-currency";
import { getProductTypeClass } from "@/utils/get-product-type-class";
import type { ColumnDef } from "@tanstack/react-table";
import { Eye, MoreHorizontal, Printer } from "lucide-react";
import { useState } from "react";
import { LoanHistoryPayload } from "../../history/types/loan-form-types";
import LoanHistoryDetailsDialog from "../dialogs/LoanHistoryDetailsDialog";
import ViewDocumentsDialog from "../document-dialog/ViewDocumentsDialog";

export const loansHistoryColumnDefinition: ColumnDef<LoanHistoryPayload>[] = [
  {
    accessorKey: "dedCode",
    header: "DED Code",
    cell: ({ row }) => <span className="whitespace-nowrap">{row.original.dedCode}</span>,
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
    enableSorting: false,
  },
  {
    accessorKey: "monthlyAmortization",
    header: "M.A",
    cell: ({ row }) => (
      <span className="text-sm font-semibold whitespace-nowrap">
        {formatToPhCurrency(row.original.monthlyAmortization)}
      </span>
    ),
    enableColumnFilter: false,
    enableSorting: false,
  },
  {
    accessorKey: "term",
    header: "Term",
    cell: ({ row }) => <span className="whitespace-nowrap">{row.original.term} Months</span>,
    enableColumnFilter: false,
    enableSorting: false,
  },
  {
    accessorKey: "createdAt",
    header: "Made Date",
    cell: ({ row }) => (
      <span className="whitespace-nowrap">
        {formatDateToReadable(row.original.createdAt ?? new Date(), true)}
      </span>
    ),
    enableColumnFilter: false,
    enableSorting: false,
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
    enableSorting: false,
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
    enableSorting: false,
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
    enableSorting: false,
  },
  {
    accessorKey: "action",
    header: "Action",
    size: 80,
    cell: ({ row }) => {
      const [isViewDocumentsOpen, setIsViewDocumentsOpen] = useState(false);
      const [isViewDetailsOpen, setIsViewDetailsOpen] = useState(false);

      return (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="p-0 w-8 h-8">
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                className="flex gap-2 items-center cursor-pointer"
                onClick={() => setIsViewDetailsOpen(true)}
              >
                <Eye className="w-4 h-4" />
                View Details
              </DropdownMenuItem>
              <DropdownMenuItem
                className="flex gap-2 items-center cursor-pointer"
                onClick={() => setIsViewDocumentsOpen(true)}
              >
                <Printer className="w-4 h-4" />
                View Documents
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <LoanHistoryDetailsDialog
            open={isViewDetailsOpen}
            onOpenChange={setIsViewDetailsOpen}
            productType={row.original.productType}
            dedCode={row.original.dedCode}
            loanHistoryId={row.original.id}
          />

          <ViewDocumentsDialog
            open={isViewDocumentsOpen}
            onOpenChange={setIsViewDocumentsOpen}
            productType={row.original.productType}
            dedCode={row.original.dedCode}
            loanHistoryId={row.original.id}
          />
        </>
      );
    },
    enableColumnFilter: false,
    enableSorting: false,
  },
];
