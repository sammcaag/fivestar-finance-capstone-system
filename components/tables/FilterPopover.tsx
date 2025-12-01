import React, { Dispatch, SetStateAction, useMemo } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { LucideIcon } from "lucide-react";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import { useId } from "react";
import { Table } from "@tanstack/react-table";

interface FilterPopoverProps<TData> {
  columnId: string;
  table: Table<TData>;
  title: string;
  icon: LucideIcon;
  setActiveFilters: Dispatch<SetStateAction<{ [key: string]: string[] }>>;
}

export default function FilterPopover<TData>({
  columnId,
  table,
  title,
  icon: Icon,
  setActiveFilters,
}: FilterPopoverProps<TData>) {
  // Get unique values for each filter
  const uniqueValues = useMemo(() => {
    const filterColumn = table.getColumn(columnId);

    if (!filterColumn) return [];

    const values = Array.from(filterColumn.getFacetedUniqueValues().keys());

    return values.sort();
  }, [table.getColumn(columnId)?.getFacetedUniqueValues()]);

  // Get counts for each filter
  const filterCounts = useMemo(() => {
    const filterColumn = table.getColumn(columnId);
    if (!filterColumn) return new Map();
    return filterColumn.getFacetedUniqueValues();
  }, [table.getColumn(columnId)?.getFacetedUniqueValues()]);

  // Get selected values
  const selectedFilters = useMemo(() => {
    const filterValue = table.getColumn(columnId)?.getFilterValue() as string[];
    return filterValue ?? [];
  }, [table.getColumn(columnId)?.getFilterValue()]);

  // Handle filter change
  const handleFilterChange = (checked: boolean, value: string) => {
    const filterValue = table.getColumn(columnId)?.getFilterValue() as string[];
    const newFilterValue = filterValue ? [...filterValue] : [];

    if (checked) {
      newFilterValue.push(value);
    } else {
      const index = newFilterValue.indexOf(value);
      if (index > -1) {
        newFilterValue.splice(index, 1);
      }
    }

    table.getColumn(columnId)?.setFilterValue(newFilterValue.length ? newFilterValue : undefined);
    setActiveFilters((prev) => ({
      ...prev,
      [title]: newFilterValue,
    }));
  };

  const id = useId();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">
          <Icon className="-ms-1 opacity-60" size={16} aria-hidden="true" />
          <span>{title}</span>
          {selectedFilters.length > 0 && (
            <span className="-me-1 inline-flex h-5 max-h-full items-center rounded border bg-background px-1 font-[inherit] text-[0.625rem] font-medium text-muted-foreground/70">
              {selectedFilters.length}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto min-w-36 p-3" align="start">
        <div className="space-y-3">
          <div className="text-xs font-medium text-muted-foreground">Filters</div>
          <div className="space-y-3">
            {uniqueValues.map((value, i) => (
              <div key={value} className="flex items-center gap-2">
                <Checkbox
                  id={`${id}-${i}`}
                  checked={selectedFilters.includes(value)}
                  onCheckedChange={(checked: boolean) => handleFilterChange(checked, value)}
                />
                <Label
                  htmlFor={`${id}-${i}`}
                  className="flex grow justify-between gap-2 font-normal capitalize"
                >
                  {value}{" "}
                  <span className="ms-2 text-xs text-muted-foreground">
                    {filterCounts.get(value)}
                  </span>
                </Label>
              </div>
            ))}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
