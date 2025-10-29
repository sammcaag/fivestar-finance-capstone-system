import { LucideIcon } from "lucide-react";
import { UseFormReturn } from "react-hook-form";

export interface Step {
  //used in step-indicator
  id: string;
  name: string;
  fields?: string[];
}

export interface StepIndicatorProps {
  //used in step-indicator
  steps: Step[];
  currentStep: number;
}

export interface ClientFormValues {
  // Client General Information
  firstName: string;
  middleName?: string; // `?` = optional fields
  lastName: string;
  suffix?: string;
  dateOfBirth: Date;
  gender: string;
  address: string;
  contactNumber: string;
  alternativeContactNumber?: string;
  religion?: string;
  civilStatus: string;
  mothersMaidenName?: string;
  placeOfBirth: string;

  // Client's Family Information
  // Spouse Information
  spouseFirstName?: string;
  spouseMiddleName?: string;
  spouseLastName?: string;
  spouseDateOfBirth?: Date;
  spouseAddress?: string;
  spouseContactNumber?: string;
  // Children Information
  firstChildName?: string;
  firstChildDateOfBirth?: Date;
  secondChildName?: string;
  secondChildDateOfBirth?: Date;

  // Pensioner's Information
  rank: string;
  pensionType: string;
  serialNumber: number;
  idNumber: number;
  dateEnteredService: Date;
  dateSeparationService: Date;
  dateRetiredService: Date;
  lengthOfService: number;
  lastUnitAssigned?: string;
  branchOfService?: string;

  // Account's Information
  accountNumber: number;
  monthlyPension: number;
  monthlyDeduction: number;
  atmAccountNumber: number;
  bankName: string;
  branchOfBank: string;
}

export interface ClientGeneralInformationProps {
  form: UseFormReturn<ClientFormValues>;
}

export interface ClientFamilyInformationProps {
  form: UseFormReturn<ClientFormValues>;
}

export interface PensionersInformationProps {
  form: UseFormReturn<ClientFormValues>;
}

export interface AccountsInformationProps {
  form: UseFormReturn<ClientFormValues>;
}
export type RegisterClientsFormProps = {
  form: UseFormReturn<ClientFormValues>;
};

export interface ClientHistoryRecord {
  dedCode: string;
  productType: string;
  amount: string;
  term: string;
  releasedDate: string;
  valueDate: string;
  maturityDate: string;
  status: "PROCESS" | "RELEASED";
}

export const suffixOptions = [
  // { label: "None", value: "" },
  { label: "Jr.", value: "Jr." },
  { label: "Sr.", value: "Sr." },
  { label: "Nr.", value: "Nr." },
  { label: "Jd.", value: "Jd." },
  { label: "I", value: "I" },
  { label: "II", value: "II" },
  { label: "III", value: "III" },
  { label: "IV", value: "IV" },
];

export const civilStatusOptions = [
  { label: "Single", value: "single" },
  { label: "Married", value: "married" },
  { label: "Divorced", value: "divorced" },
  { label: "Widowed", value: "widowed" },
  { label: "Separated", value: "separated" },
];

export type Client = {
  id: string;
  name: string;
  email: string;
  loanAmount: number;
  loanType: string;
  status:
    | "active"
    | "pending"
    | "overdue"
    | "completed"
    | "rejected"
    | "inactive"
    | "processed"
    | "released";
  lastPayment: string;
  nextPayment: string;
};