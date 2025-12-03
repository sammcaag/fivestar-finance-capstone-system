"use client";

import { motion } from "framer-motion";
import { Map, Phone, User } from "lucide-react";

import { FormFieldWrapper } from "@/components/FormFieldWrapper";
import Loading from "@/components/LoadingPage";
import { SectionCard } from "@/features/clients/components/SectionCard";
import { StepTitleCard } from "@/features/clients/components/StepTitleCard";
import useClientAnimation from "@/features/clients/hooks/use-client-animation";
import { getStaffs } from "@/features/staff/api/staff-service";
import { StaffTableProps } from "@/features/staff/types/staff-types";
import { useQuery } from "@tanstack/react-query";
import { LoanHistoryInformationProps, loanHistoryProductOptions } from "../types/loan-form-types";

const LoanHistoryInformation = ({ form, isCreate = true }: LoanHistoryInformationProps) => {
  const { containerVariants, itemVariants } = useClientAnimation();

  const { data: staffsData, isLoading } = useQuery<StaffTableProps[]>({
    queryKey: ["getProcessors"],
    queryFn: getStaffs,
  });

  const staffOptions =
    staffsData?.map((staff) => ({
      label: staff.name,
      value: String(staff.plainId),
    })) ?? [];

  if (isLoading) {
    return <Loading />;
  }

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
            disabled={isCreate}
          />
          <FormFieldWrapper
            name="productType"
            control={form.control}
            label="Product Type"
            type="select"
            placeholder="Which product type?"
            options={loanHistoryProductOptions}
            disabled={isCreate}
          />
          <FormFieldWrapper
            name="monthlyAmortization"
            control={form.control}
            label="Monthly Amortization"
            type="input"
            placeholder="0.00"
            asNumber
            disabled={isCreate}
          />
          <FormFieldWrapper
            name="term"
            control={form.control}
            label="Term"
            type="input"
            placeholder="Term in months"
            asNumber
            disabled={isCreate}
          />
          <FormFieldWrapper
            name="term"
            control={form.control}
            label="Term"
            type="input"
            placeholder="Term in months"
            asNumber
            disabled={isCreate}
          />

          <FormFieldWrapper
            name="valueDate"
            control={form.control}
            label="Value Date"
            type="date"
            placeholder="Value Date"
            required
            disabled={isCreate}
          />

          <FormFieldWrapper
            name="maturityDate"
            control={form.control}
            label="Maturity Date"
            type="date"
            placeholder="Maturity Date"
            required
            disabled={isCreate}
          />
          {form.watch("productType") === "renewal" && (
            <FormFieldWrapper
              name="settedMaturityDate"
              control={form.control}
              label="Setted Maturity Date"
              type="date"
              placeholder="Setted Maturity Date"
              required
              disabled={isCreate}
            />
          )}
        </div>
      </SectionCard>

      {/* Loan Identification */}
      <SectionCard variants={itemVariants} icon={User} title="Loan Identification">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {(form.watch("productType") === "new_client" ||
            form.watch("productType") === "reloan") && (
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
          )}
          <FormFieldWrapper
            name="pnNumber"
            control={form.control}
            label="PN Number"
            type="input"
            placeholder="PN Number"
            required
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
            disabled={isCreate}
          />

          <FormFieldWrapper
            name="otherDeduction"
            control={form.control}
            label="Other Deductions"
            required
            type="input"
            placeholder="0.00"
            asNumber
            disabled={isCreate}
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
            type="select"
            placeholder="Name of the processor 1"
            options={staffOptions}
          />

          <FormFieldWrapper
            name="processor2Id"
            control={form.control}
            label="Processor 2"
            type="select"
            placeholder="Name of the processor 2"
            options={staffOptions}
          />

          <FormFieldWrapper
            name="contactedById"
            control={form.control}
            label="Contacted By"
            type="select"
            placeholder="Who contacted the client"
            options={staffOptions}
          />
        </div>
      </SectionCard>
    </motion.div>
  );
};

export default LoanHistoryInformation;
