import { Card, CardContent } from "@/components/ui/card";
import { TabsContent } from "@/components/ui/tabs";
import { Calendar, MapPin, Phone, User, Users } from "lucide-react";
import React from "react";
import InfoItem from "../InfoItem";
import { clientData } from "../../data/client-mock";
import { formatDateToReadable } from "@/utils/format-date-to-readable";

export default function FamilyInformationTab() {
  const familyMembers = clientData.familyMembers ?? [];
  const spouse = familyMembers.find((member) => member.relationship === "spouse");
  const otherFamilyMembers = familyMembers.filter(
    (member) => member.relationship !== "spouse"
  );

  const formatDate = (date?: string) =>
    date ? formatDateToReadable(date) : "—";

  const formatRelationship = (relationship: string) =>
    relationship
      .split(" ")
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(" ");

  return (
    <TabsContent value="family" className="mt-3">
      <Card className="border-0 ">
        <CardContent className="p-6">
          <h2 className="text-xl font-bold  mb-6 flex items-center gap-2">
            <Users className="h-5 w-5 text-primary" />
            Family Information
          </h2>

          <div className="space-y-8">
            {spouse && (
              <div>
                <h3 className="text-lg font-semibold mb-4 pb-2 border-b border-gray-200 ">
                  Spouse Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                  <InfoItem
                    icon={<User className="h-4 w-4 text-primary" />}
                    label="Spouse's Full Name"
                    value={spouse.fullName}
                  />
                  <InfoItem
                    icon={<Calendar className="h-4 w-4 text-primary" />}
                    label="Birthdate"
                    value={formatDate(spouse.dateOfBirth)}
                  />
                  {spouse.address?.fullAddress && (
                    <InfoItem
                      icon={<MapPin className="h-4 w-4 text-primary" />}
                      label="Address"
                      value={spouse.address.fullAddress}
                    />
                  )}
                  {spouse.contactNumber && (
                    <InfoItem
                      icon={<Phone className="h-4 w-4 text-primary" />}
                      label="Contact Number"
                      value={spouse.contactNumber}
                    />
                  )}
                </div>
              </div>
            )}

            {otherFamilyMembers.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold mb-4 pb-2 border-b border-gray-200 ">
                  Family Members
                </h3>
                <div className="space-y-6">
                  {otherFamilyMembers.map((member) => (
                    <div
                      key={member.id}
                      className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6"
                    >
                      <InfoItem
                        icon={<User className="h-4 w-4 text-primary" />}
                        label="Full Name"
                        value={member.fullName}
                      />
                      <InfoItem
                        icon={<Users className="h-4 w-4 text-primary" />}
                        label="Relationship"
                        value={formatRelationship(member.relationship)}
                      />
                      <InfoItem
                        icon={<Calendar className="h-4 w-4 text-primary" />}
                        label="Birthdate"
                        value={formatDate(member.dateOfBirth)}
                      />
                      {member.contactNumber && (
                        <InfoItem
                          icon={<Phone className="h-4 w-4 text-primary" />}
                          label="Contact Number"
                          value={member.contactNumber}
                        />
                      )}
                      {member.address?.fullAddress && (
                        <InfoItem
                          icon={<MapPin className="h-4 w-4 text-primary" />}
                          label="Address"
                          value={member.address.fullAddress}
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </TabsContent>
  );
}
