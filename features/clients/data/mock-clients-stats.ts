import { Clock, UserCheck, Users } from "lucide-react";
import { StatisticProps } from "../../../types/global-types";

// for dashboard stats
export const dashboardStatistics: StatisticProps[] = [
  {
    title: "Total Clients",
    statistic: 1242,
    summary: "+12% from last month",
    icon: Users,
  },
  {
    title: "Active Clients",
    statistic: 893,
    summary: "Clients with ongoing loans",
    icon: UserCheck,
  },
  {
    title: "Pending Approvals",
    statistic: 28,
    summary: " +12 new since yesterday",
    icon: Clock,
  },
];

// for dashboard stats
export const reportStatusData = [
  {
    status: "Active Loans",
    count: 842,
    percentage: 67.5,
    color: "bg-green-500",
  },
  {
    status: "Pending Approval",
    count: 156,
    percentage: 12.5,
    color: "bg-blue-500",
  },
  {
    status: "Overdue Payments",
    count: 124,
    percentage: 9.9,
    color: "bg-red-500",
  },
  {
    status: "Completed Loans",
    count: 98,
    percentage: 7.9,
    color: "bg-gray-500",
  },
  {
    status: "Rejected Applications",
    count: 28,
    percentage: 2.2,
    color: "bg-gray-400",
  },
];
