"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import type { Variants } from "framer-motion";
import { DollarSign, Calendar, Clock } from "lucide-react";
import {
  preventInvalidInput,
  preventNegativeAndLimitDecimals,
} from "../../../../utils/handling-input-numbers";
import { LoanFormRegularProps, RateProps } from "../../types/types-regular";
import { NumberInputField } from "../NumberInputField";
import { SelectField } from "../SelectField";
import { DeductionToggle } from "../DeductionToggle";
import { DatePickerField } from "../DatePickerField";
import { FormFieldWrapper } from "../FormFieldWraper";
import { RateCards } from "./RateCards";

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

  const formItemVariants: Variants = {
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

  const termOptions = [
    { value: "0", label: "Select Term", disabled: false },
    { value: "12", label: "12 Months" },
    { value: "24", label: "24 Months" },
    { value: "36", label: "36 Months" },
    { value: "48", label: "48 Months" },
    { value: "60", label: "60 Months" },
  ];

  return (
    <div className="space-y-8">
      {/* Main Form Fields */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 },
          },
        }}
      >
        <motion.div variants={formItemVariants}>
          <NumberInputField
            form={form}
            name="monthlyAmortization"
            label="Monthly Amortization (MA)"
            icon={DollarSign}
            tooltip="The fixed amount paid by the client each month"
            placeholder="Enter amount"
            focusedField={focusedField}
            setFocusedField={setFocusedField}
            min={0}
            max={35000}
            step="1000"
          />
        </motion.div>

        <motion.div variants={formItemVariants}>
          <SelectField
            form={form}
            name="term"
            label="Term (Months)"
            icon={Clock}
            tooltip="The duration of the loan in months"
            placeholder="Select Term"
            options={termOptions}
            focusedField={focusedField}
            setFocusedField={setFocusedField}
          />
        </motion.div>
      </motion.div>

      {/* Deduction Toggle or Renewal Fields */}
      {clientType !== "Renewal" ? (
        <DeductionToggle
          hasDeduction={hasDeduction}
          setHasDeduction={setHasDeduction}
          variants={formItemVariants}
        />
      ) : (
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          variants={formItemVariants}
          initial="hidden"
          animate="visible"
        >
          <DatePickerField
            label="Maturity Date"
            icon={Calendar}
            tooltip="The date when the loan will be fully paid"
            date={maturityDate}
            setDate={setMaturityDate}
            focusedField={focusedField}
            setFocusedField={setFocusedField}
            fieldName="maturityDate"
            editable={true}
          />

          <FormFieldWrapper
            form={form}
            name="remainingMonths"
            label="Remaining Months"
            icon={Clock}
            tooltip="Automatically calculated based on maturity date"
            focusedField={focusedField}
            setFocusedField={setFocusedField}
            disabled={true}
          >
            {({ field }) => (
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
            )}
          </FormFieldWrapper>
        </motion.div>
      )}

      {/* Deduction Fields */}
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
          <NumberInputField
            form={form}
            name="outstandingBalance"
            label="Outstanding Balance"
            icon={DollarSign}
            tooltip={
              clientType === "Renewal"
                ? "Automatically computed based on remaining months × monthly amortization"
                : "Outstanding balance amount"
            }
            placeholder="Outstanding Balance"
            focusedField={focusedField}
            setFocusedField={setFocusedField}
            disabled={!hasDeduction || clientType === "Renewal"}
            step="1000"
          />
        </motion.div>

        <motion.div variants={formItemVariants}>
          <FormFieldWrapper
            form={form}
            name="otherDeduction"
            label="Other Deduction/s (e.g. UA, SP, OI)"
            icon={DollarSign}
            tooltip="Additional deductions to be applied to the loan"
            focusedField={focusedField}
            setFocusedField={setFocusedField}
            disabled={!hasDeduction}
          >
            {({ field }) => (
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
            )}
          </FormFieldWrapper>
        </motion.div>
      </motion.div>

      {/* Rate Cards */}
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
