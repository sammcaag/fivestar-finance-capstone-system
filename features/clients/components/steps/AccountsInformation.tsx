"use client";

import { motion } from "framer-motion";
import {
  DollarSign,
  Building,
  CreditCard,
  Landmark,
  PhilippinePeso,
} from "lucide-react";

import { StepTitleCard } from "../StepTitleCard";
import { SectionCard } from "../SectionCard";
import { FormFieldWrapper } from "../FormFieldWrapper";

import type { AccountsInformationProps } from "@/features/clients/types/client-types";
import useClientAnimation from "../../hooks/use-client-animation";

const AccountsInformation = ({ form }: AccountsInformationProps) => {
  const { containerVariants, itemVariants } = useClientAnimation();

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      <StepTitleCard
        variants={itemVariants}
        title="Account's Information"
        description="Please provide details about client's pension and banking information."
      />

      {/* Pension Details */}
      <SectionCard
        variants={itemVariants}
        icon={DollarSign}
        title="Pension Details"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Monthly Pension */}
          <FormFieldWrapper
            name="monthlyPension"
            control={form.control}
            label="Monthly Pension"
            type="input"
            placeholder="0.00"
            leftIcon={PhilippinePeso}
            asNumber
          />

          {/* Monthly Deduction */}
          <FormFieldWrapper
            name="monthlyDeduction"
            control={form.control}
            label="Monthly Deduction"
            type="input"
            placeholder="0.00"
            leftIcon={PhilippinePeso}
            asNumber
          />
        </div>
      </SectionCard>

      {/* Banking Information */}
      <SectionCard
        variants={itemVariants}
        icon={Building}
        title="Banking Information"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormFieldWrapper
            name="atmAccountNumber"
            control={form.control}
            label="ATM Account Number"
            type="input"
            placeholder="Enter ATM Account Number"
            leftIcon={CreditCard}
            inputClassName="remove-arrow"
          />

          <FormFieldWrapper
            name="bankName"
            control={form.control}
            label="Bank Name"
            type="input"
            placeholder="Enter Bank Name"
            leftIcon={Landmark}
          />
        </div>

        <div className="mt-6">
          <FormFieldWrapper
            name="branchOfBank"
            control={form.control}
            label="Branch of Bank"
            type="input"
            placeholder="Enter Branch of Bank"
            leftIcon={Landmark}
          />
        </div>
      </SectionCard>
    </motion.div>
  );
};

export default AccountsInformation;
