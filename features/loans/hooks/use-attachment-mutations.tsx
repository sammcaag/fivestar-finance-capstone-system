import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { createClientAttachment, unverifyAttachment, verifyAttachment } from "../api/loans-api";

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

export function useVerifyAttachment(
  options?: UseMutationOptions<
    Awaited<ReturnType<typeof verifyAttachment>>, // mutation result
    unknown, // error type
    Parameters<typeof verifyAttachment>[0] // variables type { userId, payload }
  >
) {
  return useMutation({
    mutationFn: verifyAttachment,
    ...options,
  });
}

export function useUnverifyAttachment(
  options?: UseMutationOptions<
    Awaited<ReturnType<typeof unverifyAttachment>>, // mutation result
    unknown, // error type
    Parameters<typeof unverifyAttachment>[0] // variables type { userId, payload }
  >
) {
  return useMutation({
    mutationFn: unverifyAttachment,
    ...options,
  });
}