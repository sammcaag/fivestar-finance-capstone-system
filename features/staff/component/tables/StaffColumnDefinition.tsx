import { ColumnDef, FilterFn } from "@tanstack/react-table";
import { StaffTableProps } from "../../types/staff-types";
import { formatDateTime } from "@/utils/format-date-time";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Eye, Edit, Trash, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { clientBadgeStatusMap } from "@/features/clients/utils/client-badge-status-map";
import { formatDateToReadable } from "@/utils/format-date-to-readable";
import { formatFullNameFromParts } from "@/utils/format-full-name-from-parts";
import { decodeFullName } from "@/utils/decode-full-name";

const roleConfig = {
  ADMIN: { variant: "info", className: "uppercase" },
  LOANS: { variant: "warning", className: "uppercase" },
  SALES: { variant: "default", className: "uppercase" },
} as const;

// Custom filter function for searching name and email
const staffSearchFilterFn: FilterFn<StaffTableProps> = (
  row,
  columnId,
  filterValue
) => {
  const searchableRowContent =
    `${row.original.name} ${row.original.email}`.toLowerCase();
  const searchTerm = (filterValue ?? "").toLowerCase();
  return searchableRowContent.includes(searchTerm);
};

export const staffColumnDefinition: ColumnDef<StaffTableProps>[] = [
  {
    accessorKey: "name",
    header: "Staff Name",
    filterFn: staffSearchFilterFn, // Search name and email
    size: 250, // Match LoansColumnDefinition
    cell: ({ row }) => (
      <div className="flex items-center gap-3">
        <Avatar className="size-10 border border-primary/10 flex-shrink-0">
          <AvatarImage src="/avatar.png" alt={row.original.name} />
          <AvatarFallback className="bg-primary/5 text-primary text-xs font-semibold">
            {row.original.name.substring(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <span className="font-medium text-sm">
            {formatFullNameFromParts(decodeFullName(row.original.name))}
          </span>
          <span className="text-xs text-muted-foreground">
            {row.original.email}
          </span>
        </div>
      </div>
    ),
    enableColumnFilter: false,
    enableSorting: true,
  },
  {
    accessorKey: "role",
    header: "Role",
    filterFn: "includesString", // Align with TableFilter
    cell: ({ row }) => {
      const role = row.getValue("role") as keyof typeof roleConfig;
      const config = roleConfig[role] || roleConfig.SALES;
      return (
        <Badge variant={config.variant} className={cn(config.className)}>
          {row.getValue("role")}
        </Badge>
      );
    },
    enableColumnFilter: true,
    enableSorting: true,
  },
  {
    accessorKey: "gender",
    header: "Gender",
    filterFn: "includesString",
    enableColumnFilter: true,
    enableSorting: true,
    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground">
        {row
          .getValue("gender")
          ?.toString()
          .replace(/^./, (c) => c.toUpperCase())}
      </span>
    ),
  },
  {
    accessorKey: "branchName",
    header: "Branch",
    filterFn: "includesString", // Align with TableFilter
    cell: ({ row }) => (
      <div className="flex items-center gap-1 text-sm text-muted-foreground">
        <MapPin className="h-3.5 w-3.5" />
        <span>
          {String(row.getValue("branchName"))?.replace(/\s*Branch$/, "") ||
            "N/A"}
        </span>
      </div>
    ),
    enableColumnFilter: true,
    enableSorting: false,
  },
  {
    accessorKey: "status",
    header: "Status",
    filterFn: "includesString", // Align with TableFilter
    cell: ({ row }) => {
      const status = (row.getValue("status") ||
        "INACTIVE") as keyof typeof clientBadgeStatusMap;
      const config =
        clientBadgeStatusMap[status] || clientBadgeStatusMap.INACTIVE;
      return (
        <Badge variant={config.variant} className={cn(config.className)}>
          {row.getValue("status")}
        </Badge>
      );
    },
    enableColumnFilter: true,
    enableSorting: true,
  },
  {
    accessorKey: "createdAt",
    header: "Hired",
    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground">
        {formatDateToReadable(row.getValue("createdAt") || new Date(), true)}
      </span>
    ),
    enableColumnFilter: false,
    enableSorting: false,
  },
  {
    accessorKey: "lastLogin",
    header: "Last Login",
    cell: ({ row }) => (
      <span className="text-sm">
        {row.getValue("lastLogin")
          ? formatDateTime(row.getValue("lastLogin"))
          : "Never"}
      </span>
    ),
    enableColumnFilter: false,
    enableSorting: true,
  },
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
            <Trash className="h-4 w-4" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
    enableColumnFilter: false,
    enableSorting: false,
  },
];
