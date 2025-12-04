import { LoanHistoryPayload } from "@/features/loans/history/types/loan-form-types";
import { create } from "zustand";

type LoanStore = {
  loanSets: LoanHistoryPayload[][];
  setLoanSets: (data: LoanHistoryPayload[][]) => void;
  clearLoanSets: () => void;
  clientSerialNumber: string;
  setClientSerialNumber: (serialNumber: string) => void;
};

export const useLoanStore = create<LoanStore>((set) => ({
  loanSets: [],
  setLoanSets: (data) => set({ loanSets: data }),
  clearLoanSets: () => set({ loanSets: [] }),
  clientSerialNumber: "",
  setClientSerialNumber: (serialNumber) => set({ clientSerialNumber: serialNumber }),
}));
