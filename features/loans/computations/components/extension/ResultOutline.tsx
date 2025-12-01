"use client";
import { motion } from "framer-motion";
import { Separator } from "@/components/ui/separator";
import type { ResultOutlineProps } from "../../types/types-extension";

export default function ResultOutline({
  title,
  value,
  textColorClass = "text-blue-700 dark:text-blue-400",
  isOutline = true,
}: ResultOutlineProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="framer-motion-fix"
    >
      <div className="space-y-2">
        <h4 className="font-medium text-base text-gray-700 dark:text-gray-300">{title}</h4>
        <p className={`font-semibold text-lg ${textColorClass}`}>{value}</p>
      </div>
      {isOutline && <Separator className="my-3" />}
    </motion.div>
  );
}
