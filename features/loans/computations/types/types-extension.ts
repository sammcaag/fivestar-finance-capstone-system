import { UseFormReturn } from "react-hook-form";

//types for Form Values in useForm
export type FormValues = {
  monthlyAmortization: number;
  term: number;
  settedMaturityDate: Date;
  settedOutstandingBalance: number;
  otherDeduction: number;
};

//types for Results Values used in ResultsDisplay.tsx
export type ResultsDisplayProps = {
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

export type ResultsDisplayDatesProps = {
  extensionValueDate: Date;
  setExtensionValueDate: React.Dispatch<React.SetStateAction<Date>>;
  extensionMaturityDate: Date;
  setExtensionMaturityDate: React.Dispatch<React.SetStateAction<Date>>;
  renewalExtensionValueDate: Date;
  setRenewalExtensionValueDate: React.Dispatch<React.SetStateAction<Date>>;
  renewalExtensionMaturityDate: Date;
  setRenewalExtensionMaturityDate: React.Dispatch<React.SetStateAction<Date>>;
};

//types for References Values used in References.tsx
export type ReferencesDisplayProps = {
  oiTerm: string;
  reneTerm: string;
  oiExtension: string;
  proceedsOfLoan: string;
  outstandingBalance: string;
  rebates: string;
  newUi: string;
  newGp: string;
};

//types for Loan Values that is from the FormValues Props that makes the form to be a component used in LoanForm.tsx
export interface LoanFormProps {
  form: UseFormReturn<FormValues>;
  hasDeductions: boolean;
  setHasDeductions: (hasDeduction: boolean) => void;
}

//types for Result Outline Component
export interface ResultOutlineProps {
  title: string;
  value: string;
  textColorClass?: string;
  isOutline?: boolean;
}
