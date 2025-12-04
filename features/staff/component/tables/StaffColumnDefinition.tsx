import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { clientBadgeStatusMap } from "@/features/clients/utils/client-badge-status-map";
import { cn } from "@/lib/utils";
import { decodeFullName } from "@/utils/decode-full-name";
import { formatDateTime } from "@/utils/format-date-time";
import { formatDateToReadable } from "@/utils/format-date-to-readable";
import { formatFullNameFromParts } from "@/utils/format-full-name-from-parts";
import { ColumnDef, FilterFn } from "@tanstack/react-table";
import { MapPin } from "lucide-react";
import { StaffTableProps } from "../../types/staff-types";

const roleConfig = {
  ADMIN: { variant: "info" },
  LOANS: { variant: "warning" },
  SALES: { variant: "default" },
} as const;

// Search by name + email
const staffSearchFilterFn: FilterFn<StaffTableProps> = (row, _, filterValue) => {
  const v = (filterValue ?? "").toLowerCase();
  return `${row.original.name} ${row.original.email}`.toLowerCase().includes(v);
};

export const staffColumnDefinition: ColumnDef<StaffTableProps>[] = [
  {
    accessorKey: "name",
    header: "Staff",
    filterFn: staffSearchFilterFn,
    size: 300,
    enableSorting: true,
    enableColumnFilter: false,
    cell: ({ row }) => {
      const fullName = formatFullNameFromParts(decodeFullName(row.original.name));
      const initials = row.original.name.substring(0, 2).toUpperCase();

      return (
        <div className="flex items-center gap-3">
          <Avatar className="size-10 rounded-full border border-gray-200">
            <AvatarImage src="/avatar.png" alt={row.original.name} />
            <AvatarFallback className="bg-primary/10 text-primary font-semibold text-sm">
              {initials}
            </AvatarFallback>
          </Avatar>

          <div className="flex flex-col">
            <span className="text-[15px] font-medium text-foreground leading-tight">
              {fullName}
            </span>
            <span className="text-[13px] text-muted-foreground">{row.original.email}</span>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "role",
    header: "Role",
    size: 120,
    filterFn: "includesString",
    enableSorting: false,
    enableColumnFilter: true,
    cell: ({ row }) => {
      const role = row.getValue("role") as keyof typeof roleConfig;
      const config = roleConfig[role] || roleConfig.SALES;

      return (
        <Badge variant={config.variant} className="text-[13px] font-semibold rounded-md">
          {String(row.getValue("role")).replace(/_/g, " ")}
        </Badge>
      );
    },
  },
  {
    accessorKey: "gender",
    header: "Gender",
    size: 120,
    filterFn: "includesString",
    enableSorting: false,
    enableColumnFilter: true,
    cell: ({ row }) => (
      <span className="text-[15px] text-foreground">
        {String(row.getValue("gender")).replace(/^./, (c) => c.toUpperCase())}
      </span>
    ),
  },
  {
    accessorKey: "branchName",
    header: "Branch",
    size: 200,
    filterFn: "includesString",
    enableSorting: false,
    enableColumnFilter: true,
    cell: ({ row }) => (
      <div className="flex items-center gap-1.5 text-[15px] text-foreground">
        <MapPin className="h-4 w-4 text-primary" />
        <span>{String(row.getValue("branchName"))?.replace(/\s*Branch$/, "") || "N/A"}</span>
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    filterFn: "includesString",
    enableSorting: false,
    enableColumnFilter: true,
    cell: ({ row }) => {
      const status = (row.getValue("status") || "INACTIVE") as keyof typeof clientBadgeStatusMap;
      const config = clientBadgeStatusMap[status];

      return (
        <Badge
          variant={config.variant}
          className={cn("text-[13px] font-semibold rounded-md", config.className)}
        >
          {String(row.getValue("status")).replace(/_/g, " ").toUpperCase()}
        </Badge>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "Hired",
    enableSorting: true,
    enableColumnFilter: false,
    cell: ({ row }) => (
      <span className="text-[14px] text-muted-foreground">
        {formatDateToReadable(row.getValue("createdAt"), true)}
      </span>
    ),
  },
  {
    accessorKey: "lastLogin",
    header: "Last Login",
    enableSorting: false,
    cell: ({ row }) => (
      <span className="text-[14px] text-foreground">
        {row.getValue("lastLogin") ? formatDateTime(row.getValue("lastLogin")) : "Never"}
      </span>
    ),
  },
];
