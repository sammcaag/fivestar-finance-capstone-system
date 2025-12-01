"use client";

import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, XCircle, Info, AlertTriangle } from "lucide-react";

export type DialogVariant = "success" | "error" | "info" | "warning";
interface DialogProps {
  message: string;
  visible: boolean;
  variant?: DialogVariant;
  time?: number;
}

const variantConfig: Record<
  NonNullable<DialogProps["variant"]>,
  {
    icon: React.ElementType;
    iconColor: string;
    accentColor: string;
  }
> = {
  success: {
    icon: CheckCircle2,
    iconColor: "text-emerald-500",
    accentColor: "bg-emerald-500",
  },
  error: {
    icon: XCircle,
    iconColor: "text-rose-500",
    accentColor: "bg-rose-500",
  },
  info: {
    icon: Info,
    iconColor: "text-blue-500",
    accentColor: "bg-blue-500",
  },
  warning: {
    icon: AlertTriangle,
    iconColor: "text-amber-500",
    accentColor: "bg-amber-500",
  },
};

export function GlobalDialog({ message, visible, variant = "info", time = 1 }: DialogProps) {
  const config = variantConfig[variant];
  const Icon = config.icon;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Simple dark backdrop */}
          <div className="absolute inset-0 bg-black/50" />

          {/* Clean dialog card */}
          <motion.div
            className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-2xl shadow-2xl p-8"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            {/* Icon on white circle - stands out clearly */}
            <motion.div
              className="flex justify-center mb-6"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.1, type: "spring" }}
            >
              <div className="bg-white dark:bg-slate-800 rounded-full p-4 shadow-lg">
                <Icon className={`w-12 h-12 ${config.iconColor}`} strokeWidth={2} />
              </div>
            </motion.div>

            {/* Clear, readable message */}
            <p className="text-center text-xl font-semibold text-slate-900 dark:text-white leading-relaxed">
              {message}
            </p>

            {/* Simple progress bar */}
            <div className="mt-6 h-1 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
              <motion.div
                className={`h-full ${config.accentColor}`}
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: time, ease: "linear" }}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
