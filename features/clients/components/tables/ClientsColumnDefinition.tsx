import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useDialog } from "@/contexts/DialogContext";
import { useAuth } from "@/features/auth/context/AuthContext";
import { cn } from "@/lib/utils";
import { avatarFallBack } from "@/utils/avatar-fallback";
import { decodeFullName } from "@/utils/decode-full-name";
import { formatDateToReadable } from "@/utils/format-date-to-readable";
import { formatFullNameFromParts } from "@/utils/format-full-name-from-parts";
import { ColumnDef, FilterFn } from "@tanstack/react-table";
import { MapPin } from "lucide-react";
import { ClientTableProps } from "../../types/client-types";
import { clientBadgeStatusMap } from "../../utils/client-badge-status-map";

export const clientsColumnDefinition = (dashboard = false): ColumnDef<ClientTableProps>[] => {
  const { user } = useAuth();
  const { showDialog } = useDialog();
  const nameSearchFilterFn: FilterFn<ClientTableProps> = (row, _, val) => {
    return `${row.original.name} ${row.original.id ?? ""} ${row.original.email}`
      .toLowerCase()
      .includes((val ?? "").toLowerCase());
  };

  const statusFilterFn: FilterFn<ClientTableProps> = (row, columnId, val) =>
    !val?.length || val.includes(row.getValue(columnId) as string);

  const isFinance = user?.role.toUpperCase() === "ADMIN";

  const baseColumns: ColumnDef<ClientTableProps>[] = [
    {
      accessorKey: "name",
      header: "Client",
      size: 310,
      filterFn: nameSearchFilterFn,
      enableSorting: true,
      enableColumnFilter: false,
      cell: ({ row }) => {
        const client = row.original;
        const fullName = formatFullNameFromParts(decodeFullName(client.name));

        return (
          <div className="flex items-center gap-3">
            <Avatar className="size-10 rounded-full border border-gray-200">
              <AvatarImage src="/avatar.png" alt={client.name} />
              <AvatarFallback className="bg-primary/10 text-primary font-semibold text-sm">
                {avatarFallBack(client.name)}
              </AvatarFallback>
            </Avatar>

            <div className="flex flex-col">
              <span className="text-[15px] font-medium text-foreground">
                {client.rank} {fullName}
              </span>

              <span className="text-[13px] text-muted-foreground">{client.email}</span>
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "gender",
      header: "Gender",
      filterFn: "includesString",
      size: 110,
      enableSorting: false,
      enableColumnFilter: true,
      cell: ({ row }) => (
        <span className="text-[15px] text-foreground">
          {String(row.getValue("gender")).replace(/^./, (c) => c.toUpperCase())}
        </span>
      ),
    },
    {
      accessorKey: "branchName",
      header: "Branch",
      filterFn: "includesString",
      enableSorting: false,
      enableColumnFilter: true,
      size: 150,
      cell: ({ row }) => (
        <div className="flex items-center gap-1.5 text-[15px] text-foreground">
          <MapPin className="h-4 w-4 text-primary" />
          <span>{String(row.getValue("branchName"))?.replace(/\s*Branch$/, "") || "N/A"}</span>
        </div>
      ),
    },
    {
      accessorKey: "approvalStatus",
      header: "Status",
      filterFn: statusFilterFn,
      size: 150,
      enableSorting: false,
      enableColumnFilter: true,
      cell: ({ row }) => {
        const approvalStatus = (row.getValue("approvalStatus") ||
          "PENDING") as keyof typeof clientBadgeStatusMap;
        const config = clientBadgeStatusMap[approvalStatus];

        return (
          <Badge
            variant={config.variant}
            className={cn("text-[13px] font-semibold rounded-md", config.className)}
          >
            {approvalStatus.replace(/_/g, " ").toUpperCase()}
          </Badge>
        );
      },
    },
    {
      accessorKey: "birthDate",
      header: "Date of Birth",
      size: 130,
      cell: ({ row }) => (
        <span className="text-[14px] text-muted-foreground">
          {formatDateToReadable(row.getValue("birthDate"), true)}
        </span>
      ),
    },
    {
      accessorKey: "createdAt",
      header: "Registered",
      size: 140,
      enableSorting: true,
      enableColumnFilter: false,
      cell: ({ row }) => (
        <span className="text-[14px] text-muted-foreground">
          {formatDateToReadable(row.getValue("createdAt"), true)}
        </span>
      ),
    },
  ];

  return baseColumns;
};
