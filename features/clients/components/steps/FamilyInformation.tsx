import React from "react";
import { ClientFamilyInformationProps } from "../../types/types-clients";
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

const FamilyInformation = ({ form }: ClientFamilyInformationProps) => {
  return (
    <div className="space-y-5">
      <div className="space-y-2 mb-5">
        <h2 className="text-2xl font-bold">Client Family Information</h2>
        <p>Please provide details about client's spouse and children.</p>
      </div>

      <h3 className="text-lg font-medium pt-4">Spouse Information</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <FormField
          control={form.control}
          name="spouseFirstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>First Name</FormLabel>
              <FormControl>
                <Input placeholder="Susette" {...field} />
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
                <Input placeholder="Avengers" {...field} />
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
                <Input placeholder="Daug" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <FormField
          control={form.control}
          name="spouseDateOfBirth"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel className="my-1">Date of Birth</FormLabel>
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
                  disableCountrySelect={true}
                  value={
                    parsePhoneNumberFromString(field.value || "", "PH")?.format(
                      "E.164"
                    ) || ""
                  }
                  onChange={(value) => field.onChange(value)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

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
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <h3 className="text-lg font-medium pt-4">Children Information</h3>
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <FormField
            control={form.control}
            name="firstChildName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name of Child 1</FormLabel>
                <FormControl>
                  <Input placeholder="Rey Daug Jr." {...field} />
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
                <FormLabel className="my-1">Birth Date of Child 1</FormLabel>
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <FormField
            control={form.control}
            name="secondChildName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name of Child 2</FormLabel>
                <FormControl>
                  <Input placeholder="Samm Caagbay" {...field} />
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
                <FormLabel className="my-1">Birth Date of Child 2</FormLabel>
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
  );
};

export default FamilyInformation;
