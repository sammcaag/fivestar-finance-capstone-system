"use client";
import { Input } from "@/components/ui/input";
import type { LucideIcon } from "lucide-react";
import type { UseFormReturn, FieldPath, FieldValues } from "react-hook-form";
import {
  preventInvalidInput,
  preventNegativeAndLimitDecimals,
} from "@/utils/handling-input-numbers";
import { FormFieldWrapper } from "./FormFieldWraper";

interface NumberInputFieldProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  name: FieldPath<T>;
  label: string;
  icon: LucideIcon;
  tooltip: string;
  placeholder: string;
  focusedField: string | null;
  setFocusedField: (field: string | null) => void;
  disabled?: boolean;
  min?: number;
  max?: number;
  step?: string;
  className?: string;
}

export function NumberInputField<T extends FieldValues>({
  form,
  name,
  label,
  icon,
  tooltip,
  placeholder,
  focusedField,
  setFocusedField,
  disabled = false,
  min = 0,
  max,
  step = "1000",
  className,
}: NumberInputFieldProps<T>) {
  return (
    <FormFieldWrapper
      form={form}
      name={name}
      label={label}
      icon={icon}
      tooltip={tooltip}
      focusedField={focusedField}
      setFocusedField={setFocusedField}
      disabled={disabled}
      className={className}
    >
      {({ field }) => (
        <Input
          placeholder={placeholder}
          type="number"
          min={min}
          max={max}
          step={step}
          className={`border-0 bg-transparent text-lg focus-visible:ring-0 p-0 h-auto w-full ${
            disabled ? "text-muted-foreground disabled:opacity-100" : ""
          }`}
          {...field}
          onKeyDown={preventInvalidInput}
          onChange={(e) => preventNegativeAndLimitDecimals(e, field.onChange)}
          onFocus={() => setFocusedField(name)}
          onBlur={() => setFocusedField(null)}
          disabled={disabled}
        />
      )}
    </FormFieldWrapper>
  );
}
