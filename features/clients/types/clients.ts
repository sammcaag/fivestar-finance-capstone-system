export type Address = {
  addressLine1: string;
  addressLine2?: string | null;
  barangay?: string | null;
  cityOrMunicipality: string;
  province: string;
  region: string;
  zipCode: number;
};

export type ContactInfo = {
  primary_contact: string;
  secondary_contact?: string | null;
};

export type ClientPension = {
  rank: string;
  pensionType: string;
  serialNumber: string;
  idNumber: string;
  dateEnteredService: Date;
  dateSeparationService: Date;
  dateRetiredService: Date;
  lengthOfService: number;
  lastUnitAssigned: string;
  branchOfService: string;
};

export type ClientAccount = {
  monthlyPension: number;
  monthlyDeduction: number;
  atmAccountNumber: string;
  bankName: string;
  branchOfBank: string;
};

export type FamilyInfo = {
  name: string;
  birthDate?: Date;
  relationship: "MOTHER" | "SPOUSE" | "CHILD";
  addressSameAsClient?: boolean;
  addressSameAsSpouse?: boolean;
  address?: Address;
  contactInfo?: ContactInfo;
};

export type userAuth = {
  email: string;
  password: string;
  role: "CLIENT" | "SALES" | "LOANS" | "ADMIN";
};

export type ClientPayload = {
  fullName: string;
  gender: string;
  birthDate: Date;
  religion: string;
  civilStatus: string;
  occupation: string;
  placeOfBirth: string;
  address: Address;
  contactInfo: ContactInfo;
  userAuth: userAuth;
  clientPension: ClientPension;
  clientAccount: ClientAccount;
  clientFamilyInfos: FamilyInfo[];
};
