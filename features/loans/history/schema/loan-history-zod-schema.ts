import { z } from "zod";
import { LoanHistoryProductEnum } from "../types/loan-form-types";

export const createStringField = (fieldName: string, min = 8, max = 150) =>
  z
    .string()
    .trim()
    .min(min, `${fieldName} must be at least ${min} characters`)
    .max(max, `${fieldName} must be at most ${max} characters`);

export const loanHistorySchema = z.object({
  id: z.number().optional(),
  dedCode: z.string().min(1, "Deduction code is required"),
  productType: z.nativeEnum(LoanHistoryProductEnum),

  monthlyAmortization: z.number().min(1000, "Monthly amortization is atleast 1000"),
  term: z.number().min(1, "Term is required"),

  valueDate: z.date().refine((d) => d instanceof Date && !isNaN(d.getTime()), {
    message: "Value date is required",
  }),

  maturityDate: z.date().refine((d) => d instanceof Date && !isNaN(d.getTime()), {
    message: "Maturity date is required",
  }),

  settedMaturityDate: z
    .date()
    .optional()
    .refine((d) => !d || !isNaN(d.getTime()), {
      message: "Invalid setted maturity date",
    }),

  accountNumber: z
    .string()
    .trim()
    .min(10, "Account number must be at least 10 digits")
    .max(16, "Account number cannot exceed 16 digits")
    .regex(/^\d+$/, "Account number must contain only digits")
    .optional(),

  pnNumber: createStringField("PN number", 5, 150),
  purpose: createStringField("Purpose", 5, 150),

  outstandingBalance: z.number().optional(),
  otherDeduction: z.number().optional(),

  processor1Id: z.string().min(1, "Processor 1 is required"),
  processor2Id: z.string().min(1, "Processor 2 is required"),
  contactedById: z.string().min(1, "Contacted by is required"),
});
