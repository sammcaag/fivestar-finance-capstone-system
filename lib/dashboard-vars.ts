import { Calculator, FileChartColumn, UserPlus } from "lucide-react";

const dashboardQuickActions = [
  {
    label: "Add New Client",
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

export {
  dashboardQuickActions,
  dashboardMotionContainer,
  dashboardMotionItem,
};
