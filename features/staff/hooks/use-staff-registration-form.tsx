"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { StaffFormValues, StaffPayload } from "../types/staff-types";
import { defaultValues, formDates } from "../libs/staff-registration-form";
import { staffGeneralInfoSchema } from "../schema/staff-zod-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { loadDraft, saveDraft } from "../utils/staff-draft-data-storage";
import { staffPayload } from "../libs/staff-payload";
import { createStaffApi } from "../api/staff-service";

export function useStaffRegistrationForm() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const [formModified, setFormModified] = useState(false);
  const [hasDraft, setHasDraft] = useState(false);

  const [dialogMessage, setDialogMessage] = useState("");
  const [dialogVisible, setDialogVisible] = useState(false);
  const [dialogVariant, setDialogVariant] = useState("info");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<StaffFormValues>({
    resolver: zodResolver(staffGeneralInfoSchema),
    mode: "onTouched",
    reValidateMode: "onChange",
    defaultValues,
  });

  const { mutateAsync: addStaff } = useMutation({
    mutationKey: ["createStaff"],
    mutationFn: (payload: StaffPayload) => createStaffApi(payload),
  });

  // Show dialog helper
  const showDialog = (
    message: string,
    variant: "success" | "error" | "info" | "warning"
  ) => {
    setDialogMessage(message);
    setDialogVariant(variant);
    setDialogVisible(true);
    setTimeout(() => setDialogVisible(false), 2000); // auto-close after 2s
  };

  // Check for saved draft on mount
  useEffect(() => {
    const draft = loadDraft();
    if (draft) setHasDraft(true);
  }, []);

  // Watch form changes
  useEffect(() => {
    const subscription = form.watch(() => {
      setFormModified(Object.keys(form.formState.dirtyFields).length > 0);
    });
    return () => subscription.unsubscribe();
  }, [form]);

  // Draft actions
  const handleSaveDraft = () => {
    saveDraft(form.getValues());
    setHasDraft(true);
    showDialog("Draft has been saved successfully!", "success");
  };

  const loadSavedDraft = () => {
    const draft = loadDraft();
    if (draft) {
      const dateConversions: Partial<Record<keyof StaffFormValues, Date>> = {};
      formDates.forEach((dateField) => {
        const fieldValue = draft.data[dateField as keyof typeof draft.data];

        if (
          fieldValue &&
          (typeof fieldValue === "string" ||
            typeof fieldValue === "number" ||
            fieldValue instanceof Date)
        ) {
          const date = new Date(fieldValue);
          if (!isNaN(date.getTime())) {
            dateConversions[dateField as keyof StaffFormValues] = date;
          }
        }
      });
      const formattedData = { ...draft.data, ...dateConversions };
      form.reset(formattedData as StaffFormValues);
      setFormModified(false);
      showDialog("Draft has been loaded successfully!", "info");
    }
  };

  const deleteSavedDraft = () => {
    localStorage.removeItem("form-draft");
    setHasDraft(false);
    showDialog("Draft has been deleted successfully!", "error");
  };

  // Clear form
  const clearForm = () => {
    form.reset(defaultValues);
    showDialog("Form has been cleared!", "info");
  };

  // Process form
  const processForm = async (data: StaffFormValues) => {
    setIsSubmitting(true);
    const backendPayload = staffPayload(data);
    console.log(
      "THIS IS THE DATA PASSED",
      JSON.stringify(backendPayload, null, 2)
    );

    try {
      const result = await addStaff(backendPayload); // ✅ await
      console.log("Result:", result);
      showDialog("Client information registered successfully!", "success");
      router.push(`/clients/${result.staffId}`);
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
    formModified,
    hasDraft,
    handleSaveDraft,
    loadSavedDraft,
    deleteSavedDraft,
    clearForm,
    processForm,
    dialogMessage,
    dialogVisible,
    dialogVariant,
    isSubmitting,
  };
}
