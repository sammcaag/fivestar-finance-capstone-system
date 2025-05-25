"use client";
import type { LucideIcon } from "lucide-react";

interface IconWithLabelProps {
  icon: LucideIcon;
  label: string;
}

export function IconWithLabel({ icon: Icon, label }: IconWithLabelProps) {
  return (
    <div className="flex items-center gap-2">
      <Icon className="h-4 w-4 text-primary" />
      {label}
    </div>
  );
}
