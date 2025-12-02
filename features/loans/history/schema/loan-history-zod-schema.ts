import { z } from "zod";
import { LoanHistoryProductEnum } from "../types/loan-form-types";

export const loanHistorySchema = z.object({
  id: z.number().optional(),
  dedCode: z.string().min(1, "Deduction code is required"),
  productType: z.nativeEnum(LoanHistoryProductEnum),

  monthlyAmortization: z.number().min(1, "Monthly amortization is required"),
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

  accountNumber: z.string().optional(),
  pnNumber: z.string().min(1, "PN number is required"),

  outstandingBalance: z.number().optional(),
  otherDeduction: z.number().optional(),

  processor1Id: z.number().min(1, "Processor 1 is required"),
  processor2Id: z.number().min(1, "Processor 2 is required"),
  contactedById: z.number().min(1, "Contacted by is required"),
});
