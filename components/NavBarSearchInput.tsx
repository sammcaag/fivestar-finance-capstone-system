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
import { clientSearchMock } from "@/features/clients/data/search-client-mock";
import type { ClientSearchRecord } from "@/features/clients/data/search-client-mock";

export default function NavBarSearchInput({
  fullWidth,
}: {
  fullWidth: boolean;
}) {
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const [debouncedQuery, setDebouncedQuery] = React.useState("");

  const hasQuery = query.trim().length > 0;

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

  React.useEffect(() => {
    const handler = window.setTimeout(() => {
      setDebouncedQuery(query.trim());
    }, 300);

    return () => window.clearTimeout(handler);
  }, [query]);

  React.useEffect(() => {
    if (!open) {
      setQuery("");
      setDebouncedQuery("");
    }
  }, [open]);

  const router = useRouter();

  const filteredClients = React.useMemo(() => {
    if (!debouncedQuery) return [];
    const searchTerm = debouncedQuery.toLowerCase();

    return clientSearchMock
      .filter((client) => {
        const nameMatch = client.fullName.toLowerCase().includes(searchTerm);
        const idMatch = client.id.toLowerCase().includes(searchTerm);
        return nameMatch || idMatch;
      })
      .slice(0, 10);
  }, [debouncedQuery]);

  const handleClientSelect = React.useCallback(
    (client: ClientSearchRecord) => {
      const params = new URLSearchParams({
        fullName: client.fullName,
        branch: client.branch,
        status: client.status,
        productType: client.productType,
      });

      setOpen(false);
      setQuery("");
      setDebouncedQuery("");
      router.push(`/clients/${client.id}?${params.toString()}`);
    },
    [router]
  );

  return (
    <>
      <Button
        variant="outline"
        className={cn(
          "border-input bg-background text-foreground placeholder:text-muted-foreground/70",
          "focus-visible:border-ring focus-visible:ring-ring/50",
          "inline-flex h-9 w-fit rounded-md px-4 py-2 text-sm shadow-xs",
          "transition-[color,box-shadow] outline-none focus-visible:ring-[3px] min-w-xs",
          "text-foreground placeholder:text-muted-foreground/70 focus-visible:border-ring focus-visible:ring-ring/50 inline-flex h-full rounded-md border px-4 py-2 text-sm shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px]",
          fullWidth ? "w-full" : "w-fit",
          open && "hidden"
        )}
        onClick={() => setOpen(true)}
      >
        <span className="flex grow items-center">
          <SearchIcon
            className="text-muted-foreground/80 -ms-1 me-3"
            size={16}
            aria-hidden="true"
          />
          <span className="text-muted-foreground/70 font-normal">
            Search Clients...
          </span>
        </span>
        <kbd className="text-muted-foreground/70 ms-12 -me-1 inline-flex h-5 max-h-full items-center rounded border px-1 font-[inherit] text-[0.625rem] font-medium">
          Ctrl+K
        </kbd>
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput
          placeholder="Search clients by name or ID..."
          value={query}
          onValueChange={setQuery}
        />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          {hasQuery && filteredClients.length > 0 && (
            <CommandGroup heading="Clients">
              {filteredClients.map((client) => (
                <CommandItem
                  key={client.id}
                  value={client.fullName}
                  onSelect={() => handleClientSelect(client)}
                >
                  <div className="flex flex-col text-left">
                    <span className="text-sm font-medium text-foreground">
                      {client.fullName}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {client.id} • {client.branch}
                    </span>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          )}
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
                Ctrl+N
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
                Ctrl+I
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
