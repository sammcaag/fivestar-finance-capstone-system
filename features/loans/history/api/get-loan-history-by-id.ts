import axiosInstance from "@/lib/axios-instance";
import axios from "axios";
import { LoanHistoryPayload } from "../types/loan-form-types";

export type LoanComputationSnapshot = {
  id: number;
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
  extValueDate?: Date;
  extMaturityDate?: Date;
  extPn?: number;
  extUi?: number;
  extGp?: number;
};

export type LoanHistoryDetailsResponse = LoanHistoryPayload & {
  loanComputation?: LoanComputationSnapshot | null;
};

export const getLoanHistoryByIdApi = async (id: number): Promise<LoanHistoryDetailsResponse> => {
  try {
    const { data } = await axiosInstance.get(`/api/loan-history/${id}`);

    return data.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error;
    }
    throw new Error("Failed to fetch loan history");
  }
};
