import { Clock, CreditCard, PhilippinePeso, Users } from "lucide-react";
import { StatisticProps } from "../types/global-types";

export const dashboardStatistics: StatisticProps[] = [
  {
    title: "Total Active Loan",
    statistic: 342,
    summary: "+3.1% from last month",
    icon: CreditCard,
  },
  {
    title: "Pending Approvals",
    statistic: 28,
    summary: " +12 new since yesterday",
    icon: Clock,
  },
  {
    title: "Disbursements Today",
    statistic: "₱ 45,270",
    summary: "+8.2% from yesterday",
    icon: PhilippinePeso,
  },
];

export const clientsOverviewStatistics: StatisticProps[] = [
  {
    title: "Total Clients",
    statistic: 1242,
    summary: "+12% from last month",
    icon: Users,
  },
  {
    title: "Active Loans",
    statistic: 842,
    summary: "+4% from last month",
    icon: CreditCard,
  },
  {
    title: "Total Portfolio",
    statistic: "₱ 4.2M",
    summary: "+8% from last month",
    icon: PhilippinePeso,
  },
];

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
