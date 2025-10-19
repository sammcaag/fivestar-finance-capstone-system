"use client";
import { useState } from "react";
import type React from "react";

import { FormControl, FormField, FormMessage } from "@/components/ui/form";
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
} from "../../../../../utils/handling-input-numbers";
import { Checkbox } from "@/components/ui/checkbox";
import { motion } from "framer-motion";
import { Calendar, Clock, AlertCircle, PhilippinePeso } from "lucide-react";
import CustomDatePicker from "@/components/CustomDatePicker";
import { getYear } from "date-fns";
import {
  COLORS,
  containerVariants,
  FORM_STYLES,
  FormFieldWrapper,
  FormHeader,
  formItemVariants,
} from "../StyleHelper";

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
  const rates: RateProps[] = [
    { id: "1", title: "Regular Rate" },
    { id: "2", title: "Special Rate" },
    { id: "3", title: "A Rate" },
  ];

  const [focusedField, setFocusedField] = useState<string | null>(null);

  const hasFieldError = (fieldName: keyof FormValues) =>
    !!form.formState.errors[fieldName];

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
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
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
                      max={35000}
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
                    tooltip="The duration of the loan in months"
                    hasError={hasFieldError("term")}
                  />
                  <Select
                    onValueChange={(value) => field.onChange(Number(value))}
                    defaultValue={field.value ? String(field.value) : ""}
                    onOpenChange={(open) => {
                      setFocusedField(open ? "term" : null);
                    }}
                  >
                    <FormControl>
                      <SelectTrigger className={FORM_STYLES.selectTrigger}>
                        <SelectValue
                          placeholder="Select Term"
                          className={field.value === 0 ? COLORS.muted : ""}
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="0" className={COLORS.muted}>
                        Select Term
                      </SelectItem>
                      {[12, 24, 36, 48, 60].map((months) => (
                        <SelectItem key={months} value={String(months)}>
                          {months} Months
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className={FORM_STYLES.messagePadding}>
                  <FormMessage />
                </div>
              </FormFieldWrapper>
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
            className={`${FORM_STYLES.container} ${
              focusedField === "maturityDate" ? COLORS.focus : COLORS.default
            } bg-card ${FORM_STYLES.padding}`}
          >
            <FormHeader
              icon={Calendar}
              label="Maturity Date"
              tooltip="The date when the loan will be fully paid"
            />
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
            render={({ field }) => {
              return (
                <FormFieldWrapper
                  fieldName="remainingMonths"
                  focusedField={focusedField}
                  hasError={hasFieldError("remainingMonths")}
                  isDisabled={true}
                >
                  <div className={FORM_STYLES.padding}>
                    <FormHeader
                      icon={Clock}
                      label="Remaining Months"
                      tooltip="Automatically calculated based on maturity date"
                      isDisabled={true}
                    />
                    <FormControl>
                      <div className="flex items-center bg-background rounded-md px-2 py-0.5">
                        <Input
                          placeholder="0"
                          type="number"
                          {...field}
                          className={`${FORM_STYLES.input} ${
                            !hasDeduction
                              ? `${COLORS.muted} disabled:opacity-100`
                              : ""
                          }`}
                          disabled={true}
                        />
                        <span className={COLORS.muted}>months</span>
                      </div>
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
      )}

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
            name="outstandingBalance"
            render={({ field }) => {
              const isDisabled = !hasDeduction || clientType === "Renewal";
              return (
                <FormFieldWrapper
                  fieldName="outstandingBalance"
                  focusedField={focusedField}
                  hasError={hasFieldError("outstandingBalance")}
                  isDisabled={isDisabled}
                >
                  <div className={FORM_STYLES.padding}>
                    <FormHeader
                      icon={PhilippinePeso}
                      label="Outstanding Balance"
                      tooltip={
                        clientType === "Renewal"
                          ? "Automatically computed based on remaining months × monthly amortization"
                          : "The remaining balance on the loan"
                      }
                      hasError={hasFieldError("outstandingBalance")}
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
                          "outstandingBalance",
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
              const isDisabled = !hasDeduction;
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
