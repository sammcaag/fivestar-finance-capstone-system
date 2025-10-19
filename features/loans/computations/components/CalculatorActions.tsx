"use client";
import { Button } from "@/components/ui/button";
import { PrinterIcon, Calculator, ArrowRight, RefreshCw } from "lucide-react";
import type { ReactNode } from "react";

interface ActionButtonProps {
  type?: "button" | "submit";
  variant?: "default" | "outline";
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  children: ReactNode;
}

function ActionButton({
  type = "button",
  variant = "default",
  onClick,
  disabled = false,
  className = "",
  children,
}: ActionButtonProps) {
  return (
    <Button
      type={type}
      variant={variant}
      onClick={onClick}
      disabled={disabled}
      className={className}
    >
      {children}
    </Button>
  );
}

interface CalculatorActionsProps {
  isDoneCalculate: boolean;
  isCalculating: boolean;
  onClear: () => void;
  onPrint: () => void;
}

export function CalculatorActions({
  isDoneCalculate,
  isCalculating,
  onClear,
  onPrint,
}: CalculatorActionsProps) {
  return (
    <div className="flex flex-col sm:flex-row justify-between gap-4 pt-4 border-t">
      <ActionButton
        variant="outline"
        onClick={onClear}
        className="group transition-all duration-300 hover:border-red-300 hover:bg-red-50 dark:hover:bg-red-950/30"
      >
        <RefreshCw className="mr-2 h-4 w-4 transition-transform group-hover:rotate-180" />
        Clear Computations
      </ActionButton>

      <div className="flex items-center gap-3">
        {isDoneCalculate && (
          <ActionButton
            variant="outline"
            onClick={onPrint}
            className="hover:border-blue-300 hover:bg-blue-50 dark:hover:bg-blue-950/30"
          >
            <PrinterIcon className="mr-2 h-4 w-4" />
            Print Calculation
          </ActionButton>
        )}

        <ActionButton
          type="submit"
          disabled={isCalculating}
          className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 transition-all duration-300"
        >
          {isCalculating ? (
            <>
              <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
              Computing...
            </>
          ) : (
            <>
              <Calculator className="mr-2 h-4 w-4" />
              Compute
              <ArrowRight className="ml-2 h-4 w-4" />
            </>
          )}
        </ActionButton>
      </div>
    </div>
  );
}
