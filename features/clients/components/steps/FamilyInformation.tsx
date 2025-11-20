"use client";

import { motion } from "framer-motion";
import { User, Users, MapPin } from "lucide-react";

import { StepTitleCard } from "../StepTitleCard";
import { SectionCard } from "../SectionCard";
import { FormFieldWrapper } from "../FormFieldWrapper";

import type { ClientFamilyInformationProps } from "../../types/client-types";
import useClientAnimation from "../../hooks/use-client-animation";

const FamilyInformation = ({ form }: ClientFamilyInformationProps) => {
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
        title="Client Family Information"
        description="Please provide details about client's spouse and children."
      />

      {/* Spouse Information */}
      <SectionCard
        variants={itemVariants}
        icon={User}
        title="Spouse Information"
      >
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
            placeholder="Select birth date"
            formItemClassName="min-h-[100px]"
          />

          <FormFieldWrapper
            name="spouseContactNumber"
            control={form.control}
            label="Contact Number"
            type="phone"
            disabled
          />
        </div>

        <div className="mt-6">
          <FormFieldWrapper
            name="spouseAddress"
            control={form.control}
            label="Address"
            type="input"
            placeholder="Door 203, De Leon Plaza Bldg., Yacapin Velez St. Cagayan De Oro"
            leftIcon={MapPin}
          />
        </div>
      </SectionCard>

      {/* Children Information */}
      <SectionCard
        variants={itemVariants}
        icon={Users}
        title="Children Information"
      >
        <div className="space-y-6">
          {/* Child 1 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormFieldWrapper
              name="firstChildName"
              control={form.control}
              label="Name of Child 1"
              type="input"
              placeholder="Rey Daug Jr."
              leftIcon={User}
            />

            <FormFieldWrapper
              name="firstChildDateOfBirth"
              control={form.control}
              label="Birth Date of Child 1"
              type="date"
              placeholder="Select birth date"
              formItemClassName="min-h-[100px]"
            />
          </div>

          {/* Child 2 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormFieldWrapper
              name="secondChildName"
              control={form.control}
              label="Name of Child 2"
              type="input"
              placeholder="Samm Caagbay"
              leftIcon={User}
            />

            <FormFieldWrapper
              name="secondChildDateOfBirth"
              control={form.control}
              label="Birth Date of Child 2"
              type="date"
              placeholder="Select birth date"
              formItemClassName="min-h-[100px]"
            />
          </div>
        </div>
      </SectionCard>
    </motion.div>
  );
};

export default FamilyInformation;
