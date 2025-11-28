"use client";

import React from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { HelpCircle, User, User2 } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { avatarFallBack } from "@/utils/avatar-fallback";
import { UserType } from "../types/branch-types";

interface BranchInformationProps {
  users: UserType[];
}

export default function BranchInformation({ users }: BranchInformationProps) {
  const router = useRouter();

  const staffUsers = users.filter(
    (user) => user.role.toLowerCase() === "staff"
  );
  const clientUsers = users.filter(
    (user) => user.role.toLowerCase() === "client"
  );

  return (
    <Card className="border">
      {/* STAFF SECTION */}
      <CardHeader className="flex-row gap-4 items-center px-6">
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-600">
          <User2 className="h-5 w-5" />
        </span>
        <div>
          <CardTitle className="text-xl">Staff Information</CardTitle>
          <CardDescription>
            Verify the staff currently linked to this branch, along with their
            roles.
          </CardDescription>
        </div>
      </CardHeader>
      <Separator className="mb-6" />

      <CardContent className="space-y-6 px-0">
        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-6">
          {staffUsers.length > 0 ? (
            staffUsers.map((staff) => (
              <div
                key={staff.id}
                className="flex flex-col items-center text-center"
              >
                <Avatar className="h-32 w-32 rounded-full bg-gradient-to-br from-blue-200 to-blue-300 flex items-center justify-center text-blue-900 text-3xl font-bold shadow-lg overflow-hidden">
                  {staff.avatarUrl ? (
                    <AvatarImage
                      src={staff.avatarUrl}
                      alt={staff.fullName}
                      width={128}
                      height={128}
                      className="h-32 w-32 object-cover"
                    />
                  ) : (
                    <AvatarFallback className="bg-blue-50 text-blue-600 text-4xl font-semibold">
                      {avatarFallBack(staff.fullName)}
                    </AvatarFallback>
                  )}
                </Avatar>
                <span className="text-base font-semibold mt-3 text-foreground">
                  {staff.fullName}
                </span>
                <span className="text-sm text-muted-foreground">
                  {staff.role}
                </span>
              </div>
            ))
          ) : (
            <div className="col-span-full flex flex-col items-center justify-center gap-4 py-24">
              <span className="flex h-36 w-36 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                <HelpCircle className="h-28 w-28" />
              </span>
              <p className="text-muted-foreground font-medium text-center text-lg">
                THERE IS NO STAFF UNDER THIS BRANCH
              </p>
              <Button
                variant="outline"
                className="bg-blue-50 text-blue-700 text-base"
                onClick={() => router.push("/staff/register")}
              >
                Register New Staff
              </Button>
            </div>
          )}
        </section>

        <Separator className="my-6" />

        {/* CLIENT SECTION */}
        <div className="flex gap-4 items-center px-6">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-pink-100 text-pink-600">
            <User className="h-5 w-5" />
          </span>
          <div>
            <CardTitle className="text-xl">Client Information</CardTitle>
            <CardDescription>
              Verify the clients currently linked to this branch, along with
              their roles.
            </CardDescription>
          </div>
        </div>

        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-6 pt-6">
          {clientUsers.length > 0 ? (
            clientUsers.map((client) => (
              <div
                key={client.id}
                className="flex flex-col items-center text-center"
              >
                <Avatar className="h-32 w-32 rounded-full bg-gradient-to-br from-pink-200 to-pink-300 flex items-center justify-center text-pink-900 text-3xl font-bold shadow-lg overflow-hidden">
                  {client.avatarUrl ? (
                    <AvatarImage
                      src={client.avatarUrl}
                      alt={client.fullName}
                      width={128}
                      height={128}
                      className="h-32 w-32 object-cover"
                    />
                  ) : (
                    <AvatarFallback className="bg-pink-50 text-pink-600 text-4xl font-semibold">
                      {avatarFallBack(client.fullName)}
                    </AvatarFallback>
                  )}
                </Avatar>
                <span className="text-base font-semibold mt-3 text-foreground">
                  {client.fullName}
                </span>
                <span className="text-sm text-muted-foreground">
                  {client.role}
                </span>
              </div>
            ))
          ) : (
            <div className="col-span-full flex flex-col items-center justify-center gap-4 py-24">
              <span className="flex h-36 w-36 items-center justify-center rounded-full bg-pink-100 text-pink-600">
                <HelpCircle className="h-28 w-28" />
              </span>
              <p className="text-muted-foreground font-medium text-center text-lg">
                THERE IS NO CLIENT UNDER THIS BRANCH
              </p>
              <Button
                variant="outline"
                className="bg-pink-50 text-pink-700 text-base"
                onClick={() => router.push("/clients/register")}
              >
                Register New Client
              </Button>
            </div>
          )}
        </section>
      </CardContent>
    </Card>
  );
}
