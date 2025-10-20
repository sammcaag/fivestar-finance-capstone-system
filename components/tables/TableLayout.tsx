import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import TableRowLoadingState from "./TableRowLoadingState";

export default function TableLayout({
  children,
  title,
  description,
  isLoading,
  dashboard,
}: {
  children: React.ReactNode;
  title: string;
  description: string;
  isLoading?: boolean;
  dashboard?: boolean;
}) {
  if (isLoading) {
    return <TableRowLoadingState dashboard={dashboard} />;
  }
  return (
    <Card className="overflow-hidden flex-1">
      {/* Table Card Header */}
      <CardHeader className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-950/40 dark:to-cyan-950/40">
        <CardTitle className="h4">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      {/* Table Card Content */}
      <CardContent className="p-0 border rounded-b-xl">{children}</CardContent>
    </Card>
  );
}
