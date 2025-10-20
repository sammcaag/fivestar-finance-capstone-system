"use client";
import { motion } from "framer-motion";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { PensionersInformationProps } from "../../types/types-clients";
import { Input } from "@/components/ui/input";
import { getYear } from "date-fns";
import CustomDatePicker from "@/components/CustomDatePicker";
import { preventInvalidInput } from "@/utils/handling-input-numbers";
import { pensionTypes, ranks } from "../../lib/client-registration-form";
import {
  Medal,
  Calendar,
  Hash,
  Building,
  Clock,
  Award,
  FileText,
} from "lucide-react";
import useClientAnimation from "../../hooks/use-client-animation";
import { StepTitleCard } from "../StepTitleCard";
import { SectionCard } from "../SectionCard";

const PensionersInformation = ({ form }: PensionersInformationProps) => {
  const { containerVariants, itemVariants } = useClientAnimation();

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Step Title Card */}
      <StepTitleCard
        variants={itemVariants}
        title={"Pensioner's Information"}
        description={"Please provide details about client's military service."}
      />

      {/* Service Information Section */}
      <SectionCard
        variants={itemVariants}
        icon={Medal}
        title={"Service Information"}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          <FormField
            control={form.control}
            name="rank"
            render={({ field }) => (
              <FormItem className="w-full min-h-[80px] flex flex-col">
                <FormLabel className="text-foreground font-medium">
                  <div className="flex items-center gap-2">
                    <Award className="h-4 w-4 text-primary" />
                    Rank
                  </div>
                </FormLabel>
                <Select
                  onValueChange={(value) => {
                    field.onChange(value);
                    form.trigger("rank");
                  }}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="w-full rounded-md border-0 bg-background shadow-sm focus:shadow-md transition-all duration-200">
                      <SelectValue placeholder="Select rank" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {ranks.map((rank) => (
                      <SelectItem key={rank} value={rank}>
                        {rank}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <div className="min-h-[20px]">
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="pensionType"
            render={({ field }) => (
              <FormItem className="w-full min-h-[80px] flex flex-col">
                <FormLabel className="text-foreground font-medium">
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-primary" />
                    Pension Type
                  </div>
                </FormLabel>
                <Select
                  onValueChange={(value) => {
                    field.onChange(value);
                    form.trigger("pensionType");
                  }}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="w-full rounded-md border-0 bg-background shadow-sm focus:shadow-md transition-all duration-200">
                      <SelectValue placeholder="Select pension type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {pensionTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <div className="min-h-[20px]">
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 items-start">
          <FormField
            control={form.control}
            name="serialNumber"
            render={({ field }) => (
              <FormItem className="w-full min-h-[80px] flex flex-col">
                <FormLabel className="text-foreground font-medium">
                  <div className="flex items-center gap-2">
                    <Hash className="h-4 w-4 text-primary" />
                    Serial Number
                  </div>
                </FormLabel>
                <FormControl>
                  <div className="relative w-full">
                    <Hash className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      placeholder="Enter serial number"
                      type="number"
                      min={0}
                      onKeyDown={preventInvalidInput}
                      className="w-full rounded-md border-0 bg-background shadow-sm focus:shadow-md transition-all duration-200 pl-10"
                      {...field}
                      onChange={(e) => {
                        const value =
                          e.target.value === "" ? 0 : Number(e.target.value);
                        field.onChange(value);
                      }}
                      value={form.getValues("serialNumber") || ""}
                    />
                  </div>
                </FormControl>
                <div className="min-h-[20px]">
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="idNumber"
            render={({ field }) => (
              <FormItem className="w-full min-h-[80px] flex flex-col">
                <FormLabel className="text-foreground font-medium">
                  <div className="flex items-center gap-2">
                    <Hash className="h-4 w-4 text-primary" />
                    ID Number
                  </div>
                </FormLabel>
                <FormControl>
                  <div className="relative w-full">
                    <Hash className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      placeholder="Enter ID number"
                      type="number"
                      min={0}
                      onKeyDown={preventInvalidInput}
                      className="w-full rounded-md border-0 bg-background shadow-sm focus:shadow-md transition-all duration-200 pl-10"
                      {...field}
                      onChange={(e) => {
                        const value =
                          e.target.value === "" ? 0 : Number(e.target.value);
                        field.onChange(value);
                      }}
                      value={form.getValues("idNumber") || ""}
                    />
                  </div>
                </FormControl>
                <div className="min-h-[20px]">
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
        </div>
      </SectionCard>

      {/* Service Dates Section */}
      <SectionCard
        variants={itemVariants}
        icon={Calendar}
        title={"Service Dates"}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          <FormField
            control={form.control}
            name="dateEnteredService"
            render={({ field }) => (
              <FormItem className="w-full flex flex-col min-h-[80px]">
                <FormLabel className="text-foreground font-medium mb-2">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-primary" />
                    Date Entered Service
                  </div>
                </FormLabel>
                <FormControl className="w-full">
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
                </FormControl>
                <div className="min-h-[20px]">
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="dateSeparationService"
            render={({ field }) => (
              <FormItem className="w-full flex flex-col min-h-[80px]">
                <FormLabel className="text-foreground font-medium mb-2">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-primary" />
                    Date Separation Service
                  </div>
                </FormLabel>
                <FormControl className="w-full">
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
                </FormControl>
                <div className="min-h-[20px]">
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="dateRetiredService"
            render={({ field }) => (
              <FormItem className="w-full flex flex-col min-h-[80px]">
                <FormLabel className="text-foreground font-medium mb-2">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-primary" />
                    Date Retired Service
                  </div>
                </FormLabel>
                <FormControl className="w-full">
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
                </FormControl>
                <div className="min-h-[20px]">
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
        </div>
      </SectionCard>

      {/* Additional Service Details Section */}
      <SectionCard
        variants={itemVariants}
        icon={Building}
        title={"Additional Service Details"}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          <FormField
            control={form.control}
            name="lengthOfService"
            render={({ field }) => (
              <FormItem className="w-full min-h-[80px] flex flex-col">
                <FormLabel className="text-foreground font-medium">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-primary" />
                    Length of Service
                  </div>
                </FormLabel>
                <FormControl>
                  <div className="relative w-full">
                    <Clock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      placeholder="Enter Length of Service"
                      type="number"
                      min={0}
                      className="w-full rounded-md border-0 bg-background shadow-sm focus:shadow-md transition-all duration-200 pl-10"
                      {...field}
                      onChange={(e) => {
                        const value =
                          e.target.value === "" ? 0 : Number(e.target.value);
                        field.onChange(value);
                      }}
                      value={form.getValues("lengthOfService") || ""}
                    />
                  </div>
                </FormControl>
                <div className="min-h-[20px]">
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="lastUnitAssigned"
            render={({ field }) => (
              <FormItem className="w-full min-h-[80px] flex flex-col">
                <FormLabel className="text-foreground font-medium">
                  <div className="flex items-center gap-2">
                    <Building className="h-4 w-4 text-primary" />
                    Last Unit Assigned
                  </div>
                </FormLabel>
                <FormControl>
                  <div className="relative w-full">
                    <Building className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      placeholder="Enter last unit assigned"
                      className="w-full rounded-md border-0 bg-background shadow-sm focus:shadow-md transition-all duration-200 pl-10"
                      {...field}
                    />
                  </div>
                </FormControl>
                <div className="min-h-[20px]">
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="branchOfService"
            render={({ field }) => (
              <FormItem className="w-full min-h-[80px] flex flex-col">
                <FormLabel className="text-foreground font-medium">
                  <div className="flex items-center gap-2">
                    <Building className="h-4 w-4 text-primary" />
                    Branch of Service
                  </div>
                </FormLabel>
                <FormControl>
                  <div className="relative w-full">
                    <Building className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      placeholder="Enter Branch of Service"
                      className="w-full rounded-md border-0 bg-background shadow-sm focus:shadow-md transition-all duration-200 pl-10"
                      {...field}
                    />
                  </div>
                </FormControl>
                <div className="min-h-[20px]">
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
        </div>
      </SectionCard>
    </motion.div>
  );
};

export default PensionersInformation;
