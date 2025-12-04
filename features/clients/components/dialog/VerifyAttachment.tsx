import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  useUnverifyAttachment,
  useVerifyAttachment,
} from "@/features/loans/hooks/use-attachment-mutations";
import { useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { toast } from "sonner";

export default function VerifyAttachment({
  children,
  attachmentId,
  serialNumber,
  isVerified,
}: {
  children: React.ReactNode;
  attachmentId: string;
  serialNumber: string;
  isVerified: boolean;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const verifyAttachment = useVerifyAttachment();
  const unverifyAttachment = useUnverifyAttachment();
  const queryToUse = isVerified ? unverifyAttachment : verifyAttachment;
  const queryClient = useQueryClient();
  const handleVerify = () => {
    try {
      setIsLoading(true);
      queryToUse.mutateAsync(
        {
          attachmentId: attachmentId,
        },
        {
          // Optional: re-fetch user's attachments list after creating one
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["clientBySerialNumber", serialNumber] });
            toast.success("Attachment verified successfully");
          },

          // Optional: easier UI error handling
          onError: (error) => {
            console.error("Attachment creation failed:", error);
            toast.error("Attachment verification failed");
          },
        }
      );
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
      setOpen(false);
    }
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Verify Attachment</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          {isVerified
            ? "Are you sure you want to unverify this attachment?"
            : "Are you sure you want to verify this attachment?"}
        </DialogDescription>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button onClick={handleVerify} disabled={isLoading}>
            {isLoading ? "Loading..." : isVerified ? "Unverify" : "Verify"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
