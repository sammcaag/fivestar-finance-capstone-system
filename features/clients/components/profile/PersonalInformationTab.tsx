import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TabsContent } from "@/components/ui/tabs";
import { Calendar, MapPin, Phone, User, Users } from "lucide-react";
import React from "react";
import ClientInfoRowItem from "../ClientInfoRowItem";
import { formatDateToReadable } from "@/utils/format-date-to-readable";
import { getAge } from "@/utils/get-age";
import { Separator } from "@/components/ui/separator";

interface IPersionalInformation {
  birthDate: Date;
  civilStatus?: string;
  religion?: string;
  birthPlace?: string;
  address?: string;
  primaryContact?: string;
  secondaryContact?: string | null;
}

export default function PersonalInformationTab({
  birthDate,
  civilStatus,
  religion,
  birthPlace,
  address,
  primaryContact,
  secondaryContact,
}: IPersionalInformation) {
  const dateOfBirth = formatDateToReadable(birthDate);
  const age = getAge(birthDate);

  return (
    <TabsContent value="personal" className="mt-3">
      <Card className="border">
        <CardHeader className="flex gap-4 flex-row items-center">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
            <User className="h-5 w-5" />
          </span>
          <div>
            <CardTitle className="text-xl">Personal Information</CardTitle>
            <CardDescription>
              View and verify the client&apos;s basic identity details such as full name, date of
              birth, and gender.
            </CardDescription>
          </div>
        </CardHeader>
        <Separator className="mb-6" />
        <CardContent className="space-y-6 px-0">
          <section className="grid grid-cols-1 md:grid-cols-2 gap-4 px-6">
            {/* Date of Birth */}
            <ClientInfoRowItem icon={<Calendar />} label="Birth Date" value={dateOfBirth} />
            {/* Age */}
            <ClientInfoRowItem icon={<Calendar />} label="Age" value={age} />
            {/* Civil Status */}
            <ClientInfoRowItem icon={<Users />} label="Civil Status" value={civilStatus} />
            {/* Religion */}
            <ClientInfoRowItem icon={<User />} label="Religion" value={religion} />
            {/* Place of Birth */}
            <ClientInfoRowItem icon={<MapPin />} label="Place of Birth" value={birthPlace} />
            {/* Current Address */}
            <ClientInfoRowItem icon={<MapPin />} label="Current Address" value={address} />
          </section>

          <section className="pt-6">
            <div className="flex gap-4 flex-row items-center px-6">
              <div>
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Phone className="h-5 w-5" />
                </span>
              </div>
              <div>
                <CardTitle className="text-xl">Contact Information</CardTitle>
                <CardDescription>
                  Review and confirm the client&apos;s phone numbers, email address, and current
                  residential details.
                </CardDescription>
              </div>
            </div>
            <Separator className="my-6" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-6">
              {primaryContact && (
                <>
                  <ClientInfoRowItem
                    icon={<Phone />}
                    label="Primary Contact"
                    value={primaryContact}
                  />{" "}
                  {secondaryContact && (
                    <ClientInfoRowItem
                      icon={<Phone />}
                      label="Secondary Contact"
                      value={secondaryContact}
                    />
                  )}
                </>
              )}
            </div>
          </section>
        </CardContent>
      </Card>
    </TabsContent>
  );
}
