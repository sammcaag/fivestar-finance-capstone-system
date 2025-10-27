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
import { MoreHorizontal, Eye, Edit, Trash2 } from "lucide-react";
import { Loan } from "../../types/loan-types";

const getInitials = (name: string) => {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
};

const getAvatarColor = (name: string) => {
  const colors = [
    "bg-blue-500",
    "bg-purple-500",
    "bg-pink-500",
    "bg-green-500",
    "bg-orange-500",
    "bg-red-500",
  ];
  const index = name.charCodeAt(0) % colors.length;
  return colors[index];
};

const statusConfig = {
  "Approved by HQ": {
    bg: "bg-blue-100",
    text: "text-blue-800",
    label: "Approved by HQ",
  },
  Pending: { bg: "bg-yellow-100", text: "text-yellow-800", label: "Pending" },
  Disbursed: {
    bg: "bg-purple-100",
    text: "text-purple-800",
    label: "Disbursed",
  },
  Completed: { bg: "bg-green-100", text: "text-green-800", label: "Completed" },
  Rejected: { bg: "bg-destructive", text: "text-white", label: "Rejected" },
  "Forwarded to HQ": {
    bg: "bg-blue-100",
    text: "text-blue-800",
    label: "Forwarded to HQ",
  },
};

export const loansColumnDefinition: ColumnDef<Loan>[] = [
  {
    accessorKey: "name",
    header: "Client",
    cell: ({ row }) => {
      const loan = row.original;
      return (
        <div className="flex items-center gap-3">
          <Avatar className="size-12 border border-primary/10 flex-shrink-0">
            <AvatarImage src={`/avatar.png`} alt={row.getValue("name")} />
            <AvatarFallback className="bg-primary/5 text-primary">
              {(row.getValue("name") as string).substring(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="font-medium text-sm">{loan.name}</span>
            <span className="text-xs text-muted-foreground">{loan.id}</span>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: ({ row }) => {
      const amount = row.original.amount;
      return (
        <span className="font-semibold text-sm">
          ₱{amount.toLocaleString()}
        </span>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status;
      const config = statusConfig[status];
      if (!config) return <Badge>{status}</Badge>;
      return (
        <Badge className={`${config.bg} ${config.text}`}>{config.label}</Badge>
      );
    },
  },
  {
    accessorKey: "interestRate",
    header: "Interest Rate",
    cell: ({ row }) => (
      <span className="text-sm">{row.original.interestRate}%</span>
    ),
  },
  {
    accessorKey: "term",
    header: "Term (months)",
    cell: ({ row }) => (
      <span className="text-sm font-medium">{row.original.term}</span>
    ),
  },
  {
    accessorKey: "startDate",
    header: "Start Date",
    cell: ({ row }) => {
      const date = new Date(row.original.startDate);
      return <span className="text-sm">{date.toLocaleDateString()}</span>;
    },
  },
  {
    id: "actions",
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
