import React from "react";
import { InboxIcon, Plus } from "lucide-react";
import { Button } from "../ui/button";
import { EmptyStateProps } from "@/types/global-types";

export default function EmptyTableState({
  emptyTitle = "No data added yet",
  emptyDescription = "Start by creating your first entry. The data will appear here once you add something.",
  emptyActionLabel,
  emptyOnAction,
  emptySecondaryActionLabel,
  emptyOnSecondaryAction,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      {/* Icon Container */}
      <div className="mb-6 rounded-full bg-gradient-to-br from-primary/10 to-primary/5 p-4">
        <InboxIcon className="h-12 w-12 text-primary" strokeWidth={1.5} />
      </div>

      {/* Content */}
      <div className="text-center max-w-md">
        <h3 className="text-2xl font-semibold text-foreground mb-2">
          {emptyTitle}
        </h3>
        <p className="text-muted-foreground mb-6 leading-relaxed">
          {emptyDescription}
        </p>

        {/* Actions */}
        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          {emptyActionLabel && (
            <Button onClick={emptyOnAction} icon={Plus} iconPlacement="left">
              {emptyActionLabel}
            </Button>
          )}
          {emptySecondaryActionLabel && (
            <Button
              onClick={emptyOnSecondaryAction}
              variant="outline"
              className="border-border hover:bg-muted bg-transparent"
            >
              {emptySecondaryActionLabel}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
