import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

export const regularCalculatorSchema = z.object({
  term: z.number().min(12, "Term must be greater than or equal to 12 months"),
  monthlyAmortization: z
    .number()
    .min(1000, "Monthly Amortization must be greater than or equal to 1,000")
    .max(32000, "Monthly Amortization must not exceed to 32,000"),
  outstandingBalance: z
    .number()
    .min(0, "Outstanding balance must be at least 0"),
  otherDeduction: z.number().min(0, "Other deduction must be at least 0"),
  remainingMonths: z.number().min(0, "Remaining months must be at least 0"),
});

// zod resolver
export const regularCalculatorResolver = zodResolver(regularCalculatorSchema);

// type
export type RegularCalculatorSchema = z.infer<typeof regularCalculatorSchema>;

// default values
export const regularCalculatorDefaultValues = {
  term: 0,
  monthlyAmortization: 0,
  outstandingBalance: 0,
  otherDeduction: 0,
  remainingMonths: 0,
};
