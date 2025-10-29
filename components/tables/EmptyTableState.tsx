import React from "react";
import { InboxIcon, Plus } from "lucide-react";
import { Button } from "../ui/button";

interface EmptyStateProps {
  title?: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  secondaryActionLabel?: string;
  onSecondaryAction?: () => void;
}

export default function EmptyTableState({
  title = "No client loan added yet",
  description = "Start by creating your first loan entry. The client's loan history will appear here once you add something.",
  actionLabel,
  onAction,
  secondaryActionLabel,
  onSecondaryAction,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      {/* Icon Container */}
      <div className="mb-6 rounded-full bg-gradient-to-br from-primary/10 to-primary/5 p-4">
        <InboxIcon className="h-12 w-12 text-primary" strokeWidth={1.5} />
      </div>

      {/* Content */}
      <div className="text-center max-w-md">
        <h3 className="text-2xl font-semibold text-foreground mb-2">{title}</h3>
        <p className="text-muted-foreground mb-6 leading-relaxed">
          {description}
        </p>

        {/* Actions */}
        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          {actionLabel && (
            <Button
              onClick={onAction}
              icon={Plus}
              iconPlacement="left"
          
            >
              {actionLabel}
            </Button>
          )}
          {secondaryActionLabel && (
            <Button
              onClick={onSecondaryAction}
              variant="outline"
              className="border-border hover:bg-muted bg-transparent"
            >
              {secondaryActionLabel}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
