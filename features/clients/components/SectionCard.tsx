"use client";
import { motion, Variants } from "framer-motion";
import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";

interface SectionCardProps {
  variants: Variants;
  icon: LucideIcon;
  title: string;
  children: ReactNode;
}

export function SectionCard({
  variants,
  icon: Icon,
  title,
  children,
}: SectionCardProps) {
  return (
    <motion.div
      variants={variants}
      className="bg-card rounded-lg shadow-lg border"
    >
      <div className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-primary rounded-lg shadow-md">
            <Icon className="h-5 w-5 text-primary-foreground" />
          </div>
          <h3 className="text-xl font-semibold text-foreground">{title}</h3>
        </div>
        {children}
      </div>
    </motion.div>
  );
}
