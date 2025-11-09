import { ColumnDef, FilterFn } from "@tanstack/react-table";
import { ActivityLog } from "../../types/audit-types";
import { Badge } from "@/components/ui/badge";
import { formatDateTime } from "@/utils/format-date-time";
import { cn } from "@/lib/utils";

// Configuration for action badges
const actionConfig = {
  CREATE: {
    variant: "success",
    className:
      "capitalize bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-900/30 dark:text-green-300 dark:hover:bg-green-900/40",
  },
  UPDATE: {
    variant: "default",
    className:
      "capitalize bg-blue-100 text-blue-800 hover:bg-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:hover:bg-blue-900/40",
  },
  DELETE: {
    variant: "error",
    className:
      "capitalize bg-red-100 text-red-800 hover:bg-red-200 dark:bg-red-900/30 dark:text-red-300 dark:hover:bg-red-900/40",
  },
  APPROVE: {
    variant: "success",
    className:
      "capitalize bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-900/30 dark:text-green-300 dark:hover:bg-green-900/40",
  },
  REJECT: {
    variant: "error",
    className:
      "capitalize bg-red-100 text-red-800 hover:bg-red-200 dark:bg-red-900/30 dark:text-red-300 dark:hover:bg-red-900/40",
  },
  VIEW: {
    variant: "secondary",
    className:
      "capitalize bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-900/30 dark:text-gray-300 dark:hover:bg-gray-900/40",
  },
} as const;

// Custom filter function for searching userName
const userSearchFilterFn: FilterFn<ActivityLog> = (row, filterValue) => {
  const searchableRowContent =
    `${row.original.userName} ${row.original.userId}`.toLowerCase();
  const searchTerm = (filterValue ?? "").toLowerCase();
  return searchableRowContent.includes(searchTerm);
};

// Custom filter function for action
const actionFilterFn: FilterFn<ActivityLog> = (
  row,
  columnId,
  filterValue: string[]
) => {
  if (!filterValue?.length) return true;
  const action = row.getValue(columnId) as string;
  return filterValue.includes(action);
};

export const activityLogsColumnDefinition: ColumnDef<ActivityLog>[] = [
  {
    accessorKey: "timestamp",
    header: "Timestamp",
    enableColumnFilter: false,
    enableSorting: true,
    size: 200,
    cell: ({ row }) => (
      <div className="whitespace-nowrap">
        <span className="text-sm font-medium">
          {formatDateTime(row.getValue("timestamp"))}
        </span>
      </div>
    ),
  },
  {
    accessorKey: "userName",
    header: "User",
    filterFn: userSearchFilterFn,
    enableColumnFilter: false,
    enableSorting: true,
    size: 200,
    cell: ({ row }) => (
      <div>
        <span className="font-medium text-sm">{row.getValue("userName")}</span>
        {row.original.ipAddress && (
          <span className="text-xs text-muted-foreground block">
            {row.original.ipAddress}
          </span>
        )}
      </div>
    ),
  },
  {
    accessorKey: "action",
    header: "Action",
    filterFn: actionFilterFn,
    enableColumnFilter: true,
    enableSorting: true,
    size: 150,
    cell: ({ row }) => {
      const action = row.getValue("action") as keyof typeof actionConfig;
      const config = actionConfig[action] || actionConfig.VIEW;
      return (
        <Badge variant={config.variant} className={cn(config.className)}>
          {action}
        </Badge>
      );
    },
  },
  {
    accessorKey: "resource",
    header: "Resource",
    filterFn: "includesString",
    enableColumnFilter: true,
    enableSorting: true,
    size: 150,
    cell: ({ row }) => (
      <span className="text-sm">{row.getValue("resource")}</span>
    ),
  },
  {
    accessorKey: "details",
    header: "Details",
    enableColumnFilter: false,
    enableSorting: false,
    size: 300,
    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground">
        {row.getValue("details") || "-"}
      </span>
    ),
  },
];
