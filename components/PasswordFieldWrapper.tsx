"use client";

import { useState } from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";
import { Control, FieldValues, FieldPath } from "react-hook-form";
import { cn } from "@/lib/utils";

interface PasswordFieldProps<T extends FieldValues> {
  name: FieldPath<T>;
  control: Control<T>;
  label: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  formItemClassName?: string;
  inputClassName?: string;
}

export function PasswordFieldWrapper<T extends FieldValues>({
  name,
  control,
  label,
  placeholder = "••••••••",
  required = false,
  disabled = false,
  formItemClassName,
  inputClassName,
}: PasswordFieldProps<T>) {
  const [show, setShow] = useState(false);

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
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
            <div className="relative">
              <Input
                {...field}
                type={show ? "text" : "password"}
                placeholder={placeholder}
                disabled={disabled}
                className={cn(
                  "rounded-md border-0 bg-background shadow-sm focus:shadow-md transition-all duration-200 pr-10",
                  disabled
                    ? "cursor-not-allowed disabled:opacity-100"
                    : "cursor-text",
                  inputClassName
                )}
              />

              <button
                type="button"
                onClick={() => setShow((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                tabIndex={-1}
              >
                {show ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </FormControl>

          <div className="min-h-[20px]">
            <FormMessage />
          </div>
        </FormItem>
      )}
    />
  );
}
