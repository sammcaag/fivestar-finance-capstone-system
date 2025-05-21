import { Clock, CreditCard, DollarSign, Users } from "lucide-react";
import { StatisticProps } from "../types/types-clients";

export const dashboardStatistics: StatisticProps[] = [
  {
    title: "Total Active Loan",
    statistic: 342,
    summary: "+3.1% from last month",
    Icon: CreditCard,
  },
  {
    title: "Pending Approvals",
    statistic: 28,
    summary: " +12 new since yesterday",
    Icon: Clock,
  },
  {
    title: "Disbursements Today",
    statistic: "₱45,270",
    summary: "+8.2% from yesterday",
    Icon: DollarSign,
  },
];

export const clientsOverviewStatistics: StatisticProps[] = [
  {
    title: "Total Clients",
    statistic: 1242,
    summary: "+12% from last month",
    Icon: Users,
  },
  {
    title: "Active Loans",
    statistic: 842,
    summary: "+4% from last month",
    Icon: CreditCard,
  },
  {
    title: "Total Portfolio",
    statistic: "₱4.2M",
    summary: "+8% from last month",
    Icon: DollarSign,
  },
  {
    title: "Overdue Payments",
    statistic: "₱24,500",
    summary: "-2% from last month",
    Icon: DollarSign,
  },
];
