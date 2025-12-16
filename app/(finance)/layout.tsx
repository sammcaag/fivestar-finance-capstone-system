"use client";

import Loading from "@/components/LoadingPage";
import StaffPanelLayout from "@/components/staff-panel/staff-panel-layout";
import { useAuth } from "@/features/auth/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { user, isLoading } = useAuth();
  const role = user?.role;

  useEffect(() => {
    if (!isLoading && (!user || role === "CLIENT")) {
      router.replace("/unauthorized");
    }
  }, [isLoading, user, role, router]);

  if (isLoading) {
    return <Loading />;
  }

  // Prevent flash of protected content
  if (!user || role === "CLIENT") {
    return <Loading />;
  }

  return <StaffPanelLayout>{children}</StaffPanelLayout>;
}
