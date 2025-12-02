"use client";

import { useDialog } from "@/contexts/DialogContext";
import { useAuth } from "@/features/auth/context/AuthContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { createLoanHistoryApi, updateLoanHistoryApi } from "../api/loan-history-service";
import { defaultValues } from "../lib/loan-history-form";
import { loanHistoryPayload, mapBackendToLoanHistoryFormValues } from "../lib/loan-history-payload";
import { loanHistorySchema } from "../schema/loan-history-zod-schema";
import { LoanHistoryFormValues, LoanHistoryPayload } from "../types/loan-form-types";

export function useLoanHistoryForm() {
  const router = useRouter();
  const { showDialog } = useDialog();
  const { user } = useAuth();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<LoanHistoryFormValues>({
    resolver: zodResolver(loanHistorySchema),
    mode: "onTouched",
    reValidateMode: "onChange",
    defaultValues,
  });

  const { mutateAsync: addLoanHistory } = useMutation({
    mutationKey: ["createLoanHistory"],
    mutationFn: (payload: LoanHistoryPayload) => createLoanHistoryApi(payload),
  });

  const { mutateAsync: updateLoanHistory } = useMutation({
    mutationKey: ["updateLoanHistory"],
    mutationFn: ({ payload }: { payload: LoanHistoryPayload }) => updateLoanHistoryApi(payload),
  });

  // Clear form
  const clearForm = () => {
    form.reset(defaultValues);
    showDialog("Form has been cleared!", "info");
  };

  const resetForm = useCallback(
    (backendData: LoanHistoryPayload, isShowMessage: boolean = true) => {
      const mappedValues = mapBackendToLoanHistoryFormValues(backendData); // map backend payload to form values
      console.log("THIS IS THE FETCHED MAPPPED DATA:", JSON.stringify(mappedValues, null, 2));
      form.reset(mappedValues);
      if (isShowMessage) showDialog("Form has been reset to staff values!", "success");
    },
    [form, showDialog]
  );

  // Process form
  const processForm = async (branchId: number, clientId: number, data: LoanHistoryFormValues) => {
    setIsSubmitting(true);
    const backendPayload = loanHistoryPayload(branchId, clientId, data);
    console.log("THIS IS THE DATA PASSED", JSON.stringify(backendPayload, null, 2));

    try {
      const result = await addLoanHistory(backendPayload); // ✅ await
      console.log("Result:", result);
      showDialog(`Loan ${data.dedCode} created successfully!`, "success");
      router.push(`/clients/${clientId}/add-loan-history`);
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

  const updateForm = async (data: LoanHistoryFormValues, fetchedData: LoanHistoryPayload) => {
    setIsSubmitting(true);
    const { branchId, clientId, id } = fetchedData;
    const backendPayload = loanHistoryPayload(branchId, clientId, data, id);
    console.log("THIS IS THE UPDATED DATA PASSED", JSON.stringify(backendPayload, null, 2));
    try {
      const result = await updateLoanHistory({ payload: backendPayload }); // ✅ await
      console.log("Result:", result);
      showDialog("Loan history information updated successfully!", "success");

      router.push(`/staff/${result.clientId}`);
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
    clearForm,
    processForm,
    isSubmitting,
    resetForm,
    updateForm,
  };
}
