import { StaffFormValues } from "../types/staff-types";

export const defaultValues = {
  firstName: "",
  middleName: "",
  lastName: "",
  suffix: "",
  dateOfBirth: new Date(),
  gender: "",
  addressLine1: "",
  addressLine2: "",
  barangay: "",
  cityOrMunicipality: "",
  province: "",
  region: "",
  zipCode: 0,
  primaryContact: "",
  secondaryContact: "",
  religion: "",
  civilStatus: "",
  occupation: "",
  role: "",
  staffId: "",
  placeOfBirth: "",
};

export const formDates: (keyof StaffFormValues)[] = ["dateOfBirth"];
