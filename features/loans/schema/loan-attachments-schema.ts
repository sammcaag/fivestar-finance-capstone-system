import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { attachmentsTitle, validIds } from "../data/valid-ids";

const FileSchema = z.instanceof(File);

const attachmentsSchema = z
  .object({
    // Identity Verification
    attachmentType: z
      .enum(attachmentsTitle, {
        errorMap: () => ({ message: "Please select attachment type." }),
      })
      .nullable(),
    validIdLabel: z
      .enum(validIds, { errorMap: () => ({ message: "Please select valid ID type." }) })
      .optional(),
    attachment: FileSchema.nullable(),
  })
  .superRefine((data, ctx) => {
    if (data.attachmentType === null) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Please select attachment type.",
        path: ["attachmentType"],
      });
    }
    if (data.attachment === null) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Please upload a file.",
        path: ["attachment"],
      });
    }
  });

export type LoanAttachmentsSchema = z.infer<typeof attachmentsSchema>;

export const LoanAttachmentsResolver = zodResolver(attachmentsSchema);

export const loanAttachmentsFormDefaults: LoanAttachmentsSchema = {
  attachmentType: null,
  attachment: null,
};
