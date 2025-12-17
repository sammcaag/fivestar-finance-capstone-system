import { formatDateToReadable } from "@/utils/format-date-to-readable";
import { formatToPhCurrency } from "@/utils/format-to-ph-currency";
import { ColumnDef } from "@tanstack/react-table";
import { LoanDeductionTableRow } from "../../types/loan-deductions-types";

export const loanDeductionsColumnDefinition: ColumnDef<LoanDeductionTableRow>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => <span className="whitespace-nowrap">{row.original.name}</span>,
    enableSorting: true,
    enableColumnFilter: true,
    size: 260,
  },
  {
    accessorKey: "loanStarted",
    header: "Loan Started",
    cell: ({ row }) => (
      <span className="whitespace-nowrap text-muted-foreground">
        {formatDateToReadable(row.original.loanStarted, true)}
      </span>
    ),
    enableSorting: true,
    enableColumnFilter: false,
    size: 140,
  },
  {
    accessorKey: "deductNumber",
    header: "Deduct #",
    cell: ({ row }) => (
      <span className="whitespace-nowrap font-medium">#{row.original.deductNumber}</span>
    ),
    enableSorting: true,
    enableColumnFilter: true,
    size: 110,
  },
  {
    accessorKey: "monthlyAmortization",
    header: "Monthly Amortization",
    cell: ({ row }) => (
      <span className="whitespace-nowrap font-semibold">
        {formatToPhCurrency(row.original.monthlyAmortization)}
      </span>
    ),
    enableSorting: true,
    enableColumnFilter: false,
    size: 180,
  },
];
