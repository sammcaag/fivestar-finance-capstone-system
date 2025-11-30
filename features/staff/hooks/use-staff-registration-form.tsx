"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { StaffFormValues, StaffPayload } from "../types/staff-types";
import { defaultValues, formDates } from "../libs/staff-registration-form";
import { staffGeneralInfoSchema } from "../schema/staff-zod-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { loadDraft, saveDraft } from "../utils/staff-draft-data-storage";
import {
  mapBackendToStaffFormValues,
  staffPayload,
} from "../libs/staff-payload";
import { createStaffApi, updateStaffApi } from "../api/staff-service";
import { useDialog } from "@/contexts/DialogContext";
import { useAuth } from "@/features/auth/context/AuthContext";

export function useStaffRegistrationForm() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { showDialog } = useDialog();
  const { user } = useAuth();
  const userId = user!.id;

  const [formModified, setFormModified] = useState(false);
  const [hasDraft, setHasDraft] = useState(false);

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

  const { mutateAsync: updateStaff } = useMutation({
    mutationKey: ["updateStaff"],
    mutationFn: ({
      staffId,
      payload,
    }: {
      staffId: string;
      payload: StaffPayload;
    }) => updateStaffApi(staffId, payload),
    onSuccess: (_, variables) => {
      // variables contains the object passed to mutate
      queryClient.invalidateQueries({
        queryKey: ["staffByStaffId", variables.staffId],
      });
    },
  });

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
    localStorage.removeItem("staff-form-draft");
    setHasDraft(false);
    showDialog("Draft has been deleted successfully!", "error");
  };

  // Clear form
  const clearForm = () => {
    form.reset(defaultValues);
    setFormModified(false);
    showDialog("Form has been cleared!", "info");
  };

  const resetForm = useCallback(
    (backendData: StaffPayload, isShowMessage: boolean = true) => {
      const mappedValues = mapBackendToStaffFormValues(backendData); // map backend payload to form values
      console.log(
        "THIS IS THE FETCHED MAPPPED DATA:",
        JSON.stringify(mappedValues, null, 2)
      );
      form.reset(mappedValues);
      setFormModified(false);
      if (isShowMessage)
        showDialog("Form has been reset to staff values!", "success");
    },
    [form, showDialog]
  );

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
      showDialog("Staff information registered successfully!", "success");
      router.push(`/staff/${result.staffId}`);
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

  const updateForm = async (
    data: StaffFormValues,
    fetchedData: StaffPayload
  ) => {
    setIsSubmitting(true);
    const backendPayload = staffPayload(data);
    console.log(
      "THIS IS THE UPDATED DATA PASSED",
      JSON.stringify(backendPayload, null, 2)
    );
    try {
      const result = await updateStaff({
        staffId: fetchedData.staffId,
        payload: backendPayload,
      }); // ✅ await
      console.log("Result:", result);
      showDialog("Staff information updated successfully!", "success");

      console.log("IS THIS THE OWNER?", result.staffId === userId);
      if (result.staffId === userId) {
        router.push("/settings/profile");
      } else {
        router.push(`/staff/${result.staffId}`);
      }
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
    isSubmitting,
    resetForm,
    updateForm,
  };
}
