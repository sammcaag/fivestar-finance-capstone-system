"use client";

import { createContext, useContext, ReactNode, useState } from "react";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { AuthContextType, IRequestUser } from "../types/auth.types";
import {
  getCurrentUser,
  loginApi,
  logoutApi,
  refreshTokenApi,
} from "../api/auth-service";
import axios from "axios";
import { useDialog } from "@/contexts/DialogContext";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { showDialog } = useDialog();
  const [isProcessing, setIsProcessing] = useState(false);

  const {
    data: currentUser,
    isLoading,
    refetch,
  } = useQuery<IRequestUser>({
    queryKey: ["currentUser"],
    queryFn: getCurrentUser,
    retry: false,
    refetchOnWindowFocus: false,
  });

  // Mutations
  const { mutateAsync: loginMutate } = useMutation({
    mutationKey: ["login"],
    mutationFn: loginApi,
  });
  const { mutateAsync: logoutMutate } = useMutation({
    mutationKey: ["logout"],
    mutationFn: logoutApi,
  });
  const { mutateAsync: refreshMutate } = useMutation({
    mutationKey: ["refreshToken"],
    mutationFn: refreshTokenApi,
  });

  const login = async (username: string, password: string): Promise<void> => {
    setIsProcessing(true);
    try {
      console.log("🔐 Starting login process...");

      // Call login API
      const response = await loginMutate({ email: username, password });
      console.log("✅ Login API response:", response);

      // Fetch fresh user data
      console.log("👤 Fetching current user...");
      const freshUser = await getCurrentUser();
      console.log("✅ Current user fetched:", freshUser);
      console.log(freshUser);
      // Check if user is a CLIENT
      if (freshUser && freshUser.role === "CLIENT") {
        console.log("❌ User is CLIENT, logging out...");
        await logoutMutate();
        showDialog(
          "Access Denied: AFP Retirees and Beneficiaries are not permitted to sign in on this portal. Please use the designated channels for client access.",
          "error"
        );
        return;
      }

      // Set user data in cache
      queryClient.setQueryData(["currentUser"], freshUser);
      console.log("✅ User data set in cache");

      // Show success message from backend
      showDialog(
        response.message || "Login successful! Welcome back.",
        "success"
      );

      console.log("🚀 Redirecting to dashboard...");
      // Small delay to show success message before redirect
      setTimeout(() => {
        router.push("/dashboard");
      }, 1000);
    } catch (err: unknown) {
      console.error("❌ Login error:", err);

      // Extract error message from backend
      let message = "Login failed. Please try again.";

      if (axios.isAxiosError(err)) {
        console.error("Axios error details:", {
          status: err.response?.status,
          data: err.response?.data,
          message: err.message,
        });

        // Get message from backend response
        if (err.response?.data?.message) {
          message = err.response.data.message;
        } else if (err.response?.data?.error) {
          message = err.response.data.error;
        } else if (err.message) {
          message = err.message;
        }
      } else {
        console.error("Non-axios error:", err);
      }

      showDialog(message, "error");
    } finally {
      setIsProcessing(false);
    }
  };

  const logout = async (): Promise<void> => {
    try {
      await logoutMutate();
      queryClient.removeQueries({ queryKey: ["currentUser"] });
      showDialog("Logged out successfully.", "success");
      router.push("/login");
    } catch {
      // ignore
    }
  };

  const refreshToken = async (): Promise<void> => {
    try {
      await refreshMutate();
      await refetch();
    } catch {
      queryClient.removeQueries({ queryKey: ["currentUser"] });
      router.push("/login");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user: currentUser || null,
        isLoading: isLoading || isProcessing,
        login,
        logout,
        refreshToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
