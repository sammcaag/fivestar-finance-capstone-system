import type { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MoreHorizontal, Eye, Edit, Trash2, Calendar } from "lucide-react";
import { Appointment } from "../types/appointment-types";
import { formatDateToReadable } from "@/utils/format-date-to-readable";

const statusConfig = {
  Scheduled: { bg: "bg-blue-100", text: "text-blue-800", label: "Scheduled" },
  Completed: { bg: "bg-green-100", text: "text-green-800", label: "Completed" },
  Cancelled: { bg: "bg-red-100", text: "text-red-800", label: "Cancelled" },
  "No-show": { bg: "bg-gray-100", text: "text-gray-800", label: "No-show" },
};

const typeConfig = {
  Consultation: "bg-indigo-100 text-indigo-800",
  "Loan Review": "bg-cyan-100 text-cyan-800",
  "Document Submission": "bg-amber-100 text-amber-800",
  "Follow-up": "bg-teal-100 text-teal-800",
};

export const appointmentsColumnDefinition = (
  dashboard = false
): ColumnDef<Appointment>[] => {
  const baseColumns: ColumnDef<Appointment>[] = [
    {
      accessorKey: "name",
      header: "Client",
      cell: ({ row }) => {
        const appointment = row.original;
        return (
          <div className="flex items-center gap-3">
            <Avatar className="size-12 border border-primary/10 flex-shrink-0">
              <AvatarImage src={`/avatar.png`} alt={row.getValue("name")} />
              <AvatarFallback className="bg-primary/5 text-primary">
                {(row.getValue("name") as string).substring(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="font-medium text-sm">{appointment.name}</span>
              <span className="text-xs text-muted-foreground">
                {appointment.id}
              </span>
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "type",
      header: "Type",
      cell: ({ row }) => {
        const type = row.original.type;
        return <Badge className={typeConfig[type]}>{type}</Badge>;
      },
    },
    {
      accessorKey: "appointmentDate",
      header: "Date & Time",
      cell: ({ row }) => {
        const date = new Date(row.original.appointmentDate);
        return (
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <div className="flex flex-col">
              <span className="text-sm font-medium">
                {formatDateToReadable(date)}
              </span>
              <span className="text-muted-foreground">
                {row.original.appointmentTime}
              </span>
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "notes",
      header: "Notes",
      cell: ({ row }) => (
        <div className="truncate">
          <span className="text-sm text-muted-foreground max-w-xs">
            {row.original.notes}
          </span>
        </div>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.original.status;
        const config = statusConfig[status];
        if (!config) return <Badge>{status}</Badge>;
        return (
          <Badge className={`${config.bg} ${config.text}`}>
            {config.label}
          </Badge>
        );
      },
    },
  ];
  if (!dashboard) {
    return [
      ...baseColumns,
      {
        accessorKey: "actions",
        header: "Actions",
        cell: ({ row }) => (
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
                <Trash2 className="h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ),
      },
    ];
  }
  return baseColumns;
};
