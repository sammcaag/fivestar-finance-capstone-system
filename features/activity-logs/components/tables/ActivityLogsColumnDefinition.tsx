import { ColumnDef } from "@tanstack/react-table";
import { ActivityLog } from "../../types/audit-types";
import { formatDateTime } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

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
    },
    {
      accessorKey: "action",
      header: "Action",
      cell: ({ row }) => (
        <Badge variant={getActivityActionBadge(row.getValue("action"))}>
          {row.getValue("action")}
        </Badge>
      ),
    },
    {
      accessorKey: "resource",
      header: "Resource",
    },
    {
      accessorKey: "details",
      header: "Details",
      cell: ({ row }) => (
        <span className="text-sm text-muted-foreground">
          {row.getValue("details") || "-"}
        </span>
      ),
    },
  ];
};
