export type AppointmentStatus =
  | "PENDING"
  | "CONFIRMED"
  | "RESCHEDULE_REQUIRED"
  | "CANCELLED_BY_USER"
  | "CANCELLED_BY_ADMIN"
  | "COMPLETED";

export const AppointmentStatusArray = [
  "PENDING",
  "CONFIRMED",
  "RESCHEDULE_REQUIRED",
  "CANCELLED_BY_USER",
  "CANCELLED_BY_ADMIN",
  "COMPLETED",
] as const;

export interface AppointmentProps {
  id: number;
  clientId: number;
  branchId: number;
  staffId: number;
  status: AppointmentStatus;
  appointmentDate: string;
  remarks: string;
  productType: string;
  maxLoanAmount: number;
  monthlyAmortization: number;
  availableStartDate: string;
  availableEndDate: string;
  scheduledDateTime: string;
  term: number;
  createdAt: string;
  updatedAt: string;
}

export interface AppointmentTableProps {
  id: number;
  productType?: string | null;
  maxLoanAmount?: number | null;
  monthlyAmortization?: number | null;
  status: AppointmentStatus;
  scheduledDateTime?: string | null;
  client: {
    id: number;
    fullName: string;
  };
  branch?: {
    id: number;
    name?: string | null;
  } | null;
  staff?: {
    id: number;
    fullName?: string | null;
  } | null;
}
