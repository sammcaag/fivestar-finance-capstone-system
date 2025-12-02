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
    valueDate: data.valueDate,
    maturityDate: data.maturityDate,
    settedMaturityDate: data.settedMaturityDate,

    accountNumber: data.accountNumber,
    pnNumber: data.pnNumber,

    outstandingBalance: data.outstandingBalance,
    otherDeduction: data.otherDeduction,

    processor1Id: data.processor1Id,
    processor2Id: data.processor2Id,
    contactedById: data.contactedById,
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

    processor1Id: data.processor1Id,
    processor2Id: data.processor2Id,
    contactedById: data.contactedById,
  };
};
