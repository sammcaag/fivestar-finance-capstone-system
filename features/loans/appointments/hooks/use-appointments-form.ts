import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { getAppointmentById } from "../../api/appointments-api";
import {
  AppointmentsResolver,
  AppointmentsSchema,
  appointmentsFormDefaultValues,
} from "../schema/appointments-schema";
import { AppointmentProps, AppointmentStatus } from "../types/appointment-types";
import { useUpdateAppointment } from "./use-appointment-mutations";

export const useAppointmentsForm = (id: string) => {
  const appointmentForm = useForm<AppointmentsSchema>({
    resolver: AppointmentsResolver,
    defaultValues: appointmentsFormDefaultValues,
  });
  const [isLoading, setIsLoading] = useState(false);
  const { reset } = appointmentForm;
  // Get appointment by id
  const { data: appointmentsData, isLoading: appointmentIsLoading } = useQuery<AppointmentProps>({
    queryKey: ["appointments", id],
    queryFn: () => getAppointmentById({ id }),
  });
  const updateAppointment = useUpdateAppointment();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!appointmentsData || appointmentsData.status === "PENDING") {
      return;
    }

    reset({
      branchId: Number(appointmentsData.branchId),
      staffId: Number(appointmentsData.staffId),
      status: appointmentsData.status as AppointmentStatus,
      appointmentDate: new Date(appointmentsData.appointmentDate),
      remarks: appointmentsData.remarks,
      productType: appointmentsData.productType as
        | "NEW CLIENT"
        | "ADDITIONAL"
        | "RELOAN"
        | "RENEWAL"
        | "EXTENSION",
      maxLoanAmount: Number(appointmentsData.maxLoanAmount),
      monthlyAmortization: Number(appointmentsData.monthlyAmortization),
      availableStartDate: new Date(appointmentsData.availableStartDate),
      availableEndDate: new Date(appointmentsData.availableEndDate),
      term: Number(appointmentsData.term),
    });
  }, [appointmentsData, isLoading]);

  const onSubmit = async (data: AppointmentsSchema) => {
    try {
      setIsLoading(true);
      await updateAppointment.mutateAsync(
        { id, payload: data },
        {
          // Optional: re-fetch user's attachments list after creating one
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["appointments"] });
          },

          // Optional: easier UI error handling
          onError: (error) => {
            console.error("Attachment creation failed:", error);
          },
        }
      );
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      } else {
        console.error("An unknown error occurred");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return {
    appointmentForm,
    isLoading,
    onSubmit,
    appointmentIsLoading,
  };
};
