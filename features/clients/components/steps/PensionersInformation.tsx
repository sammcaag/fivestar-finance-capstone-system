"use client";

import { motion } from "framer-motion";
import { Medal, Calendar, Hash, Building, Clock } from "lucide-react";

import { StepTitleCard } from "../StepTitleCard";
import { SectionCard } from "../SectionCard";
import { FormFieldWrapper } from "../FormFieldWrapper";

import {
  pensionTypeOptions,
  rankOptions,
  type PensionersInformationProps,
} from "../../types/client-types";
import useClientAnimation from "../../hooks/use-client-animation";

const PensionersInformation = ({ form }: PensionersInformationProps) => {
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
        title="Pensioner's Information"
        description="Please provide details about client's military service."
      />

      {/* Service Information */}
      <SectionCard
        variants={itemVariants}
        icon={Medal}
        title="Service Information"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormFieldWrapper
            name="rank"
            control={form.control}
            label="Rank"
            type="select"
            placeholder="Select rank"
            options={rankOptions}
          />

          <FormFieldWrapper
            name="pensionType"
            control={form.control}
            label="Pension Type"
            type="select"
            placeholder="Select pension type"
            options={pensionTypeOptions}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <FormFieldWrapper
            name="serialNumber"
            control={form.control}
            label="Serial Number"
            type="input"
            placeholder="Enter serial number"
            leftIcon={Hash}
          />

          <FormFieldWrapper
            name="idNumber"
            control={form.control}
            label="ID Number"
            type="input"
            placeholder="Enter ID number"
            leftIcon={Hash}
          />
        </div>
      </SectionCard>

      {/* Service Dates */}
      <SectionCard
        variants={itemVariants}
        icon={Calendar}
        title="Service Dates"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <FormFieldWrapper
            name="dateEnteredService"
            control={form.control}
            label="Date Entered Service"
            type="date"
            placeholder="Select service date"
          />

          <FormFieldWrapper
            name="dateSeparationService"
            control={form.control}
            label="Date Separation Service"
            type="date"
            placeholder="Select separation date"
          />

          <FormFieldWrapper
            name="dateRetiredService"
            control={form.control}
            label="Date Retired Service"
            type="date"
            placeholder="Select retirement date"
          />
        </div>
      </SectionCard>

      {/* Additional Service Details */}
      <SectionCard
        variants={itemVariants}
        icon={Building}
        title="Additional Service Details"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <FormFieldWrapper
            name="lengthOfService"
            control={form.control}
            label="Length of Service"
            type="input"
            placeholder="Enter Length of Service"
            leftIcon={Clock}
            asNumber
          />

          <FormFieldWrapper
            name="lastUnitAssigned"
            control={form.control}
            label="Last Unit Assigned"
            type="input"
            placeholder="Enter last unit assigned"
            leftIcon={Building}
          />

          <FormFieldWrapper
            name="branchOfService"
            control={form.control}
            label="Branch of Service"
            type="input"
            placeholder="Enter Branch of Service"
            leftIcon={Building}
          />
        </div>
      </SectionCard>
    </motion.div>
  );
};

export default PensionersInformation;
