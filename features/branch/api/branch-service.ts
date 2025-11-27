import axiosInstance from "@/lib/axios-instance";
import { BranchTableProps } from "../types/branch-types";
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
