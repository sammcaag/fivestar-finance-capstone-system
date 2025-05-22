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
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
      },
    },
  };

  return (
    <motion.div
      className="space-y-6"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div className="space-y-2 mb-5" variants={itemVariants}>
        <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 text-transparent bg-clip-text">
          Account&apos;s Information
        </h2>
        <p className="text-muted-foreground">
          Please provide details about client&apos;s pension and banking
          information.
        </p>
      </motion.div>

      <motion.div variants={itemVariants}>
        <div className="flex items-center mb-4">
          <DollarSign className="h-5 w-5 mr-2 text-blue-500" />
          <h3 className="text-lg font-medium">Pension Details</h3>
        </div>
        <div className="bg-white dark:bg-gray-950 rounded-lg border border-gray-200 dark:border-gray-800 p-5 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <FormField
              control={form.control}
              name="accountNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Account Number</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Hash className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        placeholder="Enter account number"
                        type="number"
                        min={0}
                        onKeyDown={preventInvalidInput}
                        className="pl-10 transition-all duration-200 focus-within:ring-2 focus-within:ring-primary/20"
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
                  <FormLabel>Monthly Pension</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                        ₱
                      </span>
                      <Input
                        className="pl-8 transition-all duration-200 focus-within:ring-2 focus-within:ring-primary/20"
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
                  <FormLabel>Monthly Deduction</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                        ₱
                      </span>
                      <Input
                        className="pl-8 transition-all duration-200 focus-within:ring-2 focus-within:ring-primary/20"
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

      <motion.div variants={itemVariants}>
        <div className="flex items-center mb-4">
          <Building className="h-5 w-5 mr-2 text-blue-500" />
          <h3 className="text-lg font-medium">Banking Information</h3>
        </div>
        <div className="bg-white dark:bg-gray-950 rounded-lg border border-gray-200 dark:border-gray-800 p-5 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <FormField
              control={form.control}
              name="atmAccountNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>ATM Account Number</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <CreditCard className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        className="pl-10 transition-all duration-200 focus-within:ring-2 focus-within:ring-primary/20"
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
                  <FormLabel>Bank Name</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Landmark className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        className="pl-10 transition-all duration-200 focus-within:ring-2 focus-within:ring-primary/20"
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

          <div className="mt-5">
            <FormField
              control={form.control}
              name="branchOfBank"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Branch of Bank</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Landmark className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        className="pl-10 transition-all duration-200 focus-within:ring-2 focus-within:ring-primary/20"
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
