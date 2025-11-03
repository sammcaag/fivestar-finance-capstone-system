import { ColumnDef } from "@tanstack/react-table";
import { ActivityLog } from "../../types/audit-types";
import { Badge } from "@/components/ui/badge";
import { formatDateTime } from "@/utils/format-date-time";

export const activityLogsColumnDefinition = (): ColumnDef<ActivityLog>[] => {
  const getActivityActionBadge = (action: string) => {
    const actionMap: Record<
      string,
      "success" | "warning" | "error" | "info" | "default"
    > = {
      CREATE: "success",
      UPDATE: "info",
      DELETE: "error",
      APPROVE: "success",
      REJECT: "error",
      VIEW: "default",
    };
    return actionMap[action] || "default";
  };

  return [
    {
      accessorKey: "timestamp",
      header: "Timestamp",
      cell: ({ row }) => (
        <div className="whitespace-nowrap">
          <p className="text-sm font-medium">
            {formatDateTime(row.getValue("timestamp"))}
          </p>
        </div>
      ),
      enableSorting: true,
      enableColumnFilter: false,
      size: 200,
    },
    {
      accessorKey: "userName",
      header: "User",
      cell: ({ row }) => (
        <div>
          <p className="font-medium">{row.getValue("userName")}</p>
          {row.original.ipAddress && (
            <p className="text-xs text-muted-foreground">
              {row.original.ipAddress}
            </p>
          )}
        </div>
      ),
      enableSorting: true,
      enableColumnFilter: false,
      size: 200,
    },
    {
      accessorKey: "action",
      header: "Action",
      cell: ({ row }) => (
        <Badge variant={getActivityActionBadge(row.getValue("action"))}>
          {row.getValue("action")}
        </Badge>
      ),
      enableSorting: true,
      enableColumnFilter: true,
      filterFn: "arrIncludesSome",
      size: 150,
    },
    {
      accessorKey: "resource",
      header: "Resource",
      enableSorting: true,
      enableColumnFilter: false,
      size: 150,
    },
    {
      accessorKey: "details",
      header: "Details",
      cell: ({ row }) => (
        <span className="text-sm text-muted-foreground">
          {row.getValue("details") || "-"}
        </span>
      ),
      enableSorting: false,
      enableColumnFilter: false,
      size: 300,
    },
  ];
};
