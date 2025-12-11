"use client";

import StaffPanelLayout from "@/components/staff-panel/staff-panel-layout";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <StaffPanelLayout>{children}</StaffPanelLayout>;
}
