// Updated to accept Row<any> from @tanstack/react-table (fixes TS error)
import { Row } from "@tanstack/react-table";

interface OriginalData {
  status?: string;
}

export function getStatusRowClass(row: Row<OriginalData>): string {
  if (!row.original.status) {
    return "";
  }

  const status = row.original.status.toLowerCase();

  const statusClassMap: Record<string, string> = {
    // Green Group
    active: "bg-green-50/50 hover:bg-green-200/80 dark:bg-green-800/10 dark:hover:bg-green-800/60",
    completed:
      "bg-green-50/50 hover:bg-green-200/80 dark:bg-green-800/10 dark:hover:bg-green-800/60",
    // Red Group
    inactive: "bg-red-50/50 hover:bg-red-200/80 dark:bg-red-800/10 dark:hover:bg-red-800/60",
    rejected: "bg-red-50/50 hover:bg-red-200/80 dark:bg-red-800/10 dark:hover:bg-red-800/60",
    cancelled: "bg-red-50/50 hover:bg-red-200/80 dark:bg-red-800/10 dark:hover:bg-red-800/60",
    // Yellow Group
    pending:
      "bg-yellow-50/50 hover:bg-yellow-200/80 dark:bg-yellow-800/10 dark:hover:bg-yellow-800/60",
    // Gray Group
    "no-show": "bg-gray-50 hover:bg-gray-200/80 dark:bg-gray-800/10 dark:hover:bg-gray-800/60",
    // Purple Group
    disbursed:
      "bg-purple-50/50 hover:bg-purple-200/80 dark:bg-purple-800/10 dark:hover:bg-purple-800/60",
    processed:
      "bg-purple-50/50 hover:bg-purple-200/80 dark:bg-purple-800/10 dark:hover:bg-purple-800/60",
  };

  // Handle exact matches
  if (status in statusClassMap) {
    return statusClassMap[status];
  }

  // Handle partial matches (Blue Group)
  if (status.includes("approved") || status.includes("forwarded") || status === "scheduled") {
    return "bg-blue-50/50 dark:bg-blue-950/10";
  }

  return "";
}
