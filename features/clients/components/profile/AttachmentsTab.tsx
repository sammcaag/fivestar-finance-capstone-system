import { Card, CardContent } from '@/components/ui/card';
import { TabsContent } from '@/components/ui/tabs';
import { Badge, CreditCard } from 'lucide-react';
import React from 'react'

export default function AttachmentsTab() {
  return (
    <TabsContent value="payments" className="mt-6">
      <Card className="border-0 ">
        <CardContent className="p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <CreditCard className="h-5 w-5 text-primary" />
            Payment History
          </h2>

          <div className="h-64 w-full bg-blue-50 rounded-lg flex items-center justify-center mb-6">
            <p className="text-primary">Payment History Chart</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium text-gray-500">
                    Date
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-gray-500">
                    Amount
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-gray-500">
                    Type
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-gray-500">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-3 px-4">Aug 1, 2023</td>
                  <td className="py-3 px-4">$3,500.00</td>
                  <td className="py-3 px-4">Pension</td>
                  <td className="py-3 px-4">
                    <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                      Completed
                    </Badge>
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">Jul 1, 2023</td>
                  <td className="py-3 px-4">$3,500.00</td>
                  <td className="py-3 px-4">Pension</td>
                  <td className="py-3 px-4">
                    <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                      Completed
                    </Badge>
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">Jun 1, 2023</td>
                  <td className="py-3 px-4">$3,500.00</td>
                  <td className="py-3 px-4">Pension</td>
                  <td className="py-3 px-4">
                    <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                      Completed
                    </Badge>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </TabsContent>
  );
}
