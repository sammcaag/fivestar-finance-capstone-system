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
import { Users, User, MapPin } from "lucide-react";

const FamilyInformation = ({ form }: ClientFamilyInformationProps) => {
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
            Client Family Information
          </h2>
          <p className="text-muted-foreground">
            Please provide details about client&apos;s spouse and children.
          </p>
        </div>
      </motion.div>

      {/* Spouse Information Section */}
      <motion.div
        variants={itemVariants}
        className="bg-card rounded-lg shadow-sm border"
      >
        <div className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-primary rounded-lg">
              <User className="h-5 w-5 text-primary-foreground" />
            </div>
            <h3 className="h4">Spouse Information</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FormField
              control={form.control}
              name="spouseFirstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-foreground font-medium">
                    First Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Susette"
                      className="rounded-md border-0 bg-background shadow-sm focus:shadow-md transition-all duration-200"
                      {...field}
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
                  <FormLabel className="text-foreground font-medium">
                    Middle Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Avengers"
                      className="rounded-md border-0 bg-background shadow-sm focus:shadow-md transition-all duration-200"
                      {...field}
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
                  <FormLabel className="text-foreground font-medium">
                    Last Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Daug"
                      className="rounded-md border-0 bg-background shadow-sm focus:shadow-md transition-all duration-200"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <FormField
              control={form.control}
              name="spouseDateOfBirth"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel className="text-foreground font-medium mb-2">
                    Date of Birth
                  </FormLabel>
                  <FormControl>
                    <CustomDatePicker
                      date={field.value || new Date()}
                      setDate={(date) => field.onChange(date)}
                      endYear={getYear(new Date())}
                      isFutureDatesUnselectable={true}
                      customDateFormat="MMMM d, yyyy"
                      placeholder="Select birth date"
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
                  <FormLabel className="text-foreground font-medium">
                    Contact Number
                  </FormLabel>
                  <FormControl>
                    <PhoneInput
                      {...field}
                      defaultCountry="PH"
                      placeholder="+63 912 345 6789"
                      // disableCountrySelect={true}
                      className="rounded-md border-0 bg-background shadow-sm focus:shadow-md transition-all duration-200"
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

          <div className="mt-6">
            <FormField
              control={form.control}
              name="spouseAddress"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-foreground font-medium">
                    Address
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        placeholder="Door 203, De Leon Plaza Bldg., Yacapin Velez St. Cagayan De Oro"
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

      {/* Children Information Section */}
      <motion.div
        variants={itemVariants}
        className="bg-card rounded-lg shadow-sm border"
      >
        <div className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-chart-2 rounded-lg">
              <Users className="h-5 w-5 text-primary-foreground" />
            </div>
            <h3 className="h4">Children Information</h3>
          </div>

          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="firstChildName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground font-medium">
                      Name of Child 1
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                          placeholder="Rey Daug Jr."
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
                name="firstChildDateOfBirth"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel className="text-foreground font-medium mb-2">
                      Birth Date of Child 1
                    </FormLabel>
                    <FormControl>
                      <CustomDatePicker
                        date={field.value || new Date()}
                        setDate={(date) => field.onChange(date)}
                        endYear={getYear(new Date())}
                        isFutureDatesUnselectable={true}
                        customDateFormat="MMMM d, yyyy"
                        placeholder="Select birth date"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="secondChildName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground font-medium">
                      Name of Child 2
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                          placeholder="Samm Caagbay"
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
                name="secondChildDateOfBirth"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel className="text-foreground font-medium mb-2">
                      Birth Date of Child 2
                    </FormLabel>
                    <FormControl>
                      <CustomDatePicker
                        date={field.value || new Date()}
                        setDate={(date) => field.onChange(date)}
                        endYear={getYear(new Date())}
                        isFutureDatesUnselectable={true}
                        customDateFormat="MMMM d, yyyy"
                        placeholder="Select birth date"
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
