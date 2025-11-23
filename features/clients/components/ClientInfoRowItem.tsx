import React from "react";
import { cn } from "@/lib/utils";

type ClientInfoRowItemProps = {
  icon: React.ReactNode;
  label: string;
  value: React.ReactNode;
  className?: string;
};

export default function ClientInfoRowItem({
  icon,
  label,
  value,
  className,
}: ClientInfoRowItemProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-4 rounded-xl border border-border/70 bg-card p-4 shadow-sm hover-card",
        className
      )}
    >
      <span className="flex h-10 w-10 flex-none items-center justify-center rounded-full bg-primary/10 text-primary [&>svg]:h-5 [&>svg]:w-5 [&>svg]:text-primary">
        {icon}
      </span>
      <div className="space-y-1 text-left">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
          {label}
        </p>
        <div className="text-base font-semibold leading-snug text-foreground capitalize">
          {value}
        </div>
      </div>
    </div>
  );
}
