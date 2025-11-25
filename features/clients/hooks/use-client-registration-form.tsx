"use client";

import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { clientFormSchema } from "../schema/client-zod-schema";
import type { ClientFormValues } from "../types/client-types";
import { loadDraft, saveDraft } from "../utils/draft-computation-storage";
import {
  defaultValues,
  formDates,
  steps,
} from "../lib/client-registration-form";
import {
  clientPayload,
  mapBackendToClientFormValues,
} from "../lib/client-payload";
import { useMutation } from "@tanstack/react-query";
import { createClient } from "../api/client-service";
import { ClientPayload } from "../types/clients";
import { useRouter } from "next/navigation";

export function useClientRegistrationForm() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [formModified, setFormModified] = useState(false);
  const [hasDraft, setHasDraft] = useState(false);

  const [dialogMessage, setDialogMessage] = useState("");
  const [dialogVisible, setDialogVisible] = useState(false);

  const form = useForm<ClientFormValues>({
    resolver: zodResolver(clientFormSchema),
    mode: "onTouched",
    reValidateMode: "onChange",
    defaultValues,
  });

  const { mutateAsync: addClient } = useMutation({
    mutationKey: ["createClient"],
    mutationFn: (payload: ClientPayload) => createClient(payload),
  });

  // Show dialog helper
  const showDialog = (message: string) => {
    setDialogMessage(message);
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
    showDialog("Draft has been saved successfully!");
  };

  const loadSavedDraft = () => {
    const draft = loadDraft();
    if (draft) {
      const dateConversions: Partial<Record<keyof ClientFormValues, Date>> = {};
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
            dateConversions[dateField as keyof ClientFormValues] = date;
          }
        }
      });
      const formattedData = { ...draft.data, ...dateConversions };
      form.reset(formattedData as ClientFormValues);
      setFormModified(false);
      showDialog("Draft has been loaded successfully!");
    }
  };

  const deleteSavedDraft = () => {
    localStorage.removeItem("form-draft");
    setHasDraft(false);
    showDialog("Draft has been deleted successfully!");
  };

  // Clear form
  const clearForm = () => {
    form.reset(defaultValues);
    setFormModified(false);
    setCurrentStep(0);
    showDialog("Form has been cleared!");
  };

  const resetForm = useCallback(
    (backendData: ClientPayload) => {
      const mappedValues = mapBackendToClientFormValues(backendData); // map backend payload to form values
      console.log(
        "THIS IS THE FETCHED MAPPPED DATA:",
        JSON.stringify(mappedValues)
      );
      form.reset(mappedValues);
      setFormModified(false);
      setCurrentStep(0);
      showDialog("Form has been reset to client values!");
    },
    [form]
  );

  // Navigation
  const next = async () => {
    const stepFields = steps[currentStep].fields as (keyof ClientFormValues)[];

    // Validate only the fields in the current step
    const isValid = await form.trigger(stepFields);

    if (!isValid) return;

    // Wait for next tick to avoid immediate render triggering validation of Step 4
    setTimeout(() => {
      setCurrentStep((step) => step + 1);
    });
  };

  const prev = () => {
    if (currentStep > 0) setCurrentStep((s) => s - 1);
  };

  // Process form
  const processForm = async (data: ClientFormValues) => {
    const backendPayload = clientPayload(data);
    console.log("THIS IS THE DATA PASSED", backendPayload);

    try {
      const result = await addClient(backendPayload); // ✅ await
      console.log("Result:", result);
      showDialog("Form submitted successfully!");
      router.push(`/clients/${result.serialNumber}`);
    } catch (error) {
      console.log("Error:", error);
      showDialog("Failed to submit form!");
    }
  };

  return {
    form,
    currentStep,
    formModified,
    hasDraft,
    prev,
    next,
    handleSaveDraft,
    loadSavedDraft,
    deleteSavedDraft,
    clearForm,
    processForm,
    dialogMessage,
    dialogVisible,
    resetForm,
  };
}
