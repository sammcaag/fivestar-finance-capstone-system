export interface Appointment {
  id: string;
  clientName: string;
  type: "Consultation" | "Loan Review" | "Document Submission" | "Follow-up";
  status: "Scheduled" | "Completed" | "Cancelled" | "No-show";
  appointmentDate: string;
  appointmentTime: string;
  purpose: string;
  notes: string;
}
