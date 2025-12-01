"use client";

import AdminPanelLayout from "@/components/staff-panel/staff-panel-layout";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <AdminPanelLayout>{children}</AdminPanelLayout>;
}
