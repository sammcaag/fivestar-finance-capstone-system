"use client";

import Loading from "@/components/LoadingPage";
import { useAuth } from "@/features/auth/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { ProtectedRouteProps } from "../types/auth.types";
import { useDialog } from "@/contexts/DialogContext";
import { LoadingSpinner } from "@/components/LoadingSpinner";

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
        router.push("/sign-in");
      } else if (!allowedRoles.includes(user.role)) {
        // Authenticated but not allowed → redirect to dashboard
        showDialog("Access Denied: You do not have permission", "error");
        router.push("/sign-in");
      }
    }
  }, [isLoading, user, router, allowedRoles, showDialog]);

  if (isLoading) {
    return <Loading />;
  } else if (!isLoading || !user) {
    return <LoadingSpinner />;
  }

  // Allowed → render children
  return <>{children}</>;
}
