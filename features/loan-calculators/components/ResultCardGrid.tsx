"use client";
import { motion } from "framer-motion";
import ResultCard from "@/features/loan-calculators/components/ResultCard";
import type { LucideIcon } from "lucide-react";
import type { Variants } from "framer-motion";

interface ResultItem {
  title: string;
  value: string;
  icon: LucideIcon;
  iconColor: string;
  bgGradient: string;
  textColorClass?: string;
  isHighlighted?: boolean;
}

interface ResultCardGridProps {
  title: string;
  titleIcon: LucideIcon;
  results: ResultItem[];
  columns?: string;
  variants?: Variants;
}

export function ResultCardGrid({
  title,
  titleIcon: TitleIcon,
  results,
  columns = "grid-cols-1 md:grid-cols-3",
  variants,
}: ResultCardGridProps) {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = variants || {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
      },
    },
  };

  return (
    <>
      <motion.div variants={itemVariants}>
        <div className="flex items-center mb-6">
          <TitleIcon className="h-5 w-5 mr-2 text-blue-500" />
          <h3 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 text-transparent bg-clip-text">
            {title}
          </h3>
        </div>
      </motion.div>

      <motion.div
        className={`grid ${columns} gap-6 mb-8`}
        variants={containerVariants}
      >
        {results.map((result, index) => (
          <motion.div key={index} variants={itemVariants}>
            <ResultCard
              title={result.title}
              value={result.value}
              icon={result.icon}
              iconColor={result.iconColor}
              bgGradient={result.bgGradient}
              textColorClass={result.textColorClass}
              isHighlighted={result.isHighlighted}
            />
          </motion.div>
        ))}
      </motion.div>
    </>
  );
}
