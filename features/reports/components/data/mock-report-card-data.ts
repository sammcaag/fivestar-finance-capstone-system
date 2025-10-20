import { StatisticProps } from "@/features/clients/types/global-types";
import { CheckCircle, Clock, DollarSign, Users } from "lucide-react";

export const mockReportCardData: StatisticProps[] = [
  {
    title: "Total Applications",
    statistic: "1,284",
    summary: "+12.5%",
    icon: Users,
  },
  {
    title: "Approval Rate",
    statistic: "87.3%",
    summary: "+2.1%",
    icon: CheckCircle,
  },
  {
    title: "Total Disbursed",
    statistic: "₱45.2M",
    summary: "+18.7%",
    icon: DollarSign,
  },
  {
    title: "Pending Review",
    statistic: "127",
    summary: "23 urgent",
    icon: Clock,
  },
];
