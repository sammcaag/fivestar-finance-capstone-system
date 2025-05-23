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

const PensionersInformation = ({ form }: PensionersInformationProps) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
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
      {/* Step Title Card */}
      <motion.div
        variants={itemVariants}
        className="bg-card rounded-lg shadow-lg border p-6"
      >
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold text-foreground">
            Pensioner&apos;s Information
          </h2>
          <p className="text-muted-foreground">
            Please provide details about client&apos;s military service.
          </p>
        </div>
      </motion.div>

      {/* Service Information Section */}
      <motion.div
        variants={itemVariants}
        className="bg-card rounded-lg shadow-lg border"
      >
        <div className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-primary rounded-lg shadow-md">
              <Medal className="h-5 w-5 text-primary-foreground" />
            </div>
            <h3 className="text-xl font-semibold text-foreground">
              Service Information
            </h3>
          </div>

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
        </div>
      </motion.div>

      {/* Service Dates Section */}
      <motion.div
        variants={itemVariants}
        className="bg-card rounded-lg shadow-lg border"
      >
        <div className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-primary rounded-lg shadow-md">
              <Calendar className="h-5 w-5 text-primary-foreground" />
            </div>
            <h3 className="text-xl font-semibold text-foreground">
              Service Dates
            </h3>
          </div>

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
        </div>
      </motion.div>

      {/* Additional Service Details Section */}
      <motion.div
        variants={itemVariants}
        className="bg-card rounded-lg shadow-lg border"
      >
        <div className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-primary rounded-lg shadow-md">
              <Building className="h-5 w-5 text-primary-foreground" />
            </div>
            <h3 className="text-xl font-semibold text-foreground">
              Additional Service Details
            </h3>
          </div>

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
        </div>
      </motion.div>
    </motion.div>
  );
};

export default PensionersInformation;
