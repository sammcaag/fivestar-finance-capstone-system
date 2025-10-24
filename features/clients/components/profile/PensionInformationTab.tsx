import React from "react";
import { TabsContent } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Building2, Calendar, CreditCard, User } from "lucide-react";
import ClientInfoRowItem from "../ClientInfoRowItem";
import { clientData } from "../../data/client-mock";
import { formatCurrency } from "@/lib/utils";

export default function PensionInformationTab() {
  return (
    <TabsContent value="pension" className="mt-3">
      <Card className="border-0 ">
        <CardContent className="p-6">
          <h2 className="text-xl font-bold  mb-6 flex items-center gap-2">
            <CreditCard className="h-5 w-5 text-primary" />
            Pension Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            <ClientInfoRowItem
              icon={<User className="h-4 w-4 text-primary" />}
              label="Rank"
              value={clientData.rank}
            />
            <ClientInfoRowItem
              icon={<CreditCard className="h-4 w-4 text-primary" />}
              label="Pension Type"
              value={clientData.pensionType}
            />
            <ClientInfoRowItem
              icon={<CreditCard className="h-4 w-4 text-primary" />}
              label="Serial Number"
              value={clientData.serialNumber}
            />
            <ClientInfoRowItem
              icon={<Calendar className="h-4 w-4 text-primary" />}
              label="Date Entered Service"
              value={clientData.dateEnteredService}
            />
            <ClientInfoRowItem
              icon={<Calendar className="h-4 w-4 text-primary" />}
              label="Date Separation Service"
              value={clientData.dateSeparationService}
            />
            <ClientInfoRowItem
              icon={<Calendar className="h-4 w-4 text-primary" />}
              label="Date Retired Service"
              value={clientData.dateRetiredService}
            />
            <ClientInfoRowItem
              icon={<Calendar className="h-4 w-4 text-primary" />}
              label="Length of Service"
              value={clientData.lengthOfService}
            />
            <ClientInfoRowItem
              icon={<Building2 className="h-4 w-4 text-primary" />}
              label="Last Unit Assigned"
              value={clientData.lastUnitAssigned}
            />
            <ClientInfoRowItem
              icon={<Building2 className="h-4 w-4 text-primary" />}
              label="Branch of Service"
              value={clientData.branchOfService}
            />
            <ClientInfoRowItem
              icon={<CreditCard className="h-4 w-4 text-primary" />}
              label="Monthly Pension"
              value={formatCurrency(clientData.monthlyPension)}
            />
            <ClientInfoRowItem
              icon={<CreditCard className="h-4 w-4 text-primary" />}
              label="Monthly Deduction"
              value={formatCurrency(clientData.monthlyDeduction)}
            />
            <ClientInfoRowItem
              icon={<CreditCard className="h-4 w-4 text-primary" />}
              label="FI1"
              value={formatCurrency(clientData.fi1)}
            />
            <ClientInfoRowItem
              icon={<CreditCard className="h-4 w-4 text-primary" />}
              label="ATM Account Number"
              value={clientData.atmAccountNumber}
            />
          </div>

          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-4 pb-2 border-b border-gray-200 ">
              Bank Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
              <ClientInfoRowItem
                icon={<Building2 className="h-4 w-4 text-primary" />}
                label="Bank Name"
                value={clientData.bankName}
              />
              <ClientInfoRowItem
                icon={<Building2 className="h-4 w-4 text-primary" />}
                label="Branch of Bank"
                value={clientData.bankBranch}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </TabsContent>
  );
}
