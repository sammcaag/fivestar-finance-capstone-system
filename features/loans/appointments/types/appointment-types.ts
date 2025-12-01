import type { LoanType } from "../../types/loan-types";

export type AppointmentType = "Consultation" | "Loan Review" | "Document Submission" | "Follow-up";

export type AppointmentStatus = "Scheduled" | "Completed" | "Cancelled" | "No-show";

export interface AppointmentTableProps {
  id: string;
  name: string;
  productType: LoanType;
  type: AppointmentType;
  appointmentDate: string;
  appointmentTime: string;
  status: AppointmentStatus;
  purpose: string;
  notes: string;
}
