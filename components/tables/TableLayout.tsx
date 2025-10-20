import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import TableRowLoadingState from "./TableRowLoadingState";
import { ClientsFilter } from "@/features/clients/components/ClientsFilter";
import clsx from "clsx";

export default function TableLayout({
  children,
  title,
  description,
  isLoading,
  dashboard,
  hasFilter = true,
}: {
  children: React.ReactNode;
  title: string;
  description: string;
  isLoading?: boolean;
  dashboard?: boolean;
  hasFilter?: boolean;
}) {
  if (isLoading) {
    return <TableRowLoadingState dashboard={dashboard} />;
  }
  return (
    <Card className="overflow-hidden flex-1">
      {/* Table Card Header */}
      <CardHeader
        className={clsx(
          "",
          dashboard &&
            "bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-950/40 dark:to-cyan-950/40"
        )}
      >
        <CardTitle className="h4">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
        {hasFilter && !dashboard && <ClientsFilter />}
      </CardHeader>

      {/* Table Card Content */}
      <CardContent className="p-0  border rounded-b-xl">{children}</CardContent>
    </Card>
  );
}
