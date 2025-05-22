"use client";
import { useState } from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  preventInvalidInput,
  preventNegativeAndLimitDecimals,
} from "../../../../utils/handling-input-numbers";
import { Checkbox } from "@/components/ui/checkbox";
import { motion } from "framer-motion";
import { Info, DollarSign, Calendar, Clock } from "lucide-react";
import { CustomTooltip } from "@/components/CustomTooltip";
import CustomDatePicker from "@/components/CustomDatePicker";
import { getYear } from "date-fns";
import type { UseFormReturn } from "react-hook-form";
import type { FormValues } from "../../types/types-extension";

interface LoanFormExtensionProps {
  form: UseFormReturn<FormValues>;
  hasDeductions: boolean;
  setHasDeductions: (hasDeduction: boolean) => void;
  hasFormErrors?: boolean;
}

export default function LoanFormExtension({
  form,
  hasDeductions,
  setHasDeductions,
}: // hasFormErrors,
LoanFormExtensionProps) {
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const formItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
  };

  // Helper function to determine if a field has an error
  const hasFieldError = (fieldName: keyof FormValues) => {
    return !!form.formState.errors[fieldName];
  };

  return (
    <div className="space-y-8">
      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.1,
            },
          },
        }}
      >
        <motion.div variants={formItemVariants}>
          <FormField
            control={form.control}
            name="monthlyAmortization"
            render={({ field }) => (
              <FormItem
                className={`overflow-hidden rounded-lg border ${
                  focusedField === "monthlyAmortization"
                    ? "ring-2 ring-blue-200 border-blue-300"
                    : hasFieldError("monthlyAmortization")
                    ? "ring-2 ring-red-200 border-red-300"
                    : "border-gray-200 dark:border-gray-800"
                } bg-white dark:bg-gray-950 transition-all duration-200 shadow-sm`}
              >
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <FormLabel className="text-base font-medium flex items-center">
                      <DollarSign
                        className={`h-4 w-4 mr-2 ${
                          hasFieldError("monthlyAmortization")
                            ? "text-red-500"
                            : "text-blue-500"
                        }`}
                      />
                      Monthly Amortization (MA)
                    </FormLabel>
                    <CustomTooltip
                      icon={Info}
                      description="The fixed amount paid by the client each month"
                      iconClassName={
                        hasFieldError("monthlyAmortization")
                          ? "text-red-500"
                          : "text-blue-500"
                      }
                    />
                  </div>
                  <FormControl>
                    <Input
                      placeholder="Enter amount"
                      type="number"
                      min={0}
                      step="1000"
                      className="border-0 bg-transparent text-lg focus-visible:ring-0 p-0 h-auto w-full"
                      {...field}
                      onKeyDown={preventInvalidInput}
                      onChange={(e) =>
                        preventNegativeAndLimitDecimals(e, field.onChange)
                      }
                      onFocus={() => setFocusedField("monthlyAmortization")}
                      onBlur={() => setFocusedField(null)}
                    />
                  </FormControl>
                </div>
                <div className="px-4 pb-3">
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
        </motion.div>

        <motion.div variants={formItemVariants}>
          <FormField
            control={form.control}
            name="term"
            render={({ field }) => (
              <FormItem
                className={`overflow-hidden rounded-lg border ${
                  focusedField === "term"
                    ? "ring-2 ring-blue-200 border-blue-300"
                    : hasFieldError("term")
                    ? "ring-2 ring-red-200 border-red-300"
                    : "border-gray-200 dark:border-gray-800"
                } bg-white dark:bg-gray-950 transition-all duration-200 shadow-sm`}
              >
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <FormLabel className="text-base font-medium flex items-center">
                      <Clock
                        className={`h-4 w-4 mr-2 ${
                          hasFieldError("term")
                            ? "text-red-500"
                            : "text-blue-500"
                        }`}
                      />
                      Term (Months)
                    </FormLabel>
                    <CustomTooltip
                      icon={Info}
                      description="The duration of the extension in months (6-25)"
                      iconClassName={
                        hasFieldError("term") ? "text-red-500" : "text-blue-500"
                      }
                    />
                  </div>
                  <FormControl>
                    <Input
                      placeholder="Enter term (6-25 months)"
                      type="number"
                      min={6}
                      max={25}
                      className="border-0 bg-transparent text-lg focus-visible:ring-0 p-0 h-auto w-full"
                      {...field}
                      onChange={(e) => {
                        const value =
                          e.target.value === "" ? "" : Number(e.target.value);
                        field.onChange(value);
                      }}
                      onFocus={() => setFocusedField("term")}
                      onBlur={() => setFocusedField(null)}
                    />
                  </FormControl>
                </div>
                <div className="px-4 pb-3">
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
        </motion.div>

        <motion.div variants={formItemVariants}>
          <FormField
            control={form.control}
            name="settedMaturityDate"
            render={({ field }) => (
              <FormItem
                className={`overflow-hidden rounded-lg border ${
                  focusedField === "settedMaturityDate"
                    ? "ring-2 ring-blue-200 border-blue-300"
                    : hasFieldError("settedMaturityDate")
                    ? "ring-2 ring-red-200 border-red-300"
                    : "border-gray-200 dark:border-gray-800"
                } bg-white dark:bg-gray-950 transition-all duration-200 shadow-sm`}
              >
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <FormLabel className="text-base font-medium flex items-center">
                      <Calendar
                        className={`h-4 w-4 mr-2 ${
                          hasFieldError("settedMaturityDate")
                            ? "text-red-500"
                            : "text-blue-500"
                        }`}
                      />
                      Maturity Date
                    </FormLabel>
                    <CustomTooltip
                      icon={Info}
                      description="The date when the current loan will be fully paid"
                      iconClassName={
                        hasFieldError("settedMaturityDate")
                          ? "text-red-500"
                          : "text-blue-500"
                      }
                    />
                  </div>
                  <FormControl>
                    <CustomDatePicker
                      date={field.value || new Date()}
                      setDate={(date) => field.onChange(date)}
                      startYear={getYear(new Date())}
                      endYear={getYear(new Date()) + 5}
                      showCalendar={false}
                      isPreviousMonthsUnselectable={true}
                      customDateFormat="MMMM d, yyyy"
                      // onFocus={() => setFocusedField("settedMaturityDate")}
                      // onBlur={() => setFocusedField(null)}
                    />
                  </FormControl>
                </div>
                <div className="px-4 pb-3">
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
        </motion.div>
      </motion.div>

      <motion.div
        className="flex items-center gap-4 p-4 rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50"
        variants={formItemVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="flex items-center gap-2">
          <Checkbox
            id="deductions"
            checked={hasDeductions}
            onCheckedChange={setHasDeductions}
            className="data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500"
          />
          <label
            htmlFor="deductions"
            className="text-sm font-medium leading-none cursor-pointer select-none"
          >
            Apply deductions to this calculation
          </label>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Info className="h-4 w-4" />
          <span>
            Enabling this will allow you to specify outstanding balance and
            other deductions
          </span>
        </div>
      </motion.div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.1,
              delayChildren: 0.2,
            },
          },
        }}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={formItemVariants}>
          <FormField
            control={form.control}
            name="settedOutstandingBalance"
            render={({ field }) => (
              <FormItem
                className={`overflow-hidden rounded-lg border ${
                  focusedField === "settedOutstandingBalance"
                    ? "ring-2 ring-blue-200 border-blue-300"
                    : hasFieldError("settedOutstandingBalance")
                    ? "ring-2 ring-red-200 border-red-300"
                    : "border-gray-200 dark:border-gray-800"
                } ${
                  !hasDeductions
                    ? "bg-gray-50 dark:bg-gray-900/50"
                    : "bg-white dark:bg-gray-950"
                } transition-all duration-200 shadow-sm`}
              >
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <FormLabel
                      className={`text-base font-medium flex items-center ${
                        !hasDeductions ? "text-muted-foreground" : ""
                      }`}
                    >
                      <DollarSign
                        className={`h-4 w-4 mr-2 ${
                          hasFieldError("settedOutstandingBalance")
                            ? "text-red-500"
                            : !hasDeductions
                            ? "text-muted-foreground"
                            : "text-blue-500"
                        }`}
                      />
                      Outstanding Balance
                    </FormLabel>
                    <CustomTooltip
                      icon={Info}
                      description="The remaining balance on the loan (UAI/SPOI)"
                      iconClassName={
                        hasFieldError("settedOutstandingBalance")
                          ? "text-red-500"
                          : !hasDeductions
                          ? "text-muted-foreground"
                          : "text-blue-500"
                      }
                    />
                  </div>
                  <FormControl>
                    <Input
                      placeholder="Outstanding Balance"
                      type="number"
                      step="1000"
                      className={`border-0 bg-transparent text-lg focus-visible:ring-0 p-0 h-auto w-full ${
                        !hasDeductions ? "text-muted-foreground" : ""
                      }`}
                      {...field}
                      onKeyDown={preventInvalidInput}
                      onChange={(e) =>
                        preventNegativeAndLimitDecimals(e, field.onChange)
                      }
                      disabled={!hasDeductions}
                      onFocus={() =>
                        setFocusedField("settedOutstandingBalance")
                      }
                      onBlur={() => setFocusedField(null)}
                    />
                  </FormControl>
                </div>
                <div className="px-4 pb-3">
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
        </motion.div>

        <motion.div variants={formItemVariants}>
          <FormField
            control={form.control}
            name="otherDeduction"
            render={({ field }) => (
              <FormItem
                className={`overflow-hidden rounded-lg border ${
                  focusedField === "otherDeduction"
                    ? "ring-2 ring-blue-200 border-blue-300"
                    : hasFieldError("otherDeduction")
                    ? "ring-2 ring-red-200 border-red-300"
                    : "border-gray-200 dark:border-gray-800"
                } ${
                  !hasDeductions
                    ? "bg-gray-50 dark:bg-gray-900/50"
                    : "bg-white dark:bg-gray-950"
                } transition-all duration-200 shadow-sm`}
              >
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <FormLabel
                      className={`text-base font-medium flex items-center ${
                        !hasDeductions ? "text-muted-foreground" : ""
                      }`}
                    >
                      <DollarSign
                        className={`h-4 w-4 mr-2 ${
                          hasFieldError("otherDeduction")
                            ? "text-red-500"
                            : !hasDeductions
                            ? "text-muted-foreground"
                            : "text-blue-500"
                        }`}
                      />
                      Other Deduction/s
                      <span className="ml-2 text-xs font-normal text-muted-foreground italic">
                        (e.g. UA, SP, OI)
                      </span>
                    </FormLabel>
                    <CustomTooltip
                      icon={Info}
                      description="Additional deductions to be applied to the loan"
                      iconClassName={
                        hasFieldError("otherDeduction")
                          ? "text-red-500"
                          : !hasDeductions
                          ? "text-muted-foreground"
                          : "text-blue-500"
                      }
                    />
                  </div>
                  <FormControl>
                    <Input
                      placeholder="0.00"
                      type="number"
                      step="1000"
                      className={`border-0 bg-transparent text-lg focus-visible:ring-0 p-0 h-auto w-full ${
                        !hasDeductions ? "text-muted-foreground" : ""
                      }`}
                      {...field}
                      onKeyDown={preventInvalidInput}
                      onChange={(e) =>
                        preventNegativeAndLimitDecimals(e, field.onChange)
                      }
                      disabled={!hasDeductions}
                      onFocus={() => setFocusedField("otherDeduction")}
                      onBlur={() => setFocusedField(null)}
                    />
                  </FormControl>
                </div>
                <div className="px-4 pb-3">
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
        </motion.div>
      </motion.div>

      <Separator className="my-6" />
    </div>
  );
}
