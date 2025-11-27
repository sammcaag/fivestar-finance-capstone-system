"use client";

import { motion, AnimatePresence } from "framer-motion";

interface DraftDialogProps {
  message: string;
  visible: boolean;
  variant?: string;
}

// Pastel but more visible gradients for elderly-friendly readability
const variantClasses: Record<
  NonNullable<DraftDialogProps["variant"]>,
  { bg: string; text: string }
> = {
  success: {
    bg: "bg-gradient-to-br from-green-300 via-green-400 to-green-500 dark:from-green-700 dark:via-green-600 dark:to-green-500",
    text: "text-white dark:text-green-50", // white/light text for contrast
  },
  error: {
    bg: "bg-gradient-to-br from-red-300 via-red-400 to-red-500 dark:from-red-700 dark:via-red-600 dark:to-red-500",
    text: "text-white dark:text-red-50",
  },
  info: {
    bg: "bg-gradient-to-br from-blue-300 via-blue-400 to-blue-500 dark:from-blue-700 dark:via-blue-600 dark:to-blue-500",
    text: "text-white dark:text-blue-50",
  },
  warning: {
    bg: "bg-gradient-to-br from-yellow-300 via-yellow-400 to-yellow-500 dark:from-yellow-700 dark:via-yellow-600 dark:to-yellow-500",
    text: "text-black dark:text-yellow-50", // black on yellow is more readable than dark yellow
  },
};

export function DraftDialog({
  message,
  visible,
  variant = "info",
}: DraftDialogProps) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="dialog"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className={`
              relative w-full max-w-md mx-4 overflow-hidden rounded-2xl
              shadow-2xl ring-1 ring-white/20
              ${variantClasses[variant].bg}
            `}
            initial={{ scale: 0.8, opacity: 0, y: -20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 30,
              mass: 0.8,
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />

            <div className="relative z-10 px-10 pt-16 pb-12 text-center">
              <p
                className={`
                  text-2xl font-bold tracking-tight leading-tight drop-shadow-lg
                  ${variantClasses[variant].text}
                `}
              >
                {message}
              </p>

              <motion.div
                className="mt-10 mx-auto h-1.5 w-24 rounded-full bg-white/50 dark:bg-black/50"
                animate={{
                  scaleX: [1, 1.3, 1],
                  opacity: [0.6, 1, 0.6],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </div>

            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-48 h-24 rounded-full blur-3xl -z-10 bg-white/20 dark:bg-black/20" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
