// src/features/clients/components/LoanHistoryTabs.tsx
import { MainTableComp } from "@/components/tables/MainTableComp";
import TabListCustomComp from "@/components/TabListCustomComp";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { loansHistoryColumnDefinition } from "@/features/loans/components/tables/LoansHistoryColumnDefinition";
import { LoanHistoryPayload } from "../history/types/loan-form-types";

interface LoanHistoryTabsProps {
  loanSets: LoanHistoryPayload[][];
  loanHistory: LoanHistoryPayload[];
  customHeaderRight: React.ReactNode;
  setSelectedLoan: (loan: LoanHistoryPayload | null) => void;
  handleAddLoan: (type: string) => void;
  totalSets: number;
  isLoading?: boolean;
}

export default function LoanHistoryTabs({
  loanSets,
  loanHistory,
  customHeaderRight,
  setSelectedLoan,
  handleAddLoan,
  totalSets,
  isLoading = false,
}: LoanHistoryTabsProps) {
  const getOrdinal = (n: number): string => {
    const s = ["th", "st", "nd", "rd"];
    const v = n % 100;
    return s[(v - 20) % 10] || s[v] || s[0];
  };

  const tabs = loanSets.map((_, i) => ({
    value: `set-${i + 1}`,
    label: `${i + 1}${getOrdinal(i + 1)} Set of Accounts`,
  }));

  const tableProps = {
    title: "Loan History Overview",
    description: "Review all loan history and ensure client documents are complete.",
    isLoading: isLoading,
    columns: loansHistoryColumnDefinition,
    filterColumns: ["dedCode", "productType", "term", "status"],
    initialSort: [
      { id: "dedCode", desc: false },
      { id: "valueDate", desc: false },
    ],
    emptyTitle: "No Loans Found",
    emptyDescription: "There are no loans. Add a new loan to get started.",
    emptyActionLabel: "Add New Loan",
    emptyOnAction: () => handleAddLoan("new-client"),
    onRowDoubleClick: setSelectedLoan,
  };

  // When there is only one set, hide tabs and show the table with the button
  if (totalSets <= 1) {
    return (
      <MainTableComp<LoanHistoryPayload>
        data={loanHistory}
        {...tableProps}
        customHeaderRight={customHeaderRight}
      />
    );
  }

  // When there are multiple sets, show tabs and suppress button for the 1st set
  return (
    <Tabs defaultValue={`set-${totalSets}`} className="w-full">
      <TabListCustomComp tabs={tabs} />
      {loanSets.map((setData, i) => (
        <TabsContent key={i} value={`set-${i + 1}`}>
          <MainTableComp<LoanHistoryPayload>
            data={setData}
            {...tableProps}
            // Only show customHeaderRight for sets after the first one
            customHeaderRight={i === 0 ? null : customHeaderRight}
          />
        </TabsContent>
      ))}
    </Tabs>
  );
}
