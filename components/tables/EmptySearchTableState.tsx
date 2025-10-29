"use client";

import { Button } from "@/components/ui/button";
import { SearchIcon, XIcon } from "lucide-react";

interface SearchEmptyStateProps {
  searchQuery?: string;
  onClearSearch?: () => void;
}

export default function EmptySearchTableState({
  searchQuery,
  onClearSearch,
}: SearchEmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      {/* Icon Container */}
      <div className="mb-6 rounded-full bg-gradient-to-br from-amber-100 to-orange-50 p-4">
        <SearchIcon className="h-12 w-12 text-amber-600" strokeWidth={1.5} />
      </div>

      {/* Content */}
      <div className="text-center max-w-md">
        <h3 className="text-2xl font-semibold text-foreground mb-2">
          No results found
        </h3>
        <p className="text-muted-foreground mb-2 leading-relaxed">
          We couldn't find anything matching
        </p>
        <p className="text-foreground font-medium mb-6 break-words">
          "{searchQuery}"
        </p>

        {/* Suggestions */}
        <div className="bg-muted/50 rounded-lg p-4 mb-6 text-left text-sm">
          <p className="font-medium text-foreground mb-2">Try:</p>
          <ul className="text-muted-foreground space-y-1">
            <li>• Check your spelling</li>
            <li>• Use different keywords</li>
            <li>• Try more general terms</li>
          </ul>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Button
            onClick={onClearSearch}
            className="bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            <XIcon className="h-4 w-4 mr-2" />
            Clear Search
          </Button>
          <Button
            onClick={onClearSearch}
            variant="outline"
            className="border-border hover:bg-muted bg-transparent"
          >
            Browse All
          </Button>
        </div>
      </div>
    </div>
  );
}
