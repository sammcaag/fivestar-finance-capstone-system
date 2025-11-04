import { ColumnDef } from "@tanstack/react-table";
import { ClientTableProps } from "../../types/client-types";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  MoreHorizontal,
  Copy,
  Eye,
  FileText,
  Pencil,
  Flag,
  MapPin,
} from "lucide-react";
import { formatToPhCurrency } from "@/utils/format-to-ph-currency";
import { clientBadgeStatusMap } from "../../utils/client-badge-status-map";
import { getProductTypeClass } from "@/utils/get-product-type-class";
import { cn } from "@/lib/utils";
import { formatDateToReadable } from "@/utils/format-date-to-readable";
import { FilterFn } from "@tanstack/react-table";

export const clientsColumnDefinition = (
  dashboard = false
): ColumnDef<ClientTableProps>[] => {
  // Custom filter function for multi-column searching
  const nameSearchFilterFn: FilterFn<ClientTableProps> = (
    row,
    columnId,
    filterValue
  ) => {
    const searchableRowContent =
      `${row.original.name} ${row.original.id} ${row.original.email}`.toLowerCase();
    const searchTerm = (filterValue ?? "").toLowerCase();
    return searchableRowContent.includes(searchTerm);
  };

  const statusFilterFn: FilterFn<ClientTableProps> = (
    row,
    columnId,
    filterValue: string[]
  ) => {
    if (!filterValue?.length) return true;
    const status = row.getValue(columnId) as string;
    return filterValue.includes(status);
  };

  const productTypeFilterFn: FilterFn<ClientTableProps> = (
    row,
    columnId,
    filterValue: string[]
  ) => {
    if (!filterValue?.length) return true;
    const productType = row.getValue(columnId) as string;
    return filterValue.includes(productType);
  };
  const baseColumns: ColumnDef<ClientTableProps>[] = [
    {
      accessorKey: "name",
      header: "Client Name",
      cell: ({ row }) => {
        const client = row.original;
        return (
          <div className="flex items-center gap-3">
            <Avatar className="size-10 border border-primary/10 flex-shrink-0">
              <AvatarImage src="/avatar.png" alt={client.name} />
              <AvatarFallback className="bg-primary/5 text-primary text-xs font-semibold">
                {client.name.substring(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="font-medium text-sm">{client.name}</span>
              <span className="text-xs text-muted-foreground">{client.id}</span>
            </div>
          </div>
        );
      },
      filterFn: nameSearchFilterFn,
      size: 250,
    },
    {
      accessorKey: "loanAmount",
      header: "Loan Amount",
      cell: ({ row }) => {
        const amount = Number.parseFloat(row.getValue("loanAmount"));

        return (
          <div className="font-semibold text-sm">
            {formatToPhCurrency(amount)}
          </div>
        );
      },
      size: 100,
    },
    {
      accessorKey: "branch",
      header: "Branch",
      cell: ({ row }) => {
        const branch = row.getValue("branch") as string;
        return (
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <MapPin className="h-3.5 w-3.5" />
            <span>{row.original.branch}</span>
          </div>
        );
      },
    },
    {
      accessorKey: "productType",
      header: "Product Type",
      filterFn: productTypeFilterFn,
      cell: ({ row }) => {
        const productType = row.getValue("productType") as string;

        return (
          <Badge className={cn(getProductTypeClass(productType))}>
            {productType}
          </Badge>
        );
      },
    },

    {
      accessorKey: "status",
      header: "Status",
      filterFn: statusFilterFn,
      cell: ({ row }) => {
        const status = row.getValue("status") as string;

        return (
          <Badge
            variant={
              clientBadgeStatusMap(status)?.variant as
                | "default"
                | "destructive"
                | "outline"
                | "secondary"
            }
            className={cn(clientBadgeStatusMap(status)?.className)}
          >
            {clientBadgeStatusMap(status)?.label}
          </Badge>
        );
      },
    },
    {
      accessorKey: "created_at",
      header: "Created At",
      cell: ({ row }) => {
        const createdAt = row.getValue("created_at") as string;
        return (
          <span className="text-muted-foreground">
            {formatDateToReadable(createdAt, true)}
          </span>
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
      accessorKey: "actions",
      header: "Actions",
      enableHiding: false,
      cell: ({ row }) => {
        const client = row.original;

        return (
          <TooltipProvider>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[180px]">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem
                  onClick={() => {
                    navigator.clipboard.writeText(client.id);
                    alert(`Client ID ${client.id} copied to clipboard`);
                  }}
                  className="flex cursor-pointer items-center"
                >
                  <Copy className="mr-2 h-4 w-4" />
                  Copy client ID
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="flex cursor-pointer items-center"
                  onClick={() =>
                    (window.location.href = `/clients/${client.id}`)
                  }
                >
                  <Eye className="mr-2 h-4 w-4" />
                  View client details
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="flex cursor-pointer items-center"
                  onClick={() => (window.location.href = `/loans/${client.id}`)}
                >
                  <FileText className="mr-2 h-4 w-4" />
                  View loan details
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="flex cursor-pointer items-center"
                  onClick={() =>
                    (window.location.href = `/clients/${client.id}/edit`)
                  }
                >
                  <Pencil className="mr-2 h-4 w-4" />
                  Edit client
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="flex cursor-pointer items-center text-destructive"
                  onClick={() => {
                    if (confirm(`Flag ${client.name} for review?`)) {
                      alert(`${client.name} has been flagged for review`);
                    }
                  }}
                >
                  <Flag className="mr-2 h-4 w-4" />
                  Flag for review
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </TooltipProvider>
        );
      },
      size: 100,
    },
  ];
};
