"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useFileUpload } from "@/hooks/use-file-upload";
import { formatFileSize } from "@/utils/format-file-size";
import { AlertCircleIcon, CheckCircleIcon, ImageIcon, UploadIcon, XIcon } from "lucide-react";
import Image from "next/image";
import { useEffect, useMemo } from "react";
import { Progress } from "./ui/progress";

type ImageUploadCompProps = {
  value?: File | null; // Single file for react-hook-form
  onChange: (file: File | null) => void; // Callback to parent
  cloudinaryUrl?: string;
  error?: string; // Error message from react-hook-form
  shouldReset?: boolean;
  progress?: number;
  isUpdate?: boolean;
};

export default function SingleAttachmentUploadComp({
  value,
  onChange,
  cloudinaryUrl,
  error,
  shouldReset,
  progress,
  isUpdate = false,
}: ImageUploadCompProps) {
  const maxSizeMB = 2;
  const maxSize = maxSizeMB * 1024 * 1024;

  const [
    { files, isDragging, errors: fileUploadErrors },
    {
      handleDragEnter,
      handleDragLeave,
      handleDragOver,
      handleDrop,
      openFileDialog,
      removeFile,
      getInputProps,
    },
  ] = useFileUpload({
    accept: "image/svg+xml,image/png,image/jpeg,image/jpg,image/gif,image/webp, 'application/pdf'",
    maxSize,
    initialFiles: isUpdate
      ? [
          {
            name: "Old Image",
            size: 0,
            type: "image/jpeg",
            url: cloudinaryUrl || "",
            id: "old-image",
          },
        ]
      : undefined,
  });

  // Reset internal files when shouldReset is true
  useEffect(() => {
    if (shouldReset && files.length > 0) {
      files.forEach((file) => removeFile(file.id));
    }
  }, [shouldReset, files, removeFile]);

  // Effect to sync with react-hook-form - only when internal files change
  useEffect(() => {
    if (files.length > 0 && files[0].file instanceof File) {
      onChange(files[0].file);
    } else if (files.length === 0) {
      // Always clear when internal files are empty, regardless of external value
      onChange(null);
    }
  }, [files, onChange]);

  // Use the value from react-hook-form as the source of truth
  const currentFile = value || files[0]?.file;
  const fileName = currentFile?.name || null;

  // Create preview URL - prioritize external value
  const previewUrl = useMemo(() => {
    // Case 1: If value is a File (like from input)
    if (value instanceof File) {
      return URL.createObjectURL(value);
    }

    // Case 2: Fallback to files[0]?.preview (e.g. from file drop library)
    return files[0]?.preview || null;
  }, [value, files]);

  return (
    <div className="flex flex-col gap-2">
      <div className="relative">
        {/* Drop area */}
        <div
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          data-dragging={isDragging || undefined}
          className="border-input data-[dragging=true]:bg-accent/50 has-[input:focus]:border-ring has-[input:focus]:ring-ring/50 relative flex min-h-96 flex-col items-center justify-center overflow-hidden rounded-xl border-2 border-dashed hover:border-muted-foreground p-4 transition-colors has-[input:focus]:ring-[3px]"
        >
          <Input {...getInputProps()} className="sr-only" aria-label="Upload attachment file" />
          {previewUrl ? (
            <div className="absolute inset-0 flex items-center justify-center p-4">
              <Image
                src={previewUrl}
                alt={fileName || "Uploaded attachment"}
                className="mx-auto max-h-full rounded object-contain"
                fill
              />
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center px-4 py-3 text-center">
              <div
                className="bg-background mb-2 flex size-11 shrink-0 items-center justify-center rounded-full border"
                aria-hidden="true"
              >
                <ImageIcon className="size-4 opacity-60" />
              </div>
              <p className="mb-1.5 text-sm font-medium">Drop your attachment here</p>
              <p className="text-muted-foreground text-xs">
                SVG, PNG, JPG, WEBP, GIF or PDF files (max. {maxSizeMB}MB)
              </p>
              <Button
                variant="outline"
                className="mt-4 border-1"
                type="button"
                onClick={openFileDialog}
              >
                <UploadIcon className="-ms-1 size-4 opacity-60" aria-hidden="true" />
                Select attachment
              </Button>
            </div>
          )}
        </div>

        {previewUrl && (
          <div className="absolute top-4 right-4">
            <button
              type="button"
              className="focus-visible:border-ring focus-visible:ring-ring/50 z-50 flex size-8 cursor-pointer items-center justify-center rounded-full bg-black/60 text-white transition-[color,box-shadow] outline-none hover:bg-black/80 focus-visible:ring-[3px]"
              onClick={() => removeFile(files[0].id)}
              aria-label="Remove attachment"
            >
              <XIcon className="size-4" aria-hidden="true" />
            </button>
          </div>
        )}
      </div>

      {/* Show both file upload errors and react-hook-form errors */}
      {(fileUploadErrors.length > 0 || error) && (
        <div className="text-destructive flex items-center gap-1 text-xs" role="alert">
          <AlertCircleIcon className="size-3 shrink-0" />
          <span>{error || fileUploadErrors[0]}</span>
        </div>
      )}
      {/* Add this preview section */}
      {currentFile && currentFile instanceof File && (
        <div className="rounded-lg border bg-muted/50 p-4 space-y-6 mt-3">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2 truncate max-w-[25ch]">
              <ImageIcon className="min-w-4 aspect-square text-muted-foreground" />
              <span className="truncate font-medium">{currentFile.name}</span>
            </div>
            <span className="text-muted-foreground">{formatFileSize(currentFile.size)}</span>
          </div>
          {progress ? (
            progress < 100 ? (
              <div className="space-y-2 animate-pulse">
                <Progress value={progress} className="" />
                <span className="">Uploading attachment... </span>
              </div>
            ) : (
              <div className="space-y-2">
                <Progress value={100} className="bg-green-500" />
                <span className="flex items-center gap-2 text-green-700">
                  <CheckCircleIcon className="size-4" /> Attachment uploaded successfully
                </span>
              </div>
            )
          ) : null}
        </div>
      )}
    </div>
  );
}
