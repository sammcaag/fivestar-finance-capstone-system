import React from "react";
import { TabsContent } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Banknote,
  Building,
  Building2,
  Calendar,
  CreditCard,
  PiggyBank,
  User,
} from "lucide-react";
import ClientInfoRowItem from "../ClientInfoRowItem";
import { clientData } from "../../data/client-mock";
import { formatCurrency } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { formatDateToReadable } from "@/utils/format-date-to-readable";

export default function PensionInformationTab() {
  return (
    <TabsContent value="pension" className="mt-3">
      <Card className="border ">
        <CardHeader className="flex gap-4 flex-row items-center">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
            <CreditCard className="h-5 w-5" />
          </span>
          <div>
            <CardTitle className="text-xl">Pension Information</CardTitle>
            <CardDescription>
              Review pension-related details such as AFP service branch, pension
              type, monthly pension, and payee status.
            </CardDescription>
          </div>
        </CardHeader>
        <Separator className="mb-6" />
        <CardContent className="space-y-8">
          <section className="space-y-3">
            <div className="flex gap-2 flex-row items-center">
              <User className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-semibold ">Pension Information</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Rank */}
              <ClientInfoRowItem
                icon={<User className="h-4 w-4 text-primary" />}
                label="Rank"
                value={clientData.rank}
              />
              {/* Pension Type */}
              <ClientInfoRowItem
                icon={<CreditCard className="h-4 w-4 text-primary" />}
                label="Pension Type"
                value={clientData.pensionType}
              />
              {/* ID Number */}
              <ClientInfoRowItem
                icon={<CreditCard className="h-4 w-4 text-primary" />}
                label="ID Number"
                value={clientData.idNumber}
              />
              {/* Serial Number */}
              <ClientInfoRowItem
                icon={<CreditCard className="h-4 w-4 text-primary" />}
                label="Serial Number"
                value={clientData.serialNumber}
              />
              {/* Date Entered Service */}
              <ClientInfoRowItem
                icon={<Calendar className="h-4 w-4 text-primary" />}
                label="Date Entered Service"
                value={formatDateToReadable(clientData.dateEnteredService)}
              />
              {/* Date Separation Service */}
              <ClientInfoRowItem
                icon={<Calendar className="h-4 w-4 text-primary" />}
                label="Date Separation Service"
                value={formatDateToReadable(clientData.dateSeparationService)}
              />
              {/* Date Retired Service */}
              <ClientInfoRowItem
                icon={<Calendar className="h-4 w-4 text-primary" />}
                label="Date Retired Service"
                value={formatDateToReadable(clientData.dateRetiredService)}
              />
              {/* Length of Service */}
              <ClientInfoRowItem
                icon={<Calendar className="h-4 w-4 text-primary" />}
                label="Length of Service"
                value={clientData.lengthOfService}
              />
              {/* Last Unit Assigned */}
              <ClientInfoRowItem
                icon={<Building2 className="h-4 w-4 text-primary" />}
                label="Last Unit Assigned"
                value={clientData.lastUnitAssigned}
              />
              {/* Branch of Service */}
              <ClientInfoRowItem
                icon={<Building2 className="h-4 w-4 text-primary" />}
                label="Branch of Service"
                value={clientData.branchOfService}
              />
            </div>
          </section>
          <section className="space-y-3">
            <div className="flex gap-2 flex-row items-center">
              <Banknote className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-semibold ">
                Client Account Information
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Account Number */}
              <ClientInfoRowItem
                icon={<CreditCard className="h-4 w-4 text-primary" />}
                label="Account Number"
                value={clientData.accountNumber}
              />
              {/* Monthly Pension */}
              <ClientInfoRowItem
                icon={<CreditCard className="h-4 w-4 text-primary" />}
                label="Monthly Pension"
                value={formatCurrency(clientData.monthlyPension)}
              />
              {/* Monthly Deduction */}
              <ClientInfoRowItem
                icon={<CreditCard className="h-4 w-4 text-primary" />}
                label="Monthly Deduction"
                value={formatCurrency(clientData.monthlyDeduction)}
              />
              {/* FI1 */}
              <ClientInfoRowItem
                icon={<CreditCard className="h-4 w-4 text-primary" />}
                label="FI1"
                value={formatCurrency(clientData.fi1)}
              />
              {/* ATM Account Number */}
              <ClientInfoRowItem
                icon={<CreditCard className="h-4 w-4 text-primary" />}
                label="ATM Account Number"
                value={clientData.atmAccountNumber}
              />
            </div>
          </section>

          <section className="space-y-3">
            <div className="flex gap-2 flex-row items-center">
              <Building className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-semibold ">Bank Information</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
              <ClientInfoRowItem
                icon={<Building2 className="h-4 w-4 text-primary" />}
                label="Bank Name"
                value={clientData.bankName}
              />
              <ClientInfoRowItem
                icon={<Building2 className="h-4 w-4 text-primary" />}
                label="Branch of Bank"
                value={clientData.branchOfBank}
              />
            </div>
          </section>
        </CardContent>
      </Card>
    </TabsContent>
  );
}
