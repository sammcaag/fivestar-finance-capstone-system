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
import { CreditCard, Landmark, DollarSign, Building, Hash } from "lucide-react";
import { preventInvalidInput } from "@/utils/handling-input-numbers";

const AccountsInformation = ({ form }: AccountsInformationProps) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Step Title Card */}
      <motion.div
        variants={itemVariants}
        className="bg-card rounded-lg shadow-sm border p-6"
      >
        <div className="text-center space-y-2">
          <h2 className="h2 bg-gradient-to-r from-primary to-chart-2 bg-clip-text text-transparent">
            Account&apos;s Information
          </h2>
          <p className="text-muted-foreground">
            Please provide details about client&apos;s pension and banking
            information.
          </p>
        </div>
      </motion.div>

      {/* Pension Details Section */}
      <motion.div
        variants={itemVariants}
        className="bg-card rounded-lg shadow-sm border"
      >
        <div className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-primary rounded-lg">
              <DollarSign className="h-5 w-5 text-primary-foreground" />
            </div>
            <h3 className="h4">Pension Details</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FormField
              control={form.control}
              name="accountNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-foreground font-medium">
                    Account Number
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Hash className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        placeholder="Enter account number"
                        type="number"
                        min={0}
                        onKeyDown={preventInvalidInput}
                        className="rounded-md border-0 bg-background shadow-sm focus:shadow-md transition-all duration-200 pl-10"
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
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="monthlyPension"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-foreground font-medium">
                    Monthly Pension
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                        ₱
                      </span>
                      <Input
                        className="rounded-md border-0 bg-background shadow-sm focus:shadow-md transition-all duration-200 pl-8"
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
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="monthlyDeduction"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-foreground font-medium">
                    Monthly Deduction
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                        ₱
                      </span>
                      <Input
                        className="rounded-md border-0 bg-background shadow-sm focus:shadow-md transition-all duration-200 pl-8"
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
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
      </motion.div>

      {/* Banking Information Section */}
      <motion.div
        variants={itemVariants}
        className="bg-card rounded-lg shadow-sm border"
      >
        <div className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-chart-2 rounded-lg">
              <Building className="h-5 w-5 text-primary-foreground" />
            </div>
            <h3 className="h4">Banking Information</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="atmAccountNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-foreground font-medium">
                    ATM Account Number
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <CreditCard className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        className="rounded-md border-0 bg-background shadow-sm focus:shadow-md transition-all duration-200 pl-10"
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
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="bankName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-foreground font-medium">
                    Bank Name
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Landmark className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        className="rounded-md border-0 bg-background shadow-sm focus:shadow-md transition-all duration-200 pl-10"
                        placeholder="Enter Bank Name"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="mt-6">
            <FormField
              control={form.control}
              name="branchOfBank"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-foreground font-medium">
                    Branch of Bank
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Landmark className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        className="rounded-md border-0 bg-background shadow-sm focus:shadow-md transition-all duration-200 pl-10"
                        placeholder="Enter Branch of Bank"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
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
