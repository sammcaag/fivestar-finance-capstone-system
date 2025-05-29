"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { LucideIcon } from "lucide-react";
import type { UseFormReturn, FieldPath, FieldValues } from "react-hook-form";
import { FormFieldWrapper } from "./FormFieldWraper";

interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

interface SelectFieldProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  name: FieldPath<T>;
  label: string;
  icon: LucideIcon;
  tooltip: string;
  placeholder: string;
  options: SelectOption[];
  focusedField: string | null;
  setFocusedField: (field: string | null) => void;
  disabled?: boolean;
  className?: string;
}

export function SelectField<T extends FieldValues>({
  form,
  name,
  label,
  icon,
  tooltip,
  placeholder,
  options,
  focusedField,
  setFocusedField,
  disabled = false,
  className,
}: SelectFieldProps<T>) {
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
        <Select
          onValueChange={(value) => field.onChange(Number(value))}
          defaultValue={field.value ? String(field.value) : ""}
          onOpenChange={(open) => {
            if (open) setFocusedField(name);
            else setFocusedField(null);
          }}
          disabled={disabled}
        >
          <SelectTrigger className="border-0 bg-transparent text-lg focus:ring-0 p-0 h-auto shadow-none w-full">
            <SelectValue
              placeholder={placeholder}
              className={field.value === 0 ? "text-muted-foreground" : ""}
            />
          </SelectTrigger>
          <SelectContent>
            {options.map((option) => (
              <SelectItem
                key={option.value}
                value={option.value}
                disabled={option.disabled}
                className={option.disabled ? "text-muted-foreground" : ""}
              >
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
    </FormFieldWrapper>
  );
}
