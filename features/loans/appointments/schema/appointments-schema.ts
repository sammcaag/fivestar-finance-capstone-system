import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { productTypeArray } from "../../types/loan-form-types";
import { AppointmentStatusArray } from "../types/appointment-types";

export const appointmentsSchema = z.object({
  branchId: z.number(),
  staffId: z.number(),
  status: z.enum(AppointmentStatusArray),
  appointmentDate: z.date(),
  remarks: z.string(),
  productType: z.enum(productTypeArray),
  maxLoanAmount: z.number(),
  monthlyAmortization: z.number(),
  availableStartDate: z.date(),
  availableEndDate: z.date(),
  term: z.number(),
});

export type AppointmentsSchema = z.infer<typeof appointmentsSchema>;

export const AppointmentsResolver = zodResolver(appointmentsSchema);

export const appointmentsFormDefaultValues: AppointmentsSchema = {
  branchId: 0,
  staffId: 0,
  status: "PENDING",
  appointmentDate: new Date(),
  remarks: "",
  productType: "NEW CLIENT",
  maxLoanAmount: 0,
  monthlyAmortization: 0,
  availableStartDate: new Date(),
  availableEndDate: new Date(),
  term: 0,
};
