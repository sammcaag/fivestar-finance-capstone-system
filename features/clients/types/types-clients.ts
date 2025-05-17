import { UseFormReturn } from "react-hook-form";
import { z } from "zod";

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
