import { z } from "zod";

export const regularCalculatorChecker = z.object({
  term: z.number().min(12, "Term must be greater than or equal to 12 months"),
  monthlyAmortization: z
    .number()
    .min(1000, "Monthly Amortization must be greater than or equal to 1,000")
    .max(32000, "Monthly Amortization must not exceed to 32,000"),
  outstandingBalance: z
    .number()
    .min(0, "Outstanding balance must be at least 0"),
  otherDeduction: z.number().min(0, "Other deduction must be at least 0"),
});

export const extensionCalculatorChecker = z.object({
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
