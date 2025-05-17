import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import React from "react";
import { AccountsInformationProps } from "@/features/clients/types/types-clients";
import { CreditCard, Landmark } from "lucide-react";
import { Input } from "@/components/ui/input";
import { preventInvalidInput } from "@/utils/handling-input-numbers";

const AccountsInformation = ({ form }: AccountsInformationProps) => {
  return (
    <div className="space-y-5">
      <div className="space-y-2 mb-5">
        <h2 className="text-2xl font-bold">Account's Information</h2>
        <p>
          Please provide details about client's pension and banking information.
        </p>
      </div>

      <h3 className="text-lg font-medium">Pension Details</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <FormField
          control={form.control}
          name="accountNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Account Number</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter serial number"
                  type="number"
                  min={0}
                  onKeyDown={preventInvalidInput}
                  {...field}
                  onChange={(e) => {
                    const value =
                      e.target.value === "" ? 0 : Number(e.target.value);
                    field.onChange(value); // Ensure the value is a number
                  }}
                  value={form.getValues("accountNumber") || ""}
                />
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
                    className="pl-8"
                    placeholder="0.00"
                    type="number"
                    min={0}
                    {...field}
                    onChange={(e) => {
                      const value =
                        e.target.value === "" ? 0 : Number(e.target.value);
                      field.onChange(value); // Ensure the value is a number
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
                    className="pl-8"
                    placeholder="0.00"
                    type="number"
                    min={0}
                    {...field}
                    onChange={(e) => {
                      const value =
                        e.target.value === "" ? 0 : Number(e.target.value);
                      field.onChange(value); // Ensure the value is a number
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

      <h3 className="text-lg font-medium pt-4">Banking Information</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                    className="pl-10"
                    placeholder="Enter ATM Account Number"
                    type="number"
                    min={0}
                    {...field}
                    onChange={(e) => {
                      const value =
                        e.target.value === "" ? 0 : Number(e.target.value);
                      field.onChange(value); // Ensure the value is a number
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
                    className="pl-10"
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
                  className="pl-10"
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
  );
};

export default AccountsInformation;
