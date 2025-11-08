import React from "react";
import { InboxIcon, Plus } from "lucide-react";
import { Button } from "../ui/button";
import { EmptyStateProps } from "@/types/global-types";
import { motion } from "framer-motion";

export default function EmptyTableState({
  emptyTitle = "No data added yet",
  emptyDescription = "Start by creating your first entry. The data will appear here once you add something.",
  emptyActionLabel,
  emptyOnAction,
  emptySecondaryActionLabel,
  emptyOnSecondaryAction,
}: EmptyStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="flex flex-col items-center justify-center py-16 px-4 bg-muted/20 rounded-lg shadow-sm border border-border max-w-2xl mx-auto"
    >
      {/* Icon Container */}
      <div className="mb-6 rounded-full bg-gradient-to-br from-primary/10 to-primary/5 p-4 ring-1 ring-primary/20 shadow-sm">
        <InboxIcon className="h-12 w-12 text-primary" strokeWidth={1.5} />
      </div>

      {/* Content */}
      <div className="text-center max-w-md">
        <h3 className="text-2xl font-bold text-foreground mb-2 tracking-tight">
          {emptyTitle}
        </h3>
        <p className="text-muted-foreground mb-6 leading-relaxed text-base">
          {emptyDescription}
        </p>

        {/* Actions */}
        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          {emptyActionLabel && (
            <Button
              onClick={emptyOnAction}
              icon={Plus}
              iconPlacement="left"
              className="font-medium"
            >
              {emptyActionLabel}
            </Button>
          )}
          {emptySecondaryActionLabel && (
            <Button
              onClick={emptyOnSecondaryAction}
              variant="outline"
              className="border-border hover:bg-muted bg-transparent font-medium"
            >
              {emptySecondaryActionLabel}
            </Button>
          )}
        </div>
      </div>
    </motion.div>
  );
}
