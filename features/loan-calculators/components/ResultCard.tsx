"use client";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { LucideIcon } from "lucide-react";

interface EnhancedResultCardProps {
  title: string;
  value: string;
  textColorClass?: string;
  icon?: LucideIcon;
  iconColor?: string;
  bgGradient?: string;
  isHighlighted?: boolean;
}

export default function EnhancedResultCard({
  title,
  value,
  textColorClass = "text-blue-700 dark:text-blue-400",
  icon: Icon,
  iconColor = "text-blue-500",
  bgGradient = "from-blue-50 to-blue-100 dark:from-blue-950/40 dark:to-blue-900/20",
  isHighlighted = false,
}: EnhancedResultCardProps) {
  return (
    <Card
      className={`overflow-hidden border-none shadow-md transition-all duration-300 hover:shadow-lg ${
        isHighlighted ? "ring-2 ring-red-300 dark:ring-red-800" : ""
      }`}
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${bgGradient}`}></div>
      <CardHeader className="relative p-4 pb-2">
        <CardTitle className="text-sm font-medium w-full flex items-center">
          {Icon && <Icon className={`h-4 w-4 mr-2 ${iconColor}`} />}
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="relative p-4 pt-2">
        <motion.span
          className={`text-xl font-bold ${textColorClass}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {value}
        </motion.span>
      </CardContent>
    </Card>
  );
}
