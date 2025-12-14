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

const allowedDomains = new Set(["fsfi.com.ph", "gmail.com"]);

export const branchInfoSchema = z.object({
  name: createStringField("Name", 3, 150),
  email: z
    .string()
    .email("Invalid email address")
    .refine(
      (e) => {
        const domain = e.split("@")[1]?.toLowerCase();
        return domain ? allowedDomains.has(domain) : false;
      },
      { message: "Email domain is not allowed" }
    ),

  addressLine1: createStringField("Address line 1", 4, 150),
  addressLine2: createOptionalStringField("Address line 2", 4, 150),
  barangay: createOptionalStringField("Barangay", 4, 150),
  cityOrMunicipality: createStringField("City or municipality", 4, 150),
  province: createStringField("Province", 4, 150),
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
});
