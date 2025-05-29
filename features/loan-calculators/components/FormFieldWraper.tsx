"use client";
import type { ReactNode } from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { CustomTooltip } from "@/components/CustomTooltip";
import type { LucideIcon } from "lucide-react";
import type {
  UseFormReturn,
  FieldPath,
  FieldValues,
  ControllerRenderProps,
} from "react-hook-form";

interface FormFieldWrapperProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  name: FieldPath<T>;
  label: string;
  icon: LucideIcon;
  tooltip: string;
  children:
    | ReactNode
    | ((props: {
        field: ControllerRenderProps<T, FieldPath<T>>;
        setFocusedField: (field: string | null) => void;
        focusedField: string | null;
        disabled: boolean;
      }) => ReactNode);
  focusedField: string | null;
  setFocusedField: (field: string | null) => void;
  disabled?: boolean;
  className?: string;
}

export function FormFieldWrapper<T extends FieldValues>({
  form,
  name,
  label,
  icon: Icon,
  tooltip,
  children,
  focusedField,
  setFocusedField,
  disabled = false,
  className = "",
}: FormFieldWrapperProps<T>) {
  const hasError = !!form.formState.errors[name];
  const isFocused = focusedField === name;

  const getBorderClass = () => {
    if (isFocused) return "ring-2 ring-blue-200 border-blue-300";
    if (hasError) return "ring-2 ring-red-200 border-red-300";
    return "border-gray-200 dark:border-gray-800";
  };

  const getIconColor = () => {
    if (hasError) return "text-red-500";
    if (disabled) return "text-muted-foreground";
    return "text-blue-500";
  };

  const getLabelColor = () => {
    if (disabled) return "text-muted-foreground";
    return "";
  };

  return (
    <FormField
      control={form.control}
      name={name}
      render={({
        field,
      }: {
        field: ControllerRenderProps<T, FieldPath<T>>;
      }) => (
        <FormItem
          className={`overflow-hidden rounded-lg border ${getBorderClass()} ${
            disabled
              ? "bg-gray-50 dark:bg-gray-900/50"
              : "bg-white dark:bg-gray-950"
          } transition-all duration-200 shadow-sm ${className}`}
        >
          <div className="p-4">
            <div className="flex items-center justify-between mb-2">
              <FormLabel
                className={`text-base font-medium flex items-center ${getLabelColor()}`}
              >
                <Icon className={`h-4 w-4 mr-2 ${getIconColor()}`} />
                {label}
              </FormLabel>
              <CustomTooltip
                icon={Icon}
                description={tooltip}
                iconClassName={getIconColor()}
              />
            </div>
            <FormControl>
              {typeof children === "function"
                ? children({ field, setFocusedField, focusedField, disabled })
                : children}
            </FormControl>
          </div>
          <div className="px-4 pb-3">
            <FormMessage />
          </div>
        </FormItem>
      )}
    />
  );
}
