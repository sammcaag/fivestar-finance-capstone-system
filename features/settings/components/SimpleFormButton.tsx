"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Eraser, Rotate3DIcon, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface SimpleFormButtonsProps {
  isSubmitting?: boolean;
  isEditMode?: boolean;
  onSubmit: () => void;
  onClearForm: () => void;
}

export function SimpleFormButtons({
  isSubmitting = false,
  isEditMode = false,
  onSubmit,
  onClearForm,
}: SimpleFormButtonsProps) {
  const buttonStyles = {
    primary:
      "min-w-24 flex items-center gap-2 rounded-md bg-primary text-primary-foreground shadow-sm hover:shadow-md hover:bg-primary/90 transition-all duration-200 cursor-pointer",

    outline:
      "flex items-center gap-2 rounded-md border border-border shadow-sm hover:shadow-md hover:bg-accent hover:text-accent-foreground transition-all duration-200 cursor-pointer",

    disabled: "opacity-50 cursor-not-allowed",
  };

  return (
    <motion.div
      className="flex justify-between mt-8 pt-6 border-t border-border"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.2 }}
    >
      {/* LEFT SECTION */}
      <Button
        type="button"
        variant="outline"
        onClick={onClearForm}
        className={buttonStyles.outline}
      >
        {isEditMode ? (
          <>
            <Rotate3DIcon className="size-4" />
            Reset Data
          </>
        ) : (
          <>
            <Eraser className="size-4" />
            Clear Data
          </>
        )}
      </Button>

      {/* RIGHT SECTION */}
      <Button
        type="submit"
        disabled={isSubmitting}
        onClick={onSubmit}
        className={cn(
          buttonStyles.primary,
          isSubmitting && buttonStyles.disabled
        )}
      >
        {isEditMode ? "Update" : "Submit"}
        <ArrowRight className="size-4" />
      </Button>
    </motion.div>
  );
}
