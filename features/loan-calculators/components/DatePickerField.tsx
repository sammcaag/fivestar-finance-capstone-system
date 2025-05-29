"use client";
import { Label } from "@/components/ui/label";
import type React from "react";

import { CustomTooltip } from "@/components/CustomTooltip";
import CustomDatePicker from "@/components/CustomDatePicker";
import type { LucideIcon } from "lucide-react";
import { getYear } from "date-fns";

interface DatePickerFieldProps {
  label: string;
  icon: LucideIcon;
  tooltip: string;
  date: Date | undefined;
  setDate: React.Dispatch<React.SetStateAction<Date>> | undefined;
  focusedField: string | null;
  setFocusedField: (field: string | null) => void;
  fieldName: string;
  editable?: boolean;
  customDateFormat?: string;
  className?: string;
}

export function DatePickerField({
  label,
  icon: Icon,
  tooltip,
  date,
  setDate,
  focusedField,
  setFocusedField,
  fieldName,
  editable = true,
  customDateFormat = "MMMM d, yyyy",
  className = "",
}: DatePickerFieldProps) {
  const isFocused = focusedField === fieldName;

  return (
    <div
      className={`overflow-hidden rounded-lg border ${
        isFocused
          ? "ring-2 ring-blue-200 border-blue-300"
          : "border-gray-200 dark:border-gray-800"
      } bg-white dark:bg-gray-950 transition-all duration-200 shadow-sm p-4 ${className}`}
    >
      <div className="flex items-center justify-between mb-2">
        <Label className="text-base font-medium flex items-center">
          <Icon className="h-4 w-4 mr-2 text-blue-500" />
          {label}
        </Label>
        <CustomTooltip
          icon={Icon}
          description={tooltip}
          iconClassName="text-blue-500"
        />
      </div>
      <CustomDatePicker
        date={date ?? new Date()}
        setDate={setDate ?? (() => {})}
        editable={editable}
        startYear={getYear(new Date())}
        endYear={getYear(new Date()) + 5}
        isPreviousMonthsUnselectable={true}
        showCalendar={false}
        customDateFormat={customDateFormat}
      />
    </div>
  );
}
