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
