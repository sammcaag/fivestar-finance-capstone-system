import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

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

export default StatCards;
