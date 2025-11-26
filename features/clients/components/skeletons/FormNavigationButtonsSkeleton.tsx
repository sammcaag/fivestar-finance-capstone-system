"use client";

import { motion } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";

export function FormNavigationButtonsSkeleton() {
  const slideVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      className="flex justify-between mt-8 pt-6 border-t border-border"
      initial="hidden"
      animate="visible"
      variants={slideVariants}
      transition={{ duration: 0.3 }}
    >
      {/* Right Side Skeleton */}
      <div className="flex gap-3">
        {/* Previous button skeleton */}
        <Skeleton className="h-10 w-32 rounded-md" />
        {/* Reset/Clear button skeleton */}
        <Skeleton className="h-10 w-32 rounded-md" />
      </div>

      {/* Left Side Skeleton */}
      <div className="flex gap-3">
        {/* Save Draft / Load Draft / Delete Draft skeletons */}
        <Skeleton className="h-10 w-32 rounded-md" />
        <Skeleton className="h-10 w-32 rounded-md" />
        <Skeleton className="h-10 w-32 rounded-md" />
        {/* Next/Submit button skeleton */}
        <Skeleton className="h-10 w-32 rounded-md" />
      </div>
    </motion.div>
  );
}
