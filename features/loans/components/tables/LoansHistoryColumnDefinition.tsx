import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useDialog } from "@/contexts/DialogContext";
import { useAuth } from "@/features/auth/context/AuthContext";
import { ApprovalStatus, statusStyles } from "@/features/clients/types/client-types";
import { cn } from "@/lib/utils";
import { formatDateToReadable } from "@/utils/format-date-to-readable";
import { formatToPhCurrency } from "@/utils/format-to-ph-currency";
import { getProductTypeClass } from "@/utils/get-product-type-class";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { ColumnDef } from "@tanstack/react-table";
import { CheckCircle, Eye, MoreHorizontal, Printer, X } from "lucide-react";
import { useState } from "react";
import { updateLoanHistoryApprovalStatusApi } from "../../history/api/loan-history-service";
import { LoanHistoryPayload } from "../../history/types/loan-form-types";
import { loanStatusClassNames } from "../../utils/loan-status-classnames";
import LoanHistoryDetailsDialog from "../dialogs/LoanHistoryDetailsDialog";
import ViewDocumentsDialog from "../document-dialog/ViewDocumentsDialog";

export const loansHistoryColumnDefinition: ColumnDef<LoanHistoryPayload>[] = [
  {
    accessorKey: "dedCode",
    header: "DED Code",
    cell: ({ row }) => <span className="whitespace-nowrap">{row.original.dedCode}</span>,
    size: 150,
    enableColumnFilter: true,
    enableSorting: true,
  },
  {
    accessorKey: "productType",
    header: "Product Type",
    cell: ({ row }) => (
      <Badge className={cn(getProductTypeClass(row.original.productType))}>
        {row.original.productType}
      </Badge>
    ),
    enableColumnFilter: false,
    enableSorting: false,
  },
  {
    accessorKey: "monthlyAmortization",
    header: "M.A",
    cell: ({ row }) => (
      <span className="text-sm font-semibold whitespace-nowrap">
        {formatToPhCurrency(row.original.monthlyAmortization)}
      </span>
    ),
    enableColumnFilter: false,
    enableSorting: false,
  },
  {
    accessorKey: "term",
    header: "Term",
    cell: ({ row }) => <span className="whitespace-nowrap">{row.original.term} Months</span>,
    enableColumnFilter: false,
    enableSorting: false,
  },
  {
    accessorKey: "createdAt",
    header: "Made Date",
    cell: ({ row }) => (
      <span className="whitespace-nowrap">
        {formatDateToReadable(row.original.createdAt ?? new Date(), true)}
      </span>
    ),
    enableColumnFilter: false,
    enableSorting: false,
  },
  {
    accessorKey: "valueDate",
    header: "Value Date",
    cell: ({ row }) => (
      <span className="whitespace-nowrap">
        {formatDateToReadable(row.original.valueDate, true)}
      </span>
    ),
    enableColumnFilter: false,
    enableSorting: false,
  },
  {
    accessorKey: "maturityDate",
    header: "Maturity Date",
    cell: ({ row }) => (
      <span className="whitespace-nowrap">
        {formatDateToReadable(row.original.maturityDate, true)}
      </span>
    ),
    enableColumnFilter: false,
    enableSorting: false,
  },
  {
    accessorKey: "status",
    header: "Account Status",
    cell: ({ row }) => {
      const status = row.original.status;
      const config = loanStatusClassNames(status!);
      return (
        <Badge
          className={cn(
            "text-xs font-medium px-2 py-1",
            config ? `${config.bg} ${config.text}` : ""
          )}
        >
          {status}
        </Badge>
      );
    },
    enableColumnFilter: true,
    enableSorting: false,
  },
  {
    accessorKey: "approvalStatus",
    header: "Approval Status",
    cell: ({ row }) => {
      const approvalStatus = row.original.approvalStatus;
      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Badge
                className={cn("bg-amber-400", statusStyles[approvalStatus as ApprovalStatus].badge)}
              >
                {approvalStatus}
              </Badge>
            </TooltipTrigger>
            <TooltipContent>
              {approvalStatus?.toUpperCase() === "NSF" ? "Non-Sufficient Funds" : approvalStatus}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    },
    enableColumnFilter: true,
    enableSorting: false,
  },
  {
    accessorKey: "action",
    header: "Action",
    size: 80,
    cell: ({ row }) => {
      const [isViewDocumentsOpen, setIsViewDocumentsOpen] = useState(false);
      const [isViewDetailsOpen, setIsViewDetailsOpen] = useState(false);
      const { user } = useAuth();
      const queryClient = useQueryClient();
      const { showDialog } = useDialog();

      const isFinance = user?.role?.toUpperCase() === "FINANCE";

      const approvalStatus = row.original.approvalStatus;
      const canViewDocuments = approvalStatus === "APPROVED";

      const id = Number(row.original.id);
      console.log("IDDDD ISSS", id);

      const { mutateAsync: updateLoanHistoryApprovalStatus, isPending } = useMutation({
        mutationKey: ["updateClientApprovalStatus"],
        mutationFn: ({ id, approvalStatus }: { id: number; approvalStatus: ApprovalStatus }) =>
          updateLoanHistoryApprovalStatusApi(id, approvalStatus),
      });

      return (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="p-0 w-8 h-8">
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                className="flex gap-2 items-center cursor-pointer"
                onClick={() => setIsViewDetailsOpen(true)}
              >
                <Eye className="w-4 h-4" />
                View Details
              </DropdownMenuItem>

              {!isFinance && (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div>
                        <DropdownMenuItem
                          disabled={!canViewDocuments}
                          className="flex gap-2 items-center"
                          onClick={() => canViewDocuments && setIsViewDocumentsOpen(true)}
                        >
                          <Printer className="w-4 h-4" />
                          View Documents
                        </DropdownMenuItem>
                      </div>
                    </TooltipTrigger>

                    {!canViewDocuments && (
                      <TooltipContent>
                        Documents are available only for APPROVED loans
                      </TooltipContent>
                    )}
                  </Tooltip>
                </TooltipProvider>
              )}

              {isFinance && (
                <>
                  <DropdownMenuItem
                    className="flex gap-2 items-center cursor-pointer"
                    onClick={async () => {
                      if (!id) return;

                      try {
                        await updateLoanHistoryApprovalStatus({ id, approvalStatus: "APPROVED" });
                        console.log("Loan status updated to APPROVED");
                        showDialog("Loan status updated to APPROVED", "success");
                      } catch (error) {
                        console.error("Failed to update loan status:", error);
                        showDialog("Failed to update loan status", "error");
                      }
                    }}
                  >
                    <CheckCircle className="w-4 h-4" />
                    APPROVED
                  </DropdownMenuItem>

                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div>
                          <DropdownMenuItem
                            className="flex gap-2 items-center cursor-pointer"
                            onClick={async () => {
                              if (!id) {
                                showDialog("Loan History Id is Missing/Invalid", "error");
                                return;
                              }

                              try {
                                await updateLoanHistoryApprovalStatus({
                                  id,
                                  approvalStatus: "NSF",
                                });
                                console.log("Loan status updated to NSF");
                                showDialog("Loan status updated to NSF", "success");
                              } catch (error) {
                                console.error("Failed to update loan status:", error);
                                showDialog("Failed to update loan status", "error");
                              }
                            }}
                          >
                            <X className="w-4 h-4" />
                            NSF
                          </DropdownMenuItem>
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>Non-Sufficient Funds (NSF)</TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>

          <LoanHistoryDetailsDialog
            open={isViewDetailsOpen}
            onOpenChange={setIsViewDetailsOpen}
            productType={row.original.productType}
            dedCode={row.original.dedCode}
            loanHistoryId={row.original.id}
          />

          <ViewDocumentsDialog
            open={isViewDocumentsOpen}
            onOpenChange={setIsViewDocumentsOpen}
            productType={row.original.productType}
            dedCode={row.original.dedCode}
            loanHistoryId={row.original.id}
          />
        </>
      );
    },
    enableColumnFilter: false,
    enableSorting: false,
  },
];
