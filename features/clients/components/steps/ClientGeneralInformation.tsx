"use client";
import { motion } from "framer-motion";
import {
  civilStatusOptions,
  type ClientGeneralInformationProps,
  suffixOptions,
} from "@/features/clients/types/types-clients";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getYear } from "date-fns";
import CustomDatePicker from "@/components/CustomDatePicker";
import { PhoneInput } from "@/components/ui/phone-input";
import { User, Phone, Heart, MapPin } from "lucide-react";
import { StepTitleCard } from "../StepTitleCard";
import { SectionCard } from "../SectionCard";
import { FormFieldWrapper } from "../FormFieldWrapper";
import { InputWithIcon } from "../InputWithIcon";

const ClientGeneralInformation = ({ form }: ClientGeneralInformationProps) => {
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
        title="Client General Information"
        description="Please fill out all the required information below to begin the client registration process."
        variants={itemVariants}
      />

      <SectionCard
        icon={User}
        title="Basic Information"
        variants={itemVariants}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 items-start">
          <FormFieldWrapper
            control={form.control}
            name="firstName"
            label="First Name"
            required
          >
            {(field) => (
              <Input
                placeholder="Rey"
                className="w-full rounded-md border-0 bg-background shadow-sm focus:shadow-md transition-all duration-200"
                {...field}
              />
            )}
          </FormFieldWrapper>

          <FormFieldWrapper
            control={form.control}
            name="middleName"
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
            name="lastName"
            label="Last Name"
            required
          >
            {(field) => (
              <Input
                placeholder="Daug"
                className="w-full rounded-md border-0 bg-background shadow-sm focus:shadow-md transition-all duration-200"
                {...field}
              />
            )}
          </FormFieldWrapper>

          <FormFieldWrapper control={form.control} name="suffix" label="Suffix">
            {(field) => (
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger className="w-full rounded-md border-0 bg-background shadow-sm focus:shadow-md transition-all duration-200">
                  <SelectValue placeholder="Select suffix" />
                </SelectTrigger>
                <SelectContent>
                  {suffixOptions.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </FormFieldWrapper>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 items-start">
          <FormFieldWrapper
            control={form.control}
            name="dateOfBirth"
            label="Date of Birth"
            required
            className="w-full min-h-[100px] flex flex-col"
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
            name="gender"
            label="Gender"
            required
          >
            {(field) => (
              <Select
                onValueChange={(value) => {
                  field.onChange(value);
                  form.trigger("gender");
                }}
                defaultValue={field.value}
              >
                <SelectTrigger className="w-full rounded-md border-0 bg-background shadow-sm focus:shadow-md transition-all duration-200">
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            )}
          </FormFieldWrapper>
        </div>

        <div className="mt-6">
          <FormFieldWrapper
            control={form.control}
            name="address"
            label="Address"
            required
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
        icon={Phone}
        title="Contact Information"
        variants={itemVariants}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormFieldWrapper
            control={form.control}
            name="contactNumber"
            label="Contact Number"
            required
            className="w-full flex flex-col items-start"
          >
            {(field) => (
              <PhoneInput
                {...field}
                defaultCountry="PH"
                placeholder="+63 912 345 6789"
                disabled
                className="w-full rounded-md border-0 bg-background shadow-sm focus:shadow-md transition-all duration-200"
              />
            )}
          </FormFieldWrapper>

          <FormFieldWrapper
            control={form.control}
            name="alternativeContactNumber"
            label="Alternative Contact Number"
            className="w-full flex flex-col items-start"
          >
            {(field) => (
              <PhoneInput
                {...field}
                defaultCountry="PH"
                placeholder="+63 912 345 6789"
                disabled
                className="w-full rounded-md border-0 bg-background shadow-sm focus:shadow-md transition-all duration-200"
              />
            )}
          </FormFieldWrapper>
        </div>
      </SectionCard>

      <SectionCard
        icon={Heart}
        title="Additional Information"
        variants={itemVariants}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          <FormFieldWrapper
            control={form.control}
            name="religion"
            label="Religion"
          >
            {(field) => (
              <Input
                placeholder="Roman Catholic"
                className="w-full rounded-md border-0 bg-background shadow-sm focus:shadow-md transition-all duration-200"
                {...field}
              />
            )}
          </FormFieldWrapper>

          <FormFieldWrapper
            control={form.control}
            name="civilStatus"
            label="Civil Status"
            required
          >
            {(field) => (
              <Select
                onValueChange={(value) => {
                  field.onChange(value);
                  form.trigger("civilStatus");
                }}
                defaultValue={field.value}
              >
                <SelectTrigger className="w-full rounded-md border-0 bg-background shadow-sm focus:shadow-md transition-all duration-200">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  {civilStatusOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </FormFieldWrapper>

          <FormFieldWrapper
            control={form.control}
            name="mothersMaidenName"
            label="Mother's Maiden Name"
          >
            {(field) => (
              <Input
                placeholder="Marites"
                className="w-full rounded-md border-0 bg-background shadow-sm focus:shadow-md transition-all duration-200"
                {...field}
              />
            )}
          </FormFieldWrapper>

          <FormFieldWrapper
            control={form.control}
            name="placeOfBirth"
            label="Place of Birth"
          >
            {(field) => (
              <Input
                placeholder="Cagayan de Oro City"
                className="w-full rounded-md border-0 bg-background shadow-sm focus:shadow-md transition-all duration-200"
                {...field}
              />
            )}
          </FormFieldWrapper>
        </div>
      </SectionCard>
    </motion.div>
  );
};

export default ClientGeneralInformation;
