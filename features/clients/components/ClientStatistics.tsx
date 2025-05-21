"use client";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { CountUp } from "@/components/motion-primitives/count-up";

type StatisticProps = {
  title: string;
  statistic: string | number;
  summary: string;
  Icon: LucideIcon;
};

type StatsCardProps = {
  title: string;
  statistics: string | number;
  summary: string;
  Icon: LucideIcon;
  index: number;
};

const StatCards = ({
  title,
  statistics,
  summary,
  Icon,
  index,
}: StatsCardProps) => {
  const isNumber =
    typeof statistics === "number" ||
    !isNaN(Number.parseFloat(statistics as string));
  const numericValue = isNumber ? Number.parseFloat(statistics as string) : 0;
  const formattedValue = isNumber
    ? statistics.toString().includes("%")
      ? `${numericValue}%`
      : statistics.toString().includes("$")
      ? `$${numericValue}`
      : numericValue
    : statistics;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 100, y: 0 }}
      transition={{
        delay: index * 0.05,
        duration: 0.3,
        ease: "easeOut",
      }}
      whileHover={{
        y: -3,
        transition: {
          duration: 0.2,
          ease: "easeOut",
        },
      }}
      className="framer-motion-fix"
    >
      <Card className="overflow-hidden border-none rounded-lg shadow-md transition-all duration-300 hover:shadow-lg">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-950/40 dark:to-cyan-950/40 rounded-lg"></div>
        <CardHeader className="relative flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">{title}</CardTitle>
          <div className="rounded-full bg-primary/10 p-2 text-primary">
            <Icon className="h-4 w-4" />
          </div>
        </CardHeader>
        <CardContent className="relative">
          <div className="text-2xl font-bold">
            {isNumber ? (
              <CountUp
                end={numericValue}
                prefix={statistics.toString().includes("$") ? "$" : ""}
                suffix={statistics.toString().includes("%") ? "%" : ""}
              />
            ) : (
              formattedValue
            )}
          </div>
          <p className="text-xs text-muted-foreground">{summary}</p>
        </CardContent>
      </Card>
    </motion.div>
  );
};

const ClientStatistics = ({ statistics }: { statistics: StatisticProps[] }) => {
  return (
    <section
      className={cn(
        "grid gap-4 md:grid-cols-3",
        statistics.length === 3 ? "md:grid-cols-3" : ""
      )}
    >
      {statistics.map((data, index) => (
        <StatCards
          title={data.title}
          statistics={data.statistic}
          summary={data.summary}
          Icon={data.Icon}
          index={index}
          key={data.title}
        />
      ))}
    </section>
  );
};

export default ClientStatistics;
