import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useRegularLoanCalculator } from "../hooks/use-regular-calculator";
import type { RegularCalculatorSchema } from "../schema/loan-regular-schema";
import {
  regularCalculatorDefaultValues,
  regularCalculatorSchema,
} from "../schema/loan-regular-schema";
import { ResultsProps } from "../types/types-regular";

export const useRegularCalculatorForm = (
  clientType: "Renewal" | "New Client" | "Reloan" | "Additional"
) => {
  const calculatorForm = useForm<RegularCalculatorSchema>({
    resolver: zodResolver(regularCalculatorSchema),
    defaultValues: regularCalculatorDefaultValues,
  });

  const { calculateRegularLoan } = useRegularLoanCalculator();
  const { watch, setValue, reset, getValues } = calculatorForm;

  // States
  const [selectedCard, setSelectedCard] = useState<string>("1");
  const [results, setResults] = useState<ResultsProps>({
    effectiveInterestRate: "0.00",
    gpFactor: "0.00",
    principalAmount: "0.00",
    unearnedInterest: "0.00",
    grossProceeds: "0.00",
    documentaryStamp: "0.00",
    grossRevenueTax: "0.00",
    insurance: "0.00",
    totalDeductions: "0.00",
  });
  const [hasDeduction, setHasDeduction] = useState<boolean>(false);
  const [valueDate, setValueDate] = useState<Date>(new Date());
  const [maturityDate, setMaturityDate] = useState<Date>(new Date());
  const [loanMaturityDate, setLoanMaturityDate] = useState<Date>(new Date());
  const [netAmount, setNetAmount] = useState<string>(`₱\t0.00`);
  const [isDoneCalculate, setIsDoneCalculate] = useState<boolean>(false);
  const [isCalculating, setIsCalculating] = useState<boolean>(false);
  const searchParams = useSearchParams();
  const router = useRouter();

  const amortizationWatch = clientType === "Renewal" ? watch("monthlyAmortization") : undefined;

  const calculate = (values: RegularCalculatorSchema, selectedCard: string) => {
    try {
      setIsCalculating(true);

      // Simulate calculation delay for better UX
      setTimeout(() => {
        let calculationResults;

        if (!hasDeduction) {
          const { outstandingBalance, otherDeduction, ...filteredValues } = values;
          calculationResults = calculateRegularLoan(
            {
              ...filteredValues,
              outstandingBalance: 0,
              otherDeduction: 0,
            },
            selectedCard
          );
        } else {
          calculationResults = calculateRegularLoan(values, selectedCard);
        }

        setResults(calculationResults.results);
        if (clientType === "Renewal") {
          setValueDate(calculationResults.renewalValueDate);
          setMaturityDate(calculationResults.renewalMaturityDate);
        } else {
          setValueDate(calculationResults.valueDate);
          setMaturityDate(calculationResults.maturityDate);
        }
        setNetAmount(`₱\t${calculationResults.netAmount}`);
        setIsDoneCalculate(true);
        setIsCalculating(false);
      }, 600);
    } catch (error) {
      setIsCalculating(false);
      toast.error(error instanceof Error ? error.message : String(error));
    }
  };

  const handleCompute = (values: RegularCalculatorSchema) => {
    calculate(values, selectedCard);
  };

  const handleClear = () => {
    reset();
    setSelectedCard("1");
    setResults({
      effectiveInterestRate: "0.00",
      gpFactor: "0.00",
      principalAmount: "0.00",
      unearnedInterest: "0.00",
      grossProceeds: "0.00",
      documentaryStamp: "0.00",
      grossRevenueTax: "0.00",
      insurance: "0.00",
      totalDeductions: "0.00",
    });
    setValueDate(new Date());
    setMaturityDate(new Date());
    setNetAmount(`₱\t0.00`);
    setIsDoneCalculate(false);

    toast.success("Computation cleared successfully");
  };

  const handlePrint = () => {
    toast.info("Preparing document for printing...");
    setTimeout(() => {
      window.print();
    }, 500);
  };

  useEffect(() => {
    if (clientType === "Renewal") {
      setHasDeduction(true);
    }
  }, [clientType]);

  useEffect(() => {
    if (clientType !== "Renewal" || !loanMaturityDate) return;

    const currentDate = new Date();
    const calculatedRemainingMonths =
      (loanMaturityDate.getFullYear() - currentDate.getFullYear()) * 12 +
      loanMaturityDate.getMonth() -
      currentDate.getMonth();
    setValue("remainingMonths", calculatedRemainingMonths);

    // Ensure outstandingBalance updates AFTER remainingMonths is set
    setTimeout(() => {
      const remainingMonths = watch("remainingMonths") || 0;
      const monthlyAmortization = watch("monthlyAmortization") || 0;
      setValue("outstandingBalance", remainingMonths * monthlyAmortization);
    }, 0);
  }, [clientType, loanMaturityDate, amortizationWatch]);

  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    if (!hasMounted) {
      setHasMounted(true);
      return;
    }

    if (isDoneCalculate) {
      calculate(getValues(), selectedCard);
    }
  }, [selectedCard]);

  const handleProceed = (values: RegularCalculatorSchema) => {
    const data = {
      ...values,
      results,
      netAmount,
      valueDate,
      maturityDate,
      id: searchParams.get("id"),
      clientId: searchParams.get("clientId"),
      dedCode: searchParams.get("dedCode"), // for renewal/extension
      computationType: clientType, // New Client / Reloan / Additional / Renewal
    };
    console.log("THIS IS THE DATA RETURNED WHEN PROCEED", data);

    sessionStorage.setItem("pendingLoanData", JSON.stringify(data));
    router.push(`/clients/${data.clientId}/add-loan-history`);
  };
  return {
    calculatorForm,
    selectedCard,
    setSelectedCard,
    results,
    setHasDeduction,
    hasDeduction,
    valueDate,
    setValueDate,
    maturityDate,
    setMaturityDate,
    loanMaturityDate,
    setLoanMaturityDate,
    netAmount,
    isDoneCalculate,
    isCalculating,
    handleCompute,
    handleClear,
    handlePrint,
    handleProceed,
  };
};
