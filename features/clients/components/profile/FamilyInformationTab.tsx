import { Card, CardContent } from "@/components/ui/card";
import { TabsContent } from "@/components/ui/tabs";
import { Calendar, MapPin, Phone, User, Users } from "lucide-react";
import React from "react";
import InfoItem from "../InfoItem";
import { clientData } from "../../lib/client-metadata";

export default function FamilyInformationTab() {
  return (
    <TabsContent value="other" className="mt-6">
      <Card className="border-0 ">
        <CardContent className="p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Users className="h-5 w-5 text-primary" />
            Family Information
          </h2>

          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-semibold mb-4 pb-2 border-b border-gray-200 text-gray-900">
                Spouse Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                <InfoItem
                  icon={<User className="h-4 w-4 text-primary" />}
                  label="Spouse's Full Name"
                  value={clientData.spouseFullName}
                />
                <InfoItem
                  icon={<Calendar className="h-4 w-4 text-primary" />}
                  label="Birthdate"
                  value={clientData.spouseBirthdate}
                />
                <InfoItem
                  icon={<MapPin className="h-4 w-4 text-primary" />}
                  label="Address"
                  value={clientData.spouseAddress}
                />
                <InfoItem
                  icon={<Phone className="h-4 w-4 text-primary" />}
                  label="Contact Number"
                  value={clientData.spouseContactNumber}
                />
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4 pb-2 border-b border-gray-200 text-gray-900">
                Children Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                <InfoItem
                  icon={<User className="h-4 w-4 text-primary" />}
                  label="Child 1 Name"
                  value={clientData.child1Name}
                />
                <InfoItem
                  icon={<Calendar className="h-4 w-4 text-primary" />}
                  label="Child 1 Birthday"
                  value={clientData.child1Birthday}
                />
                <InfoItem
                  icon={<User className="h-4 w-4 text-primary" />}
                  label="Child 2 Name"
                  value={clientData.child2Name}
                />
                <InfoItem
                  icon={<Calendar className="h-4 w-4 text-primary" />}
                  label="Child 2 Birthday"
                  value={clientData.child2Birthday}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </TabsContent>
  );
}
