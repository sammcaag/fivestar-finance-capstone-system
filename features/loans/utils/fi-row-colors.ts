export function fiRowColors(row: any) {
  if (!row.original.dedCode) {
    return "";
  }
  const dedCode = row.original.dedCode;
  if (dedCode === "FI-1") {
    return "bg-green-100 dark:bg-green-900/50 hover:bg-green-300 dark:hover:bg-green-900/50";
  } else if (dedCode === "FI-2") {
    return "bg-blue-100 dark:bg-blue-900/50 hover:bg-blue-300 dark:hover:bg-blue-900/50";
  } else if (dedCode === "FI-3") {
    return "bg-amber-100 dark:bg-amber-900/50 hover:bg-amber-300 dark:hover:bg-amber-900/50";
  } else if (dedCode === "FI-4") {
    return "bg-purple-100 dark:bg-purple-900/50 hover:bg-purple-300 dark:hover:bg-purple-900/50";
  } else if (dedCode === "FI-5") {
    return "bg-red-100 dark:bg-red-900/50 hover:bg-red-300 dark:hover:bg-red-900/50";
  } else if (dedCode === "FI-6") {
    return "bg-cyan-100 dark:bg-cyan-900/50 hover:bg-cyan-300 dark:hover:bg-cyan-900/50";
  } else if (dedCode === "FI-7") {
    return "bg-rose-100 dark:bg-rose-900/50 hover:bg-rose-300 dark:hover:bg-rose-900/50";
  } else if (dedCode === "FI-8") {
    return "bg-lime-100 dark:bg-lime-900/50 hover:bg-lime-300 dark:hover:bg-lime-900/50";
  }
  return "";
}
