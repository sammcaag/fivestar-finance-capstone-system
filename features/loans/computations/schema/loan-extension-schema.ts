import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

export const extensionCalculatorSchema = z.object({
  monthlyAmortization: z
    .number()
    .min(1000, "Monthly Amortization must be greater than or equal to 1,000"),
  term: z
    .number()
    .min(6, "Term must not lower than 6 months")
    .max(25, "Term must not exceed to 25 months"),
  settedMaturityDate: z.date().refine((date) => {
    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth(); // 0-based index (0 = Jan, 1 = Feb, etc.)

    return (
      date.getFullYear() > currentYear ||
      (date.getFullYear() === currentYear && date.getMonth() >= currentMonth)
    );
  }, "Maturity Date cannot be from a previous month."),
  settedOutstandingBalance: z
    .number()
    .min(0, "Outstanding balance must be at least 0"),
  otherDeduction: z.number().min(0, "Other deduction must be at least 0"),
});

// zod resolver
export const extensionCalculatorResolver = zodResolver(extensionCalculatorSchema);

// type
export type ExtensionCalculatorSchema = z.infer<typeof extensionCalculatorSchema>;

// default values
export const extensionCalculatorDefaultValues = {
  monthlyAmortization: 0,
  term: 0,
  settedMaturityDate: new Date(),
  settedOutstandingBalance: 0,
  otherDeduction: 0,
};
