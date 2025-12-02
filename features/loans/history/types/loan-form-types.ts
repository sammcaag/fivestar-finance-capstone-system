import { UseFormReturn } from "react-hook-form";

export const LoanHistoryProductEnum = {
  NEW_CLIENT: "new_client",
  ADDITIONAL: "additional",
  RELOAN: "reloan",
  RENEWAL: "renewal",
  EXTENSION: "extension",
} as const;

export const loanHistoryProductOptions = [
  { label: "New Client", value: "new_client" },
  { label: "Additional", value: "additional" },
  { label: "Reloan", value: "reloan" },
  { label: "Renewal", value: "renewal" },
  { label: "Extension", value: "extension" },
];

export type LoanHistoryProductType =
  (typeof LoanHistoryProductEnum)[keyof typeof LoanHistoryProductEnum];

export type LoanHistoryFormValues = {
  dedCode: string;
  productType: LoanHistoryProductType;
  monthlyAmortization: number;
  term: number;
  valueDate: Date;
  maturityDate: Date;
  settedMaturityDate?: Date;

  accountNumber: string;
  pnNumber: string;

  outstandingBalance?: number;
  otherDeduction?: number;

  processor1Id: number;
  processor2Id: number;
  contactedById: number;
};

export type LoanHistoryPayload = {
  id?: number;
  branchId: number;
  clientId: number;

  dedCode: string;
  productType: LoanHistoryProductType;
  monthlyAmortization: number;
  term: number;
  valueDate: Date;
  maturityDate: Date;
  settedMaturityDate?: Date;

  accountNumber: string;
  pnNumber: string;

  outstandingBalance?: number;
  otherDeduction?: number;

  processor1Id: number;
  processor2Id: number;
  contactedById: number;

  status?: string;
  createdAt?: Date;
};

export interface LoanHistoryInformationProps {
  form: UseFormReturn<LoanHistoryFormValues>;
}
