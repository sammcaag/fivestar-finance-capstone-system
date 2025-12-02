import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { createClientAttachment } from "../api/loans-api";

export function useCreateClientAttachment(
  options?: UseMutationOptions<
    Awaited<ReturnType<typeof createClientAttachment>>, // mutation result
    unknown, // error type
    Parameters<typeof createClientAttachment>[0] // variables type { userId, payload }
  >
) {
  return useMutation({
    mutationFn: createClientAttachment,
    ...options,
  });
}
