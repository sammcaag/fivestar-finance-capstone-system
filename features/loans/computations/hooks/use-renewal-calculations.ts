"use client";
import { useEffect } from "react";
import type { UseFormReturn } from "react-hook-form";
import type { FormValues } from "@/features/loan-calculators/types/types-regular";

interface UseRenewalCalculationsProps {
  clientType: string;
  loanMaturityDate: Date;
  form: UseFormReturn<FormValues>;
  amortizationWatch?: number;
}

export function useRenewalCalculations({
  clientType,
  loanMaturityDate,
  form,
  amortizationWatch,
}: UseRenewalCalculationsProps) {
  useEffect(() => {
    if (clientType !== "Renewal" || !loanMaturityDate) return;

    const currentDate = new Date();
    const calculatedRemainingMonths =
      (loanMaturityDate.getFullYear() - currentDate.getFullYear()) * 12 +
      loanMaturityDate.getMonth() -
      currentDate.getMonth();

    form.setValue("remainingMonths", calculatedRemainingMonths);

    // Ensure outstandingBalance updates AFTER remainingMonths is set
    setTimeout(() => {
      const remainingMonths = form.getValues("remainingMonths") || 0;
      const monthlyAmortization = form.getValues("monthlyAmortization") || 0;
      form.setValue(
        "outstandingBalance",
        remainingMonths * monthlyAmortization
      );
    }, 0);
  }, [clientType, loanMaturityDate, amortizationWatch, form]);
}
