"use client";
import { Input } from "@/components/ui/input";
import type React from "react";

import type { LucideIcon } from "lucide-react";
import { forwardRef } from "react";

interface InputWithIconProps extends React.ComponentProps<typeof Input> {
  icon: LucideIcon;
}

export const InputWithIcon = forwardRef<HTMLInputElement, InputWithIconProps>(
  ({ icon: Icon, className, ...props }, ref) => {
    return (
      <div className="relative w-full">
        <Icon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          ref={ref}
          className={`w-full rounded-md border-0 bg-background shadow-sm focus:shadow-md transition-all duration-200 pl-10 ${className}`}
          {...props}
        />
      </div>
    );
  }
);

InputWithIcon.displayName = "InputWithIcon";
