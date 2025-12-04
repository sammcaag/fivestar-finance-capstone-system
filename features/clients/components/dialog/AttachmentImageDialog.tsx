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
import Image from "next/image";
import React from "react";

export default function AttachmentImageDialog({
  children,
  imgUrl,
}: {
  children: React.ReactNode;
  imgUrl: string;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-h-[85vh] max-w-3xl">
        <DialogHeader>
          <DialogTitle>Attachment Image</DialogTitle>
          <DialogDescription>View the attachment image in a larger size.</DialogDescription>
        </DialogHeader>
        <Image
          src={imgUrl}
          alt="Attachment Image"
          width={500}
          height={500}
          className="w-full h-full object-cover bg-gray-100 rounded-md"
        />
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
