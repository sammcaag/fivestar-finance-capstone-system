"use client";

import { useState, useEffect } from "react";
import { debounce } from "@/lib/utils";

interface SearchInputProps {
  placeholder?: string;
  onSearch: (query: string) => void;
  debounceMs?: number;
}

export function SearchInput({
  placeholder = "Search...",
  onSearch,
  debounceMs = 300,
}: SearchInputProps) {
  const [value, setValue] = useState("");

  useEffect(() => {
    const debouncedSearch = debounce((query: string) => {
      onSearch(query);
    }, debounceMs);

    debouncedSearch(value);
  }, [value, onSearch, debounceMs]);

  return (
    <div className="relative">
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-lg border border-input bg-background px-4 py-2 pl-10 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
      />
      <svg
        className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
    </div>
  );
}
