import { ColumnDef, FilterFn } from "@tanstack/react-table";
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
import { cn } from "@/lib/utils";
import { formatDateToReadable } from "@/utils/format-date-to-readable";
import {
  getProductTypeClass,
  productTypeConfig,
} from "@/utils/get-product-type-class";

// Custom filter function for searching name, id, and email
const nameSearchFilterFn: FilterFn<ClientTableProps> = (
  row,
  columnId,
  filterValue
) => {
  const searchableRowContent = `${row.original.name} ${row.original.id} ${
    row.original.email || ""
  }`.toLowerCase();
  const searchTerm = (filterValue ?? "").toLowerCase();
  return searchableRowContent.includes(searchTerm);
};

// Custom filter function for status
const statusFilterFn: FilterFn<ClientTableProps> = (
  row,
  columnId,
  filterValue: string[]
) => {
  if (!filterValue?.length) return true;
  const status = row.getValue(columnId) as string;
  return filterValue.includes(status);
};

export const clientsColumnDefinition = (
  dashboard = false
): ColumnDef<ClientTableProps>[] => {
  const baseColumns: ColumnDef<ClientTableProps>[] = [
    {
      accessorKey: "name",
      header: "Client Name",
      filterFn: nameSearchFilterFn,
      enableColumnFilter: false, // Use global search
      enableSorting: true,
      size: 250,
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
    },
    {
      accessorKey: "loanAmount",
      header: "Loan Amount",
      enableColumnFilter: false,
      enableSorting: true,
      size: 100,
      cell: ({ row }) => {
        const amount = Number.parseFloat(row.getValue("loanAmount"));
        return (
          <div className="font-semibold text-sm">
            {formatToPhCurrency(amount)}
          </div>
        );
      },
    },
    {
      accessorKey: "branch",
      header: "Branch",
      filterFn: "includesString",
      enableColumnFilter: true,
      enableSorting: true,
      cell: ({ row }) => (
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <MapPin className="h-3.5 w-3.5" />
          <span>{row.getValue("branch")}</span>
        </div>
      ),
    },
    {
      accessorKey: "productType",
      header: "Product Type",
      filterFn: "includesString",
      enableColumnFilter: true,
      enableSorting: true,
      cell: ({ row }) => {
        const productType = row.getValue(
          "productType"
        ) as keyof typeof productTypeConfig;
        const config = getProductTypeClass(productType);
        return <Badge className={cn(config.className)}>{productType}</Badge>;
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      filterFn: statusFilterFn,
      enableColumnFilter: true,
      enableSorting: true,
      cell: ({ row }) => {
        const status = row.getValue(
          "status"
        ) as keyof typeof clientBadgeStatusMap;
        const config =
          clientBadgeStatusMap[status] || clientBadgeStatusMap.inactive;
        return (
          <Badge variant={config.variant} className={cn(config.className)}>
            {status}
          </Badge>
        );
      },
    },
    {
      accessorKey: "created_at",
      header: "Created At",
      enableColumnFilter: false,
      enableSorting: true,
      cell: ({ row }) => (
        <span className="text-sm text-muted-foreground">
          {formatDateToReadable(row.getValue("created_at"), true)}
        </span>
      ),
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
                  className="flex cursor-pointer items-center gap-2"
                >
                  <Copy className="h-4 w-4" />
                  Copy client ID
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="flex cursor-pointer items-center gap-2"
                  onClick={() =>
                    (window.location.href = `/clients/${client.id}`)
                  }
                >
                  <Eye className="h-4 w-4" />
                  View client details
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="flex cursor-pointer items-center gap-2"
                  onClick={() => (window.location.href = `/loans/${client.id}`)}
                >
                  <FileText className="h-4 w-4" />
                  View loan details
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="flex cursor-pointer items-center gap-2"
                  onClick={() =>
                    (window.location.href = `/clients/${client.id}/edit`)
                  }
                >
                  <Pencil className="h-4 w-4" />
                  Edit client
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="flex cursor-pointer items-center gap-2 text-destructive"
                  onClick={() => {
                    if (confirm(`Flag ${client.name} for review?`)) {
                      alert(`${client.name} has been flagged for review`);
                    }
                  }}
                >
                  <Flag className="h-4 w-4" />
                  Flag for review
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </TooltipProvider>
        );
      },
    },
  ];
};
