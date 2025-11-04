"use client";

import { useId, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Search, X, CircleX, FilterIcon, Delete, FilterX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Table } from "@tanstack/react-table";
import { cn } from "@/lib/utils";
import FilterPopover from "./FilterPopover";
import { getProductTypeClass } from "@/utils/get-product-type-class";
import { clientBadgeStatusMap } from "@/features/clients/utils/client-badge-status-map";
import { loanStatusClassNames } from "@/features/loans/utils/loan-status-classnames";
import { appointmentStatusClassNames } from "@/features/loans/appointments/utils/appointments-status-classnames";

interface TableFilterProps<TData> {
  dashboard?: boolean;
  table: Table<TData>;
  inputRef?: React.RefObject<HTMLInputElement | null>;
  selectedStatuses?: string[];
  handleStatusChange?: (checked: boolean, value: string) => void;
  uniqueStatusValues?: string[];
}

export function TableFilter<TData>({
  dashboard = false,
  table,
  inputRef,
}: TableFilterProps<TData>) {
  const [activeFilters, setActiveFilters] = useState<{
    [key: string]: string[];
  }>({});
  const hasActiveFilter = Object.values(activeFilters).some(
    (filters) => filters.length > 0
  );
  return (
    <motion.div
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.2,
        ease: "easeOut",
      }}
      className="framer-motion-fix"
    >
      <div className="flex flex-col space-y-2 md:flex-row md:items-end md:space-x-3 md:space-y-0">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search clients..."
              ref={inputRef}
              className={cn(
                "pl-8  focus-within:ring-2 focus-within:ring-primary/20",
                Boolean(table.getColumn("name")?.getFilterValue()) && "pe-9"
              )}
              value={
                (table.getColumn("name")?.getFilterValue() ?? "") as string
              }
              onChange={(e) =>
                table.getColumn("name")?.setFilterValue(e.target.value)
              }
              type="text"
              aria-label="Search Clients "
            />
          </div>
        </div>
        {!dashboard && (
          <div className="space-x-2">
            <FilterPopover
              columnId="status"
              table={table}
              title="Status"
              icon={FilterIcon}
              setActiveFilters={setActiveFilters}
            />
            <FilterPopover
              columnId="productType"
              table={table}
              title="Product Type"
              icon={FilterIcon}
              setActiveFilters={setActiveFilters}
            />
            {hasActiveFilter && (
              <Button
                className="hover:bg-destructive hover:text-white"
                variant="outline"
                icon={FilterX}
                iconPlacement="left"
                size="icon"
                onClick={() => {
                  table.resetColumnFilters();
                  setActiveFilters({});
                }}
              />
            )}
          </div>
        )}
        {dashboard ? (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  asChild
                  className=" hover:bg-primary hover:text-white"
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
            {Boolean(table.getColumn("name")?.getFilterValue()) && (
              <Button
                variant="outline"
                className="border-destructive"
                onClick={() => {
                  table.getColumn("name")?.setFilterValue("");
                  if (inputRef?.current) {
                    inputRef.current.focus();
                  }
                }}
              >
                <CircleX
                  className="size-3 text-destructive"
                  strokeWidth={1.5}
                />
                Clear
              </Button>
            )}
          </div>
        )}
      </div>
      {hasActiveFilter && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{
            opacity: 1,
            height: "auto",
            transition: {
              height: { duration: 0.2 },
              opacity: { duration: 0.2, delay: 0.1 },
            },
          }}
          exit={{
            opacity: 0,
            height: 0,
            transition: {
              height: { duration: 0.2 },
              opacity: { duration: 0.1 },
            },
          }}
          className="space-y-2 mt-4 framer-motion-fix"
        >
          {Object.entries(activeFilters)
            .filter(([_, filters]) => filters.length > 0)
            .map(([title, filters]) => (
              <div key={title}>
                {/* Group Label */}
                <h4 className="text-sm font-medium capitalize mb-2">
                  {title.replace(/([A-Z])/g, " $1").trim()}
                </h4>

                {/* Badges for this group */}
                <div className="flex flex-wrap gap-2">
                  {filters.map((filter) => (
                    <Badge
                      key={`${title}-${filter}`}
                      variant={
                        (clientBadgeStatusMap(filter)?.variant as
                          | "outline"
                          | "default"
                          | "destructive"
                          | "secondary") || "outline"
                      }
                      className={cn(
                        "capitalize",
                        getProductTypeClass(filter),
                        clientBadgeStatusMap(filter)?.className,
                        loanStatusClassNames(filter)?.bg,
                        loanStatusClassNames(filter)?.text,
                        appointmentStatusClassNames(filter)?.bg,
                        appointmentStatusClassNames(filter)?.text
                      )}
                    >
                      {filter}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
        </motion.div>
      )}
    </motion.div>
  );
}
