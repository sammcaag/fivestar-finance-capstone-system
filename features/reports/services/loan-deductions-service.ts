import axiosInstance from "@/lib/axios-instance";
import axios from "axios";
import { LoanDeductionTableRow } from "../types/loan-deductions-types";

export const getUserLoanDeductions = async (): Promise<LoanDeductionTableRow[]> => {
  try {
    const { data } = await axiosInstance.get<{
      success: boolean;
      data: LoanDeductionTableRow[];
    }>("/api/users/userLoanDeductions");
    console.log(data);

    return data.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error;
    }

    throw new Error("Failed to fetch loan deductions");
  }
};
