export type UserRole = "admin" | "staff" | "manager";

export type UserStatus = "active" | "inactive" | "suspended";

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  department?: string;
  createdAt: string;
  lastLogin?: string;
}

export interface AuditLog {
  id: string;
  timestamp: string;
  userId: string;
  userName: string;
  action: string;
  resource: string;
  details?: string;
  ipAddress?: string;
}

export interface Client {
  id: string;
  firstName: string;
  lastName: string;
  afpNumber: string;
  email: string;
  phone: string;
  status: "active" | "inactive" | "pending";
  totalLoans: number;
  outstandingBalance: number;
  createdAt: string;
  lastUpdated: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: "info" | "warning" | "success" | "error";
  targetAudience: "all" | "staff" | "clients";
  createdBy: string;
  createdAt: string;
  expiresAt?: string;
  isActive: boolean;
}

export interface ReportSummary {
  totalClients: number;
  activeLoans: number;
  totalDisbursed: number;
  totalCollected: number;
  pendingApplications: number;
  overdueLoans: number;
}
