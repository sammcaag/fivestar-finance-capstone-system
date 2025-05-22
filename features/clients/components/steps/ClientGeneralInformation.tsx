"use client";
import { motion } from "framer-motion";
import {
  civilStatusOptions,
  type ClientGeneralInformationProps,
  suffixOptions,
} from "@/features/clients/types/types-clients";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getYear } from "date-fns";
import { PhoneInput } from "@/components/ui/phone-input";
import { User, Phone, Heart } from "lucide-react";
import CustomDatePicker from "@/components/CustomDatePicker";

const ClientGeneralInformation = ({ form }: ClientGeneralInformationProps) => {
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
      className="space-y-8"
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="text-center space-y-3">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
          Client General Information
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Please fill out all the required information below to begin the client
          registration process.
        </p>
      </motion.div>

      {/* Basic Information Section */}
      <motion.div
        variants={itemVariants}
        className="bg-white rounded-xl shadow-lg border border-gray-100 p-6"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg">
            <User className="h-5 w-5 text-white" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900">
            Basic Information
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-700 font-medium">
                  First Name <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Rey"
                    className="border-2 border-gray-200 focus:border-blue-500 transition-colors"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="middleName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-700 font-medium">
                  Middle Name
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Avengers"
                    className="border-2 border-gray-200 focus:border-blue-500 transition-colors"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-700 font-medium">
                  Last Name <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Daug"
                    className="border-2 border-gray-200 focus:border-blue-500 transition-colors"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="suffix"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-700 font-medium">
                  Suffix
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="border-2 border-gray-200 focus:border-blue-500 transition-colors">
                      <SelectValue placeholder="Select suffix" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {suffixOptions.map((opt) => (
                      <SelectItem key={opt.value} value={opt.value}>
                        {opt.label}
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
            name="dateOfBirth"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel className="text-gray-700 font-medium mb-2">
                  Date of Birth <span className="text-red-500">*</span>
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
            name="gender"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-700 font-medium">
                  Gender <span className="text-red-500">*</span>
                </FormLabel>
                <Select
                  onValueChange={(value) => {
                    field.onChange(value);
                    form.trigger("gender");
                  }}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="border-2 border-gray-200 focus:border-blue-500 transition-colors">
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="mt-6">
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-700 font-medium">
                  Address <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Door 203, De Leon Plaza Bldg., Yacapin Velez St. Cagayan De Oro"
                    className="border-2 border-gray-200 focus:border-blue-500 transition-colors"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </motion.div>

      {/* Contact Information Section */}
      <motion.div
        variants={itemVariants}
        className="bg-white rounded-xl shadow-lg border border-gray-100 p-6"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-gradient-to-r from-green-600 to-emerald-600 rounded-lg">
            <Phone className="h-5 w-5 text-white" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900">
            Contact Information
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="contactNumber"
            render={({ field }) => (
              <FormItem className="flex flex-col items-start">
                <FormLabel className="text-gray-700 font-medium">
                  Contact Number <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl className="w-full">
                  <PhoneInput
                    {...field}
                    defaultCountry="PH"
                    placeholder="+63 912 345 6789"
                    disabled
                    className="border-2 border-gray-200 focus:border-blue-500 transition-colors"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="alternativeContactNumber"
            render={({ field }) => (
              <FormItem className="flex flex-col items-start">
                <FormLabel className="text-gray-700 font-medium">
                  Alternative Contact Number
                </FormLabel>
                <FormControl className="w-full">
                  <PhoneInput
                    {...field}
                    defaultCountry="PH"
                    placeholder="+63 912 345 6789"
                    disabled
                    className="border-2 border-gray-200 focus:border-blue-500 transition-colors"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </motion.div>

      {/* Additional Information Section */}
      <motion.div
        variants={itemVariants}
        className="bg-white rounded-xl shadow-lg border border-gray-100 p-6"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg">
            <Heart className="h-5 w-5 text-white" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900">
            Additional Information
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="religion"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-700 font-medium">
                  Religion
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Roman Catholic"
                    className="border-2 border-gray-200 focus:border-blue-500 transition-colors"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="civilStatus"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-700 font-medium">
                  Civil Status <span className="text-red-500">*</span>
                </FormLabel>
                <Select
                  onValueChange={(value) => {
                    field.onChange(value);
                    form.trigger("civilStatus");
                  }}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="border-2 border-gray-200 focus:border-blue-500 transition-colors">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {civilStatusOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
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
            name="mothersMaidenName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-700 font-medium">
                  Mother&apos;s Maiden Name
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Marites"
                    className="border-2 border-gray-200 focus:border-blue-500 transition-colors"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="placeOfBirth"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-700 font-medium">
                  Place of Birth
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Cagayan de Oro City"
                    className="border-2 border-gray-200 focus:border-blue-500 transition-colors"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ClientGeneralInformation;
