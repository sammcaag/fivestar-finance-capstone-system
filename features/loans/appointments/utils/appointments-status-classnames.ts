export function appointmentStatusClassNames(status: string) {
  switch (status) {
    case "Scheduled":
      return {
        bg: "bg-blue-100",
        text: "text-blue-800",
        label: "Scheduled",
      };
    case "Completed":
      return {
        bg: "bg-green-100",
        text: "text-green-800",
        label: "Completed",
      };
    case "Cancelled":
      return {
        bg: "bg-red-100",
        text: "text-red-800",
        label: "Cancelled",
      };
    case "No-show":
      return {
        bg: "bg-gray-100",
        text: "text-gray-800",
        label: "No-show",
      };
    default:
      break;
  }
}
