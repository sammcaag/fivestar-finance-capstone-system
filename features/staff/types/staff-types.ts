export type StaffRole = "admin" | "sales" | "loans";

export type StaffStatus = "active" | "inactive";

export interface Staff {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: StaffRole;
  status: StaffStatus;
  createdAt: string;
  lastLogin?: string;
}

export type StaffTable = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
};

export interface FormErrors {
  [key: string]: string;
}
