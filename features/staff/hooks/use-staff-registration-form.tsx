"use client";

import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { StaffFormValues } from "../types/staff-types";
import { defaultValues } from "../libs/staff-registration-form";
import { staffGeneralInfoSchema } from "../schema/staff-zod-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";

export function useStaffRegistrationForm() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const [dialogMessage, setDialogMessage] = useState("");
  const [dialogVisible, setDialogVisible] = useState(false);
  const [dialogVariant, setDialogVariant] = useState("info");

  const form = useForm<StaffFormValues>({
    resolver: zodResolver(staffGeneralInfoSchema),
    mode: "onTouched",
    reValidateMode: "onChange",
    defaultValues,
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

  // Clear form
  const clearForm = () => {
    form.reset(defaultValues);
    showDialog("Form has been cleared!", "info");
  };

  // Process form
  const processForm = async (data: StaffFormValues) => {
    // const backendPayload = clientPayload(data);
    console.log(
      "THIS IS THE DATA PASSED"
      //   JSON.stringify(backendPayload, null, 2)
    );

    try {
      //   const result = await addClient(backendPayload); // ✅ await
      //   console.log("Result:", result);
      showDialog("Client information registered successfully!", "success");
      router.push(`/clients/${result.serialNumber}`);
    } catch (error) {
      console.log("Error:", error);

      const errorMessage = axios.isAxiosError(error)
        ? error.response?.data?.error || "Request failed"
        : "Unexpected error";

      showDialog(errorMessage, "error");
    }
  };

  return {
    form,
    clearForm,
    processForm,
    dialogMessage,
    dialogVisible,
    dialogVariant,
  };
}
