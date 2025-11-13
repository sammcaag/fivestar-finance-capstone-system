// utils/client-badge-status-map.ts
export const clientBadgeStatusMap = {
  ACTIVE: {
    variant: "success",
    className:
      "capitalize bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-900/30 dark:text-green-300 dark:hover:bg-green-900/40",
  },
  PENDING: {
    variant: "warning",
    className:
      "capitalize bg-yellow-100 text-yellow-800 hover:bg-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-300 dark:hover:bg-yellow-900/40",
  },
  INACTIVE: {
    variant: "error",
    className:
      "capitalize bg-red-100 text-red-800 hover:bg-red-200 dark:bg-red-900/30 dark:text-red-300 dark:hover:bg-red-900/40",
  },
  PROCESSED: {
    variant: "default",
    className:
      "capitalize bg-purple-100 text-purple-800 hover:bg-purple-200 dark:bg-purple-900/30 dark:text-purple-300 dark:hover:bg-purple-900/40",
  },
  RELEASED: {
    variant: "default",
    className:
      "capitalize bg-blue-100 text-blue-800 hover:bg-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:hover:bg-blue-900/40",
  },
} as const;
