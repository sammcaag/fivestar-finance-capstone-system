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
  addressLine1: string;
  addressLine2?: string;
  barangay?: string;
  cityOrMunicipality: string;
  province: string;
  region: string;
  zipCode: number;
  primaryContact: string;
  secondaryContact?: string;
  religion: string;
  civilStatus: string;
  mothersMaidenName?: string;
  placeOfBirth: string;

  // Client's Family Information
  // Spouse Information
  spouseFirstName?: string;
  spouseMiddleName?: string;
  spouseLastName?: string;
  spouseDateOfBirth?: Date;
  spouseAddressLine1?: string;
  spouseAddressLine2?: string;
  spouseBarangay?: string;
  spouseCityOrMunicipality?: string;
  spouseProvince?: string;
  spouseRegion?: string;
  spouseZipCode?: number;
  spouseContactNumber?: string;
  // Children Information
  firstChildName?: string;
  firstChildDateOfBirth?: Date;
  firstChildAddressLine1?: string;
  firstChildAddressLine2?: string;
  firstChildBarangay?: string;
  firstChildCityOrMunicipality?: string;
  firstChildProvince?: string;
  firstChildRegion?: string;
  firstChildZipCode?: number;

  secondChildName?: string;
  secondChildDateOfBirth?: Date;
  secondChildAddressLine1?: string;
  secondChildAddressLine2?: string;
  secondChildBarangay?: string;
  secondChildCityOrMunicipality?: string;
  secondChildProvince?: string;
  secondChildRegion?: string;
  secondChildZipCode?: number;

  thirdChildName?: string;
  thirdChildDateOfBirth?: Date;
  thirdChildAddressLine1?: string;
  thirdChildAddressLine2?: string;
  thirdChildBarangay?: string;
  thirdChildCityOrMunicipality?: string;
  thirdChildProvince?: string;
  thirdChildRegion?: string;
  thirdChildZipCode?: number;

  // Pensioner's Information
  rank: string;
  pensionType: string;
  serialNumber: string;
  idNumber: string;
  dateEnteredService: Date;
  dateSeparationService: Date;
  dateRetiredService: Date;
  lengthOfService: number;
  lastUnitAssigned?: string;
  branchOfService?: string;

  // Account's Information
  accountNumber: string;
  monthlyPension: number;
  monthlyDeduction: number;
  atmAccountNumber: string;
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
  { label: "Jr.", value: "Jr" },
  { label: "Sr.", value: "Sr" },
  { label: "Nr.", value: "Nr" },
  { label: "Jd.", value: "Jd" },
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

export const rankOptions = [
  { label: "CPL", value: "CPL" },
  { label: "SGT", value: "SGT" },
  { label: "SSG", value: "SSG" },
  { label: "SSGT", value: "SSGT" },
  { label: "MSGT", value: "MSGT" },
  { label: "MSG", value: "MSG" },
  { label: "WO1", value: "WO1" },
  { label: "1LT", value: "1LT" },
  { label: "2LT", value: "2LT" },
  { label: "CPT", value: "CPT" },
  { label: "MAJ", value: "MAJ" },
  { label: "LTC", value: "LTC" },
  { label: "COL", value: "COL" },
  { label: "BG", value: "BG" },
  { label: "MG", value: "MG" },
  { label: "LTG", value: "LTG" },
  { label: "GEN", value: "GEN" },
  { label: "PO1", value: "PO1" },
  { label: "PO2", value: "PO2" },
  { label: "PO3", value: "PO3" },
  { label: "CPO", value: "CPO" },
  { label: "ENS", value: "ENS" },
  { label: "PVT", value: "PVT" },
  { label: "PFC", value: "PFC" },
  { label: "LTCOL", value: "LTCOL" },
  { label: "E-W", value: "EW" },
];

export const pensionTypeOptions = [
  { label: "COMPULSORY", value: "COMPULSORY" },
  { label: "OPTIONAL", value: "OPTIONAL" },
  { label: "CDD", value: "CDD" },
  { label: "1044", value: "1044" },
  { label: "GUARDIAN", value: "GUARDIAN" },
  { label: "ALLOTEE", value: "ALLOTEE" },
  { label: "WIDOW", value: "WIDOW" },
];

export const regionOptions = [
  { label: "I", value: "Region I" },
  { label: "II", value: "Region II" },
  { label: "III", value: "Region III" },
  { label: "IV-A", value: "Region IV-A" },
  { label: "IV-B", value: "Region IV-B" },
  { label: "V", value: "Region V" },
  { label: "VI", value: "Region VI" },
  { label: "VII", value: "Region VII" },
  { label: "VIII", value: "Region VIII" },
  { label: "IX", value: "Region IX" },
  { label: "X", value: "Region X" },
  { label: "XI", value: "Region XI" },
  { label: "XII", value: "Region XII" },
  { label: "XIII", value: "Region XIII" },
  { label: "NCR", value: "NCR" },
  { label: "CAR", value: "CAR" },
  { label: "BARMM", value: "BARMM" },
];

export type ClientTableProps = {
  id: string;
  name: string;
  email: string;
  branchName: string;
  status:
    | "active"
    | "pending"
    | "overdue"
    | "completed"
    | "rejected"
    | "inactive"
    | "processed"
    | "released";
  createdAt: string | Date;
  gender: string;
  birthDate: string | Date;
  rank: string;
};
