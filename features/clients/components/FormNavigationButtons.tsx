"use client";

import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  ArrowRight,
  Save,
  FileUp,
  Trash2,
  Eraser,
} from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface FormNavigationButtonsProps {
  currentStep: number;
  totalSteps: number;
  formModified: boolean;
  hasDraft: boolean;
  isSubmitting?: boolean;

  onPrevious: () => void;
  onNext: () => void;
  onSubmit: () => void;
  onSaveDraft: () => void;
  onLoadDraft: () => void;
  onDeleteDraft: () => void;
  onClearForm: () => void;
}

export function FormNavigationButtons({
  currentStep,
  totalSteps,
  formModified,
  hasDraft,
  isSubmitting = false,
  onPrevious,
  onNext,
  onSubmit,
  onSaveDraft,
  onLoadDraft,
  onDeleteDraft,
  onClearForm,
}: FormNavigationButtonsProps) {
  const buttonStyles = {
    primary:
      "min-w-24 flex items-center gap-2 rounded-md bg-primary text-primary-foreground shadow-sm hover:shadow-md hover:bg-primary/90 transition-all duration-200 cursor-pointer",
    outline:
      "group flex items-center gap-1 rounded-md border border-border shadow-sm hover:shadow-md hover:bg-accent hover:text-accent-foreground transition-all duration-200 cursor-pointer",
    disabled: "opacity-50 cursor-not-allowed",
  };

  const ButtonContent = ({
    icon: Icon,
    text,
  }: {
    icon: typeof ArrowLeft;
    text: string;
  }) => (
    <div className="flex items-center gap-2">
      <Icon className="size-4" />
      <span className="w-0 overflow-hidden opacity-0 transition-all duration-300 group-hover:w-auto group-hover:opacity-100 group-hover:ml-1">
        {text}
      </span>
    </div>
  );

  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === totalSteps - 1;

  return (
    <motion.div
      className="flex justify-between mt-8 pt-6 border-t border-border"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.2 }}
    >
      {/* Left Side */}
      <div className="flex gap-3">
        <Button
          type="button"
          onClick={onPrevious}
          disabled={isFirstStep}
          className={cn(
            buttonStyles.primary,
            isFirstStep && buttonStyles.disabled
          )}
        >
          <ArrowLeft className="size-4" />
          Previous
        </Button>

        <Button
          type="reset"
          variant="outline"
          className={buttonStyles.outline}
          onClick={onClearForm}
        >
          <ButtonContent icon={Eraser} text="Clear Data" />
        </Button>
      </div>

      {/* Right Side */}
      <div className="flex gap-3">
        {hasDraft && (
          <>
            <Button
              type="button"
              onClick={onDeleteDraft}
              variant="destructive"
              className={buttonStyles.outline}
            >
              <ButtonContent icon={Trash2} text="Delete Draft" />
            </Button>

            <Button
              type="button"
              onClick={onLoadDraft}
              variant="outline"
              className={buttonStyles.outline}
            >
              <ButtonContent icon={FileUp} text="Load Saved Draft" />
            </Button>
          </>
        )}

        <Button
          type="button"
          onClick={onSaveDraft}
          variant="outline"
          disabled={!formModified}
          className={cn(
            buttonStyles.outline,
            !formModified && buttonStyles.disabled
          )}
        >
          <ButtonContent icon={Save} text="Save Draft" />
        </Button>

        {isLastStep ? (
          <Button
            type="submit"
            disabled={isSubmitting}
            onClick={onSubmit}
            className={cn(
              buttonStyles.primary,
              isSubmitting && buttonStyles.disabled
            )}
          >
            Submit
            <ArrowRight className="size-4" />
          </Button>
        ) : (
          <Button
            type="button"
            onClick={onNext}
            className={buttonStyles.primary}
          >
            Next
            <ArrowRight className="size-4" />
          </Button>
        )}
      </div>
    </motion.div>
  );
}
