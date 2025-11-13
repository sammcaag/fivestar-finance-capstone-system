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
import { clientBadgeStatusMap } from "../../utils/client-badge-status-map";
import { cn } from "@/lib/utils";
import { formatDateToReadable } from "@/utils/format-date-to-readable";

export const clientsColumnDefinition = (
  dashboard = false
): ColumnDef<ClientTableProps>[] => {
  const nameSearchFilterFn: FilterFn<ClientTableProps> = (
    row,
    columnId,
    filterValue
  ) => {
    const searchableRowContent = `${row.original.name} ${
      row.original.id || ""
    } ${row.original.email}`.toLowerCase();
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

  const baseColumns: ColumnDef<ClientTableProps>[] = [
    {
      accessorKey: "name",
      header: "Client Name",
      filterFn: nameSearchFilterFn,
      enableColumnFilter: false,
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
              <span className="text-xs text-muted-foreground">
                {client.email}
              </span>
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "branchName",
      header: "Branch",
      filterFn: "includesString",
      enableColumnFilter: true,
      enableSorting: true,
      cell: ({ row }) => (
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <MapPin className="h-3.5 w-3.5" />
          <span>{row.getValue("branchName") || "N/A"}</span>
        </div>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      filterFn: statusFilterFn,
      enableColumnFilter: true,
      enableSorting: true,
      cell: ({ row }) => {
        const status = (row.getValue("status") ||
          "inactive") as keyof typeof clientBadgeStatusMap;
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
      accessorKey: "createdAt",
      header: "Created At",
      enableColumnFilter: false,
      enableSorting: true,
      cell: ({ row }) => (
        <span className="text-sm text-muted-foreground">
          {formatDateToReadable(row.getValue("createdAt") || new Date(), true)}
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
                    if (client.id) {
                      navigator.clipboard.writeText(client.id);
                      alert(`Client ID ${client.id} copied to clipboard`);
                    } else {
                      alert("Client ID not available");
                    }
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
                    client.id
                      ? (window.location.href = `/clients/${client.id}`)
                      : alert("Client ID not available")
                  }
                >
                  <Eye className="h-4 w-4" />
                  View client details
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="flex cursor-pointer items-center gap-2"
                  onClick={() =>
                    client.id
                      ? (window.location.href = `/loans/${client.id}`)
                      : alert("Client ID not available")
                  }
                >
                  <FileText className="h-4 w-4" />
                  View loan details
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="flex cursor-pointer items-center gap-2"
                  onClick={() =>
                    client.id
                      ? (window.location.href = `/clients/${client.id}/edit`)
                      : alert("Client ID not available")
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
