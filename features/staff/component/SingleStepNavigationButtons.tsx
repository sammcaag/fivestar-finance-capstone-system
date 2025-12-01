"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Save, FileUp, Trash2, Eraser, Rotate3DIcon, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface SingleStepFormButtonsProps {
  formModified: boolean;
  hasDraft: boolean;
  isSubmitting?: boolean;
  isEditMode?: boolean;

  onSubmit: () => void;
  onSaveDraft: () => void;
  onLoadDraft: () => void;
  onDeleteDraft: () => void;
  onClearForm: () => void;
}

export function SingleStepFormButtons({
  formModified,
  hasDraft,
  isSubmitting = false,
  isEditMode = false,
  onSubmit,
  onSaveDraft,
  onLoadDraft,
  onDeleteDraft,
  onClearForm,
}: SingleStepFormButtonsProps) {
  const buttonStyles = {
    primary:
      "min-w-24 flex items-center gap-2 rounded-md bg-primary text-primary-foreground shadow-sm hover:shadow-md hover:bg-primary/90 transition-all duration-200 cursor-pointer",

    outline:
      "group flex items-center gap-1 rounded-md border border-border shadow-sm hover:shadow-md hover:bg-accent hover:text-accent-foreground transition-all duration-200 cursor-pointer",

    disabled: "opacity-50 cursor-not-allowed",
  };

  const CollapsibleButton = ({ icon: Icon, text }: { icon: typeof Save; text: string }) => (
    <div className="flex items-center gap-2">
      <Icon className="size-4" />
      <span className="w-0 overflow-hidden opacity-0 transition-all duration-300 group-hover:w-auto group-hover:opacity-100 group-hover:ml-1">
        {text}
      </span>
    </div>
  );

  return (
    <motion.div
      className="flex justify-between mt-8 pt-6 border-t border-border"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.2 }}
    >
      {/* LEFT SECTION */}
      <div className="flex gap-3">
        {/* CLEAR / RESET — not collapsible */}
        <Button
          type="button"
          variant="outline"
          className="flex items-center gap-2 rounded-md border border-border shadow-sm hover:shadow-md hover:bg-accent hover:text-accent-foreground transition-all duration-200 cursor-pointer"
          onClick={onClearForm}
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

        {/* DELETE DRAFT — collapsible */}
        {hasDraft && (
          <Button
            type="button"
            variant="destructive"
            onClick={onDeleteDraft}
            className={buttonStyles.outline}
          >
            <CollapsibleButton icon={Trash2} text="Delete Draft" />
          </Button>
        )}
      </div>

      {/* RIGHT SECTION */}
      <div className="flex gap-3">
        {/* LOAD DRAFT — collapsible */}
        {hasDraft && (
          <Button
            type="button"
            variant="outline"
            onClick={onLoadDraft}
            className={buttonStyles.outline}
          >
            <CollapsibleButton icon={FileUp} text="Load Draft" />
          </Button>
        )}

        {/* SAVE DRAFT — collapsible */}
        <Button
          type="button"
          variant="outline"
          disabled={!formModified}
          onClick={onSaveDraft}
          className={cn(buttonStyles.outline, !formModified && buttonStyles.disabled)}
        >
          <CollapsibleButton icon={Save} text="Save Draft" />
        </Button>

        {/* SUBMIT — not collapsible */}
        <Button
          type="submit"
          disabled={isSubmitting}
          onClick={onSubmit}
          className={cn(buttonStyles.primary, isSubmitting && buttonStyles.disabled)}
        >
          {isEditMode ? "Update" : "Submit"}
          <ArrowRight className="size-4" />
        </Button>
      </div>
    </motion.div>
  );
}
