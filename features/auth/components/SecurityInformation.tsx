import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { EyeOff, Mail, User } from "lucide-react";
import React from "react";
import { Separator } from "@/components/ui/separator";
import ClientInfoRowItem from "@/features/clients/components/ClientInfoRowItem";
import { useAuth } from "../context/AuthContext";

interface ISecurityInformation {
  isOwnProfile?: boolean;
}

export default function SecurtiyInformation({ isOwnProfile = false }: ISecurityInformation) {
  const { user } = useAuth();
  const email = user!.email;

  return (
    <Card className="border">
      <CardHeader className="flex gap-4 flex-row items-center">
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
          <User className="h-5 w-5" />
        </span>
        <div>
          <CardTitle className="text-xl">Auth Information</CardTitle>
          <CardDescription>
            {`View and verify ${
              isOwnProfile ? "your" : "the staff's"
            } authentication details and make sure it is up to date.`}
          </CardDescription>
        </div>
      </CardHeader>
      <Separator className="mb-6" />
      <CardContent className="space-y-6 px-0">
        <section className="grid grid-cols-1 md:grid-cols-2 gap-4 px-6">
          {/* Email Address */}
          <ClientInfoRowItem
            icon={<Mail />}
            label="Email Address"
            value={email.toLowerCase()}
            isCapitalize={false}
          />

          {/* Role */}
          <ClientInfoRowItem
            icon={<EyeOff />}
            label="Password"
            value={"************************"}
          />
        </section>
      </CardContent>
    </Card>
  );
}
