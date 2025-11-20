"use client";

import { motion } from "framer-motion";
import { User, Phone, Heart, MapPin } from "lucide-react";

import { StepTitleCard } from "../StepTitleCard";
import { SectionCard } from "../SectionCard";
import { FormFieldWrapper } from "../FormFieldWrapper";

import {
  civilStatusOptions,
  suffixOptions,
  type ClientGeneralInformationProps,
} from "@/features/clients/types/client-types";
import useClientAnimation from "../../hooks/use-client-animation";

const ClientGeneralInformation = ({ form }: ClientGeneralInformationProps) => {
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
            formItemClassName="min-h-[100px]"
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

        <div className="mt-6">
          <FormFieldWrapper
            name="address"
            control={form.control}
            label="Address"
            required
            type="input"
            placeholder="Door 203, De Leon Plaza Bldg., Yacapin Velez St. Cagayan De Oro"
            leftIcon={MapPin}
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
            name="contactNumber"
            control={form.control}
            label="Contact Number"
            required
            type="phone"
            disabled
          />

          <FormFieldWrapper
            name="alternativeContactNumber"
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
