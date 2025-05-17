import React from "react";
import ResultCard from "../ResultCard";
import { ReferencesDisplayProps } from "../../types/types-extension";

const ReferencesDisplay = ({
  oiTerm,
  reneTerm,
  oiExtension,
  proceedsOfLoan,
  outstandingBalance,
  rebates,
  newUi,
  newGp,
}: ReferencesDisplayProps) => {
  return (
    <div>
      <h3 className="font-bold text-xl mb-6">References</h3>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
        <ResultCard title="OI Term" value={oiTerm} />
        <ResultCard title="REN-E Term" value={reneTerm} />
        <ResultCard title="OI Extension" value={oiExtension} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 my-8">
        <ResultCard title="Proceeds of Loan (PL)" value={proceedsOfLoan} />
        <ResultCard
          title="Outstanding Balance (OB)"
          value={outstandingBalance}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
        <ResultCard title="Rebates (REN-E)" value={rebates} />
        <ResultCard title="New UI (REN-E)" value={newUi} />
        <ResultCard title="NEW GP (REN-E)" value={newGp} />
      </div>
    </div>
  );
};

export default ReferencesDisplay;
