"use client";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { CountUp } from "@/components/motion-primitives/count-up";
import { StatisticProps } from "@/features/clients/types/global-types";

type StatsCardProps = {
  statistics: StatisticProps[];
};

export default function StatisticsCard({ statistics }: StatsCardProps) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 10 },
        show: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.3,
            ease: "easeOut",
          },
        },
      }}
      className={cn(
        "grid gap-4",
        statistics.length === 3 ? "md:grid-cols-3" : "md:grid-cols-4"
      )}
    >
      {statistics.map((data, index) => {
        const { title, statistic, summary, icon: Icon } = data;
        const isNumber =
          typeof statistic === "number" ||
          !isNaN(Number.parseFloat(statistic as string));
        const numericValue = isNumber
          ? Number.parseFloat(statistic as string)
          : 0;
        const formattedValue = isNumber
          ? statistic.toString().includes("%")
            ? `${numericValue}%`
            : statistic.toString().includes("$")
            ? `$${numericValue}`
            : numericValue
          : statistic;
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
            key={index}
            className="framer-motion-fix"
          >
            <Card className="overflow-hidden border-none rounded-lg shadow-md transition-all duration-300 hover:shadow-lg">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-primary/15 dark:from-blue-950/40 dark:to-cyan-950/40 rounded-lg"></div>
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
                      prefix={statistic.toString().includes("$") ? "$" : ""}
                      suffix={statistic.toString().includes("%") ? "%" : ""}
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
      })}
    </motion.div>
  );
}
