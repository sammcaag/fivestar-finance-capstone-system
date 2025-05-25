"use client";
import { motion } from "framer-motion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { PensionersInformationProps } from "../../types/types-clients";
import { getYear } from "date-fns";
import CustomDatePicker from "@/components/CustomDatePicker";
import { preventInvalidInput } from "@/utils/handling-input-numbers";
import { pensionTypes, ranks } from "../lib/client-registration-form";
import {
  Medal,
  Calendar,
  Hash,
  Building,
  Clock,
  Award,
  FileText,
} from "lucide-react";
import { StepTitleCard } from "../StepTitleCard";
import { SectionCard } from "../SectionCard";
import { FormFieldWrapper } from "../FormFieldWrapper";
import { IconWithLabel } from "../IconWithLabel";
import { InputWithIcon } from "../InputWithIcon";

const PensionersInformation = ({ form }: PensionersInformationProps) => {
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
        title="Pensioner's Information"
        description="Please provide details about client's military service."
        variants={itemVariants}
      />

      <SectionCard
        icon={Medal}
        title="Service Information"
        variants={itemVariants}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          <FormFieldWrapper
            control={form.control}
            name="rank"
            label={<IconWithLabel icon={Award} label="Rank" />}
          >
            {(field) => (
              <Select
                onValueChange={(value) => {
                  field.onChange(value);
                  form.trigger("rank");
                }}
                defaultValue={field.value}
              >
                <SelectTrigger className="w-full rounded-md border-0 bg-background shadow-sm focus:shadow-md transition-all duration-200">
                  <SelectValue placeholder="Select rank" />
                </SelectTrigger>
                <SelectContent>
                  {ranks.map((rank) => (
                    <SelectItem key={rank} value={rank}>
                      {rank}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </FormFieldWrapper>

          <FormFieldWrapper
            control={form.control}
            name="pensionType"
            label={<IconWithLabel icon={FileText} label="Pension Type" />}
          >
            {(field) => (
              <Select
                onValueChange={(value) => {
                  field.onChange(value);
                  form.trigger("pensionType");
                }}
                defaultValue={field.value}
              >
                <SelectTrigger className="w-full rounded-md border-0 bg-background shadow-sm focus:shadow-md transition-all duration-200">
                  <SelectValue placeholder="Select pension type" />
                </SelectTrigger>
                <SelectContent>
                  {pensionTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
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
            name="serialNumber"
            label={<IconWithLabel icon={Hash} label="Serial Number" />}
          >
            {(field) => (
              <InputWithIcon
                icon={Hash}
                placeholder="Enter serial number"
                type="number"
                min={0}
                onKeyDown={preventInvalidInput}
                {...field}
                onChange={(e) => {
                  const value =
                    e.target.value === "" ? 0 : Number(e.target.value);
                  field.onChange(value);
                }}
                value={form.getValues("serialNumber") || ""}
              />
            )}
          </FormFieldWrapper>

          <FormFieldWrapper
            control={form.control}
            name="idNumber"
            label={<IconWithLabel icon={Hash} label="ID Number" />}
          >
            {(field) => (
              <InputWithIcon
                icon={Hash}
                placeholder="Enter ID number"
                type="number"
                min={0}
                onKeyDown={preventInvalidInput}
                {...field}
                onChange={(e) => {
                  const value =
                    e.target.value === "" ? 0 : Number(e.target.value);
                  field.onChange(value);
                }}
                value={form.getValues("idNumber") || ""}
              />
            )}
          </FormFieldWrapper>
        </div>
      </SectionCard>

      <SectionCard
        icon={Calendar}
        title="Service Dates"
        variants={itemVariants}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          <FormFieldWrapper
            control={form.control}
            name="dateEnteredService"
            label={
              <IconWithLabel icon={Calendar} label="Date Entered Service" />
            }
            className="w-full flex flex-col min-h-[80px]"
          >
            {(field) => (
              <div onClick={(e) => e.stopPropagation()}>
                <CustomDatePicker
                  date={field.value || new Date()}
                  setDate={(date) => field.onChange(date)}
                  endYear={getYear(new Date())}
                  isFutureDatesUnselectable={true}
                  customDateFormat="MMMM d, yyyy"
                  placeholder="Select service date"
                />
              </div>
            )}
          </FormFieldWrapper>

          <FormFieldWrapper
            control={form.control}
            name="dateSeparationService"
            label={
              <IconWithLabel icon={Calendar} label="Date Separation Service" />
            }
            className="w-full flex flex-col min-h-[80px]"
          >
            {(field) => (
              <div onClick={(e) => e.stopPropagation()}>
                <CustomDatePicker
                  date={field.value || new Date()}
                  setDate={(date) => field.onChange(date)}
                  endYear={getYear(new Date())}
                  isFutureDatesUnselectable={true}
                  customDateFormat="MMMM d, yyyy"
                  placeholder="Select separation date"
                />
              </div>
            )}
          </FormFieldWrapper>

          <FormFieldWrapper
            control={form.control}
            name="dateRetiredService"
            label={
              <IconWithLabel icon={Calendar} label="Date Retired Service" />
            }
            className="w-full flex flex-col min-h-[80px]"
          >
            {(field) => (
              <div onClick={(e) => e.stopPropagation()}>
                <CustomDatePicker
                  date={field.value || new Date()}
                  setDate={(date) => field.onChange(date)}
                  endYear={getYear(new Date())}
                  isFutureDatesUnselectable={true}
                  customDateFormat="MMMM d, yyyy"
                  placeholder="Select retirement date"
                />
              </div>
            )}
          </FormFieldWrapper>
        </div>
      </SectionCard>

      <SectionCard
        icon={Building}
        title="Additional Service Details"
        variants={itemVariants}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          <FormFieldWrapper
            control={form.control}
            name="lengthOfService"
            label={<IconWithLabel icon={Clock} label="Length of Service" />}
          >
            {(field) => (
              <InputWithIcon
                icon={Clock}
                placeholder="Enter Length of Service"
                type="number"
                min={0}
                {...field}
                onChange={(e) => {
                  const value =
                    e.target.value === "" ? 0 : Number(e.target.value);
                  field.onChange(value);
                }}
                value={form.getValues("lengthOfService") || ""}
              />
            )}
          </FormFieldWrapper>

          <FormFieldWrapper
            control={form.control}
            name="lastUnitAssigned"
            label={<IconWithLabel icon={Building} label="Last Unit Assigned" />}
          >
            {(field) => (
              <InputWithIcon
                icon={Building}
                placeholder="Enter last unit assigned"
                {...field}
              />
            )}
          </FormFieldWrapper>

          <FormFieldWrapper
            control={form.control}
            name="branchOfService"
            label={<IconWithLabel icon={Building} label="Branch of Service" />}
          >
            {(field) => (
              <InputWithIcon
                icon={Building}
                placeholder="Enter Branch of Service"
                {...field}
              />
            )}
          </FormFieldWrapper>
        </div>
      </SectionCard>
    </motion.div>
  );
};

export default PensionersInformation;
