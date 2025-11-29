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
  const { user, loading, showDialog } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        // Not authenticated → redirect to login
        showDialog("Please login to access this page", "error");
        router.push("/login");
      } else if (!allowedRoles.includes(user.user.role)) {
        // Authenticated but not allowed → redirect to dashboard
        showDialog("Access Denied: You do not have permission", "error");
        router.push("/dashboard");
      }
    }
  }, [loading, user, router, allowedRoles, showDialog]);

  // Show loading while checking auth
  if (loading) {
    return <Loading />;
  } else if (!user) {
    return notFound();
  }

  // Allowed → render children
  return <>{children}</>;
}
