// src/features/clients/components/LoanHistoryTabs.tsx
import { MainTableComp } from "@/components/tables/MainTableComp";
import { LoanHistory } from "@/features/loans/types/loan-types";
import { loansHistoryColumnDefinition } from "@/features/loans/components/tables/LoansHistoryColumnDefinition";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import TabListCustomComp from "@/components/TabListCustomComp";

interface LoanHistoryTabsProps {
  loanSets: LoanHistory[][];
  loanHistory: LoanHistory[];
  customHeaderRight: React.ReactNode;
  setSelectedLoan: (loan: LoanHistory | null) => void;
  handleAddLoan: (type: string) => void;
}

export default function LoanHistoryTabs({
  loanSets,
  loanHistory,
  customHeaderRight,
  setSelectedLoan,
  handleAddLoan,
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
    description:
      "Review all loan history and ensure client documents are complete.",
    columns: loansHistoryColumnDefinition,
    filterColumns: ["dedCode", "productType", "term", "status"],
    initialSort: [
      { id: "dedCode", desc: false },
      { id: "maturityDate", desc: false },
    ],
    emptyTitle: "No Loans Found",
    emptyDescription: "There are no loans. Add a new loan to get started.",
    emptyActionLabel: "Add New Loan",
    emptyOnAction: () => handleAddLoan("New Client Loan"),
    customHeaderRight,
    onRowDoubleClick: setSelectedLoan,
  };

  return loanSets.length <= 1 ? (
    <MainTableComp<LoanHistory> data={loanHistory} {...tableProps} />
  ) : (
    <Tabs defaultValue={`set-${loanSets.length}`} className="w-full">
      <TabListCustomComp tabs={tabs} />
      {loanSets.map((setData, i) => (
        <TabsContent key={i} value={`set-${i + 1}`}>
          <MainTableComp<LoanHistory> data={setData} {...tableProps} />
        </TabsContent>
      ))}
    </Tabs>
  );
}
