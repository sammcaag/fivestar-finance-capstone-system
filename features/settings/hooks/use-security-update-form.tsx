"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { useDialog } from "@/contexts/DialogContext";
import { useAuth } from "@/features/auth/context/AuthContext";
import { SecurityFormValues, SecurityPayload } from "../types/security-types";
import { updateSecurityApi } from "../api/security-service";
import { useForm } from "react-hook-form";
import { securityAuthSchema } from "../schema/security-zod-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { defaultValues } from "../libs/securtiy-update-form";
import {
  mapBackendToSecurityFormValues,
  securityPayload,
} from "../libs/security-payload";
import axios from "axios";

export function useSecurityUpdateForm() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { showDialog } = useDialog();
  const { user } = useAuth();
  const userId = user!.id;

  const [isSubmitting, setIsSubmitting] = useState(false);

  const { mutateAsync: updateSecurity } = useMutation({
    mutationKey: ["updateSecurity"],
    mutationFn: ({ payload }: { payload: SecurityPayload }) =>
      updateSecurityApi(payload),
    onSuccess: () => {
      // variables contains the object passed to mutate
      queryClient.invalidateQueries({
        queryKey: ["ownerByStaffId", userId],
      });
    },
  });

  const form = useForm<SecurityFormValues>({
    resolver: zodResolver(securityAuthSchema),
    mode: "all",
    reValidateMode: "onChange",
    defaultValues,
  });

  const resetForm = useCallback(
    (email: string, isShowMessage: boolean = true) => {
      const mappedValues = mapBackendToSecurityFormValues(email); // map backend payload to form values
      console.log(
        "THIS IS THE FETCHED MAPPPED DATA:",
        JSON.stringify(mappedValues, null, 2)
      );
      form.reset(mappedValues);
      if (isShowMessage)
        showDialog("Form has been reset to staff values!", "success");
    },
    [form, showDialog]
  );

  const updateForm = async (data: SecurityFormValues) => {
    setIsSubmitting(true);
    const backendPayload = securityPayload(data, user!.email);
    console.log(
      "THIS IS THE UPDATED DATA PASSED",
      JSON.stringify(backendPayload, null, 2)
    );
    try {
      const result = await updateSecurity({ payload: backendPayload }); // ✅ await
      console.log("Result:", result);
      showDialog("Security information updated successfully!", "success");

      router.push("/settings/security");
    } catch (error) {
      console.log("Error:", error);

      const errorMessage = axios.isAxiosError(error)
        ? error.response?.data?.error || "Request failed"
        : "Unexpected error";

      showDialog(errorMessage, "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    form,
    isSubmitting,
    resetForm,
    updateForm,
  };
}
