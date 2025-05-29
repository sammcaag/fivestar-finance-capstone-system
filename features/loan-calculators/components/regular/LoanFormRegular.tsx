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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import type {
  LoanFormRegularProps,
  RateProps,
  FormValues,
} from "../../types/types-regular";
import RateCards from "./RateCards";
import {
  preventInvalidInput,
  preventNegativeAndLimitDecimals,
} from "../../../../utils/handling-input-numbers";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import { Info, DollarSign, Calendar, Clock, AlertCircle } from "lucide-react";
import { CustomTooltip } from "@/components/CustomTooltip";
import CustomDatePicker from "@/components/CustomDatePicker";
import { getYear } from "date-fns";

export default function LoanFormRegular({
  form,
  selectedCard,
  onCardSelect,
  hasDeduction,
  setHasDeduction,
  clientType,
  maturityDate,
  setMaturityDate,
  isDoneCalculate,
}: LoanFormRegularProps) {
  // Base rates used for the RateCards component
  const rates: RateProps[] = [
    { id: "1", title: "Regular Rate" },
    { id: "2", title: "Special Rate" },
    { id: "3", title: "A Rate" },
  ];

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
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
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
                      max={35000}
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
                      description="The duration of the loan in months"
                      iconClassName={
                        hasFieldError("term") ? "text-red-500" : "text-blue-500"
                      }
                    />
                  </div>
                  <Select
                    onValueChange={(value) => field.onChange(Number(value))}
                    defaultValue={field.value ? String(field.value) : ""}
                    onOpenChange={(open) => {
                      if (open) setFocusedField("term");
                      else setFocusedField(null);
                    }}
                  >
                    <FormControl>
                      <SelectTrigger className="border-0 bg-transparent text-lg focus:ring-0 p-0 h-auto shadow-none w-full">
                        <SelectValue
                          placeholder="Select Term"
                          className={`${
                            field.value === 0 && "text-muted-foreground"
                          }`}
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="0" className="text-muted-foreground">
                        Select Term
                      </SelectItem>
                      <SelectItem value="12">12 Months</SelectItem>
                      <SelectItem value="24">24 Months</SelectItem>
                      <SelectItem value="36">36 Months</SelectItem>
                      <SelectItem value="48">48 Months</SelectItem>
                      <SelectItem value="60">60 Months</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="px-4 pb-3">
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
        </motion.div>
      </motion.div>

      {clientType !== "Renewal" ? (
        <motion.div
          className="flex items-center gap-4 p-4 rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50"
          variants={formItemVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="flex items-center gap-2">
            <Checkbox
              id="deductions"
              checked={hasDeduction}
              onCheckedChange={setHasDeduction}
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
            <AlertCircle className="h-4 w-4" />
            <span>
              Enabling this will allow you to specify outstanding balance and
              other deductions
            </span>
          </div>
        </motion.div>
      ) : (
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          variants={formItemVariants}
          initial="hidden"
          animate="visible"
        >
          <div
            className={`overflow-hidden rounded-lg border ${
              focusedField === "maturityDate"
                ? "ring-2 ring-blue-200 border-blue-300"
                : "border-gray-200 dark:border-gray-800"
            } bg-white dark:bg-gray-950 transition-all duration-200 shadow-sm p-4`}
          >
            <div className="flex items-center justify-between mb-2">
              <Label className="text-base font-medium flex items-center">
                <Calendar className="h-4 w-4 mr-2 text-blue-500" />
                Maturity Date
              </Label>
              <CustomTooltip
                icon={Info}
                description="The date when the loan will be fully paid"
                iconClassName="text-blue-500"
              />
            </div>
            <CustomDatePicker
              date={maturityDate ?? new Date()}
              setDate={setMaturityDate ?? (() => {})}
              editable={true}
              startYear={getYear(new Date())}
              endYear={getYear(new Date()) + 5}
              isPreviousMonthsUnselectable={true}
              showCalendar={false}
              customDateFormat="MMMM d, yyyy"
            />
          </div>

          <FormField
            control={form.control}
            name="remainingMonths"
            render={({ field }) => (
              <FormItem
                className={`overflow-hidden rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 transition-all duration-200 shadow-sm`}
              >
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <FormLabel className="text-base font-medium flex items-center pointer-events-none">
                      <Clock className="h-4 w-4 mr-2 text-blue-500" />
                      Remaining Months
                    </FormLabel>
                    <CustomTooltip
                      icon={Info}
                      description="Automatically calculated based on maturity date"
                      iconClassName="text-blue-500"
                    />
                  </div>
                  <FormControl>
                    <div className="flex items-center bg-gray-50 dark:bg-gray-900/50 rounded-md px-3 py-2">
                      <Input
                        placeholder="0"
                        type="number"
                        {...field}
                        className="border-0 bg-transparent text-lg focus-visible:ring-0 p-0 h-auto disabled:opacity-100 w-full"
                        disabled={true}
                      />
                      <span className="text-muted-foreground">months</span>
                    </div>
                  </FormControl>
                </div>
                <div className="px-4 pb-3">
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
        </motion.div>
      )}

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
            name="outstandingBalance"
            render={({ field }) => (
              <FormItem
                className={`overflow-hidden rounded-lg border ${
                  focusedField === "outstandingBalance"
                    ? "ring-2 ring-blue-200 border-blue-300"
                    : hasFieldError("outstandingBalance")
                    ? "ring-2 ring-red-200 border-red-300"
                    : "border-gray-200 dark:border-gray-800"
                } ${
                  !hasDeduction || clientType === "Renewal"
                    ? "bg-gray-50 dark:bg-gray-900/50"
                    : "bg-white dark:bg-gray-950"
                } transition-all duration-200 shadow-sm`}
              >
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <FormLabel
                      className={`text-base font-medium flex items-center ${
                        !hasDeduction ? "text-muted-foreground" : ""
                      } ${clientType === "Renewal" && "pointer-events-none"}`}
                    >
                      <DollarSign
                        className={`h-4 w-4 mr-2 ${
                          hasFieldError("outstandingBalance")
                            ? "text-red-500"
                            : !hasDeduction || clientType === "Renewal"
                            ? "text-muted-foreground"
                            : "text-blue-500"
                        }`}
                      />
                      Outstanding Balance
                    </FormLabel>
                    {clientType === "Renewal" && (
                      <CustomTooltip
                        icon={Info}
                        description="Automatically computed based on remaining months × monthly amortization"
                        iconClassName={
                          hasFieldError("outstandingBalance")
                            ? "text-red-500"
                            : "text-blue-500"
                        }
                      />
                    )}
                  </div>
                  <FormControl>
                    <Input
                      placeholder="Outstanding Balance"
                      type="number"
                      step="1000"
                      className={`border-0 bg-transparent text-lg focus-visible:ring-0 p-0 h-auto w-full ${
                        !hasDeduction || clientType === "Renewal"
                          ? "text-muted-foreground"
                          : ""
                      } ${clientType === "Renewal" && "disabled:opacity-100"}`}
                      {...field}
                      onKeyDown={preventInvalidInput}
                      onChange={(e) =>
                        preventNegativeAndLimitDecimals(e, field.onChange)
                      }
                      disabled={!hasDeduction || clientType === "Renewal"}
                      onFocus={() => setFocusedField("outstandingBalance")}
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
                  !hasDeduction
                    ? "bg-gray-50 dark:bg-gray-900/50"
                    : "bg-white dark:bg-gray-950"
                } transition-all duration-200 shadow-sm`}
              >
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <FormLabel
                      className={`text-base font-medium flex items-center ${
                        !hasDeduction ? "text-muted-foreground" : ""
                      }`}
                    >
                      <DollarSign
                        className={`h-4 w-4 mr-2 ${
                          hasFieldError("otherDeduction")
                            ? "text-red-500"
                            : !hasDeduction
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
                          : !hasDeduction
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
                        !hasDeduction ? "text-muted-foreground" : ""
                      }`}
                      {...field}
                      onKeyDown={preventInvalidInput}
                      onChange={(e) =>
                        preventNegativeAndLimitDecimals(e, field.onChange)
                      }
                      disabled={!hasDeduction}
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

      {isDoneCalculate && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center justify-center mb-6">
            <Separator className="flex-1" />
            <p className="px-6 text-center font-bold text-base whitespace-nowrap bg-gradient-to-r from-blue-600 to-cyan-500 text-transparent bg-clip-text">
              Select Client Rate
            </p>
            <Separator className="flex-1" />
          </div>
          <RateCards
            rates={rates}
            selectedCard={selectedCard}
            onCardClick={onCardSelect}
          />
        </motion.div>
      )}

      <Separator className="my-6" />
    </div>
  );
}
