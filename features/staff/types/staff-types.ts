import { UseFormReturn } from "react-hook-form";

export type StaffRole = "admin" | "sales" | "loans";

export type StaffStatus = "active" | "inactive";

export interface StaffTableProps {
  id: string;
  name: string;
  email: string;
  role: StaffRole;
  gender: string;
  branchName: string;
  status: StaffStatus;
  createdAt: string;
  lastLogin?: string;
}

export interface FormErrors {
  [key: string]: string;
}

export enum StaffRolesEnum {
  SALES = "SALES",
  LOANS = "LOANS",
}

export interface StaffFormValues {
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
  occupation: string;
  role: StaffRolesEnum;
  placeOfBirth: string;
}

export interface StaffGeneralInformationProps {
  form: UseFormReturn<StaffFormValues>;
}
