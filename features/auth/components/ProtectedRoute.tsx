"use client";

import Loading from "@/components/LoadingPage";
import { useAuth } from "@/features/auth/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { ProtectedRouteProps } from "../types/auth.types";
import { useDialog } from "@/contexts/DialogContext";

export default function ProtectedRoute({
  allowedRoles,
  children,
}: ProtectedRouteProps) {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const { showDialog } = useDialog();

  useEffect(() => {
    if (!isLoading) {
      if (!user) {
        // Not authenticated → redirect to login
        showDialog("Please sign in to access this page", "error");
      } else if (!allowedRoles.includes(user.role)) {
        // Authenticated but not allowed → redirect to dashboard
        showDialog("Access Denied: You do not have permission", "error");
      }
    }
  }, [isLoading, user, router, allowedRoles, showDialog]);

  if (isLoading) {
    return <Loading />;
  }

  // Allowed → render children
  return <>{children}</>;
}
