export function getStatusRowClass(row: any) {
  if (!row.original.status) {
    return "";
  }
  const status = row.original.status;

  switch (status) {
    case "active":
      return "bg-green-50/50 dark:bg-green-950/10";
    case "pending":
      return "bg-yellow-50/50 dark:bg-yellow-950/10";
    case "inactive":
      return "bg-red-50/50 dark:bg-red-950/10";
    default:
      return "";
  }
}
