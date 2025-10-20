"use client";
import { motion } from "framer-motion";
import RealTime from "./RealTime";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CalendarDays, LucideIcon } from "lucide-react";
import { formatDateToReadable } from "@/utils/format-date-to-readable";

interface MainHeaderProps {
  title: string;
  icon?: LucideIcon;
  description: string;
  quickActions?: {
    label: string;
    href: string;
    icon: LucideIcon;
  }[];
  showDateAndTime?: boolean;
}

export default function MainHeader({
  title,
  icon: Icon,
  description,
  quickActions,
  showDateAndTime = true,
}: MainHeaderProps) {
  return (
    <motion.div
      className="relative overflow-hidden rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 p-6 text-white shadow-lg framer-motion-fix"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="absolute -z-10 -right-10 -top-10 h-40 w-40 rounded-full bg-white/10 blur-3xl"></div>
      <div className="absolute -z-10 -bottom-10 -left-10 h-40 w-40 rounded-full bg-white/10 blur-3xl"></div>

      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div className="space-y-2 flex-1">
          <h1 className="text-3xl font-bold tracking-wide text-white">
            {title}
          </h1>
          <div className="flex items-center space-x-2">
            {Icon && <Icon className="h-5 w-5 text-blue-200" />}
            <p className=" text-blue-100">{description}</p>
          </div>
        </div>

        {showDateAndTime && (
          <div className="flex flex-col gap-2 items-end max-sm:mt-4">
            <div className="flex items-center space-x-2 text-lg text-background">
              <CalendarDays className="h-4 w-4" />
              <span className="min-w-max">
                {formatDateToReadable(new Date())}
              </span>
            </div>
            <div className="flex items-center space-x-2 text-lg text-background">
              <RealTime />
            </div>
          </div>
        )}
      </div>

      {quickActions && (
        <div className="mt-6 space-x-2">
          {quickActions.map((action) => (
            <Button
              variant="secondary"
              className="bg-white/20 text-white hover:bg-white/30"
              asChild
              key={action.label}
            >
              <Link href={action.href}>
                <action.icon className="h-4 w-4" />
                {action.label}
              </Link>
            </Button>
          ))}
        </div>
      )}
    </motion.div>
  );
}
