"use client";

import { motion, AnimatePresence } from "framer-motion";

interface DraftDialogProps {
  message: string;
  visible: boolean;
}

export function DraftDialog({ message, visible }: DraftDialogProps) {
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
            className="relative w-full max-w-md mx-4 overflow-hidden rounded-2xl bg-gradient-to-br from-primary/95 via-primary to-primary/90 shadow-2xl ring-1 ring-white/20"
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
              <p className="text-primary-foreground text-2xl font-bold tracking-tight leading-tight drop-shadow-lg">
                {message}
              </p>

              <motion.div
                className="mt-10 mx-auto h-1.5 w-24 rounded-full bg-primary-foreground/40"
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

            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-48 h-24 bg-primary-foreground/10 rounded-full blur-3xl -z-10" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
