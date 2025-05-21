"use client";

import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import SearchInput from "@/components/SearchInput";
import Link from "next/link";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export function ClientsFilter({ dashboard = false }: { dashboard?: boolean }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [loanType, setLoanType] = useState("");
  const [status, setStatus] = useState("");

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

  return (
    <div className="flex flex-col space-y-2 md:flex-row md:items-end md:space-x-3 md:space-y-0 mb-4">
      <div className="flex-1">
        {/* In contemplation of removing the search input */}
        {dashboard ? (
          <SearchInput fullWidth />
        ) : (
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search clients..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8"
            />
          </div>
        )}
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
        <Button variant="outline" asChild>
          <Link href="/clients">View All Clients</Link>
        </Button>
      ) : (
        <div className="flex items-center space-x-2">
          <Button variant="secondary">Filter</Button>
          <Button
            variant="outline"
            onClick={() => {
              setSearchTerm("");
              setLoanType("");
              setStatus("");
            }}
          >
            Reset
          </Button>
        </div>
      )}
    </div>
  );
}
