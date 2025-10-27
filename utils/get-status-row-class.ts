export function getStatusRowClass(row: any) {
  if (!row.original.status) {
    return "";
  }
  let status = row.original.status as string;
  status = status.toLowerCase();

  if (status === "active" || status === "completed") {
    return "bg-green-50/50 dark:bg-green-950/10";
  }

  if (
    status === "inactive" ||
    status === "rejected" ||
    status === "cancelled"
  ) {
    return "bg-red-50/50 dark:bg-red-950/10";
  }
  if (status === "pending") {
    return "bg-yellow-50/50 dark:bg-yellow-950/10";
  }

  if (status === "scheduled") {
    return "bg-blue-50/50 dark:bg-blue-950/10";
  }
  if (status === "no-show") {
    return "bg-gray-50 dark:bg-gray-950/10";
  }
  if (status.includes("approved") || status.includes("forwarded")) {
    return "bg-blue-50/50 dark:bg-blue-950/10";
  }
  if (status === "disbursed") {
    return "bg-purple-50/50 dark:bg-purple-950/10";
  }
  return "";
}
