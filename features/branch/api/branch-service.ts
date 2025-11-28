import axiosInstance from "@/lib/axios-instance";
import { BranchPayload, BranchTableProps } from "../types/branch-types";
import axios from "axios";

export const getBranches = async (): Promise<BranchTableProps[]> => {
  try {
    const { data } = await axiosInstance.get<{
      success: boolean;
      data: BranchTableProps[];
    }>("/api/branches");
    return data.data; // <-- return the inner array
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // throw the actual axios error back to the UI
      throw error;
    }
    throw new Error(`Failed to fetch branch`);
  }
};

export const getBranchById = async (id: number): Promise<BranchPayload> => {
  try {
    const { data } = await axiosInstance.get<{
      success: boolean;
      data: BranchPayload;
    }>(`/api/branches/${id}`);
    console.log("THIS IS THE RETURN BRANCH DATA", data.data);
    return data.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // throw the actual axios error back to the UI
      throw error;
    }
    throw new Error(`Failed to fetch branch ${id}`);
  }
};

export const createBranchApi = async (payload: BranchPayload) => {
  try {
    const { data } = await axiosInstance.post("/api/branches", payload);

    return data.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // throw the actual axios error back to the UI
      throw error;
    }
    throw new Error("Failed to create a branch");
  }
};

export const updateBranchApi = async (
  id: number,
  updatePayload: BranchPayload
) => {
  try {
    const { data } = await axiosInstance.put(
      `/api/branches/${id}`,
      updatePayload
    );
    return data.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // throw the actual axios error back to the UI
      throw error;
    }
    throw new Error("Failed to update branch");
  }
};
