"use client";
import { UploadResult } from "@/types/cloudinary-types";
import axios from "axios";

const api_key = process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY;
const cloud_name = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

export const uploadAttachment = async (
  file: File | null,
  setUploadProgress: (progress: number) => void
): Promise<UploadResult> => {
  // ✅ Validate environment variables first
  if (!api_key || !cloud_name) {
    throw new Error("Cloudinary credentials not configured");
  }

  // ✅ Validate input
  if (!file) {
    throw new Error("No file provided");
  }

  const isImage = file.type.startsWith("image/");
  const isPdf = file.type === "application/pdf";

  if (!isImage && !isPdf) {
    throw new Error("File must be an image or a PDF");
  }

  // ✅ Optional: Add file size validation
  const maxSizeInBytes = 2 * 1024 * 1024; // 3MB
  if (file.size > maxSizeInBytes) {
    throw new Error("File size must be less than 2MB");
  }

  try {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "fivestar-attachments");
    formData.append("api_key", api_key);

    const cloudinaryResponse = await axios.post(
      `https://api.cloudinary.com/v1_1/${cloud_name}/auto/upload`,
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (e) => {
          const progress = (e.loaded / (e.total || 1)) * 100;
          setUploadProgress(progress);
        },
      }
    );

    return {
      success: true,
      data: {
        public_id: cloudinaryResponse.data.public_id,
        version: cloudinaryResponse.data.version,
        signature: cloudinaryResponse.data.signature,
        secure_url: cloudinaryResponse.data.secure_url,
        original_filename: cloudinaryResponse.data.original_filename || file.name,
        format: cloudinaryResponse.data.format,
        bytes: cloudinaryResponse.data.bytes,
        width: cloudinaryResponse.data.width,
        height: cloudinaryResponse.data.height,
        pages: cloudinaryResponse.data.pages, //  For PDFs
        resource_type: cloudinaryResponse.data.resource_type,
      },
    };
  } catch (error) {
    console.error(`Error uploading ${file.name}:`, error);

    // ✅ More detailed error handling
    let errorMessage = "Error uploading file";

    if (axios.isAxiosError(error)) {
      if (error.response) {
        // Server responded with error status
        errorMessage =
          error.response.data?.error?.message ||
          `Upload failed: ${error.response.status} ${error.response.statusText}`;
      } else if (error.request) {
        // Network error
        errorMessage = "Network error - please check your connection";
      } else {
        // Request setup error
        errorMessage = error.message;
      }
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }

    return {
      success: false,
      error: errorMessage,
    };
  }
};
