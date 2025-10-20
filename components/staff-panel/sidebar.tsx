"use client";
import { Menu } from "@/components/staff-panel/menu";
import { SidebarToggle } from "@/components/staff-panel/sidebar-toggle";
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
        "fixed top-0 left-0 z-20 h-screen transition-[width] ease-in-out duration-400",
        // Hide on medium and smaller screens, show on large screens
        "hidden lg:block",
        isExpanded ? "w-72" : "w-[90px]",
        settings.disabled && "hidden"
      )}
    >
      <SidebarToggle
        isOpen={isOpen}
        setIsOpen={toggleOpen}
        isHovering={isHovering}
      />
      <div className="relative h-full flex flex-col my-4 overflow-y-hidden shadow-md dark:shadow-zinc-800 bg-background">
        <Button
          className={cn(
            "transition-transform ease-in-out duration-300 mb-1 mx-auto"
          )}
          variant="link"
          asChild
        >
          <Logo getOpenState={() => isExpanded} withLabel={isExpanded} />
        </Button>
        <aside
          className="relative w-full max-h-fit overflow-auto pb-10"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <Menu isOpen={isExpanded} />
        </aside>
      </div>
    </div>
  );
}
