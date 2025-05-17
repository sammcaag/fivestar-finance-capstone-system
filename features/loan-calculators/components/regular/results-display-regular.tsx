"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import ResultCard from "../result-card";
import CustomDatePicker from "@/components/custom/custom-date-picker";
import { ResultsDisplayProps } from "../../types/types-regular";

// Props Type

export default function ResultsDisplay({
  effectiveInterestRate,
  gpFactor,
  principalAmount,
  unearnedInterest,
  grossProceeds,
  documentaryStamp,
  grossRevenueTax,
  insurance,
  totalDeductions,
  netAmount,
  valueDate,
  setValueDate,
  maturityDate,
  setMaturityDate,
}: ResultsDisplayProps) {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">Computation Results</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
        <ResultCard
          title="Effective Interest Rate (EIR)"
          value={effectiveInterestRate}
        />
        <ResultCard title="GP Factor" value={gpFactor} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
        <ResultCard title="Principal Amount (PN)" value={principalAmount} />
        <ResultCard title="Unearned Interest (UI)" value={unearnedInterest} />
        <ResultCard title="Gross Proceeds (GP)" value={grossProceeds} />
      </div>

      <Separator className="my-4" />

      <div>
        <Label className="text-lg font-semibold my-2 block">
          Other Deductions
        </Label>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
          <ResultCard
            title="Documentary Stamp (DST)"
            value={documentaryStamp}
            textColorClass="text-red-400"
            cardHeaderClass="md:min-h-20 lg:min-h-15 xl:min-h-20 2xl:min-h-15"
          />
          <ResultCard
            title="Gross Revenue Tax (GRT)"
            value={grossRevenueTax}
            textColorClass="text-red-400"
            cardHeaderClass="md:min-h-20 lg:min-h-15 xl:min-h-20 2xl:min-h-15"
          />
          <ResultCard
            title="Insurance (CRIP)"
            value={insurance}
            textColorClass="text-red-400"
            cardHeaderClass="md:min-h-20 lg:min-h-15 xl:min-h-20 2xl:min-h-15"
          />
          <ResultCard
            title="TOTAL"
            value={totalDeductions}
            textColorClass="text-red-400"
            cardHeaderClass="md:min-h-20 lg:min-h-15 xl:min-h-20 2xl:min-h-15"
          />
        </div>
      </div>

      <Separator className="my-4" />

      <Card className="mb-4">
        <CardContent className="p-4 flex justify-between items-center">
          <h3 className="text-lg font-semibold">NET Amount:</h3>
          <span className="text-xl font-bold text-green-400">{netAmount}</span>
        </CardContent>
      </Card>

      <Separator className="my-4" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
        <div className="space-y-2">
          <Label className="font-semibold text-lg">Value Date</Label>
          <CustomDatePicker
            date={valueDate}
            setDate={setValueDate}
            editable={false}
          />
        </div>

        <div className="space-y-2">
          <Label className="font-semibold text-lg">Maturity Date</Label>
          <CustomDatePicker
            date={maturityDate}
            setDate={setMaturityDate}
            editable={false}
          />
        </div>
      </div>
    </div>
  );
}
