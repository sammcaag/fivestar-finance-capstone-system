"use client";
import { Menu } from "@/components/admin-panel/menu";
import { SidebarToggle } from "@/components/admin-panel/sidebar-toggle";
import { Button } from "@/components/ui/button";
import { useSidebar } from "@/hooks/use-sidebar";
import { useStore } from "@/hooks/use-store";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import Logo from "../Logo";

export function Sidebar() {
  const sidebar = useStore(useSidebar, (x) => x);
  const [isHovering, setIsHovering] = useState(false);

  // Notify parent components about hover state changes
  useEffect(() => {
    if (sidebar) {
      const event = new CustomEvent("sidebarHoverChange", {
        detail: { isHovering },
      });
      window.dispatchEvent(event);
    }
  }, [isHovering, sidebar]);

  // Handle hover events
  const handleMouseEnter = () => {
    if (sidebar && !sidebar.isOpen) {
      setIsHovering(true);
    }
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  // If sidebar state is not available yet, render nothing
  if (!sidebar) return null;

  const { isOpen, toggleOpen, settings } = sidebar;

  // Determine if sidebar should be expanded based on isOpen state or hover state
  const isExpanded = isOpen || isHovering;

  return (
    <div
      className={cn(
        "fixed top-0 left-0 z-20 h-screen lg:translate-x-0 transition-[width] ease-in-out duration-200",
        isExpanded ? "w-72" : "w-[90px]",
        settings.disabled && "hidden"
      )}
    >
      <SidebarToggle isOpen={isOpen} setIsOpen={toggleOpen} />
      <div className="relative h-full flex flex-col px-3 my-4 overflow-y-hidden shadow-md dark:shadow-zinc-800 bg-background">
        <Button
          className={cn(
            "transition-transform ease-in-out duration-300 mb-1",
            !isExpanded ? "translate-x-1" : "translate-x-0"
          )}
          variant="link"
          asChild
        >
          <Logo getOpenState={() => isExpanded} withLabel={isExpanded} />
        </Button>
        <aside
          className="relative p-0 m-0 mt-10"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <Menu isOpen={isExpanded} />
        </aside>
      </div>
    </div>
  );
}
