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

  outstandingBalance: undefined,
  otherDeduction: undefined,

  processor1Id: 0,
  processor2Id: 0,
  contactedById: 0,
};
