import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/features/loans/computations/utils/format-currency";
import { cn } from "@/lib/utils";
import { formatDateToReadable } from "@/utils/format-date-to-readable";
import { getProductTypeClass, productTypeConfig } from "@/utils/get-product-type-class";
import { ColumnDef, FilterFn } from "@tanstack/react-table";
import { Calendar } from "lucide-react";
import { AppointmentTableProps } from "../types/appointment-types";
import UpdateAppointmentsDialog from "./UpdateAppointmentsDialog";

// Configuration for status and type badges
const statusConfig = {
  PENDING: {
    label: "Pending",
    variant: "secondary",
    className:
      "capitalize bg-amber-100 text-amber-800 hover:bg-amber-200 dark:bg-amber-900/30 dark:text-amber-300 dark:hover:bg-amber-900/40",
  },
  CONFIRMED: {
    label: "Confirmed",
    variant: "default",
    className:
      "capitalize bg-blue-100 text-blue-800 hover:bg-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:hover:bg-blue-900/40",
  },
  RESCHEDULE_REQUIRED: {
    label: "Reschedule Required",
    variant: "outline",
    className:
      "capitalize bg-orange-100 text-orange-800 hover:bg-orange-200 dark:bg-orange-900/30 dark:text-orange-300 dark:hover:bg-orange-900/40",
  },
  CANCELLED_BY_USER: {
    label: "Cancelled by Client",
    variant: "destructive",
    className:
      "capitalize bg-red-100 text-red-800 hover:bg-red-200 dark:bg-red-900/30 dark:text-red-300 dark:hover:bg-red-900/40",
  },
  CANCELLED_BY_ADMIN: {
    label: "Cancelled by Admin",
    variant: "destructive",
    className:
      "capitalize bg-rose-100 text-rose-800 hover:bg-rose-200 dark:bg-rose-900/30 dark:text-rose-300 dark:hover:bg-rose-900/40",
  },
  COMPLETED: {
    label: "Completed",
    variant: "success",
    className:
      "capitalize bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-900/30 dark:text-green-300 dark:hover:bg-green-900/40",
  },
} as const;

// Custom filter function for searching name
const nameSearchFilterFn: FilterFn<AppointmentTableProps> = (row, columnId, filterValue) => {
  const searchableRowContent = `${row.original.client.fullName} ${row.original.id}`.toLowerCase();
  const searchTerm = (filterValue ?? "").toLowerCase();
  return searchableRowContent.includes(searchTerm);
};

// Custom filter function for status
const statusFilterFn: FilterFn<AppointmentTableProps> = (row, columnId, filterValue: string[]) => {
  if (!filterValue?.length) return true;
  const status = row.getValue(columnId) as string;
  return filterValue.includes(status);
};

export const mobileAppointmentsColumnDefinition = (
  dashboard = false
): ColumnDef<AppointmentTableProps>[] => {
  const baseColumns: ColumnDef<AppointmentTableProps>[] = [
    {
      id: "name",
      accessorFn: (row) => row.client.fullName,
      header: "Client",
      filterFn: nameSearchFilterFn,
      enableColumnFilter: false,
      enableSorting: true,
      size: 250,
      cell: ({ row }) => {
        const appointment = row.original;
        return (
          <div className="flex gap-3 items-center">
            <Avatar className="flex-shrink-0 border size-10 border-primary/10">
              <AvatarImage src="/avatar.png" alt={appointment.client.fullName} />
              <AvatarFallback className="text-xs font-semibold bg-primary/5 text-primary">
                {appointment.client.fullName.substring(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="text-sm font-medium">{appointment.client.fullName}</span>
              <span className="text-xs text-muted-foreground">Ref #{appointment.id}</span>
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
        const productType = row.getValue("productType") as keyof typeof productTypeConfig | null;
        if (!productType) {
          return <Badge className="text-amber-800 capitalize bg-amber-100">PENDING</Badge>;
        }

        const config = getProductTypeClass(productType);
        return <Badge className={cn(config.className)}>{productType}</Badge>;
      },
    },
    {
      id: "loanDetails",
      header: "Loan Offer",
      accessorFn: (row) => row.maxLoanAmount,
      enableColumnFilter: false,
      enableSorting: true,
      size: 170,
      cell: ({ row }) => {
        const { maxLoanAmount, monthlyAmortization } = row.original;
        console.log(maxLoanAmount, monthlyAmortization);

        return (
          <div className="flex flex-col leading-tight">
            <span className="text-sm font-semibold text-foreground">
              ₱{formatCurrency(maxLoanAmount as number)}
            </span>
            <span className="text-xs text-muted-foreground">
              Monthly: ₱{formatCurrency(monthlyAmortization as number)}
            </span>
          </div>
        );
      },
    },
    {
      id: "branchStaff",
      header: "Branch / Staff",
      accessorFn: (row) => row.branch?.name ?? "",
      enableColumnFilter: false,
      enableSorting: true,
      size: 180,
      cell: ({ row }) => {
        const branchName = row.original.branch?.name ?? null;
        const staffName = row.original.staff?.fullName ?? null;

        if (!branchName && !staffName) {
          return (
            <div className="flex flex-col text-sm leading-tight text-muted-foreground">
              <span>Branch assignment pending</span>
            </div>
          );
        }

        return (
          <div className="flex flex-col leading-tight">
            <span className="text-sm font-medium">{branchName ?? "Branch to be assigned"}</span>
            <span className="text-xs text-muted-foreground">
              {staffName ?? "Staff assignment pending"}
            </span>
          </div>
        );
      },
    },
    {
      accessorKey: "appointmentDate",
      header: "Appointment Date",
      enableColumnFilter: false,
      enableSorting: true,
      size: 200,
      cell: ({ row }) => {
        const dateValue = row.original.scheduledDateTime;
        const parsedDate = dateValue ? new Date(dateValue) : undefined;
        const hasValidDate = parsedDate && !Number.isNaN(parsedDate.getTime());

        return (
          <div className="flex gap-2 items-center">
            <Calendar className="w-4 h-4 text-muted-foreground" />
            <div className="flex flex-col leading-tight">
              <span className="text-sm font-medium">
                {hasValidDate
                  ? parsedDate.toLocaleDateString("en-PH", { weekday: "long" })
                  : "Schedule pending"}
              </span>
              <span className="text-sm font-medium">
                {hasValidDate ? formatDateToReadable(parsedDate!, true, true) : ""}
              </span>
            </div>
          </div>
        );
      },
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
        const config = statusConfig[status] ?? statusConfig.PENDING;
        return (
          <Badge variant={config.variant} className={cn(config.className, "uppercase")}>
            {config.label}
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
      size: 120,
      cell: ({ row }) => {
        const status = row.getValue("status") as keyof typeof statusConfig;
        if (status !== "PENDING") {
          return (
            <UpdateAppointmentsDialog id={row.original.id.toString()} mode="edit">
              <Button variant="outline" className="min-w-[90px]">
                Edit
              </Button>
            </UpdateAppointmentsDialog>
          );
        }

        return (
          <UpdateAppointmentsDialog id={row.original.id.toString()} mode="confirm">
            <Button className="min-w-[90px]">Confirm</Button>
          </UpdateAppointmentsDialog>
        );
      },
    },
  ];
};
