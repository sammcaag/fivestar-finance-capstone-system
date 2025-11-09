import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TabsContent } from "@/components/ui/tabs";
import { Calendar, MapPin, Phone, User, Users } from "lucide-react";
import React from "react";
import ClientInfoRowItem from "../ClientInfoRowItem";
import { clientData } from "../../data/mock-clients-data";
import { formatDateToReadable } from "@/utils/format-date-to-readable";
import { Separator } from "@/components/ui/separator";
import { getAge } from "@/utils/get-age";
import { generateOrdinal } from "@/utils/generate-ordinals";

export default function FamilyInformationTab() {
  const familyMembers = clientData.familyMembers ?? [];
  const spouse = familyMembers.find(
    (member) => member.relationship === "spouse"
  );
  const mother = familyMembers.find(
    (member) => member.relationship === "mother"
  );
  const dependents = familyMembers.filter(
    (member) => member.relationship === "dependent"
  );

  return (
    <TabsContent value="family" className="mt-3">
      <Card className="border ">
        <CardHeader className="flex gap-4 flex-row items-center">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Users className="h-5 w-5" />
          </span>
          <div>
            <CardTitle className="text-xl">Family Information</CardTitle>
            <CardDescription>
              Check declared family members and relationships used for pension
              verification and contact tracing.
            </CardDescription>
          </div>
        </CardHeader>
        <Separator className="mb-6" />
        <CardContent className="space-y-8">
          {spouse && (
            <section className="space-y-3">
              <div className="flex gap-2 flex-row items-center">
                <User className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-semibold">Spouse Information</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Full Name */}
                <ClientInfoRowItem
                  icon={<User className="h-4 w-4 text-primary" />}
                  label="Spouse's Full Name"
                  value={spouse.fullName}
                />
                {/* Age */}
                <ClientInfoRowItem
                  icon={<Calendar className="h-4 w-4 text-primary" />}
                  label="Age"
                  value={getAge(spouse.dateOfBirth)}
                />
                {/* Birthdate */}
                <ClientInfoRowItem
                  icon={<Calendar className="h-4 w-4 text-primary" />}
                  label="Birthdate"
                  value={formatDateToReadable(spouse.dateOfBirth)}
                />
                {/* Address */}
                {spouse.address?.fullAddress && (
                  <ClientInfoRowItem
                    icon={<MapPin className="h-4 w-4 text-primary" />}
                    label="Address"
                    value={spouse.address.fullAddress}
                  />
                )}
                {/* Contact Number */}
                {spouse.contactNumber && (
                  <ClientInfoRowItem
                    icon={<Phone className="h-4 w-4 text-primary" />}
                    label="Contact Number"
                    value={spouse.contactNumber}
                  />
                )}
              </div>
            </section>
          )}

          {mother && (
            <section className="space-y-3">
              <div className="flex gap-2 flex-row items-center">
                <User className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-semibold">Mother Information</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Full Name */}
                <ClientInfoRowItem
                  icon={<User className="h-4 w-4 text-primary" />}
                  label="Mother's Full Name"
                  value={mother.fullName}
                />
                {/* Age */}
                <ClientInfoRowItem
                  icon={<Calendar className="h-4 w-4 text-primary" />}
                  label="Age"
                  value={getAge(mother.dateOfBirth)}
                />
                {/* Birthdate */}
                <ClientInfoRowItem
                  icon={<Calendar className="h-4 w-4 text-primary" />}
                  label="Birthdate"
                  value={formatDateToReadable(mother.dateOfBirth)}
                />
                {/* Address */}
                {mother.address?.fullAddress && (
                  <ClientInfoRowItem
                    icon={<MapPin className="h-4 w-4 text-primary" />}
                    label="Address"
                    value={mother.address.fullAddress}
                  />
                )}
                {mother.contactNumber && (
                  <ClientInfoRowItem
                    icon={<Phone className="h-4 w-4 text-primary" />}
                    label="Contact Number"
                    value={mother.contactNumber}
                  />
                )}
              </div>
            </section>
          )}

          {dependents.length > 0 && (
            <section className="space-y-3">
              <div className="flex gap-2 flex-row items-center">
                <Users className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-semibold">Family Dependents</h3>
              </div>
              <div className="space-y-4">
                {dependents.map((member, index) => (
                  <div className="space-y-3" key={index}>
                    <h4 className="text-base font-medium">
                      {generateOrdinal(index + 1)} dependent
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Full Name */}
                      <ClientInfoRowItem
                        icon={<User className="h-4 w-4 text-primary" />}
                        label="Full Name"
                        value={member.fullName}
                      />
                      {/* Age */}
                      <ClientInfoRowItem
                        icon={<Calendar className="h-4 w-4 text-primary" />}
                        label="Age"
                        value={getAge(member.dateOfBirth)}
                      />
                      {/* Birthdate */}
                      <ClientInfoRowItem
                        icon={<Calendar className="h-4 w-4 text-primary" />}
                        label="Birthdate"
                        value={formatDateToReadable(member.dateOfBirth)}
                      />
                      {/* Contact Number */}
                      {member.contactNumber && (
                        <ClientInfoRowItem
                          icon={<Phone className="h-4 w-4 text-primary" />}
                          label="Contact Number"
                          value={member.contactNumber}
                        />
                      )}

                      {/* Address */}
                      {member.address?.fullAddress && (
                        <ClientInfoRowItem
                          icon={<MapPin className="h-4 w-4 text-primary" />}
                          label="Address"
                          value={member.address.fullAddress}
                        />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </CardContent>
      </Card>
    </TabsContent>
  );
}
