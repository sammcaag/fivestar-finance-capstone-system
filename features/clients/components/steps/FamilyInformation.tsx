"use client";
import { motion } from "framer-motion";
import type { ClientFamilyInformationProps } from "../../types/types-clients";
import { Input } from "@/components/ui/input";
import { getYear } from "date-fns";
import { PhoneInput } from "@/components/ui/phone-input";
import parsePhoneNumberFromString from "libphonenumber-js";
import { Users, User, MapPin, Calendar, Phone } from "lucide-react";
import { StepTitleCard } from "../StepTitleCard";
import { SectionCard } from "../SectionCard";
import { FormFieldWrapper } from "../FormFieldWrapper";
import { IconWithLabel } from "../IconWithLabel";

const FamilyInformation = ({ form }: ClientFamilyInformationProps) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      <StepTitleCard
        title="Client Family Information"
        description="Please provide details about client's spouse and children."
        variants={itemVariants}
      />

      <SectionCard
        icon={User}
        title="Spouse Information"
        variants={itemVariants}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          <FormFieldWrapper
            control={form.control}
            name="spouseFirstName"
            label="First Name"
          >
            {(field) => (
              <Input
                placeholder="Susette"
                className="w-full rounded-md border-0 bg-background shadow-sm focus:shadow-md transition-all duration-200"
                {...field}
              />
            )}
          </FormFieldWrapper>

          <FormFieldWrapper
            control={form.control}
            name="spouseMiddleName"
            label="Middle Name"
          >
            {(field) => (
              <Input
                placeholder="Avengers"
                className="w-full rounded-md border-0 bg-background shadow-sm focus:shadow-md transition-all duration-200"
                {...field}
              />
            )}
          </FormFieldWrapper>

          <FormFieldWrapper
            control={form.control}
            name="spouseLastName"
            label="Last Name"
          >
            {(field) => (
              <Input
                placeholder="Daug"
                className="w-full rounded-md border-0 bg-background shadow-sm focus:shadow-md transition-all duration-200"
                {...field}
              />
            )}
          </FormFieldWrapper>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 items-start">
          <FormFieldWrapper
            control={form.control}
            name="spouseDateOfBirth"
            label={<IconWithLabel icon={Calendar} label="Date of Birth" />}
            className="w-full flex flex-col"
          >
            {(field) => (
              <div onClick={(e) => e.stopPropagation()}>
                <CustomDatePicker
                  date={field.value || new Date()}
                  setDate={(date) => field.onChange(date)}
                  endYear={getYear(new Date())}
                  isFutureDatesUnselectable={true}
                  customDateFormat="MMMM d, yyyy"
                  placeholder="Select birth date"
                />
              </div>
            )}
          </FormFieldWrapper>

          <FormFieldWrapper
            control={form.control}
            name="spouseContactNumber"
            label={<IconWithLabel icon={Phone} label="Contact Number" />}
          >
            {(field) => (
              <PhoneInput
                {...field}
                defaultCountry="PH"
                placeholder="+63 912 345 6789"
                disableCountrySelect={true}
                className="w-full rounded-md border-0 bg-background shadow-sm focus:shadow-md transition-all duration-200"
                value={
                  parsePhoneNumberFromString(field.value || "", "PH")?.format(
                    "E.164"
                  ) || ""
                }
                onChange={(value) => field.onChange(value)}
              />
            )}
          </FormFieldWrapper>
        </div>

        <div className="mt-6">
          <FormFieldWrapper
            control={form.control}
            name="spouseAddress"
            label={<IconWithLabel icon={MapPin} label="Address" />}
          >
            {(field) => (
              <InputWithIcon
                icon={MapPin}
                placeholder="Door 203, De Leon Plaza Bldg., Yacapin Velez St. Cagayan De Oro"
                {...field}
              />
            )}
          </FormFieldWrapper>
        </div>
      </SectionCard>

      <SectionCard
        icon={Users}
        title="Children Information"
        variants={itemVariants}
      >
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            <FormFieldWrapper
              control={form.control}
              name="firstChildName"
              label={<IconWithLabel icon={User} label="Name of Child 1" />}
            >
              {(field) => (
                <InputWithIcon
                  icon={User}
                  placeholder="Rey Daug Jr."
                  {...field}
                />
              )}
            </FormFieldWrapper>

            <FormFieldWrapper
              control={form.control}
              name="firstChildDateOfBirth"
              label={
                <IconWithLabel icon={Calendar} label="Birth Date of Child 1" />
              }
              className="w-full flex flex-col"
            >
              {(field) => (
                <div onClick={(e) => e.stopPropagation()}>
                  <CustomDatePicker
                    date={field.value || new Date()}
                    setDate={(date) => field.onChange(date)}
                    endYear={getYear(new Date())}
                    isFutureDatesUnselectable={true}
                    customDateFormat="MMMM d, yyyy"
                    placeholder="Select birth date"
                  />
                </div>
              )}
            </FormFieldWrapper>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            <FormFieldWrapper
              control={form.control}
              name="secondChildName"
              label={<IconWithLabel icon={User} label="Name of Child 2" />}
            >
              {(field) => (
                <InputWithIcon
                  icon={User}
                  placeholder="Samm Caagbay"
                  {...field}
                />
              )}
            </FormFieldWrapper>

            <FormFieldWrapper
              control={form.control}
              name="secondChildDateOfBirth"
              label={
                <IconWithLabel icon={Calendar} label="Birth Date of Child 2" />
              }
              className="w-full flex flex-col"
            >
              {(field) => (
                <div onClick={(e) => e.stopPropagation()}>
                  <CustomDatePicker
                    date={field.value || new Date()}
                    setDate={(date) => field.onChange(date)}
                    endYear={getYear(new Date())}
                    isFutureDatesUnselectable={true}
                    customDateFormat="MMMM d, yyyy"
                    placeholder="Select birth date"
                  />
                </div>
              )}
            </FormFieldWrapper>
          </div>
        </div>
      </SectionCard>
    </motion.div>
  );
};

export default FamilyInformation;
