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
import { useDeleteAttachment } from "@/features/loans/hooks/use-attachment-mutations";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

export default function DeleteAttachmentDialog({
  children,
  attachmentId,
  serialNumber,
  publicId,
}: {
  children: React.ReactNode;
  attachmentId: string;
  serialNumber: string;
  publicId: string;
}) {
  const deleteAttachment = useDeleteAttachment();
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async () => {
    try {
      setIsLoading(true);
      await deleteAttachment.mutateAsync(
        { attachmentId, publicId },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["clientBySerialNumber", serialNumber] });
          },
          onError: (error) => {
            console.error("Attachment deletion failed:", error);
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
          <DialogTitle>Delete Attachment</DialogTitle>
        </DialogHeader>
        <DialogDescription>Are you sure you want to delete this attachment?</DialogDescription>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button onClick={handleDelete} disabled={isLoading} variant="destructive">
            {isLoading ? "Loading..." : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
