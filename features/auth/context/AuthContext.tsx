"use client";

import { createContext, useContext, ReactNode, useState } from "react";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { AuthContextType, IRequestUser } from "../types/auth.types";
import { getCurrentUser, refreshTokenApi, signInApi, signOutApi } from "../api/auth-service";
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
  const { mutateAsync: signInMutate } = useMutation({
    mutationKey: ["sign-in"],
    mutationFn: signInApi,
  });
  const { mutateAsync: signOutMutate } = useMutation({
    mutationKey: ["sign-out"],
    mutationFn: signOutApi,
  });
  const { mutateAsync: refreshMutate } = useMutation({
    mutationKey: ["refreshToken"],
    mutationFn: refreshTokenApi,
  });

  const signIn = async (username: string, password: string): Promise<void> => {
    setIsProcessing(true);
    try {
      console.log("🔐 Starting login process...");

      // Call login API
      const response = await signInMutate({ email: username, password });
      console.log("✅ Login API response:", response);

      // Fetch fresh user data
      console.log("👤 Fetching current user...");
      const freshUser = await getCurrentUser();
      console.log("✅ Current user fetched:", freshUser);
      console.log(freshUser);
      // Check if user is a CLIENT
      if (freshUser && freshUser.role === "CLIENT") {
        console.log("❌ User is CLIENT, logging out...");
        await signOutMutate();
        showDialog(
          "Access Denied: AFP Retirees and Beneficiaries must use the designated client channels.",
          "error"
        );
        router.push("/unauthorized");
        return;
      }

      // Set user data in cache
      queryClient.setQueryData(["currentUser"], freshUser);
      console.log("✅ User data set in cache");

      // Show success message from backend
      showDialog(response.message || "Login successful! Welcome back.", "success");

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

  const signOut = async (): Promise<void> => {
    try {
      await signOutMutate();
      queryClient.removeQueries({ queryKey: ["currentUser"] });
      showDialog("Logged out successfully.", "success");
      router.push("/sign-in");
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
        signIn,
        signOut,
        refreshToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
