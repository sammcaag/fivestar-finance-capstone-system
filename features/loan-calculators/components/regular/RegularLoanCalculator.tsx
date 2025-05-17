"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { CardContent, CardFooter } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { PrinterIcon } from "lucide-react";
import { FormValues, ResultsProps } from "../../types/types-regular";
import LoanForm from "./LoanFormRegular";
import ResultsDisplay from "./ResultsDisplayRegular";
import { zodResolver } from "@hookform/resolvers/zod";
import { regularCalculatorChecker } from "../../schema/loan-calculation-zod-schema";
import { useRegularLoanCalculator } from "../../hooks/use-regular-calculator";
import { toast } from "sonner";

interface RegularLoanCalculatorProps {
  clientType: string;
}

export default function RegularLoanCalculator({
  clientType,
}: RegularLoanCalculatorProps) {
  const { calculateRegularLoan } = useRegularLoanCalculator();

  const form = useForm<FormValues>({
    resolver: zodResolver(regularCalculatorChecker),
    defaultValues: {
      term: 0,
      monthlyAmortization: 0,
      outstandingBalance: 0,
      otherDeduction: 0,
      remainingMonths: 0,
    },
  });

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

  const amortizationWatch =
    clientType === "Renewal" ? form.watch("monthlyAmortization") : undefined;

  const calculate = (values: FormValues, selectedCard: string) => {
    // Computation logic would go here

    try {
      const calculationResults = calculateRegularLoan(values, selectedCard);

      setIsDoneCalculate(true);

      setResults(calculationResults.results);
      if (clientType === "Renewal") {
        setValueDate(calculationResults.renewalValueDate);
        setMaturityDate(calculationResults.renewalMaturityDate);
      } else {
        setValueDate(calculationResults.valueDate);
        setMaturityDate(calculationResults.maturityDate);
      }
      setNetAmount(`₱\t${calculationResults.netAmount}`);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : String(error));
    }
  };

  const handleCompute = (values: FormValues) => {
    calculate(values, selectedCard);
  };

  const handleClear = () => {
    form.reset();
    setSelectedCard("1");
    // Reset results to specific values
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
  };

  const handlePrint = () => {
    window.print();
  };

  useEffect(() => {
    if (clientType === "Renewal") {
      setHasDeduction(true);
    }
  }, []);

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
  }, [clientType, loanMaturityDate, amortizationWatch]);

  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    if (!hasMounted) {
      setHasMounted(true);
      return;
    }

    calculate(form.getValues(), selectedCard);
  }, [selectedCard]);

  return (
    // Main Card Component
    <section
      className={`w-full ${
        !isDoneCalculate
          ? "flex flex-col justify-center min-h-[calc(100vh-35%)]"
          : ""
      }`}
    >
      <div className="mb-10 pl-6">
        <h3 className="h3">AFP {clientType} Computation</h3>
        <p className="text-sm text-muted-foreground">
          Calculate potential loan amount of clients
        </p>
      </div>
      <CardContent className="space-y-6">
        {/* Form Component */}
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleCompute)}
            className="space-y-6"
          >
            {/* LoanForm Component: Displays the form fields for the loan calculator */}
            <LoanForm
              form={form}
              selectedCard={selectedCard}
              onCardSelect={setSelectedCard}
              hasDeduction={hasDeduction}
              setHasDeduction={setHasDeduction}
              clientType={clientType}
              {...(clientType === "Renewal" && {
                maturityDate: loanMaturityDate,
                setMaturityDate: setLoanMaturityDate,
              })}
              isDoneCalculate={isDoneCalculate}
            />

            {/* ResultsDisplay Component: Displays the computation results */}
            {isDoneCalculate && (
              <ResultsDisplay
                {...results}
                netAmount={netAmount}
                valueDate={valueDate}
                setValueDate={setValueDate}
                maturityDate={maturityDate}
                setMaturityDate={setMaturityDate}
              />
            )}

            {/* CardFooter Component: Displays the buttons for the form */}
            <CardFooter className="flex justify-between px-0 algin-center">
              <Button
                type="button"
                variant="outline"
                onClick={handleClear}
                effect={"shineHover"}
              >
                Clear Computations
              </Button>
              <div className="flex items-center space-x-2">
                {isDoneCalculate && (
                  <Button type="button" onClick={handlePrint} variant="outline">
                    <PrinterIcon className="mr-2 h-4 w-4" />
                    Print Calculation
                  </Button>
                )}
                <Button
                  type="submit"
                  className="bg-black text-white hover:bg-black/90"
                  effect={"ringHover"}
                >
                  Compute
                </Button>
              </div>
            </CardFooter>
          </form>
        </Form>
      </CardContent>
    </section>
  );
}
