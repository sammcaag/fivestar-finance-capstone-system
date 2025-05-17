"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { Switch } from "@/components/ui/switch";
import { Button } from "./ui/button";

export function ModeToggle() {
  const { setTheme, theme } = useTheme();
  const isDark = theme === "dark";

  // Handler to toggle theme
  const handleToggle = (checked: boolean) => {
    setTheme(checked ? "dark" : "light");
  };

  return (
    <Button
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      // size="custom"
      onClick={(e) => {
        e.stopPropagation();
        handleToggle(!isDark);
      }}
      className="w-full flex flex-row items-center justify-between p-0 px-2 bg-transparent rounded-lg hover:bg-accent transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
    >
      {/* Left: Icons */}
      <span className="flex items-center mr-1">
        <MoonIcon
          className={`transition-colors ${
            isDark ? "text-foreground visible" : "text-muted-foreground hidden"
          }`}
        />
        <SunIcon
          className={`transition-colors ${
            isDark ? "text-muted-foreground hidden" : "text-foreground visible"
          }`}
        />
      </span>
      {/* Center: Mode Name */}
      <span className="flex-1 text-foreground text-start font-normal select-none">
        {isDark ? "Dark" : "Light"}
      </span>
      {/* Right: Switch */}
      <Switch
        checked={isDark}
        tabIndex={-1}
        aria-hidden="true"
        onCheckedChange={(checked) => handleToggle(checked)}
      />
    </Button>
  );
}
