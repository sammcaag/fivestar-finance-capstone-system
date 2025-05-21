import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { TabsContent } from "@/components/ui/tabs";
import { BarChart4 } from "lucide-react";
import React from "react";
import { clientData } from "../../data/client-mock";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

export default function SummaryTab() {
  return (
    <TabsContent value="summary" className="mt-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="border-0  h-full">
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold ">Payment History</h2>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500">Last 12 months</span>
                  <Button variant="outline" size="sm" className="h-8">
                    <BarChart4 className="h-4 w-4 mr-1" />
                    View Details
                  </Button>
                </div>
              </div>

              <div className="h-64 w-full bg-blue-50 rounded-lg flex items-center justify-center">
                <p className="text-primary">Payment History Chart</p>
              </div>

              <div className="mt-4 flex justify-end">
                <Button variant="outline" size="sm" className="text-primary">
                  View Payment Method
                </Button>
                <Button className="ml-2  hover:bg-blue-700" size="sm">
                  View History
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="border-0 ">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-semibold ">
                    {clientData.paymentStatus}
                  </h3>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-2 mt-4">
                    <div>
                      <p className="text-sm text-gray-500">Last payment</p>
                      <p className="font-medium">
                        {clientData.lastPaymentDate}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Amount</p>
                      <p className="font-medium">
                        {clientData.lastPaymentAmount}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                  <span className="text-green-600 text-xl">&#8369;</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 ">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold  mb-4">Location</h3>
              <div className="h-40 w-full bg-blue-50 rounded-lg mb-4 flex items-center justify-center">
                <p className="text-primary">Map View</p>
              </div>

              <h4 className="font-medium ">{clientData.property}</h4>

              <div className="mt-4 space-y-2">
                <div>
                  <p className="text-sm text-gray-500">Address</p>
                  <p className="font-medium">{clientData.homeAddress}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Building</p>
                    <p className="font-medium">{clientData.building}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Unit</p>
                    <p className="font-medium">{clientData.unit}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Card className="border-0  mt-6">
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold ">Family</h2>
            <p className="text-sm text-gray-500">
              {clientData.familyMembers.length} family members
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium text-gray-500">
                    Member
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-gray-500">
                    Last login
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-gray-500">
                    Relation
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-gray-500">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {clientData.familyMembers.map((member, index) => (
                  <tr key={index} className="border-b last:border-b-0">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="bg-blue-100 text-primary">
                            {member.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <span className="font-medium">{member.name}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-gray-600">
                      {member.lastLogin}
                    </td>
                    <td className="py-3 px-4 text-gray-600">
                      {member.relation}
                    </td>
                    <td className="py-3 px-4">
                      <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                        {member.status}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </TabsContent>
  );
}
