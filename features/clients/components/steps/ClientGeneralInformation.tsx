"use client";

import { motion } from "framer-motion";
import { User, Phone, Heart, Map } from "lucide-react";

import { StepTitleCard } from "../StepTitleCard";
import { SectionCard } from "../SectionCard";
import { FormFieldWrapper } from "../FormFieldWrapper";

import {
  civilStatusOptions,
  regionOptions,
  suffixOptions,
  type ClientGeneralInformationProps,
} from "@/features/clients/types/client-types";
import useClientAnimation from "../../hooks/use-client-animation";
import { useEffect } from "react";

const ClientGeneralInformation = ({ form }: ClientGeneralInformationProps) => {
  const { containerVariants, itemVariants } = useClientAnimation();

  useEffect(() => {
    console.log("FORM VALUES ARE:", form.getValues());
  });

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      <StepTitleCard
        variants={itemVariants}
        title="Client General Information"
        description="Please fill out all the required information below to begin the client registration process."
      />

      {/* Basic Information */}
      <SectionCard
        variants={itemVariants}
        icon={User}
        title="Basic Information"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          <FormFieldWrapper
            name="firstName"
            control={form.control}
            label="First Name"
            required
            type="input"
            placeholder="Rey"
          />
          <FormFieldWrapper
            name="middleName"
            control={form.control}
            label="Middle Name"
            type="input"
            placeholder="Avengers"
          />
          <FormFieldWrapper
            name="lastName"
            control={form.control}
            label="Last Name"
            required
            type="input"
            placeholder="Daug"
          />
          <FormFieldWrapper
            name="suffix"
            control={form.control}
            label="Suffix"
            type="select"
            placeholder="Select suffix"
            options={suffixOptions}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <FormFieldWrapper
            name="dateOfBirth"
            control={form.control}
            label="Date of Birth"
            required
            type="date"
            placeholder="Select birth date"
          />

          <FormFieldWrapper
            name="gender"
            control={form.control}
            label="Gender"
            required
            type="select"
            placeholder="Select gender"
            options={[
              { value: "male", label: "Male" },
              { value: "female", label: "Female" },
              { value: "other", label: "Other" },
            ]}
          />
        </div>
      </SectionCard>

      {/* Basic Information */}
      <SectionCard
        variants={itemVariants}
        icon={Map}
        title="Address Information"
      >
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
      <SectionCard
        variants={itemVariants}
        icon={Phone}
        title="Contact Information"
      >
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

      {/* Additional Information */}
      <SectionCard
        variants={itemVariants}
        icon={Heart}
        title="Additional Information"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormFieldWrapper
            name="religion"
            control={form.control}
            label="Religion"
            required
            type="input"
            placeholder="Roman Catholic"
          />
          <FormFieldWrapper
            name="civilStatus"
            control={form.control}
            label="Civil Status"
            required
            type="select"
            placeholder="Select status"
            options={civilStatusOptions}
          />
          <FormFieldWrapper
            name="mothersMaidenName"
            control={form.control}
            label="Mother's Maiden Name"
            type="input"
            placeholder="Marites"
          />
          <FormFieldWrapper
            name="placeOfBirth"
            control={form.control}
            required
            label="Place of Birth"
            type="input"
            placeholder="Cagayan de Oro City"
          />
        </div>
      </SectionCard>
    </motion.div>
  );
};

export default ClientGeneralInformation;
