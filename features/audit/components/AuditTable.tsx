"use client";

import { Badge } from "@/components/ui/badge";
import { formatDateTime } from "@/lib/utils";
import { AuditLog } from "../types/audit-types";
import { Column, DataTable } from "../../../components/DataTable";

interface AuditTableProps {
  logs: AuditLog[];
}

export function AuditTable({ logs }: AuditTableProps) {
  const getActionBadge = (action: string) => {
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

  const columns: Column<AuditLog>[] = [
    {
      key: "timestamp",
      header: "Timestamp",
      sortable: true,
      render: (log: AuditLog) => (
        <div className="whitespace-nowrap">
          <p className="text-sm font-medium">{formatDateTime(log.timestamp)}</p>
        </div>
      ),
    },
    {
      key: "userName",
      header: "User",
      sortable: true,
      render: (log: AuditLog) => (
        <div>
          <p className="font-medium">{log.userName}</p>
          {log.ipAddress && (
            <p className="text-xs text-muted-foreground">{log.ipAddress}</p>
          )}
        </div>
      ),
    },
    {
      key: "action",
      header: "Action",
      sortable: true,
      render: (log: AuditLog) => (
        <Badge variant={getActionBadge(log.action)}>{log.action}</Badge>
      ),
    },
    {
      key: "resource",
      header: "Resource",
      sortable: true,
    },
    {
      key: "details",
      header: "Details",
      render: (log: AuditLog) => (
        <span className="text-sm text-muted-foreground">
          {log.details || "-"}
        </span>
      ),
    },
  ];

  return (
    <DataTable
      data={logs}
      columns={columns}
      emptyMessage="No audit logs found"
    />
  );
}
