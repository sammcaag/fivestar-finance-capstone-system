"use client";

import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, Contact, Mail, Tag } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import ClientInfoRowItem from "@/features/clients/components/ClientInfoRowItem";
import UserSection from "./UserSection";
import { IBranchInformation } from "../types/branch-types";

export default function BranchInformation({
  name,
  email,
  primaryContact,
  secondaryContact,
  users,
}: IBranchInformation) {
  const staffUsers = users.filter((user) => user.userAuth?.role?.toLowerCase() !== "client");

  const clientUsers = users.filter((user) => user.userAuth?.role?.toLowerCase() === "client");

  return (
    <>
      <Card className="border">
        {/* BRANCH INFORMATION SECTION */}
        <CardHeader className="flex-row gap-4 items-center px-6">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-600">
            <Building2 className="h-5 w-5" />
          </span>
          <div>
            <CardTitle className="text-xl">Branch Information</CardTitle>
            <CardDescription>
              Verify the staff currently linked to this branch, along with their roles.
            </CardDescription>
          </div>
        </CardHeader>
        <Separator className="mb-6" />

        <CardContent className="space-y-6 px-0">
          <section className="grid grid-cols-1 md:grid-cols-2 gap-4 px-6">
            <ClientInfoRowItem icon={<Tag />} label="Branch Name" value={name} />
            <ClientInfoRowItem icon={<Mail />} label="Email Address" value={email} />
            <ClientInfoRowItem icon={<Contact />} label="Primary Contact" value={primaryContact} />
            {secondaryContact && (
              <ClientInfoRowItem
                icon={<Contact />}
                label="Secondary Contact"
                value={secondaryContact}
              />
            )}
          </section>
        </CardContent>
      </Card>

      <UserSection users={staffUsers} type="staff" />
      <UserSection users={clientUsers} type="client" />
    </>
  );
}
