"use client";
import { useState } from "react";
import type React from "react";

import { FormControl, FormField, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  preventInvalidInput,
  preventNegativeAndLimitDecimals,
} from "../../../../utils/handling-input-numbers";
import { Checkbox } from "@/components/ui/checkbox";
import { motion } from "framer-motion";
import {
  AlertCircle,
  AudioLines as PhilippinePeso,
  Calendar,
  Clock,
} from "lucide-react";
import CustomDatePicker from "@/components/CustomDatePicker";
import { getYear } from "date-fns";
import type { UseFormReturn } from "react-hook-form";
import type { FormValues } from "../../types/types-extension";
import {
  COLORS,
  containerVariants,
  FORM_STYLES,
  FormFieldWrapper,
  FormHeader,
  formItemVariants,
} from "../StyleHelper";

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

  // Helper function to determine if a field has an error
  const hasFieldError = (fieldName: keyof FormValues) => {
    return !!form.formState.errors[fieldName];
  };

  const createInputHandlers = (
    fieldName: string,
    onChange: (value: string | number) => void
  ) => ({
    onFocus: () => setFocusedField(fieldName),
    onBlur: () => setFocusedField(null),
    onKeyDown: preventInvalidInput,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
      preventNegativeAndLimitDecimals(e, onChange),
  });

  return (
    <div className="space-y-8">
      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.div variants={formItemVariants}>
          <FormField
            control={form.control}
            name="monthlyAmortization"
            render={({ field }) => (
              <FormFieldWrapper
                fieldName="monthlyAmortization"
                focusedField={focusedField}
                hasError={hasFieldError("monthlyAmortization")}
              >
                <div className={FORM_STYLES.padding}>
                  <FormHeader
                    icon={PhilippinePeso}
                    label="Monthly Amortization (MA)"
                    tooltip="The fixed amount paid by the client each month"
                    hasError={hasFieldError("monthlyAmortization")}
                  />
                  <FormControl>
                    <Input
                      placeholder="Enter amount"
                      type="number"
                      min={0}
                      step="1000"
                      className={FORM_STYLES.input}
                      {...field}
                      {...createInputHandlers(
                        "monthlyAmortization",
                        field.onChange
                      )}
                    />
                  </FormControl>
                </div>
                <div className={FORM_STYLES.messagePadding}>
                  <FormMessage />
                </div>
              </FormFieldWrapper>
            )}
          />
        </motion.div>

        <motion.div variants={formItemVariants}>
          <FormField
            control={form.control}
            name="term"
            render={({ field }) => (
              <FormFieldWrapper
                fieldName="term"
                focusedField={focusedField}
                hasError={hasFieldError("term")}
              >
                <div className={FORM_STYLES.padding}>
                  <FormHeader
                    icon={Clock}
                    label="Term (Months)"
                    tooltip="The duration of the extension in months (6-25)"
                    hasError={hasFieldError("term")}
                  />
                  <FormControl>
                    <Input
                      placeholder="Enter term (6-25 months)"
                      type="number"
                      min={6}
                      max={25}
                      className={FORM_STYLES.input}
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
                <div className={FORM_STYLES.messagePadding}>
                  <FormMessage />
                </div>
              </FormFieldWrapper>
            )}
          />
        </motion.div>

        <motion.div variants={formItemVariants}>
          <FormField
            control={form.control}
            name="settedMaturityDate"
            render={({ field }) => (
              <FormFieldWrapper
                fieldName="settedMaturityDate"
                focusedField={focusedField}
                hasError={hasFieldError("settedMaturityDate")}
              >
                <div className={FORM_STYLES.padding}>
                  <FormHeader
                    icon={Calendar}
                    label="Maturity Date"
                    tooltip="The date when the current loan will be fully paid"
                    hasError={hasFieldError("settedMaturityDate")}
                  />
                  <FormControl>
                    <CustomDatePicker
                      date={field.value || new Date()}
                      setDate={(date) => field.onChange(date)}
                      startYear={getYear(new Date())}
                      endYear={getYear(new Date()) + 5}
                      showCalendar={false}
                      isPreviousMonthsUnselectable={true}
                      customDateFormat="MMMM d, yyyy"
                    />
                  </FormControl>
                </div>
                <div className={FORM_STYLES.messagePadding}>
                  <FormMessage />
                </div>
              </FormFieldWrapper>
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
          <AlertCircle className="h-4 w-4" />
          <span>
            Enabling this will allow you to specify outstanding balance and
            other deductions
          </span>
        </div>
      </motion.div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
        variants={{
          ...containerVariants,
          visible: {
            ...containerVariants.visible,
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
            render={({ field }) => {
              const isDisabled = !hasDeductions;
              return (
                <FormFieldWrapper
                  fieldName="settedOutstandingBalance"
                  focusedField={focusedField}
                  hasError={hasFieldError("settedOutstandingBalance")}
                  isDisabled={isDisabled}
                >
                  <div className={FORM_STYLES.padding}>
                    <FormHeader
                      icon={PhilippinePeso}
                      label="Outstanding Balance"
                      tooltip="The remaining balance on the loan (UAI/SPOI)"
                      hasError={hasFieldError("settedOutstandingBalance")}
                      isDisabled={isDisabled}
                    />
                    <FormControl>
                      <Input
                        placeholder="Outstanding Balance"
                        type="number"
                        step="1000"
                        className={`${FORM_STYLES.input} ${
                          isDisabled && `${COLORS.muted} disabled:opacity-100`
                        }`}
                        {...field}
                        {...createInputHandlers(
                          "settedOutstandingBalance",
                          field.onChange
                        )}
                        disabled={isDisabled}
                      />
                    </FormControl>
                  </div>
                  <div className={FORM_STYLES.messagePadding}>
                    <FormMessage />
                  </div>
                </FormFieldWrapper>
              );
            }}
          />
        </motion.div>

        <motion.div variants={formItemVariants}>
          <FormField
            control={form.control}
            name="otherDeduction"
            render={({ field }) => {
              const isDisabled = !hasDeductions;
              return (
                <FormFieldWrapper
                  fieldName="otherDeduction"
                  focusedField={focusedField}
                  hasError={hasFieldError("otherDeduction")}
                  isDisabled={isDisabled}
                >
                  <div className={FORM_STYLES.padding}>
                    <FormHeader
                      icon={PhilippinePeso}
                      label="Other Deduction/s"
                      tooltip="Additional deductions to be applied to the loan"
                      hasError={hasFieldError("otherDeduction")}
                      isDisabled={isDisabled}
                      extraContent={
                        <span className="ml-2 text-xs font-normal text-muted-foreground italic">
                          (e.g. UA, SP, OI)
                        </span>
                      }
                    />
                    <FormControl>
                      <Input
                        placeholder="0.00"
                        type="number"
                        step="1000"
                        className={`${FORM_STYLES.input} ${
                          isDisabled
                            ? `${COLORS.muted} disabled:opacity-100`
                            : ""
                        }`}
                        {...field}
                        {...createInputHandlers(
                          "otherDeduction",
                          field.onChange
                        )}
                        disabled={isDisabled}
                      />
                    </FormControl>
                  </div>
                  <div className={FORM_STYLES.messagePadding}>
                    <FormMessage />
                  </div>
                </FormFieldWrapper>
              );
            }}
          />
        </motion.div>
      </motion.div>

      <Separator className="my-6" />
    </div>
  );
}
