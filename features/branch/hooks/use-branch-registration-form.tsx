"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { BranchFormValues, BranchPayload } from "../types/branch-types";
import { zodResolver } from "@hookform/resolvers/zod";
import { branchInfoSchema } from "../schema/branch-zod-schema";
import { defaultValues } from "../libs/branch-registration-form";
import { createBranchApi, updateBranchApi } from "../api/branch-service";
import { loadDraft, saveDraft } from "../utils/branch-draft-data-storage";
import {
  branchPayload,
  mapBackendToBranchFormValues,
} from "../libs/branch-payload";
import axios from "axios";

export function useBranchRegistrationForm() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const [formModified, setFormModified] = useState(false);
  const [hasDraft, setHasDraft] = useState(false);

  const [dialogMessage, setDialogMessage] = useState("");
  const [dialogVisible, setDialogVisible] = useState(false);
  const [dialogVariant, setDialogVariant] = useState("info");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<BranchFormValues>({
    resolver: zodResolver(branchInfoSchema),
    mode: "onTouched",
    reValidateMode: "onChange",
    defaultValues,
  });

  const { mutateAsync: addBranch } = useMutation({
    mutationKey: ["createBranch"],
    mutationFn: (payload: BranchPayload) => createBranchApi(payload),
  });

  const { mutateAsync: updateBranch } = useMutation({
    mutationKey: ["updateBranch"],
    mutationFn: ({ id, payload }: { id: number; payload: BranchPayload }) =>
      updateBranchApi(id, payload),
    onSuccess: (_, variables) => {
      // variables contains the object passed to mutate
      queryClient.invalidateQueries({
        queryKey: ["branchById", variables.id],
      });
    },
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
      const formattedData = { ...draft.data };
      form.reset(formattedData as BranchFormValues);
      setFormModified(false);
      showDialog("Draft has been loaded successfully!", "info");
    }
  };

  const deleteSavedDraft = () => {
    localStorage.removeItem("branch-form-draft");
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
    (backendData: BranchPayload, isShowMessage: boolean = true) => {
      const mappedValues = mapBackendToBranchFormValues(backendData); // map backend payload to form values
      console.log(
        "THIS IS THE FETCHED MAPPPED DATA:",
        JSON.stringify(mappedValues, null, 2)
      );
      form.reset(mappedValues);
      setFormModified(false);
      if (isShowMessage)
        showDialog("Form has been reset to staff values!", "success");
    },
    [form]
  );

  // Process form
  const processForm = async (data: BranchFormValues) => {
    setIsSubmitting(true);
    const backendPayload = branchPayload(data);
    console.log(
      "THIS IS THE DATA PASSED",
      JSON.stringify(backendPayload, null, 2)
    );

    try {
      const result = await addBranch(backendPayload); // ✅ await
      console.log("Result:", result);
      showDialog("Branch information registered successfully!", "success");
      router.push(`/branch/${result.id}`);
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
    data: BranchFormValues,
    fetchedData: BranchPayload
  ) => {
    setIsSubmitting(true);
    const backendPayload = branchPayload(data);
    console.log(
      "THIS IS THE UPDATED DATA PASSED",
      JSON.stringify(backendPayload, null, 2)
    );
    try {
      const result = await updateBranch({
        id: fetchedData.id!,
        payload: backendPayload,
      }); // ✅ await
      console.log("Result:", result);
      showDialog("Branch information updated successfully!", "success");
      router.push(`/branch/${result.id}`);
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
    resetForm,
    updateForm,
  };
}
