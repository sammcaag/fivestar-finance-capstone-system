import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import React from "react";
import ResultCard from "../result-card";
import ResultOutline from "./result-outline";
import {
  ResultsDisplayProps,
  ResultsDisplayDatesProps,
} from "../../types/types-extension";
import { Label } from "@/components/ui/label";
import CustomDatePicker from "@/components/custom/custom-date-picker";

const ResultsDisplay = ({
  extensionOiRate,
  extensionGpFactor,
  extensionPrincipalAmount,
  extensionUnearnedInterest,
  extensionGrossProceeds,
  extensionDocumentaryStamp,
  extensionGrossRevenueTax,
  extensionInsurance,
  extensionTotal,
  extensionValueDate,
  setExtensionValueDate,
  extensionMaturityDate,
  setExtensionMaturityDate,
  renewalExtensionEffectiveInterestRate,
  renewalExtensionGpFactor,
  renewalExtensionPrincipalAmount,
  renewalExtensionUnearnedInterest,
  renewalExtensionGrossProceeds,
  renewalExtensionDocumentaryStamp,
  renewalExtensionGrossRevenueTax,
  renewalExtensionInsurance,
  renewalExtensionTotal,
  renewalExtensionValueDate,
  setRenewalExtensionValueDate,
  renewalExtensionMaturityDate,
  setRenewalExtensionMaturityDate,
}: ResultsDisplayProps & ResultsDisplayDatesProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle className="font-semibold text-base text-center">
              EXTENSION
            </CardTitle>
          </CardHeader>
        </Card>

        <Card className="border-2 border-dashed border-gray-200 pt-6 w-full">
          <CardContent className="grid grid-cols-1">
            <ResultOutline title="OI Rate" value={extensionOiRate} />

            <ResultOutline title="GP Factor" value={extensionGpFactor} />

            <ResultOutline
              title="Principal Amount (PN)"
              value={extensionPrincipalAmount}
            />

            <ResultOutline
              title="Unearned Interest (UI)"
              value={extensionUnearnedInterest}
            />

            <ResultOutline title="GP" value={extensionGrossProceeds} />

            <h3 className="font-semibold my-2">Other Deductions</h3>

            <ResultOutline
              title="Documentart Stamp (DST)"
              value={extensionDocumentaryStamp}
              textColorClass="text-red-400"
            />
            <ResultOutline
              title="Gross Revenue Tax (GRT)"
              value={extensionGrossRevenueTax}
              textColorClass="text-red-400"
            />
            <ResultOutline
              title="Insurance (CRIP)"
              value={extensionInsurance}
              textColorClass="text-red-400"
            />
            <ResultOutline
              title="Total"
              value={extensionTotal}
              textColorClass="text-red-400"
              isOutline={false}
            />
          </CardContent>
        </Card>

        <Card className="border-2 border-dashed border-gray-200 pt-6 w-full">
          <CardContent className="grid grid-cols-1 gap-5">
            <div className="space-y-2">
              <Label className="font-semibold text-lg">Value Date</Label>
              <CustomDatePicker
                date={extensionValueDate}
                setDate={setExtensionValueDate}
                editable={false}
              />
            </div>
            <div className="space-y-2">
              <Label className="font-semibold text-lg">Maturity Date</Label>
              <CustomDatePicker
                date={extensionMaturityDate}
                setDate={setExtensionMaturityDate}
                editable={false}
              />
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle className="font-semibold text-base text-center">
              EXTENSION REN-E
            </CardTitle>
          </CardHeader>
        </Card>

        <Card className="border-2 border-dashed border-gray-200 pt-6 w-full">
          <CardContent className="grid grid-cols-1">
            <ResultOutline
              title="Effective Interest Rate"
              value={renewalExtensionEffectiveInterestRate}
            />

            <ResultOutline title="GP Factor" value={renewalExtensionGpFactor} />

            <ResultOutline
              title="Principal Amount (PN)"
              value={renewalExtensionPrincipalAmount}
            />

            <ResultOutline
              title="Unearned Interest (UI)"
              value={renewalExtensionUnearnedInterest}
            />

            <ResultOutline title="GP" value={renewalExtensionGrossProceeds} />

            <h3 className="font-semibold my-2">Other Deductions</h3>

            <ResultOutline
              title="Documentart Stamp (DST)"
              value={renewalExtensionDocumentaryStamp}
              textColorClass="text-red-400"
            />
            <ResultOutline
              title="Gross Revenue Tax (GRT)"
              value={renewalExtensionGrossRevenueTax}
              textColorClass="text-red-400"
            />
            <ResultOutline
              title="Insurance (CRIP)"
              value={renewalExtensionInsurance}
              textColorClass="text-red-400"
            />
            <ResultOutline
              title="Total"
              value={renewalExtensionTotal}
              textColorClass="text-red-400"
              isOutline={false}
            />
          </CardContent>
        </Card>

        <Card className="border-2 border-dashed border-gray-200 pt-6 w-full">
          <CardContent className="grid grid-cols-1 gap-5">
            <div className="space-y-2">
              <Label className="font-semibold text-lg">Value Date</Label>
              <CustomDatePicker
                date={renewalExtensionValueDate}
                setDate={setRenewalExtensionValueDate}
                editable={false}
              />
            </div>
            <div className="space-y-2">
              <Label className="font-semibold text-lg">Maturity Date</Label>
              <CustomDatePicker
                date={renewalExtensionMaturityDate}
                setDate={setRenewalExtensionMaturityDate}
                editable={false}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ResultsDisplay;
