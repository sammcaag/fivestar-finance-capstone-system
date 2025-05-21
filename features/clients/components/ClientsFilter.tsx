"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Search, Filter, X } from "lucide-react";
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

export function ClientsFilter({ dashboard = false }: { dashboard?: boolean }) {
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
      className="space-y-4 framer-motion-fix"
    >
      <div className="flex flex-col space-y-2 md:flex-row md:items-end md:space-x-3 md:space-y-0 mb-6">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search clients..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8 transition-all duration-200 focus-within:ring-2 focus-within:ring-primary/20"
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
                  className="transition-all duration-200 hover:bg-primary hover:text-white"
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
            <Button
              variant="default"
              onClick={handleFilter}
              className="transition-all duration-200"
            >
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
            <Button
              variant="outline"
              onClick={handleReset}
              className="transition-all duration-200"
            >
              <X className="mr-2 h-4 w-4" />
              Reset
            </Button>
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
