"use client";

import * as React from "react";
import {
  ArrowUpRightIcon,
  Calculator,
  SearchIcon,
  UserPlus2,
} from "lucide-react";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function SearchInput({
  fullWidth = false,
}: {
  fullWidth?: boolean;
}) {
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const router = useRouter();

  return (
    <>
      <Button
        variant="outline"
        className={cn(
          "bg-transparent border-input text-foreground placeholder:text-muted-foreground/70 focus-visible:border-ring focus-visible:ring-ring/50 inline-flex h-full rounded-md border px-4 py-2 text-sm shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px]",
          fullWidth ? "w-full" : "w-fit"
        )}
        onClick={() => setOpen(true)}
      >
        <span className="flex grow items-center">
          <SearchIcon
            className="text-muted-foreground/80 -ms-1 me-3"
            size={16}
            aria-hidden="true"
          />
          <span className="text-muted-foreground/70 font-normal">Search</span>
        </span>
        <kbd className="text-muted-foreground/70 ms-12 -me-1 inline-flex h-5 max-h-full items-center rounded border px-1 font-[inherit] text-[0.625rem] font-medium">
          {navigator.userAgent.includes("Mac") ? "⌘K" : "Ctrl+K"}
        </kbd>
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Quick start">
            <CommandItem
              onClick={() => {
                setOpen(false);
                router.push("/clients/register");
              }}
            >
              <Link
                href="/clients/register"
                className="flex items-center gap-2"
              >
                <UserPlus2
                  size={16}
                  className="opacity-60"
                  aria-hidden="true"
                />
                <span>Register a New Client</span>
              </Link>
              <CommandShortcut className="justify-center">
                {navigator.userAgent.includes("Mac") ? "⌘N" : "Ctrl+N"}
              </CommandShortcut>
            </CommandItem>
            <CommandItem>
              <Link
                href="/loan-computations/new-client"
                className="flex items-center gap-2"
              >
                <Calculator
                  size={16}
                  className="opacity-60"
                  aria-hidden="true"
                />
                <span>New Client Computation</span>
              </Link>
              <CommandShortcut className="justify-center">
                {navigator.userAgent.includes("Mac") ? "⌘I" : "Ctrl+I"}
              </CommandShortcut>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Navigation">
            <CommandItem>
              <Link href="/dashboard" className="flex items-center gap-2">
                <ArrowUpRightIcon
                  size={16}
                  className="opacity-60"
                  aria-hidden="true"
                />
                <span>Go to dashboard</span>
              </Link>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
