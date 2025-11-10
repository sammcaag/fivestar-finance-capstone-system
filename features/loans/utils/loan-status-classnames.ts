export function loanStatusClassNames(status: string) {
  switch (status) {
    case "Approved by HQ":
      return {
        bg: "bg-blue-100",
        text: "text-blue-800",
        label: "Approved by HQ",
      };
    case "Pending":
      return {
        bg: "bg-yellow-100",
        text: "text-yellow-800",
        label: "Pending",
      };
    case "Disbursed":
      return {
        bg: "bg-purple-100",
        text: "text-purple-800",
        label: "Disbursed",
      };
    case "Completed":
      return {
        bg: "bg-green-100",
        text: "text-green-800",
        label: "Completed",
      };
    case "Rejected":
      return {
        bg: "bg-destructive",
        text: "text-white",
        label: "Rejected",
      };
    case "Forwarded to HQ":
      return {
        bg: "bg-blue-100",
        text: "text-blue-800",
        label: "Forwarded to HQ",
      };
    default:
      break;
  }
}
