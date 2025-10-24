import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TabsContent } from "@/components/ui/tabs";
import {
  Briefcase,
  Calendar,
  Home,
  MapPin,
  Phone,
  User,
  Users,
} from "lucide-react";
import React from "react";
import { clientData } from "../../data/client-mock";
import InfoItem from "../InfoItem";
import { formatDateToReadable } from "@/utils/format-date-to-readable";
import { getAge } from "@/utils/get-age";
import { Separator } from "@/components/ui/separator";

export default function PersonalInformationTab() {
  const dateOfBirth = formatDateToReadable(clientData.dateOfBirth);
  const age = getAge(clientData.dateOfBirth);

  return (
    <TabsContent value="personal" className="mt-3">
      <Card className="border">
        <CardHeader className="flex gap-4 flex-row items-center">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
            <User className="h-5 w-5" />
          </span>
          <div>
            <CardTitle className="text-xl">Personal Information</CardTitle>
            <CardDescription className="">
              Review core identity, residency, and contact details at a glance.
            </CardDescription>
          </div>
        </CardHeader>
        <Separator className="mb-6" />
        <CardContent className="space-y-6 px-0">
          <section className="grid grid-cols-1 md:grid-cols-2 gap-4 px-6">
            {/* Date of Birth */}
            <InfoItem
              icon={<Calendar />}
              label="Birth Date"
              value={dateOfBirth}
            />
            {/* Age */}
            <InfoItem icon={<Calendar />} label="Age" value={age} />
            {/* Civil Status */}
            <InfoItem
              icon={<Users />}
              label="Civil Status"
              value={clientData.civilStatus}
            />
            {/* Religion */}
            <InfoItem
              icon={<User />}
              label="Religion"
              value={clientData.religion}
            />
            {/* Place of Birth */}
            <InfoItem
              icon={<MapPin />}
              label="Place of Birth"
              value={clientData.placeOfBirth}
            />
            {/* Current Address */}
            <InfoItem
              icon={<MapPin />}
              label="Current Address"
              value={clientData.address.fullAddress}
            />
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
                <CardDescription className="">
                  Review core identity, residency, and contact details at a
                  glance.
                </CardDescription>
              </div>
            </div>
            <Separator className="my-6" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-6">
              {clientData.contactInfo.map((contact) => (
                <InfoItem
                  key={contact.id}
                  icon={<Phone />}
                  label={contact.type}
                  value={contact.number}
                />
              ))}
            </div>
          </section>
        </CardContent>
      </Card>
    </TabsContent>
  );
}
