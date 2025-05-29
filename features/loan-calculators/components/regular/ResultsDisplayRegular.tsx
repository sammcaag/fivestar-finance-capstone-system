"use client";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import CustomDatePicker from "@/components/CustomDatePicker";
import type { Variants } from "framer-motion";
import {
  Calendar,
  DollarSign,
  Percent,
  Calculator,
  AlertTriangle,
} from "lucide-react";
import { ResultsDisplayRegularProps } from "../../types/types-regular";
import { ResultCardGrid } from "../ResultCardGrid";

export default function ResultsDisplayRegularRefactored({
  effectiveInterestRate,
  gpFactor,
  principalAmount,
  unearnedInterest,
  grossProceeds,
  documentaryStamp,
  grossRevenueTax,
  insurance,
  totalDeductions,
  netAmount,
  valueDate,
  setValueDate,
  maturityDate,
  setMaturityDate,
}: ResultsDisplayRegularProps) {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
      },
    },
  };

  const mainResults = [
    {
      title: "Effective Interest Rate (EIR)",
      value: effectiveInterestRate,
      icon: Percent,
      iconColor: "text-blue-500",
      bgGradient:
        "from-blue-50 to-blue-100 dark:from-blue-950/40 dark:to-blue-900/20",
    },
    {
      title: "GP Factor",
      value: gpFactor,
      icon: Calculator,
      iconColor: "text-cyan-500",
      bgGradient:
        "from-cyan-50 to-cyan-100 dark:from-cyan-950/40 dark:to-cyan-900/20",
    },
  ];

  const amountResults = [
    {
      title: "Principal Amount (PN)",
      value: principalAmount,
      icon: DollarSign,
      iconColor: "text-emerald-500",
      bgGradient:
        "from-emerald-50 to-emerald-100 dark:from-emerald-950/40 dark:to-emerald-900/20",
    },
    {
      title: "Unearned Interest (UI)",
      value: unearnedInterest,
      icon: DollarSign,
      iconColor: "text-amber-500",
      bgGradient:
        "from-amber-50 to-amber-100 dark:from-amber-950/40 dark:to-amber-900/20",
    },
    {
      title: "Gross Proceeds (GP)",
      value: grossProceeds,
      icon: DollarSign,
      iconColor: "text-indigo-500",
      bgGradient:
        "from-indigo-50 to-indigo-100 dark:from-indigo-950/40 dark:to-indigo-900/20",
    },
  ];

  const deductionResults = [
    {
      title: "Documentary Stamp (DST)",
      value: documentaryStamp,
      icon: DollarSign,
      iconColor: "text-red-500",
      bgGradient:
        "from-red-50 to-red-100 dark:from-red-950/40 dark:to-red-900/20",
      textColorClass: "text-red-500",
    },
    {
      title: "Gross Revenue Tax (GRT)",
      value: grossRevenueTax,
      icon: DollarSign,
      iconColor: "text-red-500",
      bgGradient:
        "from-red-50 to-red-100 dark:from-red-950/40 dark:to-red-900/20",
      textColorClass: "text-red-500",
    },
    {
      title: "Insurance (CRIP)",
      value: insurance,
      icon: DollarSign,
      iconColor: "text-red-500",
      bgGradient:
        "from-red-50 to-red-100 dark:from-red-950/40 dark:to-red-900/20",
      textColorClass: "text-red-500",
    },
    {
      title: "TOTAL",
      value: totalDeductions,
      icon: DollarSign,
      iconColor: "text-red-500",
      bgGradient:
        "from-red-50 to-red-100 dark:from-red-950/40 dark:to-red-900/20",
      textColorClass: "text-red-500",
      isHighlighted: true,
    },
  ];

  return (
    <motion.div
      className="space-y-8"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <ResultCardGrid
        title="Computation Results"
        titleIcon={Calculator}
        results={mainResults}
        columns="grid-cols-1 md:grid-cols-2"
        variants={itemVariants}
      />

      <ResultCardGrid
        title=""
        titleIcon={DollarSign}
        results={amountResults}
        columns="grid-cols-1 md:grid-cols-3"
        variants={itemVariants}
      />

      <Separator className="my-8" />

      <ResultCardGrid
        title="Other Deductions"
        titleIcon={AlertTriangle}
        results={deductionResults}
        columns="grid-cols-1 md:grid-cols-4"
        variants={itemVariants}
      />

      <Separator className="my-8" />

      {/* Net Amount Card */}
      <motion.div variants={itemVariants}>
        <Card className="overflow-hidden border-none shadow-lg bg-gradient-to-r from-green-50 to-emerald-100 dark:from-green-950/40 dark:to-emerald-900/20">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <h3 className="text-xl font-bold flex items-center">
                <DollarSign className="h-5 w-5 mr-2 text-green-500" />
                NET Amount:
              </h3>
              <motion.span
                className="text-3xl font-bold text-green-600 dark:text-green-400"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 200,
                  damping: 10,
                  delay: 0.5,
                }}
              >
                {netAmount}
              </motion.span>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <Separator className="my-8" />

      {/* Date Fields */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-8"
        variants={containerVariants}
      >
        <motion.div variants={itemVariants} className="space-y-3">
          <Label className="text-lg font-semibold flex items-center">
            <Calendar className="h-5 w-5 mr-2 text-blue-500" />
            Value Date
          </Label>
          <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 shadow-sm">
            <CustomDatePicker
              date={valueDate}
              setDate={setValueDate}
              editable={false}
              customDateFormat="MMMM d, yyyy"
            />
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="space-y-3">
          <Label className="text-lg font-semibold flex items-center">
            <Calendar className="h-5 w-5 mr-2 text-blue-500" />
            Maturity Date
          </Label>
          <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 shadow-sm">
            <CustomDatePicker
              date={maturityDate}
              setDate={setMaturityDate}
              editable={false}
              customDateFormat="MMMM d, yyyy"
            />
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
