import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { updateAppointment } from "../../api/appointments-api";

export function useUpdateAppointment(
  options?: UseMutationOptions<
    Awaited<ReturnType<typeof updateAppointment>>, // mutation result
    unknown, // error type
    Parameters<typeof updateAppointment>[0] // variables type { userId, payload }
  >
) {
  return useMutation({
    mutationFn: updateAppointment,
    ...options,
  });
}
