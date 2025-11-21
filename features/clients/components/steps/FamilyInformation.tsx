"use client";

import { motion } from "framer-motion";
import { User, Users } from "lucide-react";

import { StepTitleCard } from "../StepTitleCard";
import { SectionCard } from "../SectionCard";
import { FormFieldWrapper } from "../FormFieldWrapper";

import {
  regionOptions,
  type ClientFamilyInformationProps,
} from "../../types/client-types";
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
          />

          <FormFieldWrapper
            name="spouseContactNumber"
            control={form.control}
            label="Contact Number"
            type="phone"
            disabled
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <FormFieldWrapper
            name="spouseAddressLine1"
            control={form.control}
            label="Address Line 1"
            type="input"
            placeholder="Door 203, De Leon Plaza Bldg"
          />

          <FormFieldWrapper
            name="spouseAddressLine2"
            control={form.control}
            label="Address Line 2"
            type="input"
            placeholder="Yacapin Velez St."
          />

          <FormFieldWrapper
            name="spouseBarangay"
            control={form.control}
            label="Barangay"
            type="input"
            placeholder="Macabalan"
          />

          <FormFieldWrapper
            name="spouseCityOrMunicipality"
            control={form.control}
            label="City or Municipality"
            type="input"
            placeholder="Cagayan De Oro City"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          <FormFieldWrapper
            name="spouseProvince"
            control={form.control}
            label="Province"
            type="input"
            placeholder="Misamis Oriental"
          />

          <FormFieldWrapper
            name="spouseRegion"
            control={form.control}
            label="Region"
            type="select"
            placeholder="Region X"
            options={regionOptions}
          />

          <FormFieldWrapper
            name="spouseZipCode"
            control={form.control}
            label="zipCode"
            type="input"
            placeholder="9000"
            asNumber
          />
        </div>
      </SectionCard>

      {/* Children Information */}
      <SectionCard
        variants={itemVariants}
        icon={Users}
        title="Child 1 Information"
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
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <FormFieldWrapper
              name="firstChildAddressLine1"
              control={form.control}
              label="Address Line 1"
              type="input"
              placeholder="Door 203, De Leon Plaza Bldg"
            />

            <FormFieldWrapper
              name="firstChildAddressLine2"
              control={form.control}
              label="Address Line 2"
              type="input"
              placeholder="Yacapin Velez St."
            />

            <FormFieldWrapper
              name="firstChildBarangay"
              control={form.control}
              label="Barangay"
              type="input"
              placeholder="Macabalan"
            />

            <FormFieldWrapper
              name="firstChildCityOrMunicipality"
              control={form.control}
              label="City or Municipality"
              type="input"
              placeholder="Cagayan De Oro City"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            <FormFieldWrapper
              name="firstChildProvince"
              control={form.control}
              label="Province"
              type="input"
              placeholder="Misamis Oriental"
            />

            <FormFieldWrapper
              name="firstChildRegion"
              control={form.control}
              label="Region"
              type="select"
              placeholder="Region X"
              options={regionOptions}
            />

            <FormFieldWrapper
              name="firstChildZipCode"
              control={form.control}
              label="zipCode"
              type="input"
              placeholder="9000"
              asNumber
            />
          </div>
        </div>
      </SectionCard>

      <SectionCard
        variants={itemVariants}
        icon={Users}
        title="Child 2 Information"
      >
        <div className="space-y-6">
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
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <FormFieldWrapper
              name="secondChildAddressLine1"
              control={form.control}
              label="Address Line 1"
              type="input"
              placeholder="Door 203, De Leon Plaza Bldg"
            />

            <FormFieldWrapper
              name="secondChildAddressLine2"
              control={form.control}
              label="Address Line 2"
              type="input"
              placeholder="Yacapin Velez St."
            />

            <FormFieldWrapper
              name="secondChildBarangay"
              control={form.control}
              label="Barangay"
              type="input"
              placeholder="Macabalan"
            />

            <FormFieldWrapper
              name="secondChildCityOrMunicipality"
              control={form.control}
              label="City or Municipality"
              type="input"
              placeholder="Cagayan De Oro City"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            <FormFieldWrapper
              name="secondChildProvince"
              control={form.control}
              label="Province"
              type="input"
              placeholder="Misamis Oriental"
            />

            <FormFieldWrapper
              name="secondChildRegion"
              control={form.control}
              label="Region"
              type="select"
              placeholder="Region X"
              options={regionOptions}
            />

            <FormFieldWrapper
              name="secondChildZipCode"
              control={form.control}
              label="zipCode"
              type="input"
              placeholder="9000"
              asNumber
            />
          </div>
        </div>
      </SectionCard>

      {/* Child Information */}
      <SectionCard
        variants={itemVariants}
        icon={Users}
        title="Child 3 Information"
      >
        <div className="space-y-6">
          {/* Child 3 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormFieldWrapper
              name="thirdChildName"
              control={form.control}
              label="Name of Child 3"
              type="input"
              placeholder="Rey Lagumbay"
              leftIcon={User}
            />

            <FormFieldWrapper
              name="thirdChildDateOfBirth"
              control={form.control}
              label="Birth Date of Child 3"
              type="date"
              placeholder="Select birth date"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <FormFieldWrapper
              name="thirdChildAddressLine1"
              control={form.control}
              label="Address Line 1"
              type="input"
              placeholder="Door 203, De Leon Plaza Bldg"
            />

            <FormFieldWrapper
              name="thirdChildAddressLine2"
              control={form.control}
              label="Address Line 2"
              type="input"
              placeholder="Yacapin Velez St."
            />

            <FormFieldWrapper
              name="thirdChildBarangay"
              control={form.control}
              label="Barangay"
              type="input"
              placeholder="Macabalan"
            />

            <FormFieldWrapper
              name="thirdChildCityOrMunicipality"
              control={form.control}
              label="City or Municipality"
              type="input"
              placeholder="Cagayan De Oro City"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            <FormFieldWrapper
              name="thirdChildProvince"
              control={form.control}
              label="Province"
              type="input"
              placeholder="Misamis Oriental"
            />

            <FormFieldWrapper
              name="thirdChildRegion"
              control={form.control}
              label="Region"
              type="select"
              placeholder="Region X"
              options={regionOptions}
            />

            <FormFieldWrapper
              name="thirdChildZipCode"
              control={form.control}
              label="zipCode"
              type="input"
              placeholder="9000"
              asNumber
            />
          </div>
        </div>
      </SectionCard>
    </motion.div>
  );
};

export default FamilyInformation;
