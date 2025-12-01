"use client";

import { motion } from "framer-motion";
import { User, Phone, Map } from "lucide-react";

import { regionOptions } from "@/features/clients/types/client-types";
import useClientAnimation from "@/features/clients/hooks/use-client-animation";
import { StepTitleCard } from "@/features/clients/components/StepTitleCard";
import { SectionCard } from "@/features/clients/components/SectionCard";
import { FormFieldWrapper } from "@/components/FormFieldWrapper";
import { BranchInformationProps } from "../../types/branch-types";

const BranchInformation = ({ form }: BranchInformationProps) => {
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
        title="Branch Information"
        description="Please fill out all the required information below to begin the branch registration process."
      />

      {/* Basic Information */}
      <SectionCard variants={itemVariants} icon={User} title="Basic Information">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormFieldWrapper
            name="name"
            control={form.control}
            label="Branch Name"
            required
            type="input"
            placeholder="CDO Branch"
          />
          <FormFieldWrapper
            name="email"
            control={form.control}
            label="Email Address"
            type="input"
            placeholder="cdo@fsfi.com.ph"
          />
        </div>
      </SectionCard>

      {/* Address Information */}
      <SectionCard variants={itemVariants} icon={Map} title="Address Information">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <FormFieldWrapper
            name="addressLine1"
            control={form.control}
            label="Address Line 1"
            required
            type="input"
            placeholder="Door 203, De Leon Plaza Bldg"
          />

          <FormFieldWrapper
            name="addressLine2"
            control={form.control}
            label="Address Line 2"
            type="input"
            placeholder="Yacapin Velez St."
          />

          <FormFieldWrapper
            name="barangay"
            control={form.control}
            label="Barangay"
            type="input"
            placeholder="Macabalan"
          />

          <FormFieldWrapper
            name="cityOrMunicipality"
            control={form.control}
            label="City or Municipality"
            required
            type="input"
            placeholder="Cagayan De Oro City"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          <FormFieldWrapper
            name="province"
            control={form.control}
            label="Province"
            required
            type="input"
            placeholder="Misamis Oriental"
          />

          <FormFieldWrapper
            name="region"
            control={form.control}
            label="Region"
            required
            type="select"
            placeholder="Region X"
            options={regionOptions}
          />

          <FormFieldWrapper
            name="zipCode"
            control={form.control}
            label="zipCode"
            required
            type="input"
            placeholder="9000"
            asNumber
          />
        </div>
      </SectionCard>

      {/* Contact Information */}
      <SectionCard variants={itemVariants} icon={Phone} title="Contact Information">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormFieldWrapper
            name="primaryContact"
            control={form.control}
            label="Contact Number"
            required
            type="phone"
            disabled
          />

          <FormFieldWrapper
            name="secondaryContact"
            control={form.control}
            label="Alternative Contact Number"
            type="phone"
            disabled
          />
        </div>
      </SectionCard>
    </motion.div>
  );
};

export default BranchInformation;
