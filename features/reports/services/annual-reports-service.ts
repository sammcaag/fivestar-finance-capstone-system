import axiosInstance from "@/lib/axios-instance";
import axios from "axios";
import { AnnualReportRow } from "../types/annual-report-types";

export const getAnnualReports = async (): Promise<AnnualReportRow[]> => {
  try {
    const { data } = await axiosInstance.get<{
      success: boolean;
      message: string;
      data: AnnualReportRow[];
    }>("/api/reports/annual");

    return data.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error;
    }

    throw new Error("Failed to fetch annual reports");
  }
};
