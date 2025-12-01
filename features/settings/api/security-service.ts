import axiosInstance from "@/lib/axios-instance";
import { SecurityPayload } from "../types/security-types";
import axios from "axios";

export const updateSecurityApi = async (updatePayload: SecurityPayload) => {
  try {
    const { data } = await axiosInstance.put(
      `/api/auth/update-credentials`,
      updatePayload
    );
    return data; // note only data to return including the message
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // throw the actual axios error back to the UI
      throw error;
    }
    throw new Error("Failed to update a staff");
  }
};
