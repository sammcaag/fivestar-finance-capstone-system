import { ColumnDef, FilterFn } from "@tanstack/react-table";
import { AppointmentTableProps } from "../types/appointment-types";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Eye, Edit, Trash2, Calendar } from "lucide-react";
import { formatDateToReadable } from "@/utils/format-date-to-readable";
import {
  getProductTypeClass,
  productTypeConfig,
} from "@/utils/get-product-type-class";
import { cn } from "@/lib/utils";

// Configuration for status and type badges
const statusConfig = {
  Scheduled: {
    variant: "default",
    className:
      "capitalize bg-blue-100 text-blue-800 hover:bg-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:hover:bg-blue-900/40",
  },
  Completed: {
    variant: "success",
    className:
      "capitalize bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-900/30 dark:text-green-300 dark:hover:bg-green-900/40",
  },
  Cancelled: {
    variant: "error",
    className:
      "capitalize bg-red-100 text-red-800 hover:bg-red-200 dark:bg-red-900/30 dark:text-red-300 dark:hover:bg-red-900/40",
  },
  "No-show": {
    variant: "secondary",
    className:
      "capitalize bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-900/30 dark:text-gray-300 dark:hover:bg-gray-900/40",
  },
} as const;

const typeConfig = {
  Consultation: {
    className:
      "bg-indigo-100 text-indigo-800 hover:bg-indigo-200 dark:bg-indigo-900/30 dark:text-indigo-300 dark:hover:bg-indigo-900/40",
  },
  "Loan Review": {
    className:
      "bg-cyan-100 text-cyan-800 hover:bg-cyan-200 dark:bg-cyan-900/30 dark:text-cyan-300 dark:hover:bg-cyan-900/40",
  },
  "Document Submission": {
    className:
      "bg-amber-100 text-amber-800 hover:bg-amber-200 dark:bg-amber-900/30 dark:text-amber-300 dark:hover:bg-amber-900/40",
  },
  "Follow-up": {
    className:
      "bg-teal-100 text-teal-800 hover:bg-teal-200 dark:bg-teal-900/30 dark:text-teal-300 dark:hover:bg-teal-900/40",
  },
} as const;

// Custom filter function for searching name
const nameSearchFilterFn: FilterFn<AppointmentTableProps> = (
  row,
  columnId,
  filterValue
) => {
  const searchableRowContent =
    `${row.original.name} ${row.original.id}`.toLowerCase();
  const searchTerm = (filterValue ?? "").toLowerCase();
  return searchableRowContent.includes(searchTerm);
};

// Custom filter function for status
const statusFilterFn: FilterFn<AppointmentTableProps> = (
  row,
  columnId,
  filterValue: string[]
) => {
  if (!filterValue?.length) return true;
  const status = row.getValue(columnId) as string;
  return filterValue.includes(status);
};

export const mobileAppointmentsColumnDefinition = (
  dashboard = false
): ColumnDef<AppointmentTableProps>[] => {
  const baseColumns: ColumnDef<AppointmentTableProps>[] = [
    {
      accessorKey: "name",
      header: "Client",
      filterFn: nameSearchFilterFn,
      enableColumnFilter: false,
      enableSorting: true,
      size: 250,
      cell: ({ row }) => {
        const appointment = row.original;
        return (
          <div className="flex items-center gap-3">
            <Avatar className="size-10 border border-primary/10 flex-shrink-0">
              <AvatarImage src="/avatar.png" alt={appointment.name} />
              <AvatarFallback className="bg-primary/5 text-primary text-xs font-semibold">
                {appointment.name.substring(0, 2).toUpperCase()}
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
      accessorKey: "productType",
      header: "Product Type",
      filterFn: "includesString",
      enableColumnFilter: true,
      enableSorting: true,
      size: 100,
      cell: ({ row }) => {
        const productType = row.getValue(
          "productType"
        ) as keyof typeof productTypeConfig;
        const config = getProductTypeClass(productType);
        return <Badge className={cn(config.className)}>{productType}</Badge>;
      },
    },
    {
      accessorKey: "type",
      header: "Type",
      filterFn: "includesString",
      enableColumnFilter: true,
      enableSorting: true,
      cell: ({ row }) => {
        const type = row.getValue("type") as keyof typeof typeConfig;
        const config = typeConfig[type] || {
          className: "bg-gray-100 text-gray-800 hover:bg-gray-200",
        };
        return <Badge className={cn(config.className)}>{type}</Badge>;
      },
    },
    {
      accessorKey: "appointmentDate",
      header: "Date & Time",
      enableColumnFilter: false,
      enableSorting: true,
      size: 200,
      cell: ({ row }) => {
        const date = new Date(row.getValue("appointmentDate"));
        return (
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <div className="flex flex-col">
              <span className="text-sm font-medium">
                {formatDateToReadable(date)}
              </span>
              <span className="text-xs text-muted-foreground">
                {row.getValue("appointmentTime")}
              </span>
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "purpose",
      header: "Purpose",
      enableColumnFilter: false,
      enableSorting: true,
      cell: ({ row }) => (
        <div className="truncate max-w-xs">
          <span className="text-sm text-muted-foreground">
            {row.getValue("purpose")}
          </span>
        </div>
      ),
    },
    {
      accessorKey: "notes",
      header: "Notes",
      enableColumnFilter: false,
      enableSorting: false,
      cell: ({ row }) => (
        <div className="truncate max-w-xs">
          <span className="text-sm text-muted-foreground">
            {row.getValue("notes")}
          </span>
        </div>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      filterFn: statusFilterFn,
      enableColumnFilter: true,
      enableSorting: true,
      size: 100,
      cell: ({ row }) => {
        const status = row.getValue("status") as keyof typeof statusConfig;
        const config = statusConfig[status] || statusConfig["No-show"];
        return (
          <Badge variant={config.variant} className={cn(config.className)}>
            {status}
          </Badge>
        );
      },
    },
  ];

  if (dashboard) {
    return baseColumns;
  }

  return [
    ...baseColumns,
    {
      id: "actions",
      header: "Actions",
      enableColumnFilter: false,
      enableSorting: false,
      size: 100,
      cell: () => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
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
};
