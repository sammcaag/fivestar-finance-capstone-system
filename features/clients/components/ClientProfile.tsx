"use client";

import type React from "react";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  User,
  Calendar,
  MapPin,
  Phone,
  Briefcase,
  Users,
  CreditCard,
  Building2,
  Edit,
  BarChart4,
} from "lucide-react";
import { clientData } from "../lib/client-metadata";

export default function ClientProfile() {
  const [activeTab, setActiveTab] = useState("summary");

  // Sample data - in a real app this would come from a database or API

  return (
    <div className="mx-auto py-6 space-y-6">
      {/* Profile Header */}
      <Card className="border-0 overflow-hidden">
        <div className="p-6">
          <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
            <div className="relative">
              <Avatar className="h-32 w-32 border-4 border-white ">
                <AvatarImage
                  src={clientData.profilePicture || "/placeholder.svg"}
                  alt="Profile picture"
                />
                <AvatarFallback className="text-3xl bg-blue-100 text-blue-600">
                  {clientData.firstName.charAt(0)}
                  {clientData.lastName.charAt(0)}
                </AvatarFallback>
              </Avatar>
            </div>

            <div className="space-y-2 text-center md:text-left flex-1">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">
                    {clientData.firstName} {clientData.midName}{" "}
                    {clientData.lastName} {clientData.suffix}
                  </h1>
                  <Badge className="mt-1 bg-blue-100 text-blue-700 hover:bg-blue-100">
                    {clientData.status === "ACTIVE"
                      ? "Current Client"
                      : "Inactive Client"}
                  </Badge>
                </div>

                <div className="flex gap-2 mt-4 md:mt-0 justify-center md:justify-end">
                  <Button variant="outline" className="flex items-center gap-1">
                    <Edit className="h-4 w-4" />
                    Edit
                  </Button>
                  <Button className=" hover:bg-blue-700">Contact</Button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
                <InfoBox label="Program" value={clientData.program} />
                <InfoBox label="Client ID" value={clientData.clientId} />
                <InfoBox label="Location" value={clientData.location} />
                <InfoBox label="Property" value={clientData.property} />
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Tabbed Information Sections */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="tabs-container">
          <TabsTrigger value="summary" className={`tabs-trigger-style`}>
            Summary
          </TabsTrigger>
          <TabsTrigger value="general" className={`tabs-trigger-style`}>
            General Information
          </TabsTrigger>
          <TabsTrigger value="other" className={`tabs-trigger-style`}>
            Family Information
          </TabsTrigger>
          <TabsTrigger value="pension" className={`tabs-trigger-style`}>
            Pension Information
          </TabsTrigger>
          <TabsTrigger value="payments" className={`tabs-trigger-style`}>
            Payments
          </TabsTrigger>
        </TabsList>

        {/* Summary Tab */}
        <TabsContent value="summary" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card className="border-0  h-full">
                <CardContent className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-gray-900">
                      Payment History
                    </h2>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-500">
                        Last 12 months
                      </span>
                      <Button variant="outline" size="sm" className="h-8">
                        <BarChart4 className="h-4 w-4 mr-1" />
                        View Details
                      </Button>
                    </div>
                  </div>

                  <div className="h-64 w-full bg-blue-50 rounded-lg flex items-center justify-center">
                    <p className="text-blue-600">Payment History Chart</p>
                  </div>

                  <div className="mt-4 flex justify-end">
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-blue-600"
                    >
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
                      <h3 className="text-lg font-semibold text-gray-900">
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
                      <span className="text-green-600 text-xl">$</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 ">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Location
                  </h3>
                  <div className="h-40 w-full bg-blue-50 rounded-lg mb-4 flex items-center justify-center">
                    <p className="text-blue-600">Map View</p>
                  </div>

                  <h4 className="font-medium text-gray-900">
                    {clientData.property}
                  </h4>

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
                <h2 className="text-xl font-bold text-gray-900">Family</h2>
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
                              <AvatarFallback className="bg-blue-100 text-blue-600">
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

        {/* General Information Tab */}
        <TabsContent value="general" className="mt-6">
          <Card className="border-0 ">
            <CardContent className="p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <User className="h-5 w-5 text-blue-600" />
                General Information
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                <InfoItem
                  icon={<MapPin className="h-4 w-4 text-blue-600" />}
                  label="Home Address"
                  value={clientData.homeAddress}
                />
                <InfoItem
                  icon={<MapPin className="h-4 w-4 text-blue-600" />}
                  label="Current Address"
                  value={clientData.currentAddress}
                />
                <InfoItem
                  icon={<Calendar className="h-4 w-4 text-blue-600" />}
                  label="Birth Date"
                  value={clientData.birthDate}
                />
                <InfoItem
                  icon={<Users className="h-4 w-4 text-blue-600" />}
                  label="Civil Status"
                  value={clientData.civilStatus}
                />
                <InfoItem
                  icon={<User className="h-4 w-4 text-blue-600" />}
                  label="Religion"
                  value={clientData.religion}
                />
                <InfoItem
                  icon={<User className="h-4 w-4 text-blue-600" />}
                  label="Mother's Maiden Name"
                  value={clientData.mothersMaidenName}
                />
                <InfoItem
                  icon={<MapPin className="h-4 w-4 text-blue-600" />}
                  label="Mother's Place of Birth"
                  value={clientData.motherPlaceOfBirth}
                />
                <InfoItem
                  icon={<Phone className="h-4 w-4 text-blue-600" />}
                  label="Contact Number 1"
                  value={clientData.contactNumber1}
                />
                <InfoItem
                  icon={<Phone className="h-4 w-4 text-blue-600" />}
                  label="Contact Number 2"
                  value={clientData.contactNumber2}
                />
                <InfoItem
                  icon={<Briefcase className="h-4 w-4 text-blue-600" />}
                  label="Mother's Occupation"
                  value={clientData.motherOccupation}
                />
              </div>

              <div className="mt-8">
                <h3 className="text-lg font-semibold mb-4">Remarks</h3>
                <Textarea
                  className="min-h-[120px] bg-gray-50"
                  value={clientData.remarks}
                  readOnly
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Other Information Tab */}
        <TabsContent value="other" className="mt-6">
          <Card className="border-0 ">
            <CardContent className="p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Users className="h-5 w-5 text-blue-600" />
                Family Information
              </h2>

              <div className="space-y-8">
                <div>
                  <h3 className="text-lg font-semibold mb-4 pb-2 border-b border-gray-200 text-gray-900">
                    Spouse Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                    <InfoItem
                      icon={<User className="h-4 w-4 text-blue-600" />}
                      label="Spouse's Full Name"
                      value={clientData.spouseFullName}
                    />
                    <InfoItem
                      icon={<Calendar className="h-4 w-4 text-blue-600" />}
                      label="Birthdate"
                      value={clientData.spouseBirthdate}
                    />
                    <InfoItem
                      icon={<MapPin className="h-4 w-4 text-blue-600" />}
                      label="Address"
                      value={clientData.spouseAddress}
                    />
                    <InfoItem
                      icon={<Phone className="h-4 w-4 text-blue-600" />}
                      label="Contact Number"
                      value={clientData.spouseContactNumber}
                    />
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4 pb-2 border-b border-gray-200 text-gray-900">
                    Children Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                    <InfoItem
                      icon={<User className="h-4 w-4 text-blue-600" />}
                      label="Child 1 Name"
                      value={clientData.child1Name}
                    />
                    <InfoItem
                      icon={<Calendar className="h-4 w-4 text-blue-600" />}
                      label="Child 1 Birthday"
                      value={clientData.child1Birthday}
                    />
                    <InfoItem
                      icon={<User className="h-4 w-4 text-blue-600" />}
                      label="Child 2 Name"
                      value={clientData.child2Name}
                    />
                    <InfoItem
                      icon={<Calendar className="h-4 w-4 text-blue-600" />}
                      label="Child 2 Birthday"
                      value={clientData.child2Birthday}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Pension Information Tab */}
        <TabsContent value="pension" className="mt-6">
          <Card className="border-0 ">
            <CardContent className="p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-blue-600" />
                Pension Information
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                <InfoItem
                  icon={<User className="h-4 w-4 text-blue-600" />}
                  label="Rank"
                  value={clientData.rank}
                />
                <InfoItem
                  icon={<CreditCard className="h-4 w-4 text-blue-600" />}
                  label="Pension Type"
                  value={clientData.pensionType}
                />
                <InfoItem
                  icon={<CreditCard className="h-4 w-4 text-blue-600" />}
                  label="Serial Number"
                  value={clientData.serialNumber}
                />
                <InfoItem
                  icon={<Calendar className="h-4 w-4 text-blue-600" />}
                  label="Date Entered Service"
                  value={clientData.dateEnteredService}
                />
                <InfoItem
                  icon={<Calendar className="h-4 w-4 text-blue-600" />}
                  label="Date Separation Service"
                  value={clientData.dateSeparationService}
                />
                <InfoItem
                  icon={<Calendar className="h-4 w-4 text-blue-600" />}
                  label="Date Retired Service"
                  value={clientData.dateRetiredService}
                />
                <InfoItem
                  icon={<Calendar className="h-4 w-4 text-blue-600" />}
                  label="Length of Service"
                  value={clientData.lengthOfService}
                />
                <InfoItem
                  icon={<Building2 className="h-4 w-4 text-blue-600" />}
                  label="Last Unit Assigned"
                  value={clientData.lastUnitAssigned}
                />
                <InfoItem
                  icon={<Building2 className="h-4 w-4 text-blue-600" />}
                  label="Branch of Service"
                  value={clientData.branchOfService}
                />
                <InfoItem
                  icon={<CreditCard className="h-4 w-4 text-blue-600" />}
                  label="Account Number"
                  value={clientData.accountNumber}
                />
                <InfoItem
                  icon={<CreditCard className="h-4 w-4 text-blue-600" />}
                  label="Monthly Pension"
                  value={clientData.monthlyPension}
                />
                <InfoItem
                  icon={<CreditCard className="h-4 w-4 text-blue-600" />}
                  label="Monthly Deduction"
                  value={clientData.monthlyDeduction}
                />
                <InfoItem
                  icon={<CreditCard className="h-4 w-4 text-blue-600" />}
                  label="FI1"
                  value={clientData.fi1}
                />
                <InfoItem
                  icon={<CreditCard className="h-4 w-4 text-blue-600" />}
                  label="ATM Account Number"
                  value={clientData.atmAccNumber}
                />
              </div>

              <div className="mt-8">
                <h3 className="text-lg font-semibold mb-4 pb-2 border-b border-gray-200 text-gray-900">
                  Bank Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                  <InfoItem
                    icon={<Building2 className="h-4 w-4 text-blue-600" />}
                    label="Bank Name"
                    value={clientData.bankName}
                  />
                  <InfoItem
                    icon={<Building2 className="h-4 w-4 text-blue-600" />}
                    label="Branch of Bank"
                    value={clientData.bankBranch}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Payments Tab */}
        <TabsContent value="payments" className="mt-6">
          <Card className="border-0 ">
            <CardContent className="p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-blue-600" />
                Payment History
              </h2>

              <div className="h-64 w-full bg-blue-50 rounded-lg flex items-center justify-center mb-6">
                <p className="text-blue-600">Payment History Chart</p>
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
      </Tabs>
    </div>
  );
}

// Helper component for displaying information items
function InfoItem({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="space-y-1">
      <div className="text-sm font-medium text-gray-500 flex items-center gap-1">
        {icon}
        {label}
      </div>
      <div className="font-medium text-gray-900">{value}</div>
    </div>
  );
}

// Helper component for info boxes in the header
function InfoBox({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-gray-50 p-3 rounded-md">
      <p className="text-sm text-gray-500">{label}</p>
      <p className="font-medium text-gray-900 mt-1">{value}</p>
    </div>
  );
}

// Helper component for navigation items
function NavItem({
  label,
  active = false,
}: {
  label: string;
  active?: boolean;
}) {
  return (
    <a
      href="#"
      className={`text-sm font-medium ${
        active ? "text-blue-600" : "text-gray-600 hover:text-blue-600"
      }`}
    >
      {label}
    </a>
  );
}
