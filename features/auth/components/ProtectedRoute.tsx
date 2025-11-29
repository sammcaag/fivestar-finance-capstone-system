"use client";

import Loading from "@/components/LoadingPage";
import { useAuth } from "@/features/auth/context/AuthContext";
import { notFound, useRouter } from "next/navigation";
import { useEffect } from "react";
import { ProtectedRouteProps } from "../types/auth.types";

export default function ProtectedRoute({
  allowedRoles,
  children,
}: ProtectedRouteProps) {
  const { user, isLoading, showDialog } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      if (!user) {
        // Not authenticated → redirect to login
        showDialog("Please login to access this page", "error");
        router.push("/login");
      } else if (!allowedRoles.includes(user.role)) {
        // Authenticated but not allowed → redirect to dashboard
        showDialog("Access Denied: You do not have permission", "error");
        router.push("/dashboard");
      }
    }
  }, [isLoading, user, router, allowedRoles, showDialog]);

  // Show loading while checking auth
  if (isLoading) {
    return <Loading />;
  } else if (!user) {
    return notFound();
  }

  // Allowed → render children
  return <>{children}</>;
}
