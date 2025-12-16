"use client";

import { motion } from "framer-motion";
import { Building, Calendar, Clock, Hash, Medal } from "lucide-react";

import { FormFieldWrapper } from "../../../../components/FormFieldWrapper";
import { SectionCard } from "../SectionCard";
import { StepTitleCard } from "../StepTitleCard";

import { useEffect } from "react";
import useClientAnimation from "../../hooks/use-client-animation";
import {
  pensionTypeOptions,
  rankOptions,
  type PensionersInformationProps,
} from "../../types/client-types";

const PensionersInformation = ({ form }: PensionersInformationProps) => {
  const { containerVariants, itemVariants } = useClientAnimation();

  const dateSeparationService = form.watch("dateSeparationService");

  useEffect(() => {
    if (!dateSeparationService) return;

    const date = new Date(dateSeparationService);
    date.setDate(date.getDate() + 1);

    form.setValue("dateRetiredService", date);
  }, [dateSeparationService, form]);

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
      <SectionCard variants={itemVariants} icon={Medal} title="Service Information">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormFieldWrapper
            name="rank"
            control={form.control}
            label="Rank"
            type="select"
            placeholder="Select rank"
            options={rankOptions}
            required
          />

          <FormFieldWrapper
            name="pensionType"
            control={form.control}
            label="Pension Type"
            type="select"
            placeholder="Select pension type"
            options={pensionTypeOptions}
            required
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
            required
          />

          <FormFieldWrapper
            name="idNumber"
            control={form.control}
            label="ID Number"
            type="input"
            placeholder="Enter ID number"
            leftIcon={Hash}
            required
          />
        </div>
      </SectionCard>

      {/* Service Dates */}
      <SectionCard variants={itemVariants} icon={Calendar} title="Service Dates">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <FormFieldWrapper
            name="dateEnteredService"
            control={form.control}
            label="Date Entered Service"
            type="date"
            placeholder="Select service date"
            required
          />

          <FormFieldWrapper
            name="dateSeparationService"
            control={form.control}
            label="Date Separation Service"
            type="date"
            placeholder="Select separation date"
            required
          />

          <FormFieldWrapper
            name="dateRetiredService"
            control={form.control}
            label="Date Retired Service"
            type="date"
            placeholder="Select retirement date"
            disabled
            required
          />
        </div>
      </SectionCard>

      {/* Additional Service Details */}
      <SectionCard variants={itemVariants} icon={Building} title="Additional Service Details">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <FormFieldWrapper
            name="lengthOfService"
            control={form.control}
            label="Length of Service"
            type="input"
            placeholder="Enter Length of Service"
            leftIcon={Clock}
            asNumber
            inputClassName={"disabled:opacity-100"}
            disabled
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
