"use client";
import { motion } from "framer-motion";
import { Calculator, DollarSign, RefreshCw, ArrowRightLeft } from "lucide-react";
import type { ReferencesDisplayProps } from "../../types/types-extension";
import { Separator } from "@/components/ui/separator";
import ResultCard from "../ResultCard";

export default function ReferencesDisplay({
  oiTerm,
  reneTerm,
  oiExtension,
  proceedsOfLoan,
  outstandingBalance,
  rebates,
  newUi,
  newGp,
}: ReferencesDisplayProps) {
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
            References
          </h3>
        </div>
      </motion.div>

      <motion.div className="grid grid-cols-1 sm:grid-cols-3 gap-8" variants={containerVariants}>
        <motion.div variants={itemVariants}>
          <ResultCard
            title="OI Term"
            value={oiTerm}
            icon={Calculator}
            iconColor="text-blue-500"
            bgGradient="from-blue-50 to-blue-100 dark:from-blue-950/40 dark:to-blue-900/20"
          />
        </motion.div>
        <motion.div variants={itemVariants}>
          <ResultCard
            title="REN-E Term"
            value={reneTerm}
            icon={Calculator}
            iconColor="text-purple-500"
            bgGradient="from-purple-50 to-purple-100 dark:from-purple-950/40 dark:to-purple-900/20"
          />
        </motion.div>
        <motion.div variants={itemVariants}>
          <ResultCard
            title="OI Extension"
            value={oiExtension}
            icon={DollarSign}
            iconColor="text-cyan-500"
            bgGradient="from-cyan-50 to-cyan-100 dark:from-cyan-950/40 dark:to-cyan-900/20"
          />
        </motion.div>
      </motion.div>

      <Separator className="my-4" />

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 gap-8 my-8"
        variants={containerVariants}
      >
        <motion.div variants={itemVariants}>
          <ResultCard
            title="Proceeds of Loan (PL)"
            value={proceedsOfLoan}
            icon={DollarSign}
            iconColor="text-emerald-500"
            bgGradient="from-emerald-50 to-emerald-100 dark:from-emerald-950/40 dark:to-emerald-900/20"
          />
        </motion.div>
        <motion.div variants={itemVariants}>
          <ResultCard
            title="Outstanding Balance (OB)"
            value={outstandingBalance}
            icon={DollarSign}
            iconColor="text-amber-500"
            bgGradient="from-amber-50 to-amber-100 dark:from-amber-950/40 dark:to-amber-900/20"
          />
        </motion.div>
      </motion.div>

      <Separator className="my-4" />

      <motion.div className="grid grid-cols-1 sm:grid-cols-3 gap-8" variants={containerVariants}>
        <motion.div variants={itemVariants}>
          <ResultCard
            title="Rebates (REN-E)"
            value={rebates}
            icon={RefreshCw}
            iconColor="text-indigo-500"
            bgGradient="from-indigo-50 to-indigo-100 dark:from-indigo-950/40 dark:to-indigo-900/20"
          />
        </motion.div>
        <motion.div variants={itemVariants}>
          <ResultCard
            title="New UI (REN-E)"
            value={newUi}
            icon={ArrowRightLeft}
            iconColor="text-violet-500"
            bgGradient="from-violet-50 to-violet-100 dark:from-violet-950/40 dark:to-violet-900/20"
          />
        </motion.div>
        <motion.div variants={itemVariants}>
          <ResultCard
            title="NEW GP (REN-E)"
            value={newGp}
            icon={DollarSign}
            iconColor="text-green-500"
            bgGradient="from-green-50 to-green-100 dark:from-green-950/40 dark:to-green-900/20"
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
