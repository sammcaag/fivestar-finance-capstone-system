"use client";

import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Building2,
  MoreVertical,
  FileText,
  Download,
  Printer,
  Eye,
  List,
  ClipboardList,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LoanRecord } from "../../types/client-types";
import { Separator } from "@/components/ui/separator";

interface ClientHistoryTableProps {
  records: LoanRecord[];
  onViewLoanDetails?: (loan: LoanRecord) => void;
}

export default function ClientHistoryTable({
  records,
  onViewLoanDetails,
}: ClientHistoryTableProps) {
  const [selectedLoan, setSelectedLoan] = useState<LoanRecord | null>(null);

  // Function to check if a date is in the past
  const isDateInPast = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    return date < today;
  };

  // Function to organize loans into a hierarchical structure
  const organizeLoansByParent = (loans: LoanRecord[]) => {
    // First, find all parent loans (those without a parentId)
    const parentLoans = loans.filter((loan) => !loan.parentId);

    // Then, for each parent loan, find its children
    return parentLoans.map((parentLoan) => {
      const children = loans.filter((loan) => loan.parentId === parentLoan.id);
      return {
        ...parentLoan,
        children,
        isAllChildrenPaid: children.every((child) =>
          isDateInPast(child.maturityDate)
        ),
      };
    });
  };

  const organizedLoans = organizeLoansByParent(records);

  // Function to determine if a loan group is fully paid
  const isLoanGroupFullyPaid = (
    loan: LoanRecord & { children: LoanRecord[]; isAllChildrenPaid: boolean }
  ) => {
    return isDateInPast(loan.maturityDate) && loan.isAllChildrenPaid;
  };

  return (
    <Card className="border">
      <CardHeader className="flex gap-4 flex-row items-center">
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
          <ClipboardList className="h-5 w-5" />
        </span>
        <div>
          <CardTitle className="text-xl">Loan History</CardTitle>
          <CardDescription>
            View and verify the client&apos;s loan history.
          </CardDescription>
        </div>
      </CardHeader>
      <Separator className="mb-4" />
      <CardContent>
        <div className="overflow-x-auto border rounded-lg">
          <Table className="w-full text-sm">
            <TableHeader>
              <TableRow className="border-b text-left">
                <TableHead className="px-4 py-3 font-medium">
                  DED CODE
                </TableHead>
                <TableHead className="px-4 py-3 font-medium">
                  PRODUCT TYPE
                </TableHead>
                <TableHead className="px-4 py-3 font-medium">MA</TableHead>
                <TableHead className="px-4 py-3 font-medium">TERM</TableHead>
                <TableHead className="px-4 py-3 font-medium">
                  RELEASED DATE
                </TableHead>
                <TableHead className="px-4 py-3 font-medium">
                  VALUE DATE
                </TableHead>
                <TableHead className="px-4 py-3 font-medium">
                  MATURITY DATE
                </TableHead>
                <TableHead className="px-4 py-3 font-medium">STATUS</TableHead>
                <TableHead className="px-4 py-3 font-medium">ACTION</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {organizedLoans.map((parentLoan) => {
                const isFullyPaid = isLoanGroupFullyPaid(parentLoan);
                const isParentPaid = isDateInPast(parentLoan.maturityDate);

                return (
                  <React.Fragment key={parentLoan.id}>
                    {/* Parent loan row */}
                    <TableRow
                      className={`border-b transition-colors ${
                        isFullyPaid
                          ? "bg-red-50 border-red-200"
                          : isParentPaid
                          ? "text-gray-400"
                          : ""
                      }`}
                      onClick={() => onViewLoanDetails?.(parentLoan)}
                    >
                      <TableCell className="px-4 py-3">
                        {parentLoan.dedCode}
                      </TableCell>
                      <TableCell className="px-4 py-3">
                        {parentLoan.productType}
                      </TableCell>
                      <TableCell className="px-4 py-3">
                        {parentLoan.amount}
                      </TableCell>
                      <TableCell className="px-4 py-3">
                        {parentLoan.term}
                      </TableCell>
                      <TableCell className="px-4 py-3">
                        {parentLoan.releasedDate}
                      </TableCell>
                      <TableCell className="px-4 py-3">
                        {parentLoan.valueDate}
                      </TableCell>
                      <TableCell className="px-4 py-3">
                        {parentLoan.maturityDate}
                      </TableCell>
                      <TableCell className="px-4 py-3">
                        <Badge
                          className={cn(
                            parentLoan.status === "RELEASED"
                              ? "bg-blue-100 text-primary-bold hover:bg-blue-100"
                              : "bg-white text-destructive hover:bg-white border border-red-200"
                          )}
                        >
                          {parentLoan.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="px-4 py-3">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <MoreVertical className="h-4 w-4" />
                              <span className="sr-only">Open menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              onClick={() => setSelectedLoan(parentLoan)}
                            >
                              <Eye className="mr-2 h-4 w-4" />
                              <span>View Documents</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Download className="mr-2 h-4 w-4" />
                              <span>Download</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Printer className="mr-2 h-4 w-4" />
                              <span>Print</span>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>

                    {/* Child loan rows (extensions) */}
                    {parentLoan.children?.map((childLoan) => (
                      <TableRow
                        key={childLoan.id}
                        className={`border-b transition-colors ${
                          isFullyPaid ? "bg-red-50 border-red-200" : ""
                        }`}
                        onClick={() => onViewLoanDetails?.(childLoan)}
                      >
                        <TableCell className="px-4 py-3 pl-8">
                          {childLoan.dedCode}{" "}
                          {childLoan.extensionType &&
                            `(${childLoan.extensionType})`}
                        </TableCell>
                        <TableCell className="px-4 py-3">
                          {childLoan.productType}
                        </TableCell>
                        <TableCell className="px-4 py-3">
                          {childLoan.amount}
                        </TableCell>
                        <TableCell className="px-4 py-3">
                          {childLoan.term}
                        </TableCell>
                        <TableCell className="px-4 py-3">
                          {childLoan.releasedDate}
                        </TableCell>
                        <TableCell className="px-4 py-3">
                          {childLoan.valueDate}
                        </TableCell>
                        <TableCell className="px-4 py-3">
                          {childLoan.maturityDate}
                        </TableCell>
                        <TableCell className="px-4 py-3">
                          <Badge
                            className={cn(
                              childLoan.status === "RELEASED"
                                ? "bg-blue-100 text-primary-bold hover:bg-blue-100"
                                : "bg-white text-destructive hover:bg-white border border-red-200"
                            )}
                          >
                            {childLoan.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="px-4 py-3">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8"
                                onClick={(e) => e.stopPropagation()}
                              >
                                <MoreVertical className="h-4 w-4" />
                                <span className="sr-only">Open menu</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem
                                onClick={() => setSelectedLoan(childLoan)}
                              >
                                <Eye className="mr-2 h-4 w-4" />
                                <span>View Documents</span>
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Download className="mr-2 h-4 w-4" />
                                <span>Download</span>
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Printer className="mr-2 h-4 w-4" />
                                <span>Print</span>
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </React.Fragment>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </CardContent>

      {/* Document Dialog */}
      <Dialog
        open={!!selectedLoan}
        onOpenChange={(open) => !open && setSelectedLoan(null)}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Loan Documents</DialogTitle>
            <DialogDescription>
              Documents generated for loan {selectedLoan?.dedCode} on{" "}
              {selectedLoan?.releasedDate}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            {selectedLoan?.documents && selectedLoan.documents.length > 0 ? (
              selectedLoan.documents.map((doc) => (
                <div
                  key={doc.id}
                  className="flex items-center justify-between p-3 border rounded-md"
                >
                  <div className="flex items-center gap-3">
                    <FileText className="h-5 w-5 text-blue-600" />
                    <div>
                      <p className="font-medium text-sm">{doc.name}</p>
                      <p className="text-xs text-gray-500">
                        Generated on {doc.date}
                      </p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-1" />
                    Download
                  </Button>
                </div>
              ))
            ) : (
              <div className="text-center py-6 text-gray-500">
                No documents available for this loan
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </Card>
  );
}
