import { Clock, CreditCard, DollarSign } from "lucide-react";
import StatCards from "@/features/stats/components/StatCards";

const statistics = [
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
    statistic: "$45,270",
    summary: "+8.2% from yesterday",
    Icon: DollarSign,
  },
];
const Statistics = () => {
  return (
    <section className="grid gap-4 md:grid-cols-3">
      {statistics.map((data) => (
        <StatCards
          title={data.title}
          statistics={data.statistic}
          summary={data.summary}
          Icon={data.Icon}
          key={data.title}
        />
      ))}
    </section>
  );
};

export default Statistics;
