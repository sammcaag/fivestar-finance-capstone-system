import { z } from "zod";

const allowedDomains = new Set(["fsfi.com.ph", "gmail.com"]);

export const securityAuthSchema = z
  .object({
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
    oldPassword: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(30, "Password must be at most 30 characters"),
    newPassword: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(30, "Password must be at most 30 characters"),
    confirmNewPassword: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(30, "Password must be at most 30 characters"),
  })
  .superRefine((data, ctx) => {
    const { oldPassword, newPassword, confirmNewPassword } = data;

    // New password must not be same as old password
    if (newPassword === oldPassword) {
      ctx.addIssue({
        path: ["newPassword"],
        code: z.ZodIssueCode.custom,
        message: "New password must not be the same as the old password",
      });
    }

    if (confirmNewPassword === oldPassword) {
      ctx.addIssue({
        path: ["confirmNewPassword"],
        code: z.ZodIssueCode.custom,
        message: "Confirm password must not be the same as the old password",
      });
    }

    // confirmNewPassword must match newPassword
    if (confirmNewPassword !== newPassword) {
      ctx.addIssue({
        path: ["confirmNewPassword"],
        code: z.ZodIssueCode.custom,
        message: "Passwords do not match",
      });
    }
  });
