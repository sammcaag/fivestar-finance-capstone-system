"use client";

import { useRouter } from "next/navigation";
import { Building, Contact, Mail, Map, Plus } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { avatarFallBack } from "@/utils/avatar-fallback";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ClientInfoRowItem from "@/features/clients/components/ClientInfoRowItem";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Staff {
  id: string;
  name: string;
  role: string;
  avatarUrl?: string;
}

interface Client {
  id: string;
  name: string;
  avatarUrl?: string;
}

export interface Branch {
  id: string;
  name: string;
  address: string;
  email: string;
  contactNumber: string;
  staff: Staff[];
  clients: Client[];
}

interface BranchCardProps {
  branch: Branch;
}

export function BranchCard({ branch }: BranchCardProps) {
  const router = useRouter();

  return (
    <Card className="bg-card border border-border rounded-lg shadow-md w-full hover:shadow-lg transition-shadow duration-300">
      {/* Row 1: Branch Information */}
      <div className="space-y-4 p-6">
        <CardHeader className="flex gap-4 flex-row items-center p-0">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Building className="h-5 w-5" />
          </span>
          <div>
            <CardTitle className="text-xl">{branch.name}</CardTitle>
          </div>
        </CardHeader>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <ClientInfoRowItem
            icon={<Map />}
            label="Address"
            value={branch.address}
          />
          <ClientInfoRowItem
            icon={<Mail />}
            label="Email"
            value={branch.email}
          />
          <ClientInfoRowItem
            icon={<Contact />}
            label="Contact Number"
            value={branch.contactNumber}
          />
        </div>
      </div>

      <Separator />

      <div className="flex flex-col items-center w-full p-8">
        {/* Row 2: Staff Section */}
        <div className="my-8 w-full">
          <h3 className="text-lg font-semibold text-foreground mb-6 text-center">
            Staff ({branch.staff.length})
          </h3>
          <div className="flex flex-wrap justify-center items-center gap-8">
            {branch.staff.map((staff) => (
              <div key={staff.id} className="flex flex-col items-center">
                <Avatar className="h-32 w-32 rounded-full bg-gradient-to-br from-blue-200 to-blue-300 dark:from-blue-700 dark:to-blue-600 flex items-center justify-center text-blue-900 dark:text-blue-50 text-3xl font-bold shadow-lg overflow-hidden">
                  {staff.avatarUrl ? (
                    <AvatarImage
                      src={staff.avatarUrl || "/placeholder.svg"}
                      alt={staff.name}
                      width={128}
                      height={128}
                      className="h-32 w-32 object-cover"
                    />
                  ) : (
                    <AvatarFallback className="bg-primary/5 text-primary text-4xl font-semibold">
                      {avatarFallBack(staff.name)}
                    </AvatarFallback>
                  )}
                </Avatar>
                <span className="text-base font-semibold mt-3 text-foreground text-center">
                  {staff.name}
                </span>
                <span className="text-sm text-muted-foreground text-center">
                  {staff.role}
                </span>
              </div>
            ))}

            {/* Add Staff Button */}
            <Button
              onClick={() => router.push("/staff/register")}
              className="flex flex-col items-center justify-center h-32 w-32 rounded-full bg-muted border-2 border-dashed border-border hover:border-foreground hover:bg-muted/50 transition-all duration-200"
              title="Add Staff"
            >
              <Plus className="h-10 w-10 text-muted-foreground" />
              <span className="text-xs font-medium text-muted-foreground mt-2 text-center px-2">
                Add Staff
              </span>
            </Button>
          </div>
        </div>

        {/* Row 3: Clients Section */}
        <div className="mt-8 w-full">
          <h3 className="text-lg font-semibold text-foreground mb-6 text-center">
            Clients ({branch.clients.length})
          </h3>
          <div className="flex flex-wrap justify-center items-center gap-8">
            {branch.clients.map((client) => (
              <div key={client.id} className="flex flex-col items-center">
                <Avatar className="h-32 w-32 rounded-full bg-gradient-to-br from-amber-200 to-amber-300 dark:from-amber-700 dark:to-amber-600 flex items-center justify-center text-amber-900 dark:text-amber-50 text-3xl font-bold shadow-lg overflow-hidden">
                  {client.avatarUrl ? (
                    <AvatarImage
                      src={client.avatarUrl || "/placeholder.svg"}
                      alt={client.name}
                      width={128}
                      height={128}
                      className="h-32 w-32 object-cover"
                    />
                  ) : (
                    <AvatarFallback className="bg-primary/5 text-primary text-4xl font-semibold">
                      {avatarFallBack(client.name)}
                    </AvatarFallback>
                  )}
                </Avatar>
                <span className="text-base font-semibold mt-3 text-foreground text-center">
                  {client.name}
                </span>
              </div>
            ))}

            {/* Add Client Button */}
            <Button
              onClick={() => router.push("/client/register")}
              className="flex flex-col items-center justify-center h-32 w-32 rounded-full bg-muted border-2 border-dashed border-border hover:border-foreground hover:bg-muted/50 transition-all duration-200"
              title="Add Client"
            >
              <Plus className="h-10 w-10 text-muted-foreground" />
              <span className="text-xs font-medium text-muted-foreground mt-2 text-center px-2">
                Add Client
              </span>
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}
