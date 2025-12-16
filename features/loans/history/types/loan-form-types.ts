import { UseFormReturn } from "react-hook-form";

export const LoanHistoryProductEnum = {
  NEW_CLIENT: "new_client",
  ADDITIONAL: "additional",
  RELOAN: "reloan",
  RENEWAL: "renewal",
  EXTENSION: "extension",
} as const;

export const productTypeMap: Record<string, LoanHistoryProductType> = {
  "New Client": "new_client",
  Additional: "additional",
  Reloan: "reloan",
  Renewal: "renewal",
  Extension: "extension",
};

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

  accountNumber?: string;
  pnNumber: string;
  purpose: string;

  outstandingBalance?: number;
  otherDeduction?: number;

  processor1Id: string;
  processor2Id: string;
  contactedById: string;
};

export type LoanHistoryPayload = {
  id?: number;
  branchId: number;
  clientId: number;

  loanComputationId: number;

  dedCode: string;
  productType: LoanHistoryProductType;
  monthlyAmortization: number;
  term: number;
  valueDate: Date;
  maturityDate: Date;
  settedMaturityDate?: Date;

  accountNumber?: string;
  pnNumber: string;
  purpose: string;

  outstandingBalance?: number;
  otherDeduction?: number;

  processor1Id: number;
  processor2Id: number;
  contactedById: number;

  status?: string;
  approvalStatus?: string;
  createdAt?: Date;
};

export interface LoanHistoryInformationProps {
  form: UseFormReturn<LoanHistoryFormValues>;
  isCreate?: boolean; //if the form is for creating loan history computation and deduction information must be disabled
}

export interface IStaffsByBranch {
  id: number;
  fullName: string;
  userAuth: {
    email: string;
    role: string;
  };
}

// Type for branch with users
export interface IBranchWithUsers {
  id: number;
  name: string;
  users: IStaffsByBranch[];
}
