import { LoanHistoryFormValues } from "../types/loan-form-types";

export const defaultValues: LoanHistoryFormValues = {
  dedCode: "",
  productType: "new_client", // must match enum value
  monthlyAmortization: 0,
  term: 0,
  valueDate: new Date(),
  maturityDate: new Date(),
  settedMaturityDate: undefined, // optional

  accountNumber: "",
  pnNumber: "",
  purpose: "",

  outstandingBalance: undefined,
  otherDeduction: undefined,

  processor1Id: "",
  processor2Id: "",
  contactedById: "",
};
