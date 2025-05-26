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
import type {
  LoanFormProps,
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

interface EnhancedLoanFormProps extends LoanFormProps {
  hasFormErrors?: boolean;
}

export default function EnhancedLoanForm({
  form,
  selectedCard,
  onCardSelect,
  hasDeduction,
  setHasDeduction,
  clientType,
  maturityDate,
  setMaturityDate,
  isDoneCalculate,
  hasFormErrors,
}: EnhancedLoanFormProps) {
  const rates: RateProps[] = [
    { id: "1", title: "Regular Rate" },
    { id: "2", title: "Special Rate" },
    { id: "3", title: "A Rate" },
  ];

  const formItemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.2,
        ease: "easeOut",
      },
    },
  };

  const hasFieldError = (fieldName: keyof FormValues) => {
    return !!form.formState.errors[fieldName];
  };

  return (
    <div className="space-y-6">
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.05,
            },
          },
        }}
      >
        <motion.div variants={formItemVariants}>
          <FormField
            control={form.control}
            name="monthlyAmortization"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <div className="min-h-[60px] flex flex-col justify-start">
                  <FormLabel className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center mb-2">
                    <DollarSign className="h-4 w-4 mr-2 text-blue-500" />
                    Monthly Amortization (MA)
                    <CustomTooltip
                      icon={Info}
                      description="The fixed amount paid by the client each month"
                      iconClassName="text-blue-500 ml-2"
                    />
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter amount"
                      type="number"
                      min={0}
                      max={35000}
                      step="1000"
                      className="h-12 text-base w-full"
                      {...field}
                      onKeyDown={preventInvalidInput}
                      onChange={(e) =>
                        preventNegativeAndLimitDecimals(e, field.onChange)
                      }
                    />
                  </FormControl>
                </div>
                <div className="min-h-[20px]">
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
              <FormItem className="space-y-2">
                <div className="min-h-[60px] flex flex-col justify-start">
                  <FormLabel className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center mb-2">
                    <Clock className="h-4 w-4 mr-2 text-blue-500" />
                    Term (Months)
                    <CustomTooltip
                      icon={Info}
                      description="The duration of the loan in months"
                      iconClassName="text-blue-500 ml-2"
                    />
                  </FormLabel>
                  <Select
                    onValueChange={(value) => field.onChange(Number(value))}
                    defaultValue={field.value ? String(field.value) : ""}
                  >
                    <FormControl>
                      <SelectTrigger className="h-12 text-base w-full">
                        <SelectValue placeholder="Select Term" />
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
                <div className="min-h-[20px]">
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
          <div className="space-y-2">
            <div className="min-h-[60px] flex flex-col justify-start">
              <Label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center mb-2">
                <Calendar className="h-4 w-4 mr-2 text-blue-500" />
                Maturity Date
                <CustomTooltip
                  icon={Info}
                  description="The date when the loan will be fully paid"
                  iconClassName="text-blue-500 ml-2"
                />
              </Label>
              <div className="h-12">
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
            </div>
            <div className="min-h-[20px]"></div>
          </div>

          <FormField
            control={form.control}
            name="remainingMonths"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <div className="min-h-[60px] flex flex-col justify-start">
                  <FormLabel className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center mb-2">
                    <Clock className="h-4 w-4 mr-2 text-blue-500" />
                    Remaining Months
                    <CustomTooltip
                      icon={Info}
                      description="Automatically calculated based on maturity date"
                      iconClassName="text-blue-500 ml-2"
                    />
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="0"
                      type="number"
                      {...field}
                      className="h-12 text-base w-full"
                      disabled={true}
                    />
                  </FormControl>
                </div>
                <div className="min-h-[20px]">
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
              staggerChildren: 0.05,
              delayChildren: 0.1,
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
              <FormItem className="space-y-2">
                <div className="min-h-[60px] flex flex-col justify-start">
                  <FormLabel className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center mb-2">
                    <DollarSign className="h-4 w-4 mr-2 text-blue-500" />
                    Outstanding Balance
                    {clientType === "Renewal" && (
                      <CustomTooltip
                        icon={Info}
                        description="Automatically computed based on remaining months × monthly amortization"
                        iconClassName="text-blue-500 ml-2"
                      />
                    )}
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Outstanding Balance"
                      type="number"
                      step="1000"
                      className="h-12 text-base w-full"
                      {...field}
                      onKeyDown={preventInvalidInput}
                      onChange={(e) =>
                        preventNegativeAndLimitDecimals(e, field.onChange)
                      }
                      disabled={!hasDeduction || clientType === "Renewal"}
                    />
                  </FormControl>
                </div>
                <div className="min-h-[20px]">
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
              <FormItem className="space-y-2">
                <div className="min-h-[60px] flex flex-col justify-start">
                  <FormLabel className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center mb-2">
                    <DollarSign className="h-4 w-4 mr-2 text-blue-500" />
                    Other Deduction/s
                    <span className="ml-2 text-xs font-normal text-muted-foreground italic">
                      (e.g. UA, SP, OI)
                    </span>
                    <CustomTooltip
                      icon={Info}
                      description="Additional deductions to be applied to the loan"
                      iconClassName="text-blue-500 ml-2"
                    />
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="0.00"
                      type="number"
                      step="1000"
                      className="h-12 text-base w-full"
                      {...field}
                      onKeyDown={preventInvalidInput}
                      onChange={(e) =>
                        preventNegativeAndLimitDecimals(e, field.onChange)
                      }
                      disabled={!hasDeduction}
                    />
                  </FormControl>
                </div>
                <div className="min-h-[20px]">
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
        </motion.div>
      </motion.div>

      {isDoneCalculate && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex items-center justify-center mb-6">
            <Separator className="flex-1" />
            <p className="px-6 text-center font-bold text-lg whitespace-nowrap bg-gradient-to-r from-blue-600 to-cyan-500 text-transparent bg-clip-text">
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
