import { z } from "zod";

const allowedDomains = new Set(["fsfi.com.ph", "gmail.com"]);

export const branchInfoSchema = z.object({
  name: z.string().min(1, "First name is required"),
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

  addressLine1: z.string().min(1, "Address line 1 is required"),
  addressLine2: z.string().optional(),
  barangay: z.string().optional(),
  cityOrMunicipality: z.string().min(1, "City or municipality is required"),
  province: z.string().min(1, "Province is required"),
  region: z.string().min(1, "Region is required"),
  zipCode: z.number().min(1, "Zip code is required"),

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
