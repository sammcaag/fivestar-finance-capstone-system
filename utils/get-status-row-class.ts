interface RowData {
  original: {
    status?: string;
  };
}

export function getStatusRowClass(row: RowData): string {
  if (!row.original.status) {
    return "";
  }

  const status = row.original.status.toLowerCase();

  const statusClassMap: Record<string, string> = {
    // Green Group
    active: "bg-green-50/50 dark:bg-green-950/10",
    completed: "bg-green-50/50 dark:bg-green-950/10",
    // Red Group
    inactive: "bg-red-50/50 dark:bg-red-950/10",
    rejected: "bg-red-50/50 dark:bg-red-950/10",
    cancelled: "bg-red-50/50 dark:bg-red-950/10",
    // Yellow Group
    pending: "bg-yellow-50/50 dark:bg-yellow-950/10",
    // Gray Group
    "no-show": "bg-gray-50 dark:bg-gray-950/10",
    // Purple Group
    disbursed: "bg-purple-50/50 dark:bg-purple-950/10",
    processed: "bg-purple-50/50 dark:bg-purple-950/10",
  };

  // Handle exact matches
  if (status in statusClassMap) {
    return statusClassMap[status];
  }

  // Handle partial matches (e.g., "approved", "forwarded")
  if (status.includes("approved") || status.includes("forwarded")) {
    return "bg-blue-50/50 dark:bg-blue-950/10";
  }

  // Handle "scheduled" as a special case
  if (status === "scheduled") {
    return "bg-blue-50/50 dark:bg-blue-950/10";
  }

  return "";
}
