import axiosInstance from "@/lib/axios-instance";
import axios from "axios";

export type LoanComputationPayload = {
  dst: number;
  grt: number;
  crip: number;
  totalDeduction: number;
  monthlyAmortization: number;
  term: number;
  valueDate: Date;
  maturityDate: Date;
  pnAmount: number;
  eir: number;
  gpFactor: number;
  ui: number;
  gp: number;
  td: number;
  pl: number;
  ob: number;
  netProceeds: number;

  renOi?: number;
  renNewUi?: number;
  renNewGp?: number;
  renRebates?: number;

  extTerm?: number;
  extValueDate?: string;
  extMaturityDate?: string;
  extPn?: number;
  extUi?: number;
  extGp?: number;
};

export const createLoanComputationApi = async (payload: LoanComputationPayload) => {
  try {
    const { data } = await axiosInstance.post("/api/loan-computations", payload);

    return data.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error;
    }
    throw new Error("Failed to create loan computation");
  }
};
