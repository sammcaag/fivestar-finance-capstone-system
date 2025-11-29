"use client";

import { useAuth } from "../context/AuthContext";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { defaultValues, loginSchema, LoginSchema } from "../libs/auth-form";
import { AuthFormValues } from "../types/auth.types";
import { useEffect, useState } from "react";

export function useAuthSignInForm() {
  const { login, isLoading, dialogMessage, dialogVariant, dialogTimestamp } =
    useAuth(); // ✅ Get dialog state from context

  const [dialogVisible, setDialogVisible] = useState(false);

  const form = useForm<AuthFormValues>({
    resolver: zodResolver(loginSchema),
    mode: "onTouched",
    reValidateMode: "onChange",
    defaultValues,
  });

  // ✅ Watch for changes in dialogTimestamp to show dialog even with same message
  useEffect(() => {
    if (dialogMessage && dialogTimestamp) {
      setDialogVisible(true);
      const timer = setTimeout(() => setDialogVisible(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [dialogTimestamp, dialogMessage]);

  const handleLogin = async (data: LoginSchema) => {
    try {
      await login(data.email, data.password);
      // AuthContext handles redirection based on role
    } catch (err) {
      // Error is already handled in AuthContext
      console.error(err);
    }
  };

  return {
    isLoading,
    dialogMessage: dialogMessage || "", // ✅ Pass message from context
    dialogVariant, // ✅ Pass variant from context
    dialogVisible,
    handleLogin,
    form,
  };
}
