"use client";

import { Button } from "@/components/ui/button";
import { SearchIcon, SearchX } from "lucide-react";

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
          We couldn&apos;t find anything matching
        </p>
        <p className="text-foreground font-medium mb-6 break-words">
          &quot;{searchQuery}&quot;
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
        <Button onClick={onClearSearch} icon={SearchX} iconPlacement="left">
          Clear Search and Try Again
        </Button>
      </div>
    </div>
  );
}
