"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { clientFormSchema } from "../schema/client-zod-schema";
import type { ClientFormValues } from "../types/client-types";
import { loadDraft, saveDraft } from "../utils/draft-computation-storage";
import {
  defaultValues,
  formDates,
  optionalFormDates,
  steps,
} from "../lib/client-registration-form";

export function useClientRegistrationForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formModified, setFormModified] = useState(false);
  const [hasDraft, setHasDraft] = useState(false);

  const [dialogMessage, setDialogMessage] = useState("");
  const [dialogVisible, setDialogVisible] = useState(false);

  const form = useForm<ClientFormValues>({
    resolver: zodResolver(clientFormSchema),
    mode: "onBlur",
    reValidateMode: "onSubmit",
    defaultValues,
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
      const dateConversions: Partial<ClientFormValues> = {};
      formDates.forEach((dateField) => {
        const fieldValue = draft.data[dateField as keyof typeof draft.data];
        if (fieldValue) {
          const date = new Date(fieldValue);
          if (!isNaN(date.getTime())) {
            dateConversions[dateField as keyof ClientFormValues] = date as any;
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

  // Validate current step
  const validateCurrentStep = async () => {
    const stepFields = steps[currentStep]?.fields || [];
    if (!stepFields.length) return true;

    const stepShape = stepFields.reduce((acc, field) => {
      acc[field] = clientFormSchema.shape[field];
      return acc;
    }, {} as Record<string, z.ZodTypeAny>);

    const stepSchema = z.object(stepShape);
    const currentValues = Object.fromEntries(
      stepFields.map((field) => [
        field,
        form.getValues()[field as keyof ClientFormValues],
      ])
    );

    const result = await stepSchema.safeParseAsync(currentValues);
    if (!result.success) {
      result.error.errors.forEach((err) => {
        form.setError(err.path[0] as keyof ClientFormValues, {
          type: "manual",
          message: err.message,
        });
      });
      return false;
    }
    return true;
  };

  // Navigation
  const next = async () => {
    const isValid = await validateCurrentStep();
    if (!isValid) return;

    if (currentStep < steps.length - 1) {
      setCurrentStep((s) => s + 1);
    } else {
      await form.handleSubmit(processForm)();
    }
  };

  const prev = () => {
    if (currentStep > 0) setCurrentStep((s) => s - 1);
  };

  // Process form
  const processForm = (data: ClientFormValues) => {
    const cleanedData = { ...data };
    optionalFormDates.forEach((dateField) => {
      const dateValue = cleanedData[dateField as keyof ClientFormValues];
      if (dateValue instanceof Date) {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const dateToCompare = new Date(dateValue);
        dateToCompare.setHours(0, 0, 0, 0);

        if (dateToCompare.getTime() === today.getTime()) {
          (cleanedData as any)[dateField] = null;
        }
      }
    });
    console.log(JSON.stringify(cleanedData, null, 2));
    showDialog("Form submitted successfully!");
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
    setDialogVisible,
  };
}
