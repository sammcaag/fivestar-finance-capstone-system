"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { defaultValues, loginSchema, LoginSchema } from "../libs/auth-form";
import { AuthFormValues } from "../types/auth.types";

export function useAuthSignInForm() {
  const { signIn, isLoading } = useAuth(); // ✅ Get dialog state from context

  const form = useForm<AuthFormValues>({
    resolver: zodResolver(loginSchema),
    mode: "all",
    reValidateMode: "onChange",
    defaultValues,
  });

  const handleLogin = async (data: LoginSchema) => {
    try {
      await signIn(data.email, data.password);
      // AuthContext handles redirection based on role
    } catch (err) {
      // Error is already handled in AuthContext
      console.error(err);
    }
  };

  return {
    isLoading,
    handleLogin,
    form,
  };
}
