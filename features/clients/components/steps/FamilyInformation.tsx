"use client";

import { motion } from "framer-motion";
import { User } from "lucide-react";

import { StepTitleCard } from "../StepTitleCard";
import { SectionCard } from "../SectionCard";
import { FormFieldWrapper } from "../../../../components/FormFieldWrapper";
import { type ClientFamilyInformationProps } from "../../types/client-types";
import useClientAnimation from "../../hooks/use-client-animation";
import { AddressFields } from "../AddressFormFields";

const FamilyInformation = ({ form }: ClientFamilyInformationProps) => {
  const { containerVariants, itemVariants } = useClientAnimation();

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8"
    >
      <StepTitleCard
        variants={itemVariants}
        title="Client Family Information"
        description="Please provide details about client's spouse and children."
      />

      {/* Spouse */}
      <SectionCard variants={itemVariants} icon={User} title="Spouse Information">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <FormFieldWrapper
            name="spouseFirstName"
            control={form.control}
            label="First Name"
            type="input"
            placeholder="Susette"
          />
          <FormFieldWrapper
            name="spouseMiddleName"
            control={form.control}
            label="Middle Name"
            type="input"
            placeholder="Avengers"
          />
          <FormFieldWrapper
            name="spouseLastName"
            control={form.control}
            label="Last Name"
            type="input"
            placeholder="Daug"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <FormFieldWrapper
            name="spouseDateOfBirth"
            control={form.control}
            label="Date of Birth"
            type="date"
          />
          <FormFieldWrapper
            name="spouseContactNumber"
            control={form.control}
            label="Contact Number"
            type="phone"
            disabled
          />
        </div>

        <AddressFields form={form} prefix="spouse" />
      </SectionCard>

      {/* First Child */}
      <SectionCard variants={itemVariants} icon={User} title="First Child Information">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormFieldWrapper
            name="firstChildName"
            control={form.control}
            label="Name of First Child"
            type="input"
            placeholder="Rey Daug Jr."
            leftIcon={User}
          />
          <FormFieldWrapper
            name="firstChildDateOfBirth"
            control={form.control}
            label="Birth Date"
            type="date"
          />
        </div>
        <AddressFields form={form} prefix="firstChild" />
      </SectionCard>

      {/* Second Child */}
      <SectionCard variants={itemVariants} icon={User} title="Second Child Information">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormFieldWrapper
            name="secondChildName"
            control={form.control}
            label="Name of Second Child"
            type="input"
            placeholder="Samm Caagbay"
            leftIcon={User}
          />
          <FormFieldWrapper
            name="secondChildDateOfBirth"
            control={form.control}
            label="Birth Date"
            type="date"
          />
        </div>
        <AddressFields form={form} prefix="secondChild" />
      </SectionCard>

      {/* Third Child */}
      <SectionCard variants={itemVariants} icon={User} title="Third Child Information">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormFieldWrapper
            name="thirdChildName"
            control={form.control}
            label="Name of Third Child"
            type="input"
            placeholder="Rey Lagumbay"
            leftIcon={User}
          />
          <FormFieldWrapper
            name="thirdChildDateOfBirth"
            control={form.control}
            label="Birth Date"
            type="date"
          />
        </div>
        <AddressFields form={form} prefix="thirdChild" />
      </SectionCard>
    </motion.div>
  );
};

export default FamilyInformation;
