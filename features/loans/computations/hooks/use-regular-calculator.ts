import { FormValues } from "../types/types-regular";
import { formatCurrency, removeCommas } from "../utils/format-currency";
import { GpFactorRegularRates } from "../utils/gpfactor-rates";

export const useRegularLoanCalculator = () => {
  //For NC/Additional/Reloan current month + 3 month
  const calculateValueDate = (currentDate: Date): Date => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + 3);
    newDate.setDate(1);
    return newDate;
  };

  // Calculate maturity date based on value date + term - 1 month (all regular client types)
  const calculateMaturityDate = (valueDate: Date, term: number): Date => {
    const newDate = new Date(valueDate);
    newDate.setMonth(newDate.getMonth() + term - 1);
    newDate.setDate(1);
    return newDate;
  };

  //For Renewal current month + 1month
  const calculateRenewalValueDate = (currentDate: Date): Date => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + 1);
    newDate.setDate(1);
    return newDate;
  };

  // Function to get the GP Factor based on term and selectedCard
  const getGpFactor = (term: string, selectedCard: string): string => {
    const rate = GpFactorRegularRates.find(
      (rate) => rate.term === String(term)
    );

    if (!rate) throw new Error("No rate found for the given term.");

    return selectedCard === "1"
      ? rate.regularRate
      : selectedCard === "2"
      ? rate.specialRate
      : rate.aRate; // Default to aRate if no match
  };

  // Main calculation function that returns the results
  const calculateRegularLoan = (form: FormValues, selectedCard: string) => {
    const { term, monthlyAmortization, outstandingBalance, otherDeduction } =
      form;

    // Calculate value date
    const valueDate = calculateValueDate(new Date());

    // Calculate maturity date
    const maturityDate = calculateMaturityDate(valueDate, term);

    const renewalValueDate = calculateRenewalValueDate(new Date());
    const renewalMaturityDate = calculateMaturityDate(renewalValueDate, term);

    // Get the GP Factor value by calling the function
    const gpFactor = getGpFactor(String(term), String(selectedCard));

    // Calculate principal amount
    const principalAmount = formatCurrency(monthlyAmortization * term);

    //calculate gross proceeds and rounding off to the nearest hundredths
    const grossProceeds = formatCurrency(
      (Number(monthlyAmortization) / Number(gpFactor)) * 1000
    );
    // Calculate unearned interest
    const unearnedInterest = formatCurrency(
      Number(removeCommas(principalAmount)) -
        Number(removeCommas(grossProceeds))
    );

    // Calculate documentary stamp
    const documentaryStamp = formatCurrency(
      (Number(removeCommas(principalAmount)) / 200) * 1.5
    );
    // Calculate gross revenue tax
    const grossRevenueTax = formatCurrency(
      Number(removeCommas(unearnedInterest)) * 0.05
    );
    // Calculate insurance (example: 0.5% of principal)
    const insurance = grossRevenueTax;

    // Calculate total deductions
    const totalDeductions = formatCurrency(
      Number(removeCommas(documentaryStamp)) +
        Number(removeCommas(grossRevenueTax)) +
        Number(removeCommas(insurance))
    );

    // Calculate net amount
    const netAmount = formatCurrency(
      Number(removeCommas(grossProceeds)) -
        Number(removeCommas(totalDeductions)) -
        outstandingBalance -
        otherDeduction
    );

    // Calculate effective interest rate (example formula - adjust as needed)
    const effectiveInterestRate = formatCurrency(
      (2 *
        (Number(removeCommas(unearnedInterest)) /
          Number(removeCommas(grossProceeds))) *
        12) /
        (term + 3),
      9
    );
    // Return the calculated results instead of updating internal state
    return {
      results: {
        effectiveInterestRate,
        gpFactor,
        principalAmount,
        unearnedInterest,
        grossProceeds,
        documentaryStamp,
        grossRevenueTax,
        insurance,
        totalDeductions,
      },
      valueDate,
      maturityDate,
      renewalValueDate,
      renewalMaturityDate,
      netAmount,
    };
  };

  return {
    calculateRegularLoan,
  };
};
