"use client";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

import { Check } from "lucide-react";
import type { StepIndicatorProps } from "../types/types-clients";

export function StepIndicator({ steps, currentStep }: StepIndicatorProps) {
  return (
    <nav aria-label="Progress" className="w-full mb-8">
      <ol role="list" className="space-y-4 md:flex md:space-x-8 md:space-y-0">
        {steps.map((step, index) => (
          <motion.li
            key={step.name}
            className="md:flex-1"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1, ease: "easeOut" }}
          >
            <div className="group flex w-full flex-col py-2 transition-all duration-300">
              {/* Step indicator line */}
              <div className="flex items-center mb-2">
                <motion.div
                  className={cn(
                    "flex h-8 w-8 items-center justify-center rounded-full border-2 transition-all duration-300",
                    currentStep > index
                      ? "border-primary bg-primary text-primary-foreground"
                      : currentStep === index
                      ? "border-primary bg-background text-primary"
                      : "border-muted bg-background text-muted-foreground"
                  )}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {currentStep > index ? (
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                    >
                      <Check className="h-4 w-4" />
                    </motion.div>
                  ) : (
                    <motion.span
                      className="text-sm font-medium"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.2, delay: index * 0.1 }}
                    >
                      {index + 1}
                    </motion.span>
                  )}
                </motion.div>

                {/* Connecting line */}
                {index < steps.length - 1 && (
                  <motion.div
                    className="hidden md:block flex-1 h-0.5 ml-4"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
                  >
                    <div
                      className={cn(
                        "h-full transition-all duration-500",
                        currentStep > index ? "bg-primary" : "bg-muted"
                      )}
                    />
                  </motion.div>
                )}
              </div>

              {/* Step content */}
              <div className="ml-0 md:ml-0">
                <motion.span
                  className={cn(
                    "text-xs font-medium transition-colors duration-300",
                    currentStep >= index
                      ? "text-primary"
                      : "text-muted-foreground"
                  )}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.1 + 0.3 }}
                >
                  {step.id}
                </motion.span>
                <motion.p
                  className={cn(
                    "text-sm font-medium transition-colors duration-300",
                    currentStep >= index
                      ? "text-foreground"
                      : "text-muted-foreground"
                  )}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 + 0.4 }}
                >
                  {step.name}
                </motion.p>
              </div>
            </div>
          </motion.li>
        ))}
      </ol>
    </nav>
  );
}
