import { uploadAttachment } from "@/services/upload-attachment";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import {
  LoanAttachmentsResolver,
  LoanAttachmentsSchema,
  loanAttachmentsFormDefaults,
} from "../schema/loan-attachments-schema";
import { useCreateClientAttachment, useUpdateProfileImage } from "./use-attachment-mutations";

export const useAttachmentForm = (userId: number | null | undefined, serialNumber: string) => {
  const attachmentForm = useForm<LoanAttachmentsSchema>({
    resolver: LoanAttachmentsResolver,
    defaultValues: loanAttachmentsFormDefaults,
  });
  const { reset } = attachmentForm;
  const createAttachment = useCreateClientAttachment();
  const updateProfileImage = useUpdateProfileImage();
  const queryClient = useQueryClient();
  const [progress, setProgress] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data: LoanAttachmentsSchema) => {
    try {
      setIsLoading(true);
      const attachmentType = data.attachmentType;

      const uploadResult = await uploadAttachment(data.attachment, setProgress);
      if (uploadResult.success === false) {
        return;
      }
      if (attachmentType === "Selfie Photo" && uploadResult.data && userId) {
        const profileImageSecureUrl = uploadResult.data.secure_url;
        await updateProfileImage.mutateAsync(
          {
            userId: userId,
            secureUrl: profileImageSecureUrl,
          },
          {
            onSuccess: () => toast.success("Profile image updated successfully"),
            onError: () => toast.error("Profile image update failed"),
          }
        );
        ;
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
              reset();
              setIsOpen(false);
              toast.success("Attachment created successfully");
            },

            // Optional: easier UI error handling
            onError: (error) => {
              console.error("Attachment creation failed:", error);
              toast.error("Attachment creation failed");
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
    isOpen,
    setIsOpen,
  };
};
