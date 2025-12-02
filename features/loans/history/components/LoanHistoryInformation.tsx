"use client";

import { motion } from "framer-motion";
import { Map, Phone, User } from "lucide-react";

import { FormFieldWrapper } from "@/components/FormFieldWrapper";
import { SectionCard } from "@/features/clients/components/SectionCard";
import { StepTitleCard } from "@/features/clients/components/StepTitleCard";
import useClientAnimation from "@/features/clients/hooks/use-client-animation";
import { LoanHistoryInformationProps, loanHistoryProductOptions } from "../types/loan-form-types";

const LoanHistoryInformation = ({ form }: LoanHistoryInformationProps) => {
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
        title="Loan History Information"
        description="Please fill out all the required information below."
      />

      {/* Computation Information */}
      <SectionCard variants={itemVariants} icon={User} title="Computation Information">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormFieldWrapper
            name="dedCode"
            control={form.control}
            label="Ded Code"
            required
            type="input"
            placeholder="FI-"
          />
          <FormFieldWrapper
            name="productType"
            control={form.control}
            label="Product Type"
            type="select"
            placeholder="Which product type?"
            options={loanHistoryProductOptions}
          />
          <FormFieldWrapper
            name="monthlyAmortization"
            control={form.control}
            label="Monthly Amortization"
            type="input"
            placeholder="0.00"
            asNumber
          />
          <FormFieldWrapper
            name="term"
            control={form.control}
            label="Term"
            type="input"
            placeholder="Term in months"
            asNumber
          />
          <FormFieldWrapper
            name="term"
            control={form.control}
            label="Term"
            type="input"
            placeholder="Term in months"
            asNumber
          />

          <FormFieldWrapper
            name="valueDate"
            control={form.control}
            label="Value Date"
            type="date"
            placeholder="Value Date"
            required
          />

          <FormFieldWrapper
            name="maturityDate"
            control={form.control}
            label="Maturity Date"
            type="date"
            placeholder="Maturity Date"
            required
          />
          <FormFieldWrapper
            name="settedMaturityDate"
            control={form.control}
            label="Setted Maturity Date"
            type="date"
            placeholder="Setted Maturity Date"
            required
          />
        </div>
      </SectionCard>

      {/* Loan Identification */}
      <SectionCard variants={itemVariants} icon={User} title="Loan Identification">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormFieldWrapper
            name="accountNumber"
            control={form.control}
            label="Account Number"
            required
            type="input"
            placeholder="Account Number"
            disabled={
              form.getValues("productType") !== "new_client" &&
              form.getValues("productType") !== "reloan"
            }
          />
          <FormFieldWrapper
            name="pnNumber"
            control={form.control}
            label="PN Number"
            type="input"
            placeholder="PN Number"
          />
        </div>
      </SectionCard>

      {/* Deduction Information */}
      <SectionCard variants={itemVariants} icon={Map} title="Deduction Information">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <FormFieldWrapper
            name="outstandingBalance"
            control={form.control}
            label="Outstanding Balance"
            required
            type="input"
            placeholder="0.00"
            asNumber
          />

          <FormFieldWrapper
            name="outstandingBalance"
            control={form.control}
            label="Outstanding Balance"
            required
            type="input"
            placeholder="0.00"
            asNumber
          />
        </div>
      </SectionCard>

      {/* Staff Interaction Information */}
      <SectionCard variants={itemVariants} icon={Phone} title="Staff Interaction Information">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormFieldWrapper
            name="processor1Id"
            control={form.control}
            label="Processor 1"
            type="input"
            placeholder="Name of the processor 1"
          />

          <FormFieldWrapper
            name="processor2Id"
            control={form.control}
            label="Processor 2"
            type="input"
            placeholder="Name of the processor 2"
          />

          <FormFieldWrapper
            name="contactedById"
            control={form.control}
            label="Contacted By"
            type="input"
            placeholder="Who contacted the client"
          />
        </div>
      </SectionCard>
    </motion.div>
  );
};

export default LoanHistoryInformation;
