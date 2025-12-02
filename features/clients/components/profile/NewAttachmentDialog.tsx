import { FormFieldWrapper } from "@/components/FormFieldWrapper";
import SingleAttachmentUploadComp from "@/components/SingleAttachmentUploadComp";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Form, FormField } from "@/components/ui/form";
import { useAttachmentForm } from "@/features/loans/hooks/use-attachment-form";
import React from "react";

const attachmentsTitle: { value: string; label: string }[] = [
  { value: "Selfie Photo", label: "Selfie Photo" },
  { value: "ATM Photo", label: "ATM Photo" },
  { value: "Valid ID 1", label: "Valid ID 1" },
  { value: "Valid ID 2", label: "Valid ID 2" },
  { value: "Retiree ID", label: "Retiree ID" },
  { value: "Retiree Order", label: "Retiree Order" },
  { value: "Beneficiary ID", label: "Beneficiary ID" },
  { value: "Declaration of Beneficiary", label: "Declaration of Beneficiary" },
  { value: "Retirement Order or Postumos", label: "Retirement Order or Postumos" },
  { value: "Marriage Certificate", label: "Marriage Certificate" },
];

export default function NewAttachmentDialog({
  children,
  userId,
  serialNumber,
}: {
  children: React.ReactNode;
  userId: number | null | undefined;
  serialNumber: string;
}) {
  const { attachmentForm, onSubmit, progress, isLoading } = useAttachmentForm(userId, serialNumber);
  const { control, handleSubmit } = attachmentForm;

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="flex flex-col max-w-3xl bg-white">
        <DialogHeader className="max-h-fit mb-4">
          <DialogTitle>Upload New Attachment</DialogTitle>
          <DialogDescription>Upload a new attachment for the client</DialogDescription>
        </DialogHeader>
        <Form {...attachmentForm}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormFieldWrapper
              name="attachmentType"
              control={control}
              label="Attachment Type"
              required
              type="select"
              options={attachmentsTitle}
              placeholder="Select Attachment Type"
            />
            <FormField
              name="attachment"
              control={control}
              render={({ field }) => <SingleAttachmentUploadComp {...field} progress={progress} />}
            />
            <DialogFooter className="mt-8">
              <Button type="button" variant="outline" disabled={isLoading}>
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Saving..." : "Confirm"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
