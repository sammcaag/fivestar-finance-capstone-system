"use client";
import { motion, Variants } from "framer-motion";
import { Checkbox } from "@/components/ui/checkbox";
import { AlertCircle } from "lucide-react";

interface DeductionToggleProps {
  hasDeduction: boolean;
  setHasDeduction: (hasDeduction: boolean) => void;
  variants?: Variants;
}

export function DeductionToggle({
  hasDeduction,
  setHasDeduction,
  variants,
}: DeductionToggleProps) {
  return (
    <motion.div
      className="flex items-center gap-4 p-4 rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50"
      variants={variants}
      initial="hidden"
      animate="visible"
    >
      <div className="flex items-center gap-2">
        <Checkbox
          id="deductions"
          checked={hasDeduction}
          onCheckedChange={setHasDeduction}
          className="data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500"
        />
        <label
          htmlFor="deductions"
          className="text-sm font-medium leading-none cursor-pointer select-none"
        >
          Apply deductions to this calculation
        </label>
      </div>
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <AlertCircle className="h-4 w-4" />
        <span>
          Enabling this will allow you to specify outstanding balance and other
          deductions
        </span>
      </div>
    </motion.div>
  );
}
