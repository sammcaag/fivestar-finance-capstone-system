import axiosInstance from "@/lib/axios-instance";
import axios from "axios";
import { LoanHistoryPayload } from "../types/loan-form-types";

export const createLoanHistoryApi = async (payload: LoanHistoryPayload) => {
  try {
    const { data } = await axiosInstance.post("/api/loan-history", payload);

    return data.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // throw the actual axios error back to the UI
      throw error;
    }
    throw new Error("Failed to create a client");
  }
};

export const updateLoanHistoryApi = async (updatePayload: LoanHistoryPayload) => {
  try {
    const { data } = await axiosInstance.put("/api/loan-history", updatePayload);

    return data.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // throw the actual axios error back to the UI
      throw error;
    }
    throw new Error("Failed to update a staff");
  }
};
