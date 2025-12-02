import axiosInstance from "@/lib/axios-instance";
import { CloudinaryUploadResult } from "@/types/cloudinary-types";
import axios from "axios";

// insert attachment mutation
export const createClientAttachment = async ({
  userId,
  payload,
}: {
  userId: number;
  payload: CloudinaryUploadResult & { title: string; mimeType: string };
}) => {
  try {
    const { data } = await axiosInstance.post(`/api/attachments/user/${userId}`, payload);

    return data.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // throw the actual axios error back to the UI
      throw error;
    }
    throw new Error("Failed to create a client");
  }
};
