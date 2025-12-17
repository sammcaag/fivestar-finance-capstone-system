import axiosInstance from "@/lib/axios-instance";
import axios from "axios";
import { LoanDeductionTableRow } from "@/features/reports/types/loan-deductions-types";

type AnnualReportClientMetric = "loans" | "accounts" | "payments" | "deceased";

export const getAnnualReportClients = async (params: {
  year: number;
  metric: AnnualReportClientMetric;
}): Promise<LoanDeductionTableRow[]> => {
  try {
    const { data } = await axiosInstance.get<{
      success: boolean;
      message: string;
      data: LoanDeductionTableRow[];
    }>("/api/reports/annual/clients", {
      params,
    });

    return data.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error;
    }

    throw new Error("Failed to fetch annual report clients");
  }
};
