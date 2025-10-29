import { Calculator, FileChartColumn, Search, UserPlus } from "lucide-react";

const dashboardQuickActions = [
  {
    label: "Register New Client",
    href: "/clients/register",
    icon: UserPlus,
  },
  {
    label: "New Client Computation",
    href: "/loans/computations/new-client",
    icon: Calculator,
  },
  {
    label: "View Reports",
    href: "/reports",
    icon: FileChartColumn,
  },
  {
    label: "Search Client",
    href: "/#",
    icon: Search,
  },
];

const dashboardMotionContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      ease: "easeOut",
    },
  },
};

const dashboardMotionItem = {
  hidden: { opacity: 0, y: 10 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  },
};

export { dashboardQuickActions, dashboardMotionContainer, dashboardMotionItem };
