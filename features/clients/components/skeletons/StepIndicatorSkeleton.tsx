"use client";

import { motion } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";

interface StepIndicatorSkeletonProps {
  steps: { id: string; name: string }[];
  currentStep?: number;
}

export function StepIndicatorSkeleton({ steps }: StepIndicatorSkeletonProps) {
  return (
    <nav aria-label="Progress" className="w-full">
      <ol role="list" className="space-y-4 md:flex md:space-x-8 md:space-y-0">
        {steps.map((step, index) => (
          <motion.li
            key={step.id}
            className="md:flex-1"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <div className="flex w-full flex-col border-l-4 border-muted py-2 pl-4 md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4">
              <Skeleton className="h-4 w-6 rounded-md mb-1" /> {/* id */}
              <Skeleton className="h-4 w-24 rounded-md" /> {/* name */}
            </div>
          </motion.li>
        ))}
      </ol>
    </nav>
  );
}
