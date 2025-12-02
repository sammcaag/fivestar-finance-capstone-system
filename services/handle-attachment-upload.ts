import { UploadResult } from "@/types/cloudinary-types";
import { uploadAttachment } from "./upload-attachment";

export async function handleAttachmentUpload(
  file: File | null | undefined,
  setProgress: (progress: number) => void
): Promise<UploadResult> {
  if (!file || !(file instanceof File)) {
    console.log("No file provided");
    return { success: false, error: "No File Attached" } as UploadResult;
  }
  const uploadedImageData = await uploadAttachment(file, setProgress);

  if (uploadedImageData.success && uploadedImageData.data) {
    return {
      success: true,
      data: uploadedImageData.data,
    };
  } else {
    return { success: false, error: "Failed to upload attachment" } as UploadResult;
  }
}
