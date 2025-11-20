"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Control,
  FieldValues,
  FieldPath,
  PathValue,
  ControllerRenderProps,
} from "react-hook-form";
import { LucideIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import CustomDatePicker from "@/components/CustomDatePicker";
import { PhoneInput } from "@/components/ui/phone-input";
import { getYear } from "date-fns";
import { normalizeDate } from "../utils/safe-date-normalizer";

// Optional custom onChange for any field type

interface CustomOnChangeProps<T extends FieldValues> {
  onChange?: (
    value: PathValue<T, FieldPath<T>>,
    field: ControllerRenderProps<T, FieldPath<T>>
  ) => void;
}

interface BaseProps<T extends FieldValues> extends CustomOnChangeProps<T> {
  name: FieldPath<T>;
  control: Control<T>;
  label: string;
  required?: boolean;
  formItemClassName?: string;
}

// Input
interface InputFieldProps<T extends FieldValues> extends BaseProps<T> {
  type: "input";
  placeholder?: string;
  leftIcon?: LucideIcon;
  inputClassName?: string;
  iconClassName?: string;
}

// Select
interface SelectFieldProps<T extends FieldValues> extends BaseProps<T> {
  type: "select";
  options: { value: string; label: string }[];
  placeholder?: string;
}

// Date
interface DateFieldProps<T extends FieldValues> extends BaseProps<T> {
  type: "date";
  placeholder?: string;
}

// Phone
interface PhoneFieldProps<T extends FieldValues> extends BaseProps<T> {
  type: "phone";
  disabled?: boolean;
}

// Custom
interface CustomFieldProps<T extends FieldValues> extends BaseProps<T> {
  type: "custom";
  children: (field: {
    value: PathValue<T, FieldPath<T>>;
    onChange: (value: PathValue<T, FieldPath<T>>) => void;
  }) => ReactNode;
}

type FormFieldWrapperProps<T extends FieldValues> =
  | InputFieldProps<T>
  | SelectFieldProps<T>
  | DateFieldProps<T>
  | PhoneFieldProps<T>
  | CustomFieldProps<T>;

export function FormFieldWrapper<T extends FieldValues>(
  props: FormFieldWrapperProps<T>
) {
  const {
    name,
    control,
    label,
    required = false,
    formItemClassName,
    onChange: customOnChange,
  } = props;

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        // Unified onChange handler — uses custom if provided
        const handleChange = (value: unknown) => {
          const typedValue = value as PathValue<T, FieldPath<T>>;

          if (customOnChange) {
            customOnChange(typedValue, field);
          } else {
            field.onChange(typedValue);
          }
        };

        return (
          <FormItem
            className={cn(
              "w-full min-h-[80px] flex flex-col",
              formItemClassName
            )}
          >
            <FormLabel className="text-foreground font-medium">
              {label}
              {required && <span className="text-destructive ml-1">*</span>}
            </FormLabel>

            <FormControl>
              {props.type === "input" ? (
                <div className="relative">
                  {props.leftIcon && (
                    <props.leftIcon
                      className={cn(
                        "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground",
                        props.iconClassName
                      )}
                    />
                  )}
                  <Input
                    placeholder={props.placeholder}
                    className={cn(
                      "rounded-md border-0 bg-background shadow-sm focus:shadow-md transition-all duration-200",
                      props.leftIcon && "pl-10",
                      props.inputClassName
                    )}
                    value={field.value ?? ""}
                    onChange={(e) => {
                      const rawValue = e.target.value;
                      const finalValue = rawValue === "" ? "" : rawValue;
                      handleChange(finalValue);
                    }}
                  />
                </div>
              ) : props.type === "select" ? (
                <Select
                  onValueChange={handleChange}
                  value={field.value as string}
                >
                  <SelectTrigger className="w-full rounded-md border-0 bg-background shadow-sm focus:shadow-md transition-all duration-200">
                    <SelectValue placeholder={props.placeholder} />
                  </SelectTrigger>
                  <SelectContent>
                    {props.options.map((opt) => (
                      <SelectItem key={opt.value} value={opt.value}>
                        {opt.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : props.type === "date" ? (
                <div onClick={(e) => e.stopPropagation()}>
                  <CustomDatePicker
                    date={normalizeDate(field.value)}
                    setDate={handleChange}
                    endYear={getYear(new Date())}
                    isFutureDatesUnselectable={true}
                    customDateFormat="MMMM d, yyyy"
                    placeholder={props.placeholder || "Select date"}
                  />
                </div>
              ) : props.type === "phone" ? (
                <PhoneInput
                  value={typeof field.value === "string" ? field.value : ""}
                  onChange={handleChange}
                  defaultCountry="PH"
                  placeholder="+63 912 345 6789"
                  disabled={props.disabled}
                  className="w-full rounded-md border-0 bg-background shadow-sm focus:shadow-md transition-all duration-200"
                />
              ) : (
                // custom
                <>{props.children({ ...field, onChange: handleChange })}</>
              )}
            </FormControl>

            <div className="min-h-[20px]">
              <FormMessage />
            </div>
          </FormItem>
        );
      }}
    />
  );
}
