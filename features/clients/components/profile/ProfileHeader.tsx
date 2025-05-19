import React from "react";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { clientData } from "../../lib/client-metadata";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { Circle } from "lucide-react";
import { pensionDetails } from "../../lib/client-metadata";
import { avatarFallBack } from "@/utils/avatar-fallback";

export default function ClientProfileHeader() {
  return (
    <Card className="border-0 overflow-hidden p-6 flex flex-col md:flex-row gap-6 items-center md:items-start mb-8">
      <div className="relative">
        <Avatar className="h-32 w-32 border-4 border-white ">
          <AvatarImage
            src={clientData.profilePicture || "/placeholder.svg"}
            alt="Profile picture"
          />
          <AvatarFallback className="text-3xl bg-blue-100 text-primary">
            {avatarFallBack(clientData.firstName + " " + clientData.lastName)}
          </AvatarFallback>
        </Avatar>
      </div>

      <div className="flex flex-row w-full items-start gap-12">
        <div className="flex-1 w-full">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold ">
                {clientData.firstName} {clientData.midName}{" "}
                {clientData.lastName} {clientData.suffix}
              </h1>
              <Badge
                className={cn(
                  `mt-1 ${
                    clientData.status === "ACTIVE"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`
                )}
              >
                <Circle
                  fill={clientData.status === "ACTIVE" ? "green" : "red"}
                />
                {clientData.status === "ACTIVE" ? "ACTIVE" : "INACTIVE"}
              </Badge>
            </div>
          </div>
          <div className="mt-4 w-[80%]">
            <h3 className="text-lg font-medium mb-1">Remarks</h3>
            <Textarea
              className="bg-gray-50"
              value={clientData.remarks}
              readOnly
            />
          </div>
        </div>
        <Card className="p-3 gap-y-2 rounded-md flex flex-col border border-transparent group hover:bg-accent hover:border-primary-hover transition-colors">
          {pensionDetails.map((detail) => {
            return (
              <div
                className="flex justify-between  gap-x-12 w-full "
                key={detail.id}
              >
                <p className="font-semibold text-primary group-hover:text-primary-bold transition-colors">
                  {detail.title}:
                </p>
                <p className="font-medium text-destructive text-lg">
                  &#x20B1; {detail.details}
                </p>
              </div>
            );
          })}
        </Card>
      </div>
    </Card>
  );
}
