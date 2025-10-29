import type { ColumnDef } from "@tanstack/react-table";
import { LoanRecord } from "../../types/loan-types";
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

export const loansColumnDefinition: ColumnDef<LoanRecord>[] = [
  {
    accessorKey: "dedCode",
    header: "DED CODE",
  },
  {
    accessorKey: "productType",
    header: "PRODUCT TYPE",
  },
  {
    accessorKey: "amount",
    header: "MA",
  },
  {
    accessorKey: "term",
    header: "TERM",
  },
  {
    accessorKey: "releasedDate",
    header: "RELEASED DATE",
  },
  {
    accessorKey: "valueDate",
    header: "VALUE DATE",
  },
  {
    accessorKey: "maturityDate",
    header: "MATURITY DATE",
  },
  {
    accessorKey: "status",
    header: "STATUS",
  },
  {
    accessorKey: "action",
    header: "ACTION",
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
