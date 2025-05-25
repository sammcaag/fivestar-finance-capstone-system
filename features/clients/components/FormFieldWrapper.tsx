"use client";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import type { ReactNode } from "react";
import type {
  Control,
  ControllerRenderProps,
  FieldPath,
  FieldValues,
} from "react-hook-form";

interface FormFieldWrapperProps<T extends FieldValues> {
  control: Control<T>;
  name: FieldPath<T>;
  label: string | ReactNode;
  children:
    | ReactNode
    | ((field: ControllerRenderProps<T, FieldPath<T>>) => ReactNode);
  required?: boolean;
  className?: string;
  minHeight?: string;
}

export function FormFieldWrapper<T extends FieldValues>({
  control,
  name,
  label,
  children,
  required = false,
  className = "w-full min-h-[80px] flex flex-col",
  minHeight = "min-h-[20px]",
}: FormFieldWrapperProps<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          <FormLabel className="text-foreground font-medium">
            {label}
            {required && <span className="text-destructive"> *</span>}
          </FormLabel>
          <FormControl>
            {typeof children === "function" ? children(field) : children}
          </FormControl>
          <div className={minHeight}>
            <FormMessage />
          </div>
        </FormItem>
      )}
    />
  );
}
