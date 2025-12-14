import { LoanComputationPayload } from "../api/loan-computation-service";
import { parseAmount } from "./parse-amount";

type RegularResults = {
  effectiveInterestRate: string;
  gpFactor: string;
  principalAmount: string;
  unearnedInterest: string;
  grossProceeds: string;
  documentaryStamp: string;
  grossRevenueTax: string;
  insurance: string;
  totalDeductions: string;
};

type ExtensionResults = {
  extensionOiRate: string;
  extensionGpFactor: string;
  extensionPrincipalAmount: string;
  extensionUnearnedInterest: string;
  extensionGrossProceeds: string;
  extensionDocumentaryStamp: string;
  extensionGrossRevenueTax: string;
  extensionInsurance: string;
  extensionTotal: string;
  renewalExtensionEffectiveInterestRate: string;
  renewalExtensionGpFactor: string;
  renewalExtensionPrincipalAmount: string;
  renewalExtensionUnearnedInterest: string;
  renewalExtensionGrossProceeds: string;
  renewalExtensionDocumentaryStamp: string;
  renewalExtensionGrossRevenueTax: string;
  renewalExtensionInsurance: string;
  renewalExtensionTotal: string;
};

type PendingLoanData = {
  computationType: "new_client" | "reloan" | "additional" | "renewal" | "extension";
  monthlyAmortization?: number;
  term?: number;
  valueDate?: Date;
  maturityDate?: Date;
  netAmount?: string;
  otherDeduction?: number;
  outstandingBalance?: number;
  results?: RegularResults | ExtensionResults;
};

const isExtensionResults = (results: PendingLoanData["results"]): results is ExtensionResults => {
  return Boolean(results && "extensionGrossProceeds" in results);
};

export const loanComputationPayloadFromPendingData = (
  data: PendingLoanData
): LoanComputationPayload => {
  const results = data.results;

  if (!results) {
    return {
      dst: 0,
      grt: 0,
      crip: 0,
      totalDeduction: 0,
      monthlyAmortization: data.monthlyAmortization ?? 0,
      term: data.term ?? 0,
      valueDate: data.valueDate ? new Date(data.valueDate) : new Date(),
      maturityDate: data.maturityDate ? new Date(data.maturityDate) : new Date(),
      pnAmount: 0,
      eir: 0,
      gpFactor: 0,
      ui: 0,
      gp: 0,
      td: 0,
      pl: 0,
      ob: data.outstandingBalance ?? 0,
      netProceeds: parseAmount(data.netAmount),
    };
  }

  if (isExtensionResults(results)) {
    return {
      dst: parseAmount(results.renewalExtensionDocumentaryStamp),
      grt: parseAmount(results.renewalExtensionGrossRevenueTax),
      crip: parseAmount(results.renewalExtensionInsurance),
      totalDeduction: parseAmount(results.renewalExtensionTotal),
      monthlyAmortization: data.monthlyAmortization ?? 0,
      term: data.term ?? 0,
      valueDate: data.valueDate ? new Date(data.valueDate) : new Date(),
      maturityDate: data.maturityDate ? new Date(data.maturityDate) : new Date(),
      pnAmount: parseAmount(results.renewalExtensionPrincipalAmount),
      eir: parseAmount(results.renewalExtensionEffectiveInterestRate),
      gpFactor: parseAmount(results.renewalExtensionGpFactor),
      ui: parseAmount(results.renewalExtensionUnearnedInterest),
      gp: parseAmount(results.renewalExtensionGrossProceeds),
      td: parseAmount(results.renewalExtensionTotal),
      pl:
        parseAmount(results.renewalExtensionGrossProceeds) -
        parseAmount(results.renewalExtensionTotal),
      ob: data.outstandingBalance ?? 0,
      netProceeds: parseAmount(data.netAmount),

      extTerm: data.term,
      extValueDate: data.valueDate ? new Date(data.valueDate).toISOString() : undefined,
      extMaturityDate: data.maturityDate ? new Date(data.maturityDate).toISOString() : undefined,
      extPn: parseAmount(results.extensionPrincipalAmount),
      extUi: parseAmount(results.extensionUnearnedInterest),
      extGp: parseAmount(results.extensionGrossProceeds),

      renOi: parseAmount(results.extensionOiRate),
    };
  }

  return {
    dst: parseAmount(results.documentaryStamp),
    grt: parseAmount(results.grossRevenueTax),
    crip: parseAmount(results.insurance),
    totalDeduction: parseAmount(results.totalDeductions),
    monthlyAmortization: data.monthlyAmortization ?? 0,
    term: data.term ?? 0,
    valueDate: data.valueDate ? new Date(data.valueDate) : new Date(),
    maturityDate: data.maturityDate ? new Date(data.maturityDate) : new Date(),
    pnAmount: parseAmount(results.principalAmount),
    eir: parseAmount(results.effectiveInterestRate),
    gpFactor: parseAmount(results.gpFactor),
    ui: parseAmount(results.unearnedInterest),
    gp: parseAmount(results.grossProceeds),
    td: parseAmount(results.totalDeductions),
    pl: parseAmount(results.grossProceeds) - parseAmount(results.totalDeductions),
    ob: data.outstandingBalance ?? 0,
    netProceeds: parseAmount(data.netAmount),
  };
};
