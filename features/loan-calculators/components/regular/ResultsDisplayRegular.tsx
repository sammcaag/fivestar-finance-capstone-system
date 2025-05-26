"use client";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import CustomDatePicker from "@/components/CustomDatePicker";
import type { ResultsDisplayProps } from "../../types/types-regular";
import {
  Calendar,
  DollarSign,
  Percent,
  Calculator,
  AlertTriangle,
} from "lucide-react";
import ResultCard from "../ResultCard";

export default function ResultsDisplay({
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
}: ResultsDisplayProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.2,
      },
    },
  };

  return (
    <motion.div
      className="space-y-6"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div variants={itemVariants}>
        <div className="flex items-center mb-6">
          <Calculator className="h-5 w-5 mr-2 text-blue-500" />
          <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200">
            Computation Results
          </h3>
        </div>
      </motion.div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6"
        variants={containerVariants}
      >
        <motion.div variants={itemVariants}>
          <ResultCard
            title="Effective Interest Rate (EIR)"
            value={effectiveInterestRate}
            icon={Percent}
            iconColor="text-blue-500"
            bgGradient="from-blue-50 to-blue-100 dark:from-blue-950/40 dark:to-blue-900/20"
          />
        </motion.div>
        <motion.div variants={itemVariants}>
          <ResultCard
            title="GP Factor"
            value={gpFactor}
            icon={Calculator}
            iconColor="text-cyan-500"
            bgGradient="from-cyan-50 to-cyan-100 dark:from-cyan-950/40 dark:to-cyan-900/20"
          />
        </motion.div>
      </motion.div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6"
        variants={containerVariants}
      >
        <motion.div variants={itemVariants}>
          <ResultCard
            title="Principal Amount (PN)"
            value={principalAmount}
            icon={DollarSign}
            iconColor="text-emerald-500"
            bgGradient="from-emerald-50 to-emerald-100 dark:from-emerald-950/40 dark:to-emerald-900/20"
          />
        </motion.div>
        <motion.div variants={itemVariants}>
          <ResultCard
            title="Unearned Interest (UI)"
            value={unearnedInterest}
            icon={DollarSign}
            iconColor="text-amber-500"
            bgGradient="from-amber-50 to-amber-100 dark:from-amber-950/40 dark:to-amber-900/20"
          />
        </motion.div>
        <motion.div variants={itemVariants}>
          <ResultCard
            title="Gross Proceeds (GP)"
            value={grossProceeds}
            icon={DollarSign}
            iconColor="text-indigo-500"
            bgGradient="from-indigo-50 to-indigo-100 dark:from-indigo-950/40 dark:to-indigo-900/20"
          />
        </motion.div>
      </motion.div>

      <Separator className="my-6" />

      <motion.div variants={itemVariants}>
        <div className="flex items-center mb-6">
          <AlertTriangle className="h-5 w-5 mr-2 text-amber-500" />
          <Label className="text-xl font-bold text-gray-800 dark:text-gray-200">
            Other Deductions
          </Label>
        </div>
      </motion.div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6"
        variants={containerVariants}
      >
        <motion.div variants={itemVariants}>
          <ResultCard
            title="Documentary Stamp (DST)"
            value={documentaryStamp}
            textColorClass="text-red-500"
            icon={DollarSign}
            iconColor="text-red-500"
            bgGradient="from-red-50 to-red-100 dark:from-red-950/40 dark:to-red-900/20"
          />
        </motion.div>
        <motion.div variants={itemVariants}>
          <ResultCard
            title="Gross Revenue Tax (GRT)"
            value={grossRevenueTax}
            textColorClass="text-red-500"
            icon={DollarSign}
            iconColor="text-red-500"
            bgGradient="from-red-50 to-red-100 dark:from-red-950/40 dark:to-red-900/20"
          />
        </motion.div>
        <motion.div variants={itemVariants}>
          <ResultCard
            title="Insurance (CRIP)"
            value={insurance}
            textColorClass="text-red-500"
            icon={DollarSign}
            iconColor="text-red-500"
            bgGradient="from-red-50 to-red-100 dark:from-red-950/40 dark:to-red-900/20"
          />
        </motion.div>
        <motion.div variants={itemVariants}>
          <ResultCard
            title="TOTAL"
            value={totalDeductions}
            textColorClass="text-red-500"
            icon={DollarSign}
            iconColor="text-red-500"
            bgGradient="from-red-50 to-red-100 dark:from-red-950/40 dark:to-red-900/20"
            isHighlighted={true}
          />
        </motion.div>
      </motion.div>

      <Separator className="my-6" />

      <motion.div variants={itemVariants}>
        <Card className="overflow-hidden shadow-md bg-gradient-to-r from-green-50 to-emerald-100 dark:from-green-950/40 dark:to-emerald-900/20">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <h3 className="text-xl font-bold flex items-center text-gray-800 dark:text-gray-200">
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
                  delay: 0.3,
                }}
              >
                {netAmount}
              </motion.span>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <Separator className="my-6" />

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
        variants={containerVariants}
      >
        <motion.div variants={itemVariants} className="space-y-2">
          <Label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center">
            <Calendar className="h-5 w-5 mr-2 text-blue-500" />
            Value Date
          </Label>
          <div className="h-12 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 shadow-sm">
            <CustomDatePicker
              date={valueDate}
              setDate={setValueDate}
              editable={false}
              customDateFormat="MMMM d, yyyy"
            />
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="space-y-2">
          <Label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center">
            <Calendar className="h-5 w-5 mr-2 text-blue-500" />
            Maturity Date
          </Label>
          <div className="h-12 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 shadow-sm">
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
