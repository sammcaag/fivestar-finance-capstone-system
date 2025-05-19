import { z } from "zod";

const today = new Date(); // Get current date
today.setHours(0, 0, 0, 0); // Normalize to avoid time mismatches

// Step 1: Client General Information Schema
export const clientGeneralInfoSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  middleName: z.string().optional(),
  lastName: z.string().min(1, "Last name is required"),
  suffix: z.string().optional(),
  dateOfBirth: z.date(),
  gender: z
    .string()
    .refine((val) => val !== "", { message: "Gender is required" }),
  address: z.string().min(1, "Address is required"),
  contactNumber: z
    .string()
    .min(1, "Phone number is required")
    .refine((val) => /^\+639\d{9}$/.test(val), {
      message: "Phone number must start with 9 and have 10 digits total",
    }),
  alternativeContactNumber: z
    .string()
    .refine((val) => /^\+639\d{9}$/.test(val), {
      message: "Phone number must start with 9 and have 10 digits total",
    })
    .optional(),
  religion: z.string().optional(),
  civilStatus: z
    .string()
    .refine((val) => val !== "", { message: "Civil status is required" }),
  mothersMaidenName: z.string().optional(),
  placeOfBirth: z.string(),
});

// Step 2: Client's Family Information Schema
export const clientFamilyInfoSchema = z.object({
  spouseFirstName: z.string().optional(),
  spouseMiddleName: z.string().optional(),
  spouseLastName: z.string().optional(),
  spouseDateOfBirth: z.date().optional(),
  spouseAddress: z.string().optional(),
  spouseContactNumber: z
    .string()
    .optional()
    .refine((val) => !val || /^\+639\d{9}$/.test(val), {
      message:
        "Spouse contact number must start with +63 9 and have 12 digits total if provided",
    }),
  firstChildName: z.string().optional(),
  firstChildDateOfBirth: z.date().optional(),
  secondChildName: z.string().optional(),
  secondChildDateOfBirth: z.date().optional(),
});

// Step 3: Pensioner's Information Schema
export const pensionerInfoSchema = z.object({
  rank: z.string().min(1, "Rank is required"),
  pensionType: z.string().min(1, "Pension type is required"),
  serialNumber: z.number().min(0, "Serial number must be greater than 0"),
  idNumber: z.number().min(1, "ID number is required"),
  dateEnteredService: z.date().refine((date) => date < today, {
    message: "Date entered service must not be the current date",
  }),
  dateSeparationService: z.date().refine((date) => date < today, {
    message: "Date separation service must not be the current date",
  }),
  dateRetiredService: z.date().refine((date) => date < today, {
    message: "Date retired service must not be the current date",
  }),
  lengthOfService: z
    .number()
    .min(1, "Length of service must be greater than 0"),
  lastUnitAssigned: z.string().optional(),
  branchOfService: z.string().optional(),
});

// Step 4: Account's Information Schema
export const accountInfoSchema = z.object({
  accountNumber: z.number().min(1, "Account number is required"),
  monthlyPension: z.number().min(1, "Monthly pension is required"),
  monthlyDeduction: z.number().min(1, "Monthly deduction is required"),
  atmAccountNumber: z.number().min(1, "ATM account number is required"),
  bankName: z.string().min(1, "Bank name is required"),
  branchOfBank: z.string().min(1, "Branch of bank is required"),
});

// Combined schema for the entire form
export const clientFormSchema = z.object({
  ...clientGeneralInfoSchema.shape,
  ...clientFamilyInfoSchema.shape,
  ...pensionerInfoSchema.shape,
  ...accountInfoSchema.shape,
});

export type ClientFormValues = z.infer<typeof clientFormSchema>;
