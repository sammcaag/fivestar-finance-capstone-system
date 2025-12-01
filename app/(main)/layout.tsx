"use client";

import AdminPanelLayout from "@/components/staff-panel/staff-panel-layout";
import ProtectedRoute from "@/features/auth/components/ProtectedRoute";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedRoute allowedRoles={["ADMIN", "LOANS", "SALES"]}>
      <AdminPanelLayout>{children}</AdminPanelLayout>
    </ProtectedRoute>
  );
}
