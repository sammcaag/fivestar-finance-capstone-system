"use client";
import { motion } from "framer-motion";
import {
  civilStatusOptions,
  type ClientGeneralInformationProps,
  suffixOptions,
} from "@/features/clients/types/client-types";
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
import CustomDatePicker from "@/components/CustomDatePicker";
import { PhoneInput } from "@/components/ui/phone-input";
import { User, Phone, Heart, MapPin } from "lucide-react";
import useClientAnimation from "../../hooks/use-client-animation";
import { StepTitleCard } from "../StepTitleCard";
import { SectionCard } from "../SectionCard";

const ClientGeneralInformation = ({ form }: ClientGeneralInformationProps) => {
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
        title={"Client General Information"}
        description={
          "Please fill out all the required information below to begin the client registration process."
        }
      />

      {/* Basic Information Section */}
      <SectionCard
        variants={itemVariants}
        icon={User}
        title={"Basic Information"}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 items-start">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem className="w-full min-h-[80px] flex flex-col">
                <FormLabel className="text-foreground font-medium">
                  First Name <span className="text-destructive">*</span>
                </FormLabel>
                <FormControl className="bg-background">
                  <Input
                    placeholder="Rey"
                    className="w-full rounded-md border-0 bg-background shadow-sm focus:shadow-md transition-all duration-200"
                    {...field}
                  />
                </FormControl>
                <div className="min-h-[20px]">
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="middleName"
            render={({ field }) => (
              <FormItem className="w-full min-h-[80px] flex flex-col">
                <FormLabel className="text-foreground font-medium">
                  Middle Name
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Avengers"
                    className="w-full rounded-md border-0 bg-background shadow-sm focus:shadow-md transition-all duration-200"
                    {...field}
                  />
                </FormControl>
                <div className="min-h-[20px]">
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem className="w-full min-h-[80px] flex flex-col">
                <FormLabel className="text-foreground font-medium">
                  Last Name <span className="text-destructive">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Daug"
                    className="w-full rounded-md border-0 bg-background shadow-sm focus:shadow-md transition-all duration-200"
                    {...field}
                  />
                </FormControl>
                <div className="min-h-[20px]">
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="suffix"
            render={({ field }) => (
              <FormItem className="w-full min-h-[80px] flex flex-col">
                <FormLabel className="text-foreground font-medium">
                  Suffix
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="w-full rounded-md border-0 bg-background shadow-sm focus:shadow-md transition-all duration-200">
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
            name="dateOfBirth"
            render={({ field }) => (
              <FormItem className="w-full min-h-[100px] flex flex-col">
                <FormLabel className="text-foreground font-medium mb-2">
                  Date of Birth <span className="text-destructive">*</span>
                </FormLabel>
                <FormControl className="w-full">
                  <div onClick={(e) => e.stopPropagation()}>
                    <CustomDatePicker
                      date={field.value || new Date()}
                      setDate={(date) => {
                        field.onChange(date);
                        // Don't trigger validation immediately
                      }}
                      endYear={getYear(new Date())}
                      isFutureDatesUnselectable={true}
                      customDateFormat="MMMM d, yyyy"
                      placeholder="Select birth date"
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
            name="gender"
            render={({ field }) => (
              <FormItem className="w-full min-h-[80px] flex flex-col">
                <FormLabel className="text-foreground font-medium">
                  Gender <span className="text-destructive">*</span>
                </FormLabel>
                <Select
                  onValueChange={(value) => {
                    field.onChange(value);
                    form.trigger("gender");
                  }}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="w-full rounded-md border-0 bg-background shadow-sm focus:shadow-md transition-all duration-200">
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
                <div className="min-h-[20px]">
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
        </div>

        <div className="mt-6">
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem className="w-full min-h-[80px] flex flex-col">
                <FormLabel className="text-foreground font-medium">
                  Address <span className="text-destructive">*</span>
                </FormLabel>
                <FormControl>
                  <div className="relative w-full">
                    <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      placeholder="Door 203, De Leon Plaza Bldg., Yacapin Velez St. Cagayan De Oro"
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

      {/* Contact Information Section */}
      <SectionCard
        variants={itemVariants}
        icon={Phone}
        title={"Contact Information"}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="contactNumber"
            render={({ field }) => (
              <FormItem className="w-full flex flex-col items-start">
                <FormLabel className="text-foreground font-medium">
                  Contact Number <span className="text-destructive">*</span>
                </FormLabel>
                <FormControl className="w-full">
                  <PhoneInput
                    {...field}
                    defaultCountry="PH"
                    placeholder="+63 912 345 6789"
                    disabled
                    className="w-full rounded-md border-0 bg-background shadow-sm focus:shadow-md transition-all duration-200"
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
              <FormItem className="w-full flex flex-col items-start">
                <FormLabel className="text-foreground font-medium">
                  Alternative Contact Number
                </FormLabel>
                <FormControl className="w-full">
                  <PhoneInput
                    {...field}
                    defaultCountry="PH"
                    placeholder="+63 912 345 6789"
                    disabled
                    className="w-full rounded-md border-0 bg-background shadow-sm focus:shadow-md transition-all duration-200"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </SectionCard>

      {/* Additional Information Section */}
      <SectionCard
        variants={itemVariants}
        icon={Heart}
        title={"Additional Information"}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          <FormField
            control={form.control}
            name="religion"
            render={({ field }) => (
              <FormItem className="w-full min-h-[80px] flex flex-col">
                <FormLabel className="text-foreground font-medium">
                  Religion
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Roman Catholic"
                    className="w-full rounded-md border-0 bg-background shadow-sm focus:shadow-md transition-all duration-200"
                    {...field}
                  />
                </FormControl>
                <div className="min-h-[20px]">
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="civilStatus"
            render={({ field }) => (
              <FormItem className="w-full min-h-[80px] flex flex-col">
                <FormLabel className="text-foreground font-medium">
                  Civil Status <span className="text-destructive">*</span>
                </FormLabel>
                <Select
                  onValueChange={(value) => {
                    field.onChange(value);
                    form.trigger("civilStatus");
                  }}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="w-full rounded-md border-0 bg-background shadow-sm focus:shadow-md transition-all duration-200">
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
                <div className="min-h-[20px]">
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="mothersMaidenName"
            render={({ field }) => (
              <FormItem className="w-full min-h-[80px] flex flex-col">
                <FormLabel className="text-foreground font-medium">
                  Mother&apos;s Maiden Name
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Marites"
                    className="w-full rounded-md border-0 bg-background shadow-sm focus:shadow-md transition-all duration-200"
                    {...field}
                  />
                </FormControl>
                <div className="min-h-[20px]">
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="placeOfBirth"
            render={({ field }) => (
              <FormItem className="w-full min-h-[80px] flex flex-col">
                <FormLabel className="text-foreground font-medium">
                  Place of Birth
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Cagayan de Oro City"
                    className="w-full rounded-md border-0 bg-background shadow-sm focus:shadow-md transition-all duration-200"
                    {...field}
                  />
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

export default ClientGeneralInformation;
