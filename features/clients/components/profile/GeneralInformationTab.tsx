import { Card, CardContent } from "@/components/ui/card";
import { TabsContent } from "@/components/ui/tabs";
import { Briefcase, Calendar, MapPin, Phone, User, Users } from "lucide-react";
import React from "react";
import { clientData } from "../../data/client-mock";
import InfoItem from "../InfoItem";

export default function GeneralInformationTab() {
  return (
    <TabsContent value="general" className="mt-3">
      <Card className="border-0 ">
        <CardContent className="p-6">
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
            <User className="h-5 w-5 text-primary" />
            General Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            <InfoItem
              icon={<MapPin className="h-4 w-4 text-primary" />}
              label="Home Address"
              value={clientData.homeAddress}
            />
            <InfoItem
              icon={<MapPin className="h-4 w-4 text-primary" />}
              label="Current Address"
              value={clientData.currentAddress}
            />
            <InfoItem
              icon={<Calendar className="h-4 w-4 text-primary" />}
              label="Birth Date"
              value={clientData.birthDate}
            />
            <InfoItem
              icon={<Users className="h-4 w-4 text-primary" />}
              label="Civil Status"
              value={clientData.civilStatus}
            />
            <InfoItem
              icon={<User className="h-4 w-4 text-primary" />}
              label="Religion"
              value={clientData.religion}
            />
            <InfoItem
              icon={<User className="h-4 w-4 text-primary" />}
              label="Mother's Maiden Name"
              value={clientData.mothersMaidenName}
            />
            <InfoItem
              icon={<MapPin className="h-4 w-4 text-primary" />}
              label="Mother's Place of Birth"
              value={clientData.motherPlaceOfBirth}
            />
            <InfoItem
              icon={<Phone className="h-4 w-4 text-primary" />}
              label="Contact Number 1"
              value={clientData.contactNumber1}
            />
            <InfoItem
              icon={<Phone className="h-4 w-4 text-primary" />}
              label="Contact Number 2"
              value={clientData.contactNumber2}
            />
            <InfoItem
              icon={<Briefcase className="h-4 w-4 text-primary" />}
              label="Mother's Occupation"
              value={clientData.motherOccupation}
            />
          </div>
        </CardContent>
      </Card>
    </TabsContent>
  );
}
