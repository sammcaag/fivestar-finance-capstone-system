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
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
      },
    },
  };

  return (
    <motion.div
      className="space-y-6"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div className="space-y-2 mb-5" variants={itemVariants}>
        <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 text-transparent bg-clip-text">
          Pensioner&apos;s Information
        </h2>
        <p className="text-muted-foreground">
          Please provide details about client&apos;s military service.
        </p>
      </motion.div>

      <motion.div variants={itemVariants}>
        <div className="flex items-center mb-4">
          <Medal className="h-5 w-5 mr-2 text-blue-500" />
          <h3 className="text-lg font-medium">Service Information</h3>
        </div>
        <div className="bg-white dark:bg-gray-950 rounded-lg border border-gray-200 dark:border-gray-800 p-5 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <FormField
              control={form.control}
              name="rank"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Rank</FormLabel>
                  <Select
                    onValueChange={(value) => {
                      field.onChange(value);
                      form.trigger("rank");
                    }}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="transition-all duration-200 focus:ring-2 focus:ring-primary/20">
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
                  <FormLabel>Pension Type</FormLabel>
                  <Select
                    onValueChange={(value) => {
                      field.onChange(value);
                      form.trigger("pensionType");
                    }}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="transition-all duration-200 focus:ring-2 focus:ring-primary/20">
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
            <FormField
              control={form.control}
              name="serialNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Serial Number</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Hash className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        placeholder="Enter serial number"
                        type="number"
                        min={0}
                        onKeyDown={preventInvalidInput}
                        className="pl-10 transition-all duration-200 focus-within:ring-2 focus-within:ring-primary/20"
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
                  <FormLabel>ID Number</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Hash className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        placeholder="Enter ID number"
                        type="number"
                        min={0}
                        onKeyDown={preventInvalidInput}
                        className="pl-10 transition-all duration-200 focus-within:ring-2 focus-within:ring-primary/20"
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

      <motion.div variants={itemVariants}>
        <div className="flex items-center mb-4">
          <Calendar className="h-5 w-5 mr-2 text-blue-500" />
          <h3 className="text-lg font-medium">Service Dates</h3>
        </div>
        <div className="bg-white dark:bg-gray-950 rounded-lg border border-gray-200 dark:border-gray-800 p-5 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <FormField
              control={form.control}
              name="dateEnteredService"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel className="mb-1">Date Entered Service</FormLabel>
                  <FormControl>
                    <CustomDatePicker
                      date={field.value || new Date()}
                      setDate={(date) => field.onChange(date)}
                      endYear={getYear(new Date())}
                      isFutureDatesUnselectable={true}
                      customDateFormat="MMMM d, yyyy"
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
                  <FormLabel className="mb-1">
                    Date Separation Service
                  </FormLabel>
                  <FormControl>
                    <CustomDatePicker
                      date={field.value || new Date()}
                      setDate={(date) => field.onChange(date)}
                      endYear={getYear(new Date())}
                      isFutureDatesUnselectable={true}
                      customDateFormat="MMMM d, yyyy"
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
                  <FormLabel className="mb-1">Date Retired Service</FormLabel>
                  <FormControl>
                    <CustomDatePicker
                      date={field.value || new Date()}
                      setDate={(date) => field.onChange(date)}
                      endYear={getYear(new Date())}
                      isFutureDatesUnselectable={true}
                      customDateFormat="MMMM d, yyyy"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
      </motion.div>

      <motion.div variants={itemVariants}>
        <div className="flex items-center mb-4">
          <Building className="h-5 w-5 mr-2 text-blue-500" />
          <h3 className="text-lg font-medium">Additional Service Details</h3>
        </div>
        <div className="bg-white dark:bg-gray-950 rounded-lg border border-gray-200 dark:border-gray-800 p-5 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <FormField
              control={form.control}
              name="lengthOfService"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Length of Service</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Clock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        placeholder="Enter Length of Service"
                        type="number"
                        min={0}
                        className="pl-10 transition-all duration-200 focus-within:ring-2 focus-within:ring-primary/20"
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
                  <FormLabel>Last Unit Assigned</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Building className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        placeholder="Enter last unit assigned"
                        {...field}
                        className="pl-10 transition-all duration-200 focus-within:ring-2 focus-within:ring-primary/20"
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
                  <FormLabel>Branch of Service</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Building className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        placeholder="Enter Branch of Service"
                        {...field}
                        className="pl-10 transition-all duration-200 focus-within:ring-2 focus-within:ring-primary/20"
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
