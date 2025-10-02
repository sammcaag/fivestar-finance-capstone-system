"use client";

import { Badge } from "@/components/ui/badge";
import { formatDateTime } from "@/lib/utils";
import { Staff } from "../types/staff-types";
import { Column, DataTable } from "@/components/DataTable";

interface UserTableProps {
  staffs: Staff[];
  onUserClick: (user: Staff) => void;
}

export function StaffTable({ staffs, onUserClick }: UserTableProps) {
  const columns: Column<Staff>[] = [
    {
      key: "firstName",
      header: "Name",
      sortable: true,
      render: (user: Staff) => (
        <div>
          <p className="font-medium">
            {user.firstName} {user.lastName}
          </p>
          <p className="text-xs text-muted-foreground">{user.email}</p>
        </div>
      ),
    },
    {
      key: "role",
      header: "Role",
      sortable: true,
      render: (staff: Staff) => (
        <Badge
          variant={
            staff.role === "admin"
              ? "info"
              : staff.role === "loans"
              ? "warning"
              : "default"
          }
        >
          {staff.role.toUpperCase()}
        </Badge>
      ),
    },
    {
      key: "status",
      header: "Status",
      sortable: true,
      render: (staff: Staff) => (
        <Badge
          variant={
            staff.status === "active"
              ? "success"
              : staff.status === "inactive"
              ? "error"
              : "default"
          }
        >
          {staff.status}
        </Badge>
      ),
    },
    {
      key: "createdAt",
      header: "Hired",
      sortable: true,
      render: (staff: Staff) => formatDateTime(staff.createdAt),
    },
    {
      key: "lastLogin",
      header: "Last Login",
      sortable: true,
      render: (staff: Staff) =>
        staff.lastLogin ? formatDateTime(staff.lastLogin) : "Never",
    },
  ];

  return (
    <DataTable
      data={staffs}
      columns={columns}
      onRowClick={onUserClick}
      emptyMessage="No users found"
    />
  );
}
