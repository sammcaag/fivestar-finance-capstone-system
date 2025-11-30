"use client";

import * as React from "react";
import {
  addDays,
  format,
  getMonth,
  getYear,
  setMonth,
  setYear,
  isBefore,
  isAfter,
  startOfDay,
} from "date-fns";
import {
  CalendarIcon,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface DatePickerProps {
  startYear?: number;
  endYear?: number;
  date: Date;
  setDate: (date: Date) => void;
  editable?: boolean;
  customDateFormat?: string;
  isPreviousMonthsUnselectable?: boolean;
  isFutureDatesUnselectable?: boolean;
  numberOfFutureDaysDisable?: number;
  showCalendar?: boolean;
  placeholder?: string;
}

export default function CustomDatePicker({
  startYear = getYear(new Date()) - 100,
  endYear = getYear(new Date()) + 100,
  date,
  setDate,
  editable = true,
  customDateFormat = "MMMM d, yyyy",
  isPreviousMonthsUnselectable = false,
  isFutureDatesUnselectable = false,
  numberOfFutureDaysDisable = 0,
  showCalendar = true,
  placeholder = "Pick a date",
}: DatePickerProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [displayMonth, setDisplayMonth] = React.useState(date);

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const years = Array.from(
    { length: endYear - startYear + 1 },
    (_, i) => startYear + i
  );

  // Get current date information
  const today = startOfDay(new Date());
  const currentMonth = getMonth(today);
  const currentYear = getYear(today);
  const minDate = addDays(today, numberOfFutureDaysDisable);

  // Fixed: Determine if a date should be disabled
  const isDateDisabled = React.useCallback(
    (checkDate: Date) => {
      const normalizedDate = startOfDay(checkDate);

      if (numberOfFutureDaysDisable > 0) {
        return isBefore(normalizedDate, minDate);
      }

      if (isPreviousMonthsUnselectable) {
        const dateYear = getYear(normalizedDate);
        const dateMonth = getMonth(normalizedDate);

        if (dateYear > currentYear) return false;
        if (dateYear === currentYear && dateMonth >= currentMonth) {
          if (dateMonth === currentMonth) {
            return isBefore(normalizedDate, today);
          }
          return false;
        }
        return true;
      }

      if (isFutureDatesUnselectable) {
        return isAfter(normalizedDate, today);
      }

      return false;
    },
    [
      isPreviousMonthsUnselectable,
      isFutureDatesUnselectable,
      numberOfFutureDaysDisable,
      today,
      currentMonth,
      currentYear,
      minDate,
    ]
  );

  // Fixed: Handle month navigation properly
  const canNavigateToMonth = React.useCallback(
    (targetDate: Date) => {
      const targetYear = getYear(targetDate);
      const targetMonth = getMonth(targetDate);

      if (isPreviousMonthsUnselectable) {
        if (targetYear > currentYear) return true;
        if (targetYear === currentYear && targetMonth >= currentMonth)
          return true;
        return false;
      }

      return true;
    },
    [isPreviousMonthsUnselectable, currentYear, currentMonth]
  );

  const handleMonthChange = (month: string) => {
    const monthIndex = months.indexOf(month);
    const newDate = setMonth(displayMonth, monthIndex);

    if (canNavigateToMonth(newDate)) {
      setDisplayMonth(newDate);
      const updatedDate = setMonth(date, monthIndex);
      if (!isDateDisabled(updatedDate)) {
        setDate(updatedDate);
      }
    }
  };

  const handleYearChange = (year: string) => {
    const newYear = Number.parseInt(year);
    const newDate = setYear(displayMonth, newYear);

    if (canNavigateToMonth(newDate)) {
      setDisplayMonth(newDate);
      const updatedDate = setYear(date, newYear);
      if (!isDateDisabled(updatedDate)) {
        setDate(updatedDate);
      }
    }
  };

  const handleSelect = (selectedDate: Date | undefined) => {
    if (selectedDate && !isDateDisabled(selectedDate)) {
      setDate(selectedDate);
      setIsOpen(false);
    }
  };

  const handleMonthNavigation = (newMonth: Date) => {
    if (canNavigateToMonth(newMonth)) {
      setDisplayMonth(newMonth);
    }
  };

  const getAvailableMonths = () => {
    const displayYear = getYear(displayMonth);

    if (isPreviousMonthsUnselectable && displayYear === currentYear) {
      return months.map((month, index) => ({
        month,
        disabled: index < currentMonth,
      }));
    }

    return months.map((month) => ({ month, disabled: false }));
  };

  const getAvailableYears = () => {
    if (isPreviousMonthsUnselectable) {
      return years.filter((year) => year >= currentYear);
    }
    return years;
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-full justify-start text-left font-normal rounded-md",
            "border-0 bg-background hover:bg-primary/10 focus:bg-primary/10",
            "shadow-sm hover:shadow-md transition-all duration-200",
            "text-foreground h-[38px]",
            !date && "text-muted-foreground",
            !editable && "pointer-events-none opacity-60"
          )}
          disabled={!editable}
        >
          <CalendarIcon className="mr-3 h-4 w-4 text-primary " />
          <div className="flex items-center justify-between w-full">
            <span
              className={cn(
                "font-medium",
                date ? "text-foreground" : "text-muted-foreground"
              )}
            >
              {date ? format(date, customDateFormat) : placeholder}
            </span>
            {editable && (
              <motion.div
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              </motion.div>
            )}
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-auto p-0 shadow-lg border bg-popover rounded-lg"
        align="center"
        side="bottom"
        sideOffset={4}
        avoidCollisions={true}
        collisionPadding={8}
      >
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="bg-popover rounded-lg overflow-hidden"
            >
              {/* Header with Month/Year Selectors */}
              <div className="bg-primary p-4">
                <div className="flex justify-between items-center gap-3">
                  <Select
                    onValueChange={handleMonthChange}
                    value={months[getMonth(displayMonth)]}
                  >
                    <SelectTrigger className="w-[130px] bg-primary-foreground border-0 text-primary rounded-md hover:bg-primary-foreground/90 focus:bg-primary-foreground/90">
                      <SelectValue placeholder="Month" />
                    </SelectTrigger>
                    <SelectContent>
                      {getAvailableMonths().map(({ month, disabled }) => (
                        <SelectItem
                          key={month}
                          value={month}
                          disabled={disabled}
                          className={cn(
                            disabled && "opacity-50 cursor-not-allowed"
                          )}
                        >
                          {month}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select
                    onValueChange={handleYearChange}
                    value={getYear(displayMonth).toString()}
                  >
                    <SelectTrigger className="w-[100px] bg-primary-foreground border-0 text-primary rounded-md hover:bg-primary-foreground/90 focus:bg-primary-foreground/90">
                      <SelectValue placeholder="Year" />
                    </SelectTrigger>
                    <SelectContent>
                      {getAvailableYears().map((year) => (
                        <SelectItem key={year} value={year.toString()}>
                          {year}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Calendar */}
              {showCalendar && (
                <div className="p-4">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={handleSelect}
                    month={displayMonth}
                    onMonthChange={handleMonthNavigation}
                    disabled={isDateDisabled}
                    initialFocus
                    className="rounded-md"
                    classNames={{
                      months:
                        "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
                      month: "space-y-4",
                      caption: "flex justify-center pt-1 relative items-center",
                      caption_label: "text-sm font-medium text-foreground",
                      nav: "space-x-1 flex items-center",
                      nav_button: cn(
                        "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 text-foreground",
                        "hover:bg-accent rounded-md transition-colors"
                      ),
                      nav_button_previous: "absolute left-1",
                      nav_button_next: "absolute right-1",
                      table: "w-full border-collapse space-y-1",
                      head_row: "flex",
                      head_cell:
                        "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]",
                      row: "flex w-full mt-2",
                      cell: "text-center text-sm p-0 relative [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
                      day: cn(
                        "h-9 w-9 p-0 font-normal aria-selected:opacity-100 text-foreground",
                        "hover:bg-accent hover:text-accent-foreground rounded-md transition-colors",
                        "focus:bg-accent focus:text-accent-foreground"
                      ),
                      day_selected:
                        "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
                      day_today:
                        "bg-accent text-accent-foreground font-semibold",
                      day_outside: "text-muted-foreground opacity-50",
                      day_disabled:
                        "text-muted-foreground opacity-30 cursor-not-allowed hover:bg-transparent",
                      day_range_middle:
                        "aria-selected:bg-accent aria-selected:text-accent-foreground",
                      day_hidden: "invisible",
                    }}
                    components={{
                      IconLeft: () => <ChevronLeft className="h-4 w-4" />,
                      IconRight: () => <ChevronRight className="h-4 w-4" />,
                    }}
                  />
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </PopoverContent>
    </Popover>
  );
}
