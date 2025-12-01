import { CustomTooltip } from "@/components/CustomTooltip";
import { RegularCalculatorSchema } from "../schema/loan-regular-schema";
import { FormItem, FormLabel } from "@/components/ui/form";
import { Info } from "lucide-react";
import { FormValues as FormValuesExtension } from "../types/types-extension";

export const FORM_STYLES = {
  container: "overflow-hidden rounded-lg border bg-card transition-all duration-200 shadow-sm",
  input: "border-0 bg-background text-lg focus-visible:ring-0 p-2 h-auto w-full",
  selectTrigger:
    "border-0 bg-background text-md focus-visible:ring-0 p-2 h-auto shadow-none w-full",
  label: "text-base font-medium flex items-center",
  icon: "h-4 w-4 mr-2",
  padding: "p-4",
  messagePadding: "px-4 pb-3",
} as const;

export const COLORS = {
  blue: "text-blue-500",
  red: "text-red-500",
  muted: "text-muted-foreground",
  focus: "ring-2 ring-blue-200 border-blue-300",
  error: "ring-2 ring-red-200 border-red-300",
  default: "border-gray-200 dark:border-gray-800",
  disabled: "bg-gray-50 dark:bg-gray-900/50 cursor-not-allowed",
} as const;

export const formItemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  },
};

export const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

interface FormFieldWrapperProps {
  fieldName: keyof RegularCalculatorSchema | keyof FormValuesExtension;
  focusedField: string | null;
  hasError?: boolean;
  isDisabled?: boolean;
  children: React.ReactNode;
}

export function FormFieldWrapper({
  fieldName,
  focusedField,
  hasError,
  isDisabled = false,
  children,
}: FormFieldWrapperProps) {
  const getBorderClass = () => {
    if (focusedField === fieldName) return COLORS.focus;
    if (hasError) return COLORS.error;
    return COLORS.default;
  };

  const getBackgroundClass = () => {
    return isDisabled ? COLORS.disabled : "bg-card";
  };

  return (
    <FormItem className={`${FORM_STYLES.container} ${getBorderClass()} ${getBackgroundClass()}`}>
      {children}
    </FormItem>
  );
}

interface FormHeaderProps {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  tooltip: string;
  hasError?: boolean;
  isDisabled?: boolean;
  extraContent?: React.ReactNode;
}

export function FormHeader({
  icon: Icon,
  label,
  tooltip,
  hasError = false,
  isDisabled = false,
  extraContent,
}: FormHeaderProps) {
  const getIconColor = () => {
    if (hasError) return COLORS.red;
    if (isDisabled) return COLORS.muted;
    return COLORS.blue;
  };

  const getLabelColor = () => {
    return isDisabled ? COLORS.muted : "";
  };

  return (
    <div className="flex items-center justify-between mb-2">
      <FormLabel className={`${FORM_STYLES.label} ${getLabelColor()}`}>
        <Icon className={`${FORM_STYLES.icon} ${getIconColor()}`} />
        {label}
        {extraContent}
      </FormLabel>
      <CustomTooltip icon={Info} description={tooltip} iconClassName={getIconColor()} />
    </div>
  );
}
