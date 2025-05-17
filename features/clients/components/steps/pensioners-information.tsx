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
import React, { useEffect, useRef } from "react";
import { PensionersInformationProps } from "../../types/types-clients";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { format, getYear } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { preventInvalidInput } from "@/utils/handling-input-numbers";
import CustomDatePicker from "@/components/custom/custom-date-picker";
import { pensionTypes, ranks } from "@/lib/client-registration";

const PensionersInformation = ({ form }: PensionersInformationProps) => {
  return (
    <div className="space-y-5">
      <div className="space-y-2 mb-5">
        <h2 className="text-2xl font-bold">Pensioner's Information</h2>
        <p>Please provide details about client's military service.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <FormField
          control={form.control}
          name="rank"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Rank</FormLabel>
              <Select
                onValueChange={(value) => {
                  field.onChange(value); // ✅ Updates form value
                  form.trigger("rank"); // ✅ Triggers validation
                }}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
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
                  field.onChange(value); // ✅ Updates form value
                  form.trigger("pensionType"); // ✅ Triggers validation
                }}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <FormField
          control={form.control}
          name="serialNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Serial Number</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter serial number"
                  type="number"
                  min={0}
                  onKeyDown={preventInvalidInput}
                  {...field}
                  onChange={(e) => {
                    const value =
                      e.target.value === "" ? 0 : Number(e.target.value);
                    field.onChange(value); // Ensure the value is a number
                  }}
                  value={form.getValues("serialNumber") || ""}
                />
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
                <Input
                  placeholder="Enter ID number"
                  type="number"
                  min={0}
                  onKeyDown={preventInvalidInput}
                  {...field}
                  onChange={(e) => {
                    const value =
                      e.target.value === "" ? 0 : Number(e.target.value);
                    field.onChange(value); // Ensure the value is a number
                  }}
                  value={form.getValues("idNumber") || ""}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <FormField
          control={form.control}
          name="dateEnteredService"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Date Entered Service</FormLabel>
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
              <FormLabel>Date Separation Service</FormLabel>
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
              <FormLabel>Date Retired Service</FormLabel>
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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <FormField
          control={form.control}
          name="lengthOfService"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Length of Service</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter Lenght of Service"
                  type="number"
                  min={0}
                  {...field}
                  onChange={(e) => {
                    const value =
                      e.target.value === "" ? 0 : Number(e.target.value);
                    field.onChange(value); // Ensure the value is a number
                  }}
                  value={form.getValues("lengthOfService") || ""}
                />
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
                <Input placeholder="Enter last unit assigned" {...field} />
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
                <Input placeholder="Enter Branch of Service" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};

export default PensionersInformation;
