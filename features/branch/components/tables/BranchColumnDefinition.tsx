import { ColumnDef, FilterFn } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { MoreHorizontal, Eye, Edit, Trash, Building } from "lucide-react";
import { clientBadgeStatusMap } from "@/features/clients/utils/client-badge-status-map";
import { BranchTableProps } from "../../types/branch-types";

// --- 🔍 Search filter: name + email ---
const branchSearchFilterFn: FilterFn<BranchTableProps> = (row, filterValue) => {
  const searchable = `${row.original.name} ${row.original.email}`.toLowerCase();
  return searchable.includes(String(filterValue).toLowerCase());
};

export const branchColumnDefinition: ColumnDef<BranchTableProps>[] = [
  {
    accessorKey: "name",
    header: "Branch Name",
    size: 250,
    filterFn: branchSearchFilterFn,
    enableSorting: true,
    cell: ({ row }) => (
      <div className="flex items-center gap-3">
        <Building />

        <span className="text-sm font-medium">{row.getValue("name")}</span>
      </div>
    ),
  },

  {
    accessorKey: "email",
    header: "Email",
    size: 200,
    filterFn: "includesString",
    enableSorting: true,
    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground">{row.getValue("email") || "—"}</span>
    ),
  },

  {
    accessorKey: "status",
    header: "Status",
    size: 100,
    filterFn: "includesString",
    enableSorting: true,
    cell: ({ row }) => {
      const status = (row.getValue("status") || "INACTIVE") as keyof typeof clientBadgeStatusMap;

      const config = clientBadgeStatusMap[status] || clientBadgeStatusMap.INACTIVE;

      return (
        <Badge variant={config.variant} className={cn(config.className)}>
          {status}
        </Badge>
      );
    },
  },

  {
    accessorKey: "contactNumber",
    header: "Contact Number",
    size: 200,
    enableSorting: false,
    cell: ({ row }) => <span className="text-sm">{row.getValue("contactNumber") || "N/A"}</span>,
  },

  {
    id: "actions",
    header: "Actions",
    size: 100,
    enableSorting: false,
    enableColumnFilter: false,
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
            <Trash className="h-4 w-4" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
];
