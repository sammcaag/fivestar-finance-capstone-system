export type AppointmentStatus =
  | "PENDING"
  | "CONFIRMED"
  | "RESCHEDULE_REQUIRED"
  | "CANCELLED_BY_USER"
  | "CANCELLED_BY_ADMIN"
  | "COMPLETED";

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
  productType: string;
  maxLoanAmount: number;
  monthlyAmortization: number;
  status: AppointmentStatus;
  scheduledDateTime: string;
  client: {
    id: number;
    fullName: string;
  };
  branch: {
    id: number;
    name: string;
  };
  staff: {
    id: number;
    fullName: string;
  };
}
