"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Search, Filter, X, CircleX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Table } from "@tanstack/react-table";
import { cn } from "@/lib/utils";

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
  selectedStatuses,
  handleStatusChange,
  uniqueStatusValues,
}: TableFilterProps<TData>) {
  const [searchTerm, setSearchTerm] = useState("");
  const [loanType, setLoanType] = useState("");
  const [status, setStatus] = useState("");
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  const loanTypes = [
    { value: "all", label: "All Types" },
    { value: "personal", label: "Personal" },
    { value: "mortgage", label: "Mortgage" },
    { value: "business", label: "Business" },
    { value: "auto", label: "Auto" },
  ];

  const statuses = [
    { value: "all", label: "All Statuses" },
    { value: "active", label: "Active" },
    { value: "pending", label: "Pending" },
    { value: "overdue", label: "Overdue" },
    { value: "completed", label: "Completed" },
    { value: "rejected", label: "Rejected" },
  ];

  const handleFilter = () => {
    const newFilters = [];
    if (loanType && loanType !== "all") {
      newFilters.push(
        `Loan: ${loanTypes.find((lt) => lt.value === loanType)?.label}`
      );
    }
    if (status && status !== "all") {
      newFilters.push(
        `Status: ${statuses.find((s) => s.value === status)?.label}`
      );
    }
    if (searchTerm) {
      newFilters.push(`Search: ${searchTerm}`);
    }
    setActiveFilters(newFilters);
  };

  const handleReset = () => {
    setSearchTerm("");
    setLoanType("");
    setStatus("");
    setActiveFilters([]);
  };

  const removeFilter = (filter: string) => {
    setActiveFilters(activeFilters.filter((f) => f !== filter));
    if (filter.startsWith("Loan:")) {
      setLoanType("");
    } else if (filter.startsWith("Status:")) {
      setStatus("");
    } else if (filter.startsWith("Search:")) {
      setSearchTerm("");
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
          <div className="grid grid-cols-2 gap-2">
            <Select value={loanType} onValueChange={setLoanType}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Loan Type" />
              </SelectTrigger>
              <SelectContent>
                {loanTypes.map(({ value, label }) => (
                  <SelectItem key={value} value={value}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                {statuses.map(({ value, label }) => (
                  <SelectItem key={value} value={value}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
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
            <Button variant="default" onClick={handleFilter} className="">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
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

      {activeFilters.length > 0 && (
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
          className="flex flex-wrap gap-2 framer-motion-fix"
        >
          {activeFilters.map((filter) => (
            <Badge
              key={filter}
              variant="secondary"
              className="flex items-center gap-1"
            >
              {filter}
              <X
                className="ml-1 h-3 w-3 cursor-pointer"
                onClick={() => removeFilter(filter)}
              />
            </Badge>
          ))}
        </motion.div>
      )}
    </motion.div>
  );
}
