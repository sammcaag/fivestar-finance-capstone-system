"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";

export default function MainHeaderSkeleton({
  showDateAndTime = false,
  showQuickActions = false,
}: {
  showDateAndTime?: boolean;
  showQuickActions?: boolean;
}) {
  return (
    <motion.div
      className="relative overflow-hidden rounded-xl bg-gradient-to-r from-primary/80 via-primary/70 to-primary/60 p-6 shadow-lg"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        {/* Left section */}
        <div className="space-y-3 flex-1">
          {/* Title */}
          <Skeleton className="h-9 w-64 md:w-80 rounded-md" />

          {/* Description row */}
          <div className="flex items-center space-x-2">
            <Skeleton className="h-5 w-5 rounded-full" />
            <Skeleton className="h-4 w-72 rounded-md" />
          </div>
        </div>

        {/* Date & Time */}
        {showDateAndTime && (
          <div className="flex flex-col gap-2 items-end max-sm:mt-4">
            <Skeleton className="h-5 w-44 rounded-md" />
            <Skeleton className="h-5 w-28 rounded-md" />
          </div>
        )}
      </div>

      {/* Quick actions */}
      {showQuickActions && (
        <div className="mt-6 flex gap-2">
          <Skeleton className="h-9 w-28 rounded-md" />
          <Skeleton className="h-9 w-32 rounded-md" />
        </div>
      )}
    </motion.div>
  );
}
