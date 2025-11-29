import { z } from "zod";
import { AuthFormValues } from "../types/auth.types";

const allowedDomains = new Set(["fsfi.com.ph", "gmail.com"]);

export const loginSchema = z.object({
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
  password: z
    .string()
    .min(8, "Password must at least 8 characters")
    .max(30, "Password must be at maximum 30 characters"),
});

export type LoginSchema = z.infer<typeof loginSchema>;

export const defaultValues: AuthFormValues = {
  email: "",
  password: "",
};
