import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import React from "react";
import { UseFormReturn } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { format, getYear } from "date-fns";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import CustomDatePicker from "@/components/custom/custom-date-picker";
import { LoanFormProps } from "../../types/types-extension";
import {
  preventInvalidInput,
  preventNegativeAndLimitDecimals,
} from "@/utils/handling-input-numbers";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";

const LoanForm = ({ form, hasDeductions, setHasDeductions }: LoanFormProps) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <FormField
          control={form.control}
          name="monthlyAmortization"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Monthly Amortization (MA)</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter amount"
                  type="number"
                  step="1000" // increments/decrements by 1000
                  {...field}
                  onKeyDown={preventInvalidInput}
                  onChange={(e) =>
                    preventNegativeAndLimitDecimals(e, field.onChange)
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="term"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Term (Months)</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  min={6}
                  max={25}
                  placeholder="Enter term (6-25 months)"
                  {...field}
                  onChange={(e) => {
                    const value =
                      e.target.value === "" ? "" : Number(e.target.value);
                    field.onChange(value);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="settedMaturityDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Maturity Date</FormLabel>
              <FormControl>
                <CustomDatePicker
                  date={field.value || new Date()}
                  setDate={(date) => field.onChange(date)}
                  startYear={getYear(new Date())}
                  endYear={getYear(new Date()) + 5}
                  showCalendar={false}
                  isPreviousMonthsUnselectable={true}
                />
              </FormControl>
            </FormItem>
          )}
        />
      </div>

      <div className="w-full flex items-center">
        <div className="flex items-center gap-2 flex-shrink-0">
          <Checkbox
            id="deductions"
            checked={hasDeductions}
            onCheckedChange={setHasDeductions}
          />
          <label
            htmlFor="deductions"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Is there any deduction?
          </label>
        </div>
        <div className="overflow-hidden px-4 w-full">
          <Separator className="w-full" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <FormField
          control={form.control}
          name="settedOutstandingBalance"
          render={({ field }) => (
            <FormItem>
              <FormLabel className={`${!hasDeductions ? "opacity-50" : ""}`}>
                Outstanding Balance
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="UAI/SPOI"
                  type="number"
                  step="1000" // increments/decrements by 1000
                  {...field}
                  onKeyDown={preventInvalidInput}
                  onChange={(e) =>
                    preventNegativeAndLimitDecimals(e, field.onChange)
                  }
                  className={`disabled:opacity-50`}
                  disabled={!hasDeductions}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="otherDeduction"
          render={({ field }) => (
            <FormItem>
              <FormLabel className={`${!hasDeductions ? "opacity-50" : ""}`}>
                Other Deduction/s{" "}
                <span className="font-light italic text-gray-500">
                  (e.g. UA , SP , OI )
                </span>
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="0.00"
                  type="number"
                  step="1000" // increments/decrements by 1000
                  {...field}
                  onKeyDown={preventInvalidInput}
                  onChange={(e) =>
                    preventNegativeAndLimitDecimals(e, field.onChange)
                  }
                  className={!hasDeductions ? "opacity-50" : ""}
                  disabled={!hasDeductions}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};

export default LoanForm;
