import { z } from "zod";
import { StaffRolesEnum } from "../types/staff-types";

export const staffGeneralInfoSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  middleName: z.string().optional(),
  lastName: z.string().min(1, "Last name is required"),
  suffix: z.string().optional(),
  dateOfBirth: z.date(),
  gender: z.string().refine((v) => v !== "", { message: "Gender is required" }),

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

  religion: z.string().min(1, "Religion is required"),
  civilStatus: z.string().refine((v) => v !== "", {
    message: "Civil status is required",
  }),
  occupation: z.string().min(1, "Occupation is required"),
  role: z.nativeEnum(StaffRolesEnum, { required_error: "Role is required" }),
  staffId: z.string().min(1, "Staff ID is required"),
  placeOfBirth: z.string().min(1, "Place of birth is required"),
});
