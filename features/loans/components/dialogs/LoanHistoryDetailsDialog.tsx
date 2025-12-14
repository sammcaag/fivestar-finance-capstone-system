"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { formatDateToReadable } from "@/utils/format-date-to-readable";
import { formatToPhCurrency } from "@/utils/format-to-ph-currency";
import { getProductTypeClass } from "@/utils/get-product-type-class";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useEffect } from "react";
import { getLoanHistoryByIdApi } from "../../history/api/get-loan-history-by-id";

type LoanHistoryDetailsDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  loanHistoryId?: number;
  dedCode: string;
  productType: string;
};

type SnapshotRowProps = {
  label: string;
  value: string;
};

function SnapshotRow({ label, value }: SnapshotRowProps) {
  return (
    <div className="flex items-center justify-between gap-6">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className="text-sm font-medium text-right">{value}</span>
    </div>
  );
}

export default function LoanHistoryDetailsDialog({
  open,
  onOpenChange,
  loanHistoryId,
  dedCode,
  productType,
}: LoanHistoryDetailsDialogProps) {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["loanHistoryDetails", loanHistoryId],
    queryFn: () => {
      if (!loanHistoryId) {
        throw new Error("Loan history id is required");
      }
      return getLoanHistoryByIdApi(loanHistoryId);
    },
    enabled: open && Boolean(loanHistoryId),
    retry: 1,
  });

  useEffect(() => {
    if (open) return;

    queryClient.removeQueries({
      queryKey: ["loanHistoryDetails", loanHistoryId],
    });
  }, [open, loanHistoryId, queryClient]);

  const errorMessage = axios.isAxiosError(query.error)
    ? query.error.response?.data?.error || "Request failed"
    : query.error instanceof Error
      ? query.error.message
      : "Unexpected error";

  const loanHistory = query.data;
  const computation = loanHistory?.loanComputation;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="min-w-[55%] h-[80vh] overflow-y-auto p-6 md:p-8">
        <DialogHeader className="mb-6">
          <DialogTitle className="text-2xl font-semibold">Loan Snapshot</DialogTitle>
          <DialogDescription asChild>
            <div className="mt-2 flex flex-col gap-2">
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="secondary" className="font-semibold">
                  {dedCode}
                </Badge>
                <Badge className={cn(getProductTypeClass(productType))}>{productType}</Badge>
              </div>
              {query.isLoading && (
                <p className="text-sm text-muted-foreground">Loading loan details...</p>
              )}
              {query.isError && <p className="text-sm text-destructive">{errorMessage}</p>}
            </div>
          </DialogDescription>
        </DialogHeader>

        {loanHistory && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Loan History</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <SnapshotRow label="DED Code" value={loanHistory.dedCode} />
                <SnapshotRow label="Product Type" value={loanHistory.productType} />
                <SnapshotRow
                  label="Monthly Amortization"
                  value={formatToPhCurrency(loanHistory.monthlyAmortization)}
                />
                <SnapshotRow label="Term" value={`${loanHistory.term} months`} />
                <SnapshotRow
                  label="Value Date"
                  value={formatDateToReadable(loanHistory.valueDate, true)}
                />
                <SnapshotRow
                  label="Maturity Date"
                  value={formatDateToReadable(loanHistory.maturityDate, true)}
                />
                <SnapshotRow
                  label="Setted Maturity Date"
                  value={formatDateToReadable(loanHistory.settedMaturityDate ?? new Date(), true)}
                />
                <Separator />
                <SnapshotRow label="Account Number" value={loanHistory.accountNumber ?? ""} />
                <SnapshotRow label="PN Number" value={loanHistory.pnNumber} />
                <SnapshotRow label="Purpose" value={loanHistory.purpose} />
                <Separator />
                <SnapshotRow
                  label="Outstanding Balance"
                  value={formatToPhCurrency(loanHistory.outstandingBalance ?? 0)}
                />
                <SnapshotRow
                  label="Other Deduction"
                  value={formatToPhCurrency(loanHistory.otherDeduction ?? 0)}
                />
                <SnapshotRow label="Status" value={String(loanHistory.status ?? "")} />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Loan Computation</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {!computation && (
                  <p className="text-sm text-muted-foreground">No computation record linked.</p>
                )}

                {computation && (
                  <>
                    <SnapshotRow
                      label="PN Amount"
                      value={formatToPhCurrency(computation.pnAmount)}
                    />
                    <SnapshotRow
                      label="Gross Proceeds"
                      value={formatToPhCurrency(computation.gp)}
                    />
                    <SnapshotRow
                      label="Unearned Interest"
                      value={formatToPhCurrency(computation.ui)}
                    />
                    <SnapshotRow label="Effective Interest Rate" value={String(computation.eir)} />
                    <SnapshotRow label="GP Factor" value={String(computation.gpFactor)} />
                    <Separator />
                    <SnapshotRow
                      label="Documentary Stamp (DST)"
                      value={formatToPhCurrency(computation.dst)}
                    />
                    <SnapshotRow
                      label="Gross Revenue Tax (GRT)"
                      value={formatToPhCurrency(computation.grt)}
                    />
                    <SnapshotRow
                      label="CRIP / Insurance"
                      value={formatToPhCurrency(computation.crip)}
                    />
                    <SnapshotRow
                      label="Total Deduction"
                      value={formatToPhCurrency(computation.totalDeduction)}
                    />
                    <Separator />
                    <SnapshotRow
                      label="Outstanding Balance (OB)"
                      value={formatToPhCurrency(computation.ob)}
                    />
                    <SnapshotRow
                      label="Net Proceeds"
                      value={formatToPhCurrency(computation.netProceeds)}
                    />

                    {(computation.extTerm || computation.renOi) && (
                      <>
                        <Separator />
                        <SnapshotRow
                          label="Extension Term"
                          value={String(computation.extTerm ?? "")}
                        />
                        <SnapshotRow
                          label="Extension Value Date"
                          value={formatDateToReadable(computation.extValueDate ?? new Date(), true)}
                        />
                        <SnapshotRow
                          label="Extension Maturity Date"
                          value={formatDateToReadable(
                            computation.extMaturityDate ?? new Date(),
                            true
                          )}
                        />
                      </>
                    )}
                  </>
                )}
              </CardContent>
            </Card>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
