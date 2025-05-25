"use client";
import { motion } from "framer-motion";
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
import { FormFieldWrapper } from "../ui/FormFieldWrapper";
import { SectionCard } from "../ui/SectionCard";
import { StepTitleCard } from "../ui/StepTitleCard";
import { InputWithIcon } from "../ui/InputWithIcon";
import { IconWithLabel } from "../ui/IconWithLabel";

const EnhancedAccountsInformation = ({ form }: AccountsInformationProps) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
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
      <StepTitleCard
        title="Account's Information"
        description="Please provide details about client's pension and banking information."
        variants={itemVariants}
      />

      <SectionCard
        icon={DollarSign}
        title="Pension Details"
        variants={itemVariants}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          <FormFieldWrapper
            control={form.control}
            name="accountNumber"
            label={<IconWithLabel icon={Hash} label="Account Number" />}
          >
            {(field) => (
              <InputWithIcon
                icon={Hash}
                placeholder="Enter account number"
                type="number"
                min={0}
                onKeyDown={preventInvalidInput}
                {...field}
                onChange={(e) => {
                  const value =
                    e.target.value === "" ? 0 : Number(e.target.value);
                  field.onChange(value);
                }}
                value={form.getValues("accountNumber") || ""}
              />
            )}
          </FormFieldWrapper>

          <FormFieldWrapper
            control={form.control}
            name="monthlyPension"
            label={<IconWithLabel icon={Banknote} label="Monthly Pension" />}
          >
            {(field) => (
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
            )}
          </FormFieldWrapper>

          <FormFieldWrapper
            control={form.control}
            name="monthlyDeduction"
            label={<IconWithLabel icon={Banknote} label="Monthly Deduction" />}
          >
            {(field) => (
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
            )}
          </FormFieldWrapper>
        </div>
      </SectionCard>

      <SectionCard
        icon={Building}
        title="Banking Information"
        variants={itemVariants}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          <FormFieldWrapper
            control={form.control}
            name="atmAccountNumber"
            label={
              <IconWithLabel icon={CreditCard} label="ATM Account Number" />
            }
          >
            {(field) => (
              <InputWithIcon
                icon={CreditCard}
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
            )}
          </FormFieldWrapper>

          <FormFieldWrapper
            control={form.control}
            name="bankName"
            label={<IconWithLabel icon={Landmark} label="Bank Name" />}
          >
            {(field) => (
              <InputWithIcon
                icon={Landmark}
                placeholder="Enter Bank Name"
                {...field}
              />
            )}
          </FormFieldWrapper>
        </div>

        <div className="mt-6">
          <FormFieldWrapper
            control={form.control}
            name="branchOfBank"
            label={<IconWithLabel icon={Landmark} label="Branch of Bank" />}
          >
            {(field) => (
              <InputWithIcon
                icon={Landmark}
                placeholder="Enter Branch of Bank"
                {...field}
              />
            )}
          </FormFieldWrapper>
        </div>
      </SectionCard>
    </motion.div>
  );
};

export default EnhancedAccountsInformation;
