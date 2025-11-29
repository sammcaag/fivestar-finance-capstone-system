"use client";

import { createContext, useContext, ReactNode, useState } from "react";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { IRequestUser } from "../types/auth.types";
import {
  getCurrentUser,
  loginApi,
  logoutApi,
  refreshTokenApi,
} from "../api/auth-service";
import axios from "axios";

interface AuthContextType {
  user: IRequestUser | null;
  loading: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshToken: () => Promise<void>;
  dialogMessage: string | null;
  dialogVariant: "success" | "error" | "info" | "warning";
  setDialog: (
    message: string,
    variant?: "success" | "error" | "info" | "warning"
  ) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [dialogMessage, setDialogMessage] = useState<string | null>(null);
  const [dialogVariant, setDialogVariant] = useState<
    "success" | "error" | "info" | "warning"
  >("info");

  const {
    data: currentUser,
    isLoading,
    refetch,
  } = useQuery<IRequestUser>({
    queryKey: ["currentUser"],
    queryFn: getCurrentUser,
  });

  const setDialog = (
    message: string,
    variant: "success" | "error" | "info" | "warning" = "info"
  ) => {
    setDialogMessage(message);
    setDialogVariant(variant);
    setTimeout(() => setDialogMessage(null), 4000);
  };

  // ----------------------------
  // Login mutation
  // ----------------------------
  const { mutateAsync: loginMutate } = useMutation({
    mutationKey: ["login"],
    mutationFn: loginApi,
  });

  // ----------------------------
  // Logout mutation
  // ----------------------------
  const { mutateAsync: logoutMutate } = useMutation({
    mutationKey: ["logout"],
    mutationFn: logoutApi,
  });

  const login = async (username: string, password: string): Promise<void> => {
    try {
      await loginMutate({ email: username, password });

      const freshUser = await getCurrentUser();

      if (freshUser.user.role === "CLIENT") {
        await logoutMutate();
        setDialog(
          "Access Denied: AFP Retirees and Beneficiaries are not permitted to sign in on this portal. Please use the designated channels for client access.",
          "error"
        );
        throw new Error("Access restricted for clients.");
      }

      await refetch();
      setDialog("Login successful! Welcome back.", "success");
      router.push("/dashboard");
    } catch (err: unknown) {
      let message =
        "Login failed. Please check your credentials and try again.";
      if (axios.isAxiosError(err) && err.response?.data?.message) {
        message = err.response.data.message;
      }
      setDialog(message, "error");
      throw new Error(message);
    }
  };

  const logout = async (): Promise<void> => {
    try {
      await logoutMutate();
      queryClient.removeQueries({ queryKey: ["currentUser"] });
      setDialog("Logged out successfully.", "success");
      router.push("/login");
    } catch {
      // silently ignore
    }
  };

  // ----------------------------
  // Refresh token mutation
  // ----------------------------
  const { mutateAsync: refreshMutate } = useMutation({
    mutationKey: ["refreshToken"],
    mutationFn: refreshTokenApi,
  });

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
        loading: isLoading,
        login,
        logout,
        refreshToken,
        dialogMessage,
        dialogVariant,
        setDialog,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
