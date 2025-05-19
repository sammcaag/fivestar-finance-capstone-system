"use client";

import type React from "react";

import { Sidebar } from "@/components/admin-panel/sidebar";
import { useSidebar } from "@/hooks/use-sidebar";
import { useStore } from "@/hooks/use-store";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";

export default function AdminPanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const sidebar = useStore(useSidebar, (x) => x);
  const [isHovering, setIsHovering] = useState(false);

  // Listen for sidebar hover events
  useEffect(() => {
    const handleSidebarHover = (event: Event) => {
      const customEvent = event as CustomEvent;
      setIsHovering(customEvent.detail.isHovering);
    };

    window.addEventListener("sidebarHoverChange", handleSidebarHover);

    return () => {
      window.removeEventListener("sidebarHoverChange", handleSidebarHover);
    };
  }, []);

  // If sidebar state is not available yet, render just the children
  if (!sidebar) {
    return <>{children}</>;
  }

  const { isOpen, settings } = sidebar;

  // Determine margin based on sidebar state (open or hover)
  const isExpanded = isOpen || isHovering;

  return (
    <>
      <Sidebar />
      <main
        className={cn(
          "min-h-[100vh] bg-zinc-50 dark:bg-zinc-900 transition-[margin-left] ease-in-out duration-300",
          // Only apply margin on large screens
          !settings.disabled && (isExpanded ? "lg:ml-72" : "lg:ml-[90px]")
        )}
      >
        {children}
      </main>
    </>
  );
}
