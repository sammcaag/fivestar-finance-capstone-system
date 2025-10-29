import type { ColumnDef } from "@tanstack/react-table";
import { LoanHIstory } from "../../types/loan-types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { Eye } from "lucide-react";
import { Edit } from "lucide-react";
import { Trash2 } from "lucide-react";

export const loansHistoryColumnDefinition: ColumnDef<LoanHIstory>[] = [
  {
    accessorKey: "dedCode",
    header: "DED Code",
    cell: ({ row }) => (
      <span className="whitespace-nowrap">{row.original.dedCode}</span>
    ),
    size: 20,
  },
  {
    accessorKey: "productType",
    header: "Product Type",
    size: 20
  },
  {
    accessorKey: "amount",
    header: "MA",
  },
  {
    accessorKey: "term",
    header: "Term",
  },
  {
    accessorKey: "releasedDate",
    header: "Released Date",
  },
  {
    accessorKey: "valueDate",
    header: "Value Date",
  },
  {
    accessorKey: "maturityDate",
    header: "Maturity Date",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "action",
    header: "Action",
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
