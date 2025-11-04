import { ColumnDef } from "@tanstack/react-table";
import { Staff } from "../../types/staff-types";
import { formatDateTime } from "@/utils/format-date-time";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Eye, Edit, Trash2 } from "lucide-react";

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
      enableSorting: true,
      enableColumnFilter: true,
      filterFn: "includesString",
      size: 200,
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
      enableSorting: true,
      enableColumnFilter: true,
      filterFn: "arrIncludesSome",
      size: 150,
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
      enableSorting: true,
      enableColumnFilter: true,
      filterFn: "arrIncludesSome",
      size: 150,
    },
    {
      accessorKey: "createdAt",
      header: "Hired",
      cell: ({ row }) => (
        <span className="text-sm">
          {formatDateTime(row.getValue("createdAt"))}
        </span>
      ),
      enableSorting: true,
      enableColumnFilter: false,
      size: 150,
    },
    {
      accessorKey: "lastLogin",
      header: "Last Login",
      cell: ({ row }) =>
        row.getValue("lastLogin") ? (
          <span className="text-sm">
            {formatDateTime(row.getValue("lastLogin"))}
          </span>
        ) : (
          <span className="text-sm text-muted-foreground">Never</span>
        ),
      enableSorting: true,
      enableColumnFilter: false,
      size: 150,
    },
    {
      id: "actions",
      header: "Actions",
      cell: () => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w czterech" />
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
              Deactivate
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
      enableSorting: false,
      enableColumnFilter: false,
      size: 100,
    },
  ];
};
