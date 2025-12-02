"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import DeleteAttachmentDialog from "@/features/clients/components/dialog/DeleteAttachmentDialog";
import VerifyAttachment from "@/features/clients/components/dialog/VerifyAttachment";
import { UserAttachments } from "@/features/clients/types/client-types";
import { formatBytes } from "@/utils/format-bytes";
import { formatDateToReadable } from "@/utils/format-date-to-readable";
import clsx from "clsx";
import {
  Eye,
  FileClock,
  FileText,
  Loader2,
  Pencil,
  Printer,
  ShieldCheck,
  Trash2,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";

export default function AttachmentsCard({
  attachment,
  userId,
  serialNumber,
}: {
  attachment: UserAttachments;
  userId: string;
  serialNumber: string;
}) {
  const [isIframeLoading, setIsIframeLoading] = useState(false);

  const quickDetails = useMemo(
    () =>
      [
        { label: "File name", value: attachment.originalFilename },
        { label: "Format", value: attachment.format?.toUpperCase() },
        { label: "Size", value: formatBytes(attachment.bytes) },
        attachment.pages
          ? { label: "Pages", value: `${attachment.pages} page${attachment.pages > 1 ? "s" : ""}` }
          : null,
      ].filter(Boolean) as { label: string; value?: string }[],
    [attachment]
  );

  function printImage() {
    setIsIframeLoading(true);

    const iframe = document.createElement("iframe");
    iframe.style.position = "fixed";
    iframe.style.right = "0";
    iframe.style.bottom = "0";
    iframe.style.width = "0";
    iframe.style.height = "0";
    iframe.style.border = "none";

    document.body.appendChild(iframe);

    const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
    if (!iframeDoc) return;

    iframeDoc.open();
    iframeDoc.write(`
  <html>
    <head>
      <title>Print Image</title>
      <style>
        body {
          margin: 20mm;      
          display: flex;
          justify-content: center;
          align-items: flex-start;
        }

        img {
          max-width: 180mm;     
          height: auto;
          display: block;
          margin: 0 auto;
        }

        @media print {
          @page {
            size: A4;
            margin: 20mm;       
          }
        }
      </style>
    </head>
    <body>
      <img src="${attachment.secureUrl}" id="printImage">
    </body>
  </html>
`);

    iframeDoc.close();

    const img = iframeDoc.getElementById("printImage") as HTMLImageElement;

    if (!img) {
      setIsIframeLoading(false);
      return;
    }

    img.onload = () => {
      setTimeout(() => {
        iframe.contentWindow?.print();

        // AFTER printing
        setTimeout(() => {
          document.body.removeChild(iframe);
          setIsIframeLoading(false);
        }, 500);
      }, 100);
    };

    img.onerror = () => {
      alert("Failed to load image");
      document.body.removeChild(iframe);
      setIsIframeLoading(false);
    };
  }

  return (
    <Card className="border shadow-sm hover:shadow-md transition-shadow space-y-6 overflow-hidden">
      <CardHeader className="w-full h-54 p-0  rounded-t-md flex items-center justify-center overflow-hidden relative">
        <Image
          src={attachment.thumbnailUrl}
          width={400}
          height={300}
          alt={`${attachment.title} preview`}
          className="w-full h-full object-cover object-top"
        />
        <Badge
          className={clsx(
            "absolute top-3 left-3 flex items-center gap-1",
            attachment.resourceType === "pdf" ? "bg-red-100 text-red-700" : ""
          )}
        >
          <FileText className="h-3.5 w-3.5" />
          {attachment.resourceType.toUpperCase()}
        </Badge>
        {/* Status */}
        <Badge
          className={clsx(
            "absolute top-3 right-3 flex items-center gap-1",
            attachment.isVerified
              ? "bg-emerald-100 text-emerald-700"
              : "bg-amber-100 text-amber-700"
          )}
        >
          <FileClock className="h-3.5 w-3.5" />
          {attachment.isVerified ? "Verified" : "Not Verified"}
        </Badge>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="mb-2">
          <CardTitle className="font-semibold text-lg leading-tight">{attachment.title}</CardTitle>
          <CardDescription className="text-sm text-muted-foreground">
            Uploaded on {formatDateToReadable(attachment.uploadedAt)}
          </CardDescription>
        </div>

        {attachment.description && (
          <p className="text-sm text-muted-foreground leading-relaxed">{attachment.description}</p>
        )}

        <VerifyAttachment
          attachmentId={attachment.id}
          serialNumber={serialNumber}
          isVerified={attachment.isVerified || false}
        >
          <Button
            variant="outline"
            type="button"
            icon={attachment.isVerified ? ShieldCheck : Pencil}
            iconPlacement="left"
            className={
              attachment.isVerified
                ? "text-emerald-700 bg-emerald-50 border-emerald-600"
                : "text-amber-700 bg-amber-50 border-amber-600"
            }
          >
            {attachment.isVerified ? "Verified" : "Verify Attachment"}
          </Button>
        </VerifyAttachment>
        <div className="rounded-md border /30 p-3">
          <dl className="space-y-3">
            {quickDetails.map((detail, index) => (
              <div key={detail.label} className="text-sm">
                <div className="flex items-center justify-between">
                  <dt className="text-muted-foreground flex-1/3">{detail.label}</dt>
                  <dd className="font-medium text-right text-foreground flex-2/3 truncate">
                    {detail.value}
                  </dd>
                </div>
                {index < quickDetails.length - 1 && <Separator className="mt-2" />}
              </div>
            ))}
          </dl>
        </div>

        <div className="grid sm:grid-cols-2 gap-2 mt-4">
          <Button asChild variant="outline" disabled={isIframeLoading} className="flex-1">
            <Link href={attachment.secureUrl} target="_blank" rel="noreferrer">
              <Eye className="h-4 w-4" />
              View
            </Link>
          </Button>

          <Button
            icon={isIframeLoading ? Loader2 : Printer}
            iconPlacement="left"
            onClick={printImage}
            className="flex-1 hover:cursor-pointer"
            disabled={isIframeLoading}
          >
            {isIframeLoading ? "Loading..." : "Print"}
          </Button>
          <Button
            variant="secondary"
            icon={Pencil}
            iconPlacement="left"
            className="flex-1 min-w-[140px]"
            type="button"
          >
            Edit
          </Button>
          <DeleteAttachmentDialog
            attachmentId={attachment.id}
            serialNumber={serialNumber}
            publicId={attachment.publicId}
          >
            <Button
              variant="destructive"
              icon={Trash2}
              iconPlacement="left"
              className="flex-1 min-w-[140px]"
              type="button"
            >
              Delete
            </Button>
          </DeleteAttachmentDialog>
        </div>
      </CardContent>
    </Card>
  );
}
