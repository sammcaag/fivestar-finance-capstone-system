import { ColumnDef } from "@tanstack/react-table";
import { Staff } from "../../types/staff-types";
import { formatDateTime } from "@/utils/format-date-time";
import { Badge } from "@/components/ui/badge";

export const staffColumnDefinition = (): ColumnDef<Staff>[] => {
  return [
    {
      accessorKey: "firstName",
      header: "Name",
      cell: ({ row }) => (
        <div>
          <p className="font-medium">
            {row.getValue("firstName")} {row.original.lastName}
          </p>
          <p className="text-xs text-muted-foreground">{row.original.email}</p>
        </div>
      ),
    },
    {
      accessorKey: "role",
      header: "Role",
      cell: ({ row }) => (
        <Badge
          variant={
            row.getValue("role") === "admin"
              ? "info"
              : row.getValue("role") === "loans"
              ? "warning"
              : "default"
          }
          className="uppercase"
        >
          {row.getValue("role")}
        </Badge>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (
        <Badge
          variant={
            row.getValue("status") === "active"
              ? "success"
              : row.getValue("status") === "inactive"
              ? "error"
              : "default"
          }
          className="capitalize"
        >
          {row.getValue("status")}
        </Badge>
      ),
    },
    {
      accessorKey: "createdAt",
      header: "Hired",
      cell: ({ row }) => formatDateTime(row.getValue("createdAt")),
    },
    {
      accessorKey: "lastLogin",
      header: "Last Login",
      cell: ({ row }) =>
        row.getValue("lastLogin")
          ? formatDateTime(row.getValue("lastLogin"))
          : "Never",
    },
  ];
};
