import { FormValues } from "@/components/shared/dashboard/lending-calculator/extension/types-extension";
import { formatCurrency, removeCommas } from "@/utils/format-currency";
import {
  GpFactorExtensionRates,
  GpFactorRenewalExtensionRates,
} from "@/utils/gpfactor-rates";
import { toast } from "sonner";

export const useExtensionCalculator = () => {
  const currentDate = new Date();

  // Function to get the GP Factor of extension rate based on term
  const getGpFactorExtensionRate = (term: number): string => {
    const rate = GpFactorExtensionRates.find(
      (rate) => rate.term === String(term)
    );

    if (!rate) throw new Error("No extension rate found for the given term.");

    return rate.gpFactor; // Return the corresponding gpFactor
  };

  const getGpFactorRenewalExtensionRate = (reneTerm: number): string => {
    const rate = GpFactorRenewalExtensionRates.find(
      (rate) => rate.reneTerm === String(reneTerm)
    );

    if (!rate)
      throw new Error(
        "No renewal extension rate found for the given term. Ren-E Term must be 12 months to 60 months"
      );

    return rate.gpFactor; // Return the corresponding gpFactor
  };

  //this will return a string
  const getReneTerm = (term: number, oiTerm: string): string => {
    const reneTerm = term + Number(oiTerm);
    if (reneTerm > 60) {
      throw new Error(
        "Ren-e Term exceeds 60 months. Please lower the months (term)!"
      );
    } else if (reneTerm < 12) {
      throw new Error(
        "Ren-e Term must be atleast 12 months. Please higher the months (term)!"
      );
    }

    return String(reneTerm);
  };

  const getRebates = (
    renewalExtensionGrossProceeds: string,
    renewalExtensionTotal: string,
    outstandingBalance: string,
    extensionGrossProceeds: string,
    extensionTotal: string,
    oiExtension: string
  ): string => {
    const value =
      Number(renewalExtensionGrossProceeds) -
      Number(renewalExtensionTotal) -
      Number(outstandingBalance);

    if (value < 0) {
      return String(
        Math.abs(value) +
          (Number(extensionGrossProceeds) -
            Number(extensionTotal) -
            Number(oiExtension))
      );
    }

    return String(
      Number(extensionGrossProceeds) -
        Number(extensionTotal) -
        Number(oiExtension) -
        value
    );
  };

  const getNetAmount = (
    newUi: string,
    extensionGrossProceeds: string,
    extensionTotal: string,
    oiExtension: string
  ): string => {
    const value = Number(newUi);

    if (value < 0) {
      return "Reference Unearned Interest is lower than 0. Please try again with different computation!";
    }

    return String(
      Number(extensionGrossProceeds) -
        Number(extensionTotal) -
        Number(oiExtension)
    );
  };

  //Calculate extension value date based on settedMaturityDate + 1 month
  const getExtensionValueDate = (settedMaturityDate: Date): Date => {
    const newDate = new Date(settedMaturityDate);
    newDate.setMonth(newDate.getMonth() + 1);
    newDate.setDate(1);

    return newDate;
  };

  //Calculate extension maturity date based on extensionValueDate + term - 1 (in months)
  const getExtensionMaturityDate = (
    extensionValueDate: Date,
    term: number
  ): Date => {
    const newDate = new Date(extensionValueDate);
    newDate.setMonth(newDate.getMonth() + term - 1);
    newDate.setDate(1);

    return newDate;
  };

  //Calculate renewal extension value date based on current date month + 1 month
  const getRenewalExtensionValueDate = (): Date => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + 1);
    newDate.setDate(1);

    return newDate;
  };

  //Calculate renewal extension maturity date based on renewal extension value date month + rene term - 1
  const getRenewalExtensionMaturityDate = (
    renewalExtensionValueDate: Date,
    reneTerm: string
  ): Date => {
    const newDate = new Date(renewalExtensionValueDate);
    newDate.setMonth(newDate.getMonth() + Number(reneTerm) - 1);
    newDate.setDate(1);

    return newDate;
  };

  const calculateExtensionLoan = (form: FormValues) => {
    const {
      monthlyAmortization,
      term,
      settedMaturityDate,
      settedOutstandingBalance,
      otherDeduction,
    } = form;
    //extension side

    //This will return a string since the function returns a string
    const extensionGpFactor = getGpFactorExtensionRate(term);

    //This will return a string | to get princiapl amount in extension side
    const extensionPrincipalAmount = formatCurrency(monthlyAmortization * term);

    //This will return a string | to get the gross proceeds in extension side
    const extensionGrossProceeds = formatCurrency(
      (monthlyAmortization / Number(extensionGpFactor)) * 1000
    );

    //This will return a string | to get the unearned interest in extension side
    const extensionUnearnedInterest = formatCurrency(
      Number(removeCommas(extensionPrincipalAmount)) -
        Number(removeCommas(extensionGrossProceeds))
    );

    //This will return a string | to get the documentary stamp in extension side
    const extensionDocumentaryStamp = formatCurrency(
      (Number(removeCommas(extensionPrincipalAmount)) / 200) * 1.5
    );

    //This will return a string | to get the documentary stamp in extension side
    const extensionGrossRevenueTax = formatCurrency(
      Number(removeCommas(extensionUnearnedInterest)) * 0.05
    );

    //This will return a string since extensionGrossRevenueTax is a string | inherits the comma!
    const extensionInsurance = extensionGrossRevenueTax;

    //This will return a string | to get the total deduction in extension side
    const extensionTotal = formatCurrency(
      Number(removeCommas(extensionDocumentaryStamp)) +
        Number(removeCommas(extensionGrossRevenueTax)) +
        Number(removeCommas(extensionInsurance))
    );

    //renewal extension side

    //this will return a string | to get the EIR in renewal extension side
    const renewalExtensionEffectiveInterestRate = formatCurrency(
      (2 *
        (Number(removeCommas(extensionUnearnedInterest)) /
          Number(removeCommas(extensionGrossProceeds))) *
        12) /
        (term + 3),
      9
    );

    //references section

    //this returns a string
    const oiTerm = String(
      (settedMaturityDate.getFullYear() - currentDate.getFullYear()) * 12 +
        settedMaturityDate.getMonth() -
        currentDate.getMonth()
    );

    //this returns a string since the getReneTermFunction returns a string
    const reneTerm = getReneTerm(term, oiTerm);

    //renewal extension side

    //this will return a string | to get the gp factor in renewal extension side
    const renewalExtensionGpFactor = getGpFactorRenewalExtensionRate(
      Number(reneTerm)
    );

    //This will return a string | to get the principal amount in renewal extension side
    const renewalExtensionPrincipalAmount = formatCurrency(
      Number(reneTerm) * monthlyAmortization
    );

    //This wil return a string | to get the gross proceeds in renewal extension side
    const renewalExtensionGrossProceeds = formatCurrency(
      (monthlyAmortization / Number(renewalExtensionGpFactor)) * 1000
    );

    //This will return a string | to get the unearned interest in renewal extension side
    const renewalExtensionUnearnedInterest = formatCurrency(
      Number(removeCommas(renewalExtensionPrincipalAmount)) -
        Number(removeCommas(renewalExtensionGrossProceeds))
    );

    //This will return a string | to get the documentary stamp in renewal extension side
    const renewalExtensionDocumentaryStamp = formatCurrency(
      (Number(removeCommas(renewalExtensionPrincipalAmount)) / 200) * 1.5
    );

    //This will return a string | to get the gross revenue tax in renewal extension side
    const renewalExtensionGrossRevenueTax = formatCurrency(
      Number(removeCommas(renewalExtensionUnearnedInterest)) * 0.05
    );

    //This will return a string since gross revenue tax in renewal extension side is a string
    const renewalExtensionInsurance = renewalExtensionGrossRevenueTax;

    //This will return a string | to get the total deduction in renewal extension side
    const renewalExtensionTotal = formatCurrency(
      Number(removeCommas(renewalExtensionDocumentaryStamp)) +
        Number(removeCommas(renewalExtensionGrossRevenueTax)) +
        Number(removeCommas(renewalExtensionInsurance))
    );

    //extension side
    //this is to get the oi rate in extension side | it will return a string
    const extensionOiRate = String(
      (Number(oiTerm) * (0.28 / 12)) / (1 + Number(oiTerm) * (0.28 / 12))
    );

    //reference section

    //this returns a string
    const oiExtension = formatCurrency(
      Number(removeCommas(extensionGrossProceeds)) * Number(extensionOiRate)
    );

    //this will return a string | to get the PL in reference section
    const proceedsOfLoan = formatCurrency(
      Number(removeCommas(renewalExtensionGrossProceeds)) -
        Number(removeCommas(renewalExtensionTotal))
    );

    //This will return a string | to get the outstanding balance in references section
    const outstandingBalance = formatCurrency(
      Number(oiTerm) * monthlyAmortization
    );

    //This will return a string since getRebates is a function that returns a string
    const rebates = formatCurrency(
      getRebates(
        removeCommas(renewalExtensionGrossProceeds),
        removeCommas(renewalExtensionTotal),
        removeCommas(outstandingBalance),
        removeCommas(extensionGrossProceeds),
        removeCommas(extensionTotal),
        removeCommas(oiExtension)
      )
    );

    //This will return a string | to get the new ui in references section
    const newUi = formatCurrency(
      Number(removeCommas(renewalExtensionUnearnedInterest)) -
        Number(removeCommas(rebates))
    );

    //This will return a string | to get the new gp in references section
    const newGp = formatCurrency(
      Number(removeCommas(renewalExtensionPrincipalAmount)) -
        Number(removeCommas(newUi))
    );

    //This will return a string | to get the net amount
    const netAmount = formatCurrency(
      Number(
        getNetAmount(
          removeCommas(newUi),
          removeCommas(extensionGrossProceeds),
          removeCommas(extensionTotal),
          removeCommas(oiExtension)
        )
      ) -
        settedOutstandingBalance -
        otherDeduction
    );

    //This will return a date
    const extensionValueDate = getExtensionValueDate(settedMaturityDate);

    //This will return a date
    const extensionMaturityDate = getExtensionMaturityDate(
      extensionValueDate,
      term
    );

    //This will return a date
    const renewalExtensionValueDate = getRenewalExtensionValueDate();

    //This will return a date
    const renewalExtensionMaturityDate = getRenewalExtensionMaturityDate(
      renewalExtensionValueDate,
      reneTerm
    );

    return {
      results: {
        extensionOiRate: formatCurrency(extensionOiRate, 9), //this convert to number and then string
        extensionGpFactor,
        extensionPrincipalAmount,
        extensionUnearnedInterest,
        extensionGrossProceeds,
        extensionDocumentaryStamp,
        extensionGrossRevenueTax,
        extensionInsurance,
        extensionTotal,
        renewalExtensionEffectiveInterestRate,
        renewalExtensionGpFactor,
        renewalExtensionPrincipalAmount,
        renewalExtensionUnearnedInterest,
        renewalExtensionGrossProceeds,
        renewalExtensionDocumentaryStamp,
        renewalExtensionGrossRevenueTax,
        renewalExtensionInsurance,
        renewalExtensionTotal,
      },
      references: {
        oiTerm,
        reneTerm,
        oiExtension,
        proceedsOfLoan,
        outstandingBalance,
        rebates,
        newUi,
        newGp,
      },
      extensionValueDate,
      extensionMaturityDate,
      renewalExtensionValueDate,
      renewalExtensionMaturityDate,
      netAmount,
    };
  };

  return { calculateExtensionLoan };
};
