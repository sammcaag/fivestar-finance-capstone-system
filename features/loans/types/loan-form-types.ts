export enum LoanHistoryProductType {
  NEW_CLIENT,
  ADDITIONAL,
  RELOAN,
  RENEWAL,
  EXTENSION,
}

export const productTypeArray = [
  "NEW CLIENT",
  "ADDITIONAL",
  "RELOAN",
  "RENEWAL",
  "EXTENSION",
] as const;

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
};
