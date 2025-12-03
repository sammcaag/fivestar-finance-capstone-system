"use client";

import CustomDatePicker from "@/components/CustomDatePicker";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PhoneInput } from "@/components/ui/phone-input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { preventInvalidInput } from "@/utils/handling-input-numbers";
import { getYear } from "date-fns";
import { LucideIcon } from "lucide-react";
import { ReactNode } from "react";
import { Control, ControllerRenderProps, FieldPath, FieldValues, PathValue } from "react-hook-form";
import { normalizeDate } from "../features/clients/utils/safe-date-normalizer";

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
  customFunctionOnChange?: () => void;
  disabled?: boolean;
}

// Input — now with asNumber
interface InputFieldProps<T extends FieldValues> extends BaseProps<T> {
  type: "input";
  placeholder?: string;
  leftIcon?: LucideIcon;
  inputClassName?: string;
  iconClassName?: string;
  /** NEW: Automatically convert empty → 0 and ensure number type */
  asNumber?: boolean;
  maxNumber?: number;
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

export function FormFieldWrapper<T extends FieldValues>(props: FormFieldWrapperProps<T>) {
  const {
    name,
    control,
    label,
    required = false,
    formItemClassName,
    onChange: customOnChange,
    disabled = false,
  } = props;

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
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
              disabled ? "cursor-not-allowed" : "cursor-text",
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
                    type={"text"}
                    inputMode={props.asNumber ? "decimal" : "text"}
                    disabled={disabled}
                    {...(props.asNumber
                      ? {
                          step: "0.01",
                          min: "0",
                        }
                      : {})}
                    className={cn(
                      "rounded-md border-0 bg-background shadow-sm focus:shadow-md transition-all duration-200",
                      props.asNumber &&
                        "[appearance:textfield] [&::-webkit-outer-spin-button]:hidden [&::-webkit-inner-spin-button]:hidden",
                      props.leftIcon && "pl-10",
                      disabled ? "cursor-not-allowed disabled:opacity-100" : "cursor-text",
                      props.inputClassName
                    )}
                    value={typeof field.value === "number" ? field.value : (field.value ?? "")}
                    onChange={(e) => {
                      props.customFunctionOnChange?.();
                      const rawValue = e.target.value;
                      const maxAllowed = props.maxNumber ?? 1_000_000;

                      // Normal text input — pass through
                      if (!props.asNumber) {
                        handleChange(rawValue);
                        return;
                      }

                      // === asNumber mode: strict number handling ===

                      // 1. Empty field → 0
                      if (rawValue === "") {
                        handleChange(0);
                        return;
                      }

                      // 2. Allow incomplete decimals like "123", "123.", "123.4"
                      //     This regex matches valid number patterns including trailing dot
                      // Allow patterns like ".", "123.", ".5", "123.45"
                      if (/^\d*\.?\d*$/.test(rawValue)) {
                        // If it ends with a dot or is just ".", keep as string
                        if (rawValue.endsWith(".")) {
                          handleChange(rawValue);
                          return;
                        }

                        const num = parseFloat(rawValue);

                        if (Number.isNaN(num)) {
                          handleChange(rawValue);
                          return;
                        }

                        if (num > maxAllowed) return;

                        // Only round when input is fully numeric (NOT when user still typing)
                        const sanitized = Number(num.toFixed(2));

                        handleChange(sanitized);
                        return;
                      }
                      // 3. Anything else (letters, multiple dots, etc.) → ignore completely
                      return;
                    }}
                    onKeyDown={
                      props.asNumber
                        ? (e: React.KeyboardEvent<HTMLInputElement>) => {
                            // Block e, E, -, + entirely
                            preventInvalidInput(e);
                          }
                        : undefined
                    }
                  />
                </div>
              ) : props.type === "select" ? (
                <Select
                  onValueChange={(val) =>
                    handleChange(val === "__NONE__" ? undefined : String(val))
                  }
                  value={String(field.value) as string}
                  disabled={disabled}
                >
                  <SelectTrigger
                    className={`w-full rounded-md border-0 bg-background shadow-sm focus:shadow-md transition-all duration-200 ${
                      disabled ? "cursor-not-allowed disabled:opacity-100" : "cursor-text"
                    }`}
                  >
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
                    editable={!disabled}
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
