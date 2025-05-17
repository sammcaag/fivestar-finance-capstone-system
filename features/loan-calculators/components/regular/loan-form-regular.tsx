"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { UseFormReturn } from "react-hook-form";
import { LoanFormProps, RateProps } from "../../types/types-regular";
import RateCards from "./rate-cards";
import {
  preventInvalidInput,
  preventNegativeAndLimitDecimals,
} from "@/utils/handling-input-numbers";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import CustomDatePicker from "@/components/custom/custom-date-picker";
import { getYear } from "date-fns";
import { CustomTooltip } from "@/components/custom/custom-tooltip";
import { Info } from "lucide-react";

export default function LoanForm({
  form,
  selectedCard,
  onCardSelect,
  hasDeduction,
  setHasDeduction,
  clientType,
  maturityDate,
  setMaturityDate,
  isDoneCalculate,
}: LoanFormProps) {
  // Base rates used for the RateCards component
  const rates: RateProps[] = [
    { id: "1", title: "Regular Rate" },
    { id: "2", title: "Special Rate" },
    { id: "3", title: "A Rate" },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                  min={0}
                  max={35000}
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
              <Select
                onValueChange={(value) => field.onChange(Number(value))}
                defaultValue={field.value ? String(field.value) : ""}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue
                      placeholder="Select Term"
                      className={`${field.value === 0 && "text-red-500"}`}
                    />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="0" className="text-gray-500">
                    Select Term
                  </SelectItem>
                  <SelectItem value="12">12 Months</SelectItem>
                  <SelectItem value="24">24 Months</SelectItem>
                  <SelectItem value="36">36 Months</SelectItem>
                  <SelectItem value="48">48 Months</SelectItem>
                  <SelectItem value="60">60 Months</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      {clientType !== "Renewal" ? (
        <div className="w-full flex items-center">
          <div className="flex items-center gap-2 flex-shrink-0">
            <Checkbox
              id="deductions"
              checked={hasDeduction}
              onCheckedChange={setHasDeduction}
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
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label className="text-sm">Maturity Date</Label>
            <CustomDatePicker
              date={maturityDate ?? new Date()} // Provide a default value if undefined
              setDate={setMaturityDate ?? (() => {})} // Provide a no-op function if undefined
              editable={true}
              startYear={getYear(new Date())}
              endYear={getYear(new Date()) + 5}
              isPreviousMonthsUnselectable={true}
              showCalendar={false}
            />
          </div>

          <FormField
            control={form.control}
            name="remainingMonths"
            render={({ field }) => (
              <FormItem>
                <div className="flex justify-between items-center mr-1 py-1">
                  <FormLabel
                    className={`${
                      !hasDeduction ? "opacity-50" : ""
                    } pointer-events-none cursor-not-allowed`}
                  >
                    Remaining Months
                  </FormLabel>

                  <CustomTooltip
                    icon={Info}
                    description="Remaining Months is automatically calculated by maturity date - current date."
                  />
                </div>
                <FormControl>
                  <Input
                    placeholder="0"
                    type="number"
                    {...field}
                    className="disabled:opacity-100"
                    disabled={true}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          control={form.control}
          name="outstandingBalance"
          render={({ field }) => (
            <FormItem>
              <div className="flex justify-between items-center mr-1 pt-1 pb-1.5">
                <FormLabel
                  className={`${!hasDeduction ? "opacity-50" : ""} ${
                    clientType === "Renewal" && "pointer-events-none"
                  }`}
                >
                  Outstanding Balance
                </FormLabel>
                {clientType === "Renewal" && (
                  <CustomTooltip
                    icon={Info}
                    description="Outstanding Balance is automatically computed based on the remaining months x monthly amortization."
                  />
                )}
              </div>
              <FormControl>
                <Input
                  placeholder="Outstanding Balance"
                  type="number"
                  step="1000" // increments/decrements by 1000
                  {...field}
                  onKeyDown={preventInvalidInput}
                  onChange={(e) =>
                    preventNegativeAndLimitDecimals(e, field.onChange)
                  }
                  className={`${
                    clientType === "Renewal" && "disabled:opacity-100"
                  }`}
                  disabled={!hasDeduction || clientType === "Renewal"}
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
              <FormLabel className={!hasDeduction ? "opacity-50" : ""}>
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
                  className={!hasDeduction ? "opacity-50" : ""}
                  disabled={!hasDeduction}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      {/* Show RateCards component */}
      {isDoneCalculate && (
        <>
          <div className="flex items-center justify-center">
            <Separator className="flex-1" />
            <p className="px-4 text-center font-bold text-base whitespace-nowrap">
              Please Choose a Client Rate
            </p>
            <Separator className="flex-1" />
          </div>
          <RateCards
            rates={rates}
            selectedCard={selectedCard}
            onCardClick={onCardSelect}
          />
        </>
      )}

      <Separator className="my-4" />
    </div>
  );
}
