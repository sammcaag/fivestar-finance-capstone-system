// TableFilter.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Search, CircleX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { Table } from "@tanstack/react-table";
import { TableData } from "@/types/global-types";

export function TableFilter<TData extends TableData>({
  table,
  inputRef,
  filterColumns = [],
  dashboard = false,
}: {
  table: Table<TData>;
  inputRef?: React.RefObject<HTMLInputElement | null>;
  filterColumns?: string[];
  dashboard?: boolean;
}) {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    table.setGlobalFilter(value);
    setActiveFilters(value ? [`Search: ${value}`] : []);
  };

  const clearSearch = () => {
    setSearchTerm("");
    table.setGlobalFilter("");
    table.getAllColumns().forEach((column) => {
      column.setFilterValue(undefined);
    });
    setActiveFilters([]);
    if (inputRef?.current) {
      inputRef.current.focus();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.2,
        ease: "easeOut",
      }}
      className="framer-motion-fix mt-6 lg:mt-0"
    >
      {dashboard ? (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                asChild
                className="hover:bg-primary hover:text-white"
              >
                <Link href="/clients">View All Clients</Link>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>See complete client list</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ) : (
        <div className="flex items-center space-x-2">
          <div className="relative w-sm md:w-lg">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder={`Search ${filterColumns
                .map((col) => col.replace(/([A-Z])/g, " $1").toLowerCase())
                .join(", ")}...`}
              ref={inputRef}
              className={cn(
                "pl-8 focus-within:ring-2 focus-within:ring-primary/20",
                searchTerm && "pe-9"
              )}
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              type="text"
              aria-label={`Search ${filterColumns.join(", ")}`}
            />
            {searchTerm && (
              <Button
                variant="ghost"
                className="absolute right-2 top-2.5 h-4 w-4 p-0 text-destructive"
                onClick={clearSearch}
              >
                <CircleX className="h-4 w-4" strokeWidth={1.5} />
              </Button>
            )}
          </div>
        </div>
      )}
    </motion.div>
  );
}
