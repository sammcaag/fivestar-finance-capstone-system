import { uploadAttachment } from "@/services/upload-attachment";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  LoanAttachmentsResolver,
  LoanAttachmentsSchema,
  loanAttachmentsFormDefaults,
} from "../schema/loan-attachments-schema";
import { useCreateClientAttachment } from "./use-create-client-attachment";

export const useAttachmentForm = (userId: number | null | undefined, serialNumber: string) => {
  const attachmentForm = useForm<LoanAttachmentsSchema>({
    resolver: LoanAttachmentsResolver,
    defaultValues: loanAttachmentsFormDefaults,
  });
  const createAttachment = useCreateClientAttachment();
  const queryClient = useQueryClient();
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data: LoanAttachmentsSchema) => {
    try {
      setIsLoading(true);

      const uploadResult = await uploadAttachment(data.attachment, setProgress);
      if (uploadResult.success === false) {
        return;
      }
      if (uploadResult.data && userId) {
        await createAttachment.mutateAsync(
          {
            userId: userId, // TODO: Get actual user ID
            payload: {
              ...uploadResult.data,
              title: data.attachmentType ? data.attachmentType : "",
              mimeType: data.attachment ? data.attachment.type : "",
            },
          },
          {
            // Optional: re-fetch user's attachments list after creating one
            onSuccess: () => {
              queryClient.invalidateQueries({ queryKey: ["clientBySerialNumber", serialNumber] });
            },

            // Optional: easier UI error handling
            onError: (error) => {
              console.error("Attachment creation failed:", error);
            },
          }
        );
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    attachmentForm,
    onSubmit,
    progress,
    isLoading,
  };
};
