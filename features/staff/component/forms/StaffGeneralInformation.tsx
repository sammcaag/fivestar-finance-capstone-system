"use client";

import { motion } from "framer-motion";
import { User, Phone, Heart, Map } from "lucide-react";

import {
  civilStatusOptions,
  regionOptions,
  suffixOptions,
} from "@/features/clients/types/client-types";
import useClientAnimation from "@/features/clients/hooks/use-client-animation";
import { StepTitleCard } from "@/features/clients/components/StepTitleCard";
import { SectionCard } from "@/features/clients/components/SectionCard";
import { FormFieldWrapper } from "@/components/FormFieldWrapper";
import { type StaffGeneralInformationProps } from "../../types/staff-types";

const StaffGeneralInformation = ({ form }: StaffGeneralInformationProps) => {
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
        title="Staff General Information"
        description="Please fill out all the required information below to begin the staff registration process."
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
              { value: "MALE", label: "Male" },
              { value: "FEMALE", label: "Female" },
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
            name="occupation"
            control={form.control}
            label="Occupation"
            type="input"
            placeholder="Pensioner"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          <FormFieldWrapper
            name="role"
            control={form.control}
            label="Staff Position"
            type="select"
            required
            placeholder="Marites"
            options={[
              { value: "SALES", label: "Sales" },
              { value: "LOANS", label: "Loans" },
            ]}
          />
          <FormFieldWrapper
            name="staffId"
            control={form.control}
            required
            label="Staff ID"
            type="input"
            placeholder="FSFI-2025"
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

export default StaffGeneralInformation;
