import { z } from "zod";

const today = new Date();
today.setHours(0, 0, 0, 0);

export const createStringField = (fieldName: string, min = 8, max = 150) =>
  z
    .string()
    .trim()
    .min(min, `${fieldName} must be at least ${min} characters`)
    .max(max, `${fieldName} must be at most ${max} characters`);

// Utility for optional text field that allows empty string
export const createOptionalStringField = (fieldName: string, min = 8, max = 150) =>
  z
    .string()
    .trim()
    .min(min, `${fieldName} must be at least ${min} characters`)
    .max(max, `${fieldName} must be at most ${max} characters`)
    .optional()
    .or(z.literal(""));

export const staffGeneralInfoSchema = z.object({
  firstName: createStringField("First name", 2, 150),
  middleName: createOptionalStringField("Middle name", 2, 150),
  lastName: createStringField("Last name", 2, 150),
  suffix: z.string().optional(),
  dateOfBirth: z.date().refine(
    (dob) => {
      // The latest allowed birthdate (today minus 18 years)
      const minDate = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());

      return dob <= minDate;
    },
    {
      message: "Client must be at least 18 years old.",
    }
  ),
  gender: z.string().refine((v) => v !== "", { message: "Gender is required" }),

  addressLine1: createStringField("Address line 1"),
  addressLine2: createOptionalStringField("Address line 2"),
  barangay: createOptionalStringField("Barangay"),
  cityOrMunicipality: createStringField("City or municipality"),
  province: createStringField("Province"),
  region: z.string().min(1, "Region is required"),
  zipCode: z
    .number()
    .int("Zip code must be an integer")
    .min(1000, "Zip code must be at least 1000")
    .max(9999, "Zip code must be 4 digits"),

  primaryContact: z
    .string()
    .min(1, "Phone number is required")
    .refine((val) => /^\+639\d{9}$/.test(val), {
      message: "Phone number must start with +639 and have 10 digits total",
    }),
  secondaryContact: z
    .string()
    .optional()
    .refine((val) => !val || /^\+639\d{9}$/.test(val), {
      message: "Phone number must start with +639 and have 10 digits total",
    }),

  religion: createStringField("Religion", 2, 150),
  civilStatus: z.string().refine((v) => v !== "", {
    message: "Civil status is required",
  }),
  branchId: z.string().min(1, "Branch is required"),
  role: z.string().min(1, "Role is required"),
  staffId: z.string().min(1, "Staff ID is required"),
  placeOfBirth: createStringField("Place of birth"),
});
