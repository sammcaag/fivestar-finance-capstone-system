"use client";
import { motion } from "framer-motion";
import type { ClientFamilyInformationProps } from "../../types/client-types";
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
import { Users, User, MapPin, Calendar, Phone } from "lucide-react";
import useClientAnimation from "../../hooks/use-client-animation";
import { StepTitleCard } from "../StepTitleCard";
import { SectionCard } from "../SectionCard";

const FamilyInformation = ({ form }: ClientFamilyInformationProps) => {
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
        title={"Client Family Information"}
        description={
          "Please provide details about client's spouse and children."
        }
      />

      {/* Spouse Information Section */}
      <SectionCard
        variants={itemVariants}
        icon={User}
        title={"Spouse Information"}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          <FormField
            control={form.control}
            name="spouseFirstName"
            render={({ field }) => (
              <FormItem className="w-full min-h-[80px] flex flex-col">
                <FormLabel className="text-foreground font-medium">
                  First Name
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Susette"
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
            name="spouseMiddleName"
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
            name="spouseLastName"
            render={({ field }) => (
              <FormItem className="w-full min-h-[80px] flex flex-col">
                <FormLabel className="text-foreground font-medium">
                  Last Name
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
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 items-start">
          <FormField
            control={form.control}
            name="spouseDateOfBirth"
            render={({ field }) => (
              <FormItem className="w-full flex flex-col">
                <FormLabel className="text-foreground font-medium mb-2">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-primary" />
                    Date of Birth
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
                      placeholder="Select birth date"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="spouseContactNumber"
            render={({ field }) => (
              <FormItem className="w-full min-h-[80px] flex flex-col">
                <FormLabel className="text-foreground font-medium">
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-primary" />
                    Contact Number
                  </div>
                </FormLabel>
                <FormControl>
                  <PhoneInput
                    {...field}
                    defaultCountry="PH"
                    placeholder="+63 912 345 6789"
                    // disableCountrySelect={true}
                    className="w-full rounded-md border-0 bg-background shadow-sm focus:shadow-md transition-all duration-200"
                    value={
                      parsePhoneNumberFromString(
                        field.value || "",
                        "PH"
                      )?.format("E.164") || ""
                    }
                    onChange={(value) => field.onChange(value)}
                  />
                </FormControl>
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
            name="spouseAddress"
            render={({ field }) => (
              <FormItem className="w-full min-h-[80px] flex flex-col">
                <FormLabel className="text-foreground font-medium">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-primary" />
                    Address
                  </div>
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

      {/* Children Information Section */}
      <SectionCard
        variants={itemVariants}
        icon={Users}
        title={"Children Information"}
      >
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            <FormField
              control={form.control}
              name="firstChildName"
              render={({ field }) => (
                <FormItem className="w-full min-h-[80px] flex flex-col">
                  <FormLabel className="text-foreground font-medium">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-primary" />
                      Name of Child 1
                    </div>
                  </FormLabel>
                  <FormControl>
                    <div className="relative w-full">
                      <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        placeholder="Rey Daug Jr."
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
              name="firstChildDateOfBirth"
              render={({ field }) => (
                <FormItem className="w-full flex flex-col">
                  <FormLabel className="text-foreground font-medium mb-2">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-primary" />
                      Birth Date of Child 1
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
                        placeholder="Select birth date"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            <FormField
              control={form.control}
              name="secondChildName"
              render={({ field }) => (
                <FormItem className="w-full min-h-[80px] flex flex-col">
                  <FormLabel className="text-foreground font-medium">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-primary" />
                      Name of Child 2
                    </div>
                  </FormLabel>
                  <FormControl>
                    <div className="relative w-full">
                      <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        placeholder="Samm Caagbay"
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
              name="secondChildDateOfBirth"
              render={({ field }) => (
                <FormItem className="w-full flex flex-col">
                  <FormLabel className="text-foreground font-medium mb-2">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-primary" />
                      Birth Date of Child 2
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
                        placeholder="Select birth date"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
      </SectionCard>
    </motion.div>
  );
};

export default FamilyInformation;
