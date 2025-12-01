"use client";

import { Button } from "@/components/ui/button";
import { SearchX } from "lucide-react";
import { motion } from "framer-motion";

interface SearchEmptyStateProps {
  searchQuery?: string;
  onClearSearch?: () => void;
}

export default function EmptySearchTableState({
  searchQuery,
  onClearSearch,
}: SearchEmptyStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="flex flex-col items-center justify-center py-16 px-4 bg-muted/20 rounded-lg shadow-sm border border-border max-w-2xl mx-auto my-24"
    >
      {/* Icon Container */}
      <div className="mb-6 rounded-full bg-gradient-to-br from-amber-100 to-orange-50 p-4 ring-1 ring-amber-200 shadow-sm">
        <SearchX className="h-12 w-12 text-amber-600" strokeWidth={1.5} />
      </div>

      {/* Content */}
      <div className="text-center max-w-md">
        <h3 className="text-2xl font-bold text-foreground mb-2 tracking-tight">No results found</h3>
        <p className="text-muted-foreground mb-2 leading-relaxed text-base">
          We couldn&apos;t find anything matching
        </p>
        <p className="text-foreground font-semibold mb-6 break-words text-lg">
          &quot;{searchQuery}&quot;
        </p>

        {/* Suggestions */}
        <div className="bg-background rounded-lg p-4 mb-6 text-left text-sm border border-border shadow-inner">
          <p className="font-semibold text-foreground mb-2">Suggestions:</p>
          <ul className="text-muted-foreground space-y-1.5 list-disc pl-4">
            <li>Check your spelling and try again</li>
            <li>Use different or more specific keywords</li>
            <li>Try broader or more general terms</li>
          </ul>
        </div>

        {/* Actions */}
        <Button onClick={onClearSearch} icon={SearchX} iconPlacement="left" className="font-medium">
          Clear Search and Try Again
        </Button>
      </div>
    </motion.div>
  );
}
