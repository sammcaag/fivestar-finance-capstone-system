"use client";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { CountUp } from "@/components/motion-primitives/count-up";
import { StatisticProps } from "@/types/global-types";

type StatsCardProps = {
  statistics: StatisticProps[];
};

export default function StatisticsCard({ statistics }: StatsCardProps) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0 },
        show: {
          opacity: 1,
          transition: {
            staggerChildren: 0.1,
          },
        },
      }}
      initial="hidden"
      animate="show"
      className={cn("grid gap-4", statistics.length === 3 ? "md:grid-cols-3" : "md:grid-cols-4")}
    >
      {statistics.map((data, index) => {
        const { title, statistic, summary, icon: Icon } = data;

        const isNumber =
          typeof statistic === "number" || !isNaN(Number.parseFloat(statistic as string));

        const numericValue = isNumber ? Number.parseFloat(statistic as string) : 0;
        const hasDollar = statistic.toString().includes("$");
        const hasPercent = statistic.toString().includes("%");

        return (
          <motion.div
            key={index}
            variants={{
              hidden: { opacity: 0, y: 15 },
              show: {
                opacity: 1,
                y: 0,
                transition: {
                  type: "spring",
                  stiffness: 140,
                  damping: 20,
                  delay: index * 0.1,
                },
              },
            }}
            whileHover={{
              y: -4,
              transition: {
                duration: 0.3,
                ease: "easeOut",
              },
            }}
            className={cn("framer-motion-fix hover-card", "hover:shadow-lg")}
          >
            <Card className="relative overflow-hidden rounded-lg border bg-card shadow-md transition-all">
              {/* Gradient overlay using your theme */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-primary/5 to-primary/15 dark:from-[hsl(216,100%,58%,0.1)] dark:to-[hsl(190,100%,50%,0.1)] rounded-lg" />

              <CardHeader className="relative flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-card-foreground">{title}</CardTitle>
                <div className="rounded-full bg-primary/10 p-2 text-primary">
                  <Icon className="h-4 w-4" />
                </div>
              </CardHeader>

              <CardContent className="relative">
                <div className="text-2xl font-bold text-card-foreground">
                  {isNumber ? (
                    <CountUp
                      end={numericValue}
                      prefix={hasDollar ? "$" : ""}
                      suffix={hasPercent ? "%" : ""}
                      duration={2.2}
                      decimals={hasDollar || hasPercent ? 2 : 0}
                    />
                  ) : (
                    statistic
                  )}
                </div>
                <p className="muted">{summary}</p>
              </CardContent>
            </Card>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
