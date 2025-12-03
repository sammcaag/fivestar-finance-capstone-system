import { LoanHistoryFormValues, LoanHistoryPayload } from "../types/loan-form-types";

export const loanHistoryPayload = (
  branchId: number,
  clientId: number,
  data: LoanHistoryFormValues,
  id?: number
): LoanHistoryPayload => {
  return {
    id: id,
    branchId: branchId,
    clientId: clientId,

    dedCode: data.dedCode,
    productType: data.productType,
    monthlyAmortization: data.monthlyAmortization,
    term: data.term,
    valueDate: new Date(data.valueDate),
    maturityDate: new Date(data.maturityDate),
    settedMaturityDate: new Date(data.settedMaturityDate ?? new Date()),

    accountNumber: data.accountNumber,
    pnNumber: data.pnNumber,

    outstandingBalance: data.outstandingBalance,
    otherDeduction: data.otherDeduction,

    processor1Id: Number(data.processor1Id),
    processor2Id: Number(data.processor2Id),
    contactedById: Number(data.contactedById),
  };
};

export const mapBackendToLoanHistoryFormValues = (
  data: LoanHistoryPayload
): LoanHistoryFormValues => {
  return {
    dedCode: data.dedCode,
    productType: data.productType,
    monthlyAmortization: data.monthlyAmortization,
    term: data.term,
    valueDate: data.valueDate,
    maturityDate: data.maturityDate,
    settedMaturityDate: data.settedMaturityDate,

    accountNumber: data.accountNumber,
    pnNumber: data.pnNumber,

    outstandingBalance: data.outstandingBalance,
    otherDeduction: data.otherDeduction,

    processor1Id: String(data.processor1Id),
    processor2Id: String(data.processor2Id),
    contactedById: String(data.contactedById),
  };
};
