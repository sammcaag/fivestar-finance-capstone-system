import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import { StatisticProps } from "@/features/clients/types/types-clients";
import { cn } from "@/lib/utils";

type StatsCardProps = {
  title: string;
  statistics: string | number;
  summary: string;
  Icon: LucideIcon;
};

const StatCards = ({ title, statistics, summary, Icon }: StatsCardProps) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{statistics}</div>
        <p className="text-xs text-muted-foreground">{summary}</p>
      </CardContent>
    </Card>
  );
};

const ClientStatistics = ({ statistics }: { statistics: StatisticProps[] }) => {
  return (
    <section
      className={cn(
        "grid gap-4 md:grid-cols-3",
        statistics.length === 4 ? "md:grid-cols-4" : ""
      )}
    >
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

export default ClientStatistics;
