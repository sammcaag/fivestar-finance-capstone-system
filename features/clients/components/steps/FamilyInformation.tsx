"use client";
import { motion } from "framer-motion";
import type { ClientFamilyInformationProps } from "../../types/types-clients";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { getYear } from "date-fns";
import CustomDatePicker from "@/components/CustomDatePicker";
import { PhoneInput } from "@/components/ui/phone-input";
import parsePhoneNumberFromString from "libphonenumber-js";
import { Users, User } from "lucide-react";

const FamilyInformation = ({ form }: ClientFamilyInformationProps) => {
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
          Client Family Information
        </h2>
        <p className="text-muted-foreground">
          Please provide details about client&apos;s spouse and children.
        </p>
      </motion.div>

      <motion.div variants={itemVariants}>
        <div className="flex items-center mb-4">
          <User className="h-5 w-5 mr-2 text-blue-500" />
          <h3 className="text-lg font-medium">Spouse Information</h3>
        </div>
        <div className="bg-white dark:bg-gray-950 rounded-lg border border-gray-200 dark:border-gray-800 p-5 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <FormField
              control={form.control}
              name="spouseFirstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Susette"
                      {...field}
                      className="transition-all duration-200 focus-within:ring-2 focus-within:ring-primary/20"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="spouseMiddleName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Middle Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Avengers"
                      {...field}
                      className="transition-all duration-200 focus-within:ring-2 focus-within:ring-primary/20"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="spouseLastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Daug"
                      {...field}
                      className="transition-all duration-200 focus-within:ring-2 focus-within:ring-primary/20"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
            <FormField
              control={form.control}
              name="spouseDateOfBirth"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel className="mb-1">Date of Birth</FormLabel>
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
              name="spouseContactNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contact Number</FormLabel>
                  <FormControl>
                    <PhoneInput
                      {...field}
                      defaultCountry="PH"
                      placeholder="+63 912 345 6789"
                      className="transition-all duration-200 focus-within:ring-2 focus-within:ring-primary/20"
                      value={
                        parsePhoneNumberFromString(
                          field.value || "",
                          "PH"
                        )?.format("E.164") || ""
                      }
                      onChange={(value) => field.onChange(value)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="mt-5">
            <FormField
              control={form.control}
              name="spouseAddress"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Door 203, De Leon Plaza Bldg., Yacapin Velez St. Cagayan De Oro"
                      {...field}
                      className="transition-all duration-200 focus-within:ring-2 focus-within:ring-primary/20"
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
          <Users className="h-5 w-5 mr-2 text-blue-500" />
          <h3 className="text-lg font-medium">Children Information</h3>
        </div>
        <div className="bg-white dark:bg-gray-950 rounded-lg border border-gray-200 dark:border-gray-800 p-5 shadow-sm">
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <FormField
                control={form.control}
                name="firstChildName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name of Child 1</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                          placeholder="Rey Daug Jr."
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
                name="firstChildDateOfBirth"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel className="mb-1">
                      Birth Date of Child 1
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
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <FormField
                control={form.control}
                name="secondChildName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name of Child 2</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                          placeholder="Samm Caagbay"
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
                name="secondChildDateOfBirth"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel className="mb-1">
                      Birth Date of Child 2
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
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default FamilyInformation;
