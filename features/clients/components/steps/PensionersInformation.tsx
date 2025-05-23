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
import { Medal, Calendar, Hash, Building, Clock } from "lucide-react";

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
        className="bg-card rounded-lg shadow-sm border p-6"
      >
        <div className="text-center space-y-2">
          <h2 className="h2 bg-gradient-to-r from-primary to-chart-2 bg-clip-text text-transparent">
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
        className="bg-card rounded-lg shadow-sm border"
      >
        <div className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-primary rounded-lg">
              <Medal className="h-5 w-5 text-primary-foreground" />
            </div>
            <h3 className="h4">Service Information</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="rank"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-foreground font-medium">
                    Rank
                  </FormLabel>
                  <Select
                    onValueChange={(value) => {
                      field.onChange(value);
                      form.trigger("rank");
                    }}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="rounded-md border-0 bg-background shadow-sm focus:shadow-md transition-all duration-200">
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
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="pensionType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-foreground font-medium">
                    Pension Type
                  </FormLabel>
                  <Select
                    onValueChange={(value) => {
                      field.onChange(value);
                      form.trigger("pensionType");
                    }}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="rounded-md border-0 bg-background shadow-sm focus:shadow-md transition-all duration-200">
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
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <FormField
              control={form.control}
              name="serialNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-foreground font-medium">
                    Serial Number
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Hash className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        placeholder="Enter serial number"
                        type="number"
                        min={0}
                        onKeyDown={preventInvalidInput}
                        className="rounded-md border-0 bg-background shadow-sm focus:shadow-md transition-all duration-200 pl-10"
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
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="idNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-foreground font-medium">
                    ID Number
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Hash className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        placeholder="Enter ID number"
                        type="number"
                        min={0}
                        onKeyDown={preventInvalidInput}
                        className="rounded-md border-0 bg-background shadow-sm focus:shadow-md transition-all duration-200 pl-10"
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
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
      </motion.div>

      {/* Service Dates Section */}
      <motion.div
        variants={itemVariants}
        className="bg-card rounded-lg shadow-sm border"
      >
        <div className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-chart-2 rounded-lg">
              <Calendar className="h-5 w-5 text-primary-foreground" />
            </div>
            <h3 className="h4">Service Dates</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FormField
              control={form.control}
              name="dateEnteredService"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel className="text-foreground font-medium mb-2">
                    Date Entered Service
                  </FormLabel>
                  <FormControl>
                    <CustomDatePicker
                      date={field.value || new Date()}
                      setDate={(date) => field.onChange(date)}
                      endYear={getYear(new Date())}
                      isFutureDatesUnselectable={true}
                      customDateFormat="MMMM d, yyyy"
                      placeholder="Select service date"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="dateSeparationService"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel className="text-foreground font-medium mb-2">
                    Date Separation Service
                  </FormLabel>
                  <FormControl>
                    <CustomDatePicker
                      date={field.value || new Date()}
                      setDate={(date) => field.onChange(date)}
                      endYear={getYear(new Date())}
                      isFutureDatesUnselectable={true}
                      customDateFormat="MMMM d, yyyy"
                      placeholder="Select separation date"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="dateRetiredService"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel className="text-foreground font-medium mb-2">
                    Date Retired Service
                  </FormLabel>
                  <FormControl>
                    <CustomDatePicker
                      date={field.value || new Date()}
                      setDate={(date) => field.onChange(date)}
                      endYear={getYear(new Date())}
                      isFutureDatesUnselectable={true}
                      customDateFormat="MMMM d, yyyy"
                      placeholder="Select retirement date"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
      </motion.div>

      {/* Additional Service Details Section */}
      <motion.div
        variants={itemVariants}
        className="bg-card rounded-lg shadow-sm border"
      >
        <div className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-chart-3 rounded-lg">
              <Building className="h-5 w-5 text-primary-foreground" />
            </div>
            <h3 className="h4">Additional Service Details</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FormField
              control={form.control}
              name="lengthOfService"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-foreground font-medium">
                    Length of Service
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Clock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        placeholder="Enter Length of Service"
                        type="number"
                        min={0}
                        className="rounded-md border-0 bg-background shadow-sm focus:shadow-md transition-all duration-200 pl-10"
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
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="lastUnitAssigned"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-foreground font-medium">
                    Last Unit Assigned
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Building className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        placeholder="Enter last unit assigned"
                        className="rounded-md border-0 bg-background shadow-sm focus:shadow-md transition-all duration-200 pl-10"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="branchOfService"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-foreground font-medium">
                    Branch of Service
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Building className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        placeholder="Enter Branch of Service"
                        className="rounded-md border-0 bg-background shadow-sm focus:shadow-md transition-all duration-200 pl-10"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
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
