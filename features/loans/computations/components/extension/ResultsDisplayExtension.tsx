"use client";
import { motion } from "framer-motion";
import { Label } from "@/components/ui/label";
import CustomDatePicker from "@/components/CustomDatePicker";
import { Calendar, DollarSign, Percent, Calculator, AlertTriangle } from "lucide-react";
import type { ResultsDisplayProps, ResultsDisplayDatesProps } from "../../types/types-extension";
import ResultCard from "../ResultCard";
import ResultOutline from "./ResultOutline";

export default function ResultsDisplayExtension({
  extensionOiRate,
  extensionGpFactor,
  extensionPrincipalAmount,
  extensionUnearnedInterest,
  extensionGrossProceeds,
  extensionDocumentaryStamp,
  extensionGrossRevenueTax,
  extensionInsurance,
  extensionTotal,
  extensionValueDate,
  setExtensionValueDate,
  extensionMaturityDate,
  setExtensionMaturityDate,
  renewalExtensionEffectiveInterestRate,
  renewalExtensionGpFactor,
  renewalExtensionPrincipalAmount,
  renewalExtensionUnearnedInterest,
  renewalExtensionGrossProceeds,
  renewalExtensionDocumentaryStamp,
  renewalExtensionGrossRevenueTax,
  renewalExtensionInsurance,
  renewalExtensionTotal,
  renewalExtensionValueDate,
  setRenewalExtensionValueDate,
  renewalExtensionMaturityDate,
  setRenewalExtensionMaturityDate,
}: ResultsDisplayProps & ResultsDisplayDatesProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
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
    <motion.div
      className="space-y-8"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div variants={itemVariants}>
        <div className="flex items-center mb-6">
          <Calculator className="h-5 w-5 mr-2 text-blue-500" />
          <h3 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 text-transparent bg-clip-text">
            Computation Results
          </h3>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Extension Column */}
        <motion.div className="space-y-6" variants={containerVariants}>
          <motion.div variants={itemVariants}>
            <h3 className="text-lg font-semibold text-center p-3 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-950/40 dark:to-cyan-900/20 rounded-lg shadow-sm border border-gray-200 dark:border-gray-800">
              EXTENSION
            </h3>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
            variants={containerVariants}
          >
            <motion.div variants={itemVariants}>
              <ResultCard
                title="OI Rate"
                value={extensionOiRate}
                icon={Percent}
                iconColor="text-blue-500"
                bgGradient="from-blue-50 to-blue-100 dark:from-blue-950/40 dark:to-blue-900/20"
              />
            </motion.div>
            <motion.div variants={itemVariants}>
              <ResultCard
                title="GP Factor"
                value={extensionGpFactor}
                icon={Calculator}
                iconColor="text-cyan-500"
                bgGradient="from-cyan-50 to-cyan-100 dark:from-cyan-950/40 dark:to-cyan-900/20"
              />
            </motion.div>
          </motion.div>

          <motion.div className="grid grid-cols-1 gap-4" variants={containerVariants}>
            <motion.div variants={itemVariants}>
              <ResultCard
                title="Principal Amount (PN)"
                value={extensionPrincipalAmount}
                icon={DollarSign}
                iconColor="text-emerald-500"
                bgGradient="from-emerald-50 to-emerald-100 dark:from-emerald-950/40 dark:to-emerald-900/20"
              />
            </motion.div>
            <motion.div variants={itemVariants}>
              <ResultCard
                title="Unearned Interest (UI)"
                value={extensionUnearnedInterest}
                icon={DollarSign}
                iconColor="text-amber-500"
                bgGradient="from-amber-50 to-amber-100 dark:from-amber-950/40 dark:to-amber-900/20"
              />
            </motion.div>
            <motion.div variants={itemVariants}>
              <ResultCard
                title="Gross Proceeds (GP)"
                value={extensionGrossProceeds}
                icon={DollarSign}
                iconColor="text-indigo-500"
                bgGradient="from-indigo-50 to-indigo-100 dark:from-indigo-950/40 dark:to-indigo-900/20"
              />
            </motion.div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <div className="flex items-center mb-4">
              <AlertTriangle className="h-5 w-5 mr-2 text-amber-500" />
              <Label className="text-lg font-bold">Other Deductions</Label>
            </div>
          </motion.div>

          <motion.div
            className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-4 shadow-sm"
            variants={containerVariants}
          >
            <ResultOutline
              title="Documentary Stamp (DST)"
              value={extensionDocumentaryStamp}
              textColorClass="text-red-500 dark:text-red-400"
            />
            <ResultOutline
              title="Gross Revenue Tax (GRT)"
              value={extensionGrossRevenueTax}
              textColorClass="text-red-500 dark:text-red-400"
            />
            <ResultOutline
              title="Insurance (CRIP)"
              value={extensionInsurance}
              textColorClass="text-red-500 dark:text-red-400"
            />
            <ResultOutline
              title="TOTAL"
              value={extensionTotal}
              textColorClass="text-red-600 dark:text-red-500 font-bold"
              isOutline={false}
            />
          </motion.div>

          <motion.div className="grid grid-cols-1 gap-6" variants={containerVariants}>
            <motion.div variants={itemVariants} className="space-y-3">
              <Label className="text-lg font-semibold flex items-center">
                <Calendar className="h-5 w-5 mr-2 text-blue-500" />
                Value Date
              </Label>
              <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 shadow-sm">
                <CustomDatePicker
                  date={extensionValueDate}
                  setDate={setExtensionValueDate}
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
                  date={extensionMaturityDate}
                  setDate={setExtensionMaturityDate}
                  editable={false}
                  customDateFormat="MMMM d, yyyy"
                />
              </div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Renewal Extension Column */}
        <motion.div className="space-y-6" variants={containerVariants}>
          <motion.div variants={itemVariants}>
            <h3 className="text-lg font-semibold text-center p-3 bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-950/40 dark:to-indigo-900/20 rounded-lg shadow-sm border border-gray-200 dark:border-gray-800">
              EXTENSION REN-E
            </h3>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
            variants={containerVariants}
          >
            <motion.div variants={itemVariants}>
              <ResultCard
                title="Effective Interest Rate"
                value={renewalExtensionEffectiveInterestRate}
                icon={Percent}
                iconColor="text-purple-500"
                bgGradient="from-purple-50 to-purple-100 dark:from-purple-950/40 dark:to-purple-900/20"
              />
            </motion.div>
            <motion.div variants={itemVariants}>
              <ResultCard
                title="GP Factor"
                value={renewalExtensionGpFactor}
                icon={Calculator}
                iconColor="text-indigo-500"
                bgGradient="from-indigo-50 to-indigo-100 dark:from-indigo-950/40 dark:to-indigo-900/20"
              />
            </motion.div>
          </motion.div>

          <motion.div className="grid grid-cols-1 gap-4" variants={containerVariants}>
            <motion.div variants={itemVariants}>
              <ResultCard
                title="Principal Amount (PN)"
                value={renewalExtensionPrincipalAmount}
                icon={DollarSign}
                iconColor="text-emerald-500"
                bgGradient="from-emerald-50 to-emerald-100 dark:from-emerald-950/40 dark:to-emerald-900/20"
              />
            </motion.div>
            <motion.div variants={itemVariants}>
              <ResultCard
                title="Unearned Interest (UI)"
                value={renewalExtensionUnearnedInterest}
                icon={DollarSign}
                iconColor="text-amber-500"
                bgGradient="from-amber-50 to-amber-100 dark:from-amber-950/40 dark:to-amber-900/20"
              />
            </motion.div>
            <motion.div variants={itemVariants}>
              <ResultCard
                title="Gross Proceeds (GP)"
                value={renewalExtensionGrossProceeds}
                icon={DollarSign}
                iconColor="text-indigo-500"
                bgGradient="from-indigo-50 to-indigo-100 dark:from-indigo-950/40 dark:to-indigo-900/20"
              />
            </motion.div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <div className="flex items-center mb-4">
              <AlertTriangle className="h-5 w-5 mr-2 text-amber-500" />
              <Label className="text-lg font-bold">Other Deductions</Label>
            </div>
          </motion.div>

          <motion.div
            className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-4 shadow-sm"
            variants={containerVariants}
          >
            <ResultOutline
              title="Documentary Stamp (DST)"
              value={renewalExtensionDocumentaryStamp}
              textColorClass="text-red-500 dark:text-red-400"
            />
            <ResultOutline
              title="Gross Revenue Tax (GRT)"
              value={renewalExtensionGrossRevenueTax}
              textColorClass="text-red-500 dark:text-red-400"
            />
            <ResultOutline
              title="Insurance (CRIP)"
              value={renewalExtensionInsurance}
              textColorClass="text-red-500 dark:text-red-400"
            />
            <ResultOutline
              title="TOTAL"
              value={renewalExtensionTotal}
              textColorClass="text-red-600 dark:text-red-500 font-bold"
              isOutline={false}
            />
          </motion.div>

          <motion.div className="grid grid-cols-1 gap-6" variants={containerVariants}>
            <motion.div variants={itemVariants} className="space-y-3">
              <Label className="text-lg font-semibold flex items-center">
                <Calendar className="h-5 w-5 mr-2 text-blue-500" />
                Value Date
              </Label>
              <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 shadow-sm">
                <CustomDatePicker
                  date={renewalExtensionValueDate}
                  setDate={setRenewalExtensionValueDate}
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
                  date={renewalExtensionMaturityDate}
                  setDate={setRenewalExtensionMaturityDate}
                  editable={false}
                  customDateFormat="MMMM d, yyyy"
                />
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}
