"use client";
import { motion } from "framer-motion";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import type { AccountsInformationProps } from "@/features/clients/types/types-clients";
import {
  CreditCard,
  Landmark,
  DollarSign,
  Building,
  Hash,
  Banknote,
} from "lucide-react";
import { preventInvalidInput } from "@/utils/handling-input-numbers";
import useClientAnimation from "../../hooks/use-client-animation";
import { StepTitleCard } from "../StepTitleCard";

const AccountsInformation = ({ form }: AccountsInformationProps) => {
  const { containerVariants, itemVariants } = useClientAnimation();

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Step Title Card */}

      <StepTitleCard
        variants={itemVariants}
        title={"Account's Information"}
        description={
          "Please provide details about client's pension and banking information."
        }
      />

      {/* Pension Details Section */}
      <motion.div
        variants={itemVariants}
        className="bg-card rounded-lg shadow-lg border"
      >
        <div className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-primary rounded-lg shadow-md">
              <DollarSign className="h-5 w-5 text-primary-foreground" />
            </div>
            <h3 className="text-xl font-semibold text-foreground">
              Pension Details
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
            <FormField
              control={form.control}
              name="accountNumber"
              render={({ field }) => (
                <FormItem className="w-full min-h-[80px] flex flex-col">
                  <FormLabel className="text-foreground font-medium">
                    <div className="flex items-center gap-2">
                      <Hash className="h-4 w-4 text-primary" />
                      Account Number
                    </div>
                  </FormLabel>
                  <FormControl>
                    <div className="relative w-full">
                      <Hash className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        placeholder="Enter account number"
                        type="number"
                        min={0}
                        onKeyDown={preventInvalidInput}
                        className="w-full rounded-md border-0 bg-background shadow-sm focus:shadow-md transition-all duration-200 pl-10"
                        {...field}
                        onChange={(e) => {
                          const value =
                            e.target.value === "" ? 0 : Number(e.target.value);
                          field.onChange(value);
                        }}
                        value={form.getValues("accountNumber") || ""}
                      />
                    </div>
                  </FormControl>
                  <div className="min-h-[20px]">
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="monthlyPension"
              render={({ field }) => (
                <FormItem className="w-full min-h-[80px] flex flex-col">
                  <FormLabel className="text-foreground font-medium">
                    <div className="flex items-center gap-2">
                      <Banknote className="h-4 w-4 text-primary" />
                      Monthly Pension
                    </div>
                  </FormLabel>
                  <FormControl>
                    <div className="relative w-full">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                        ₱
                      </span>
                      <Input
                        className="w-full rounded-md border-0 bg-background shadow-sm focus:shadow-md transition-all duration-200 pl-8"
                        placeholder="0.00"
                        type="number"
                        min={0}
                        {...field}
                        onChange={(e) => {
                          const value =
                            e.target.value === "" ? 0 : Number(e.target.value);
                          field.onChange(value);
                        }}
                        value={form.getValues("monthlyPension") || ""}
                      />
                    </div>
                  </FormControl>
                  <div className="min-h-[20px]">
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="monthlyDeduction"
              render={({ field }) => (
                <FormItem className="w-full min-h-[80px] flex flex-col">
                  <FormLabel className="text-foreground font-medium">
                    <div className="flex items-center gap-2">
                      <Banknote className="h-4 w-4 text-primary" />
                      Monthly Deduction
                    </div>
                  </FormLabel>
                  <FormControl>
                    <div className="relative w-full">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                        ₱
                      </span>
                      <Input
                        className="w-full rounded-md border-0 bg-background shadow-sm focus:shadow-md transition-all duration-200 pl-8"
                        placeholder="0.00"
                        type="number"
                        min={0}
                        {...field}
                        onChange={(e) => {
                          const value =
                            e.target.value === "" ? 0 : Number(e.target.value);
                          field.onChange(value);
                        }}
                        value={form.getValues("monthlyDeduction") || ""}
                      />
                    </div>
                  </FormControl>
                  <div className="min-h-[20px]">
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
          </div>
        </div>
      </motion.div>

      {/* Banking Information Section */}
      <motion.div
        variants={itemVariants}
        className="bg-card rounded-lg shadow-lg border"
      >
        <div className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-primary rounded-lg shadow-md">
              <Building className="h-5 w-5 text-primary-foreground" />
            </div>
            <h3 className="text-xl font-semibold text-foreground">
              Banking Information
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            <FormField
              control={form.control}
              name="atmAccountNumber"
              render={({ field }) => (
                <FormItem className="w-full min-h-[80px] flex flex-col">
                  <FormLabel className="text-foreground font-medium">
                    <div className="flex items-center gap-2">
                      <CreditCard className="h-4 w-4 text-primary" />
                      ATM Account Number
                    </div>
                  </FormLabel>
                  <FormControl>
                    <div className="relative w-full">
                      <CreditCard className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        className="w-full rounded-md border-0 bg-background shadow-sm focus:shadow-md transition-all duration-200 pl-10"
                        placeholder="Enter ATM Account Number"
                        type="number"
                        min={0}
                        {...field}
                        onChange={(e) => {
                          const value =
                            e.target.value === "" ? 0 : Number(e.target.value);
                          field.onChange(value);
                        }}
                        value={form.getValues("atmAccountNumber") || ""}
                      />
                    </div>
                  </FormControl>
                  <div className="min-h-[20px]">
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="bankName"
              render={({ field }) => (
                <FormItem className="w-full min-h-[80px] flex flex-col">
                  <FormLabel className="text-foreground font-medium">
                    <div className="flex items-center gap-2">
                      <Landmark className="h-4 w-4 text-primary" />
                      Bank Name
                    </div>
                  </FormLabel>
                  <FormControl>
                    <div className="relative w-full">
                      <Landmark className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        className="w-full rounded-md border-0 bg-background shadow-sm focus:shadow-md transition-all duration-200 pl-10"
                        placeholder="Enter Bank Name"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <div className="min-h-[20px]">
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
          </div>

          <div className="mt-6">
            <FormField
              control={form.control}
              name="branchOfBank"
              render={({ field }) => (
                <FormItem className="w-full min-h-[80px] flex flex-col">
                  <FormLabel className="text-foreground font-medium">
                    <div className="flex items-center gap-2">
                      <Landmark className="h-4 w-4 text-primary" />
                      Branch of Bank
                    </div>
                  </FormLabel>
                  <FormControl>
                    <div className="relative w-full">
                      <Landmark className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        className="w-full rounded-md border-0 bg-background shadow-sm focus:shadow-md transition-all duration-200 pl-10"
                        placeholder="Enter Branch of Bank"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <div className="min-h-[20px]">
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AccountsInformation;
