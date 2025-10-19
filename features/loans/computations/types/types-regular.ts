//types for Rate Cards values used in LoanForm.tsx
export type RateProps = {
  id: string;
  title: string;
};

//types for Loan Values that is from the RegularCalculatorValues Props that makes the form to be a component used in LoanForm.tsx
export interface LoanFormRegularProps {
  selectedCard: string;
  onCardSelect: (cardId: string) => void;
  hasDeduction: boolean;
  setHasDeduction: (hasDeduction: boolean) => void;
  clientType?: string;
  maturityDate?: Date | undefined;
  setMaturityDate?: React.Dispatch<React.SetStateAction<Date>>;
  isDoneCalculate: boolean;
}

export interface RateCardsProps {
  rates: RateProps[];
  selectedCard: string;
  onCardClick: (cardId: string) => void;
}

//type for Results Values used in RegularLoanCalculator.tsx
export type ResultsProps = {
  effectiveInterestRate: string;
  gpFactor: string;
  principalAmount: string;
  unearnedInterest: string;
  grossProceeds: string;
  documentaryStamp: string;
  grossRevenueTax: string;
  insurance: string;
  totalDeductions: string;
};

//types for displaying the Results Props used in ResultsDisplay.tsx
export interface ResultsDisplayRegularProps {
  effectiveInterestRate: string;
  gpFactor: string;
  principalAmount: string;
  unearnedInterest: string;
  grossProceeds: string;
  documentaryStamp: string;
  grossRevenueTax: string;
  insurance: string;
  totalDeductions: string;
  netAmount: string;
  valueDate: Date;
  setValueDate: React.Dispatch<React.SetStateAction<Date>>;
  maturityDate: Date;
  setMaturityDate: React.Dispatch<React.SetStateAction<Date>>;
}
