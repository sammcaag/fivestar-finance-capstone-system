import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TabsContent } from "@/components/ui/tabs";
import { Calendar, MapPin, Phone, User, Users } from "lucide-react";
import React from "react";
import ClientInfoRowItem from "../ClientInfoRowItem";
import { formatDateToReadable } from "@/utils/format-date-to-readable";
import { Separator } from "@/components/ui/separator";
import { getAge } from "@/utils/get-age";
import { generateOrdinal } from "@/utils/generate-ordinals";
import { formatFullAddress } from "@/utils/format-full-address";
import { ClientFamilyInfos } from "../../types/client-types";

interface IFamilyInformationTab {
  familyInfos: ClientFamilyInfos[];
}

export default function FamilyInformationTab({ familyInfos }: IFamilyInformationTab) {
  const familyMembers = familyInfos;
  const spouse = familyMembers.find((member) => member.relationship.toLowerCase() === "spouse");
  const mother = familyMembers.find((member) => member.relationship.toLowerCase() === "mother");
  const children = familyMembers.filter((member) => member.relationship.toLowerCase() === "child");

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
              Check declared family members and relationships used for pension verification and
              contact tracing.
            </CardDescription>
          </div>
        </CardHeader>
        <Separator className="mb-6" />
        <CardContent className="space-y-8">
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
                  value={mother.name}
                />
              </div>
            </section>
          )}

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
                  value={spouse.name}
                />
                {/* Age */}
                <ClientInfoRowItem
                  icon={<Calendar className="h-4 w-4 text-primary" />}
                  label="Age"
                  value={getAge(spouse.birthDate ?? "")}
                />
                {/* Birthdate */}
                <ClientInfoRowItem
                  icon={<Calendar className="h-4 w-4 text-primary" />}
                  label="Birthdate"
                  value={formatDateToReadable(spouse.birthDate ?? "")}
                />
                {/* Address */}
                {spouse.address && (
                  <ClientInfoRowItem
                    icon={<MapPin className="h-4 w-4 text-primary" />}
                    label="Address"
                    value={formatFullAddress(spouse.address)}
                  />
                )}
                {/* Contact Number */}

                {spouse.contactInfo && (
                  <ClientInfoRowItem
                    icon={<Phone className="h-4 w-4 text-primary" />}
                    label="Contact Number"
                    value={spouse.contactInfo?.primary_contact}
                  />
                )}
              </div>
            </section>
          )}

          {children.length > 0 && (
            <section className="space-y-3">
              <div className="flex gap-2 flex-row items-center">
                <Users className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-semibold">Family Dependents</h3>
              </div>
              <div className="space-y-4">
                {children.map((member, index) => (
                  <div className="space-y-3" key={index}>
                    <h4 className="text-base font-medium">
                      {generateOrdinal(index + 1)} dependent
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Full Name */}
                      <ClientInfoRowItem
                        icon={<User className="h-4 w-4 text-primary" />}
                        label="Full Name"
                        value={member.name}
                      />
                      {/* Age */}
                      <ClientInfoRowItem
                        icon={<Calendar className="h-4 w-4 text-primary" />}
                        label="Age"
                        value={getAge(member.birthDate ?? "")}
                      />
                      {/* Birthdate */}
                      <ClientInfoRowItem
                        icon={<Calendar className="h-4 w-4 text-primary" />}
                        label="Birthdate"
                        value={formatDateToReadable(member.birthDate ?? "")}
                      />

                      {/* Address */}
                      {member.address && (
                        <ClientInfoRowItem
                          icon={<MapPin className="h-4 w-4 text-primary" />}
                          label="Address"
                          value={formatFullAddress(member.address)}
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
