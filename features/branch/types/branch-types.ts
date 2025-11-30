import { UseFormReturn } from "react-hook-form";

export interface BranchTableProps {
  id: number;
  name: string;
  email: string;
  status: string;
  contactNumber: string;
}

export interface BranchFormValues {
  // Client General Information
  name: string;
  email: string; // `?` = optional fields
  status?: string;
  addressLine1: string;
  addressLine2?: string;
  barangay?: string;
  cityOrMunicipality: string;
  province: string;
  region: string;
  zipCode: number;
  primaryContact: string;
  secondaryContact?: string;
}

export interface BranchInformationProps {
  form: UseFormReturn<BranchFormValues>;
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
  role: "CLIENT" | "SALES" | "LOANS" | "ADMIN";
};

export type UserType = {
  id: string;
  fullName: string;
  staffId?: string;
  userAuth: userAuth;
  clientPension?: { serialNumber: string };
  avatarUrl?: string;
};

export type BranchPayload = {
  id?: number | null;
  name: string;
  email: string;
  status?: string;

  address: Address;
  contactInfo: ContactInfo;
  users?: UserType[];
};

export interface IBranchInformation {
  name: string;
  email: string;
  primaryContact: string;
  secondaryContact?: string;
  users: UserType[];
}

export interface UserSectionProps {
  users: UserType[];
  type: "staff" | "client";
}
