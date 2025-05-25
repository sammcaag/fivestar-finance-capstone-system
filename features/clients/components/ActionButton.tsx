"use client";
import { Button } from "@/components/ui/button";
import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

interface ActionButtonProps {
  icon: LucideIcon;
  children: ReactNode;
  expandText?: string;
  onClick?: () => void;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  className?: string;
}

export function ActionButton({
  icon: Icon,
  children,
  expandText,
  onClick,
  variant = "outline",
  disabled = false,
  type = "button",
  className = "",
}: ActionButtonProps) {
  return (
    <Button
      type={type}
      onClick={onClick}
      variant={variant}
      disabled={disabled}
      className={`group flex items-center gap-1 rounded-md shadow-sm hover:shadow-md transition-all duration-200 ${className}`}
    >
      <div className="flex items-center gap-2">
        <Icon className="size-4" />
        {expandText ? (
          <span className="w-0 overflow-hidden opacity-0 transition-all duration-300 group-hover:w-auto group-hover:opacity-100 group-hover:ml-1">
            {expandText}
          </span>
        ) : (
          children
        )}
      </div>
    </Button>
  );
}
