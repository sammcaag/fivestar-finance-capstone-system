"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Control, FieldValues, FieldPath, PathValue } from "react-hook-form";
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

// Discriminated union — fully type-safe
// type FieldType = "input" | "select" | "custom";

interface BaseProps<T extends FieldValues> {
  name: FieldPath<T>;
  control: Control<T>;
  label: string;
  required?: boolean;
  formItemClassName?: string;
}

// Input field with optional left icon
interface InputFieldProps<T extends FieldValues> extends BaseProps<T> {
  type: "input";
  placeholder?: string;
  leftIcon?: LucideIcon;
  inputClassName?: string;
  iconClassName?: string;
}

// Select field
interface SelectFieldProps<T extends FieldValues> extends BaseProps<T> {
  type: "select";
  options: { value: string; label: string }[];
  placeholder?: string;
}

// Custom field (DatePicker, PhoneInput, etc.)
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
  | CustomFieldProps<T>;

export function FormFieldWrapper<T extends FieldValues>(
  props: FormFieldWrapperProps<T>
) {
  const { name, control, label, required = false, formItemClassName } = props;

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem
          className={cn("w-full min-h-[80px] flex flex-col", formItemClassName)}
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
                  {...field}
                  value={field.value ?? ""}
                />
              </div>
            ) : props.type === "select" ? (
              <Select
                onValueChange={field.onChange}
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
            ) : (
              // Custom field — pass field value & onChange directly
              <>{props.children(field)}</>
            )}
          </FormControl>

          <div className="min-h-[20px]">
            <FormMessage />
          </div>
        </FormItem>
      )}
    />
  );
}
