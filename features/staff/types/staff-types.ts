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
  plainId: number;
  createdAt: string;
  lastLogin?: string;
}

export interface FormErrors {
  [key: string]: string;
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
  branchId: string;
  role: string;
  staffId: string;
  placeOfBirth: string;
}

export interface StaffGeneralInformationProps {
  form: UseFormReturn<StaffFormValues>;
  isOwnProfile?: boolean;
}

export type Address = {
  id?: string | null;
  addressLine1: string;
  addressLine2?: string | null;
  barangay?: string | null;
  cityOrMunicipality: string;
  province: string;
  region: string;
  zipCode: number;
};

export type ContactInfo = {
  id?: number | null;
  primary_contact: string;
  secondary_contact?: string | null;
};

export type userAuth = {
  id?: number;
  email: string;
  password: string;
  role: string;
};

export type Branch = {
  id: number;
  name: string;
};

export type StaffPayload = {
  id?: number | null;
  fullName: string;
  gender: string;
  birthDate: Date;
  religion: string;
  civilStatus: string;
  occupation: string;
  staffId: string;
  placeOfBirth: string;
  status?: string;
  profileImageUrl?: string;
  remarks?: string;

  branchId: number;
  branch?: Branch;
  address: Address;
  contactInfo: ContactInfo;
  userAuth: userAuth;
};
