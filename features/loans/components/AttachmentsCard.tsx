import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";
import { FileText, ImageIcon, File } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Eye, Printer } from "lucide-react";

export default function AttachmentsCard({
  attachment,
}: {
  attachment: {
    name: string;
    type: string;
    date: string;
    size: string;
  };
}) {
  return (
    <Card className="border shadow-sm hover:shadow-md transition-shadow">
      <CardHeader className="w-full h-32 bg-gray-100 rounded-md flex items-center justify-center mb-3">
        {attachment.type === "pdf" && (
          <FileText className="h-12 w-12 text-destructive" />
        )}
        {attachment.type === "image" && (
          <ImageIcon className="h-12 w-12 text-blue-500" />
        )}
        {attachment.type === "doc" && (
          <File className="h-12 w-12 text-blue-700" />
        )}
      </CardHeader>
      <CardContent className="flex flex-col  items-center justify-center ">
        <CardTitle className="font-medium  mb-1">{attachment.name}``</CardTitle>
        <CardDescription className="text-sm text-gray-500 mb-2">
          Uploaded on {attachment.date}
        </CardDescription>
        <div className="flex gap-2 mt-2">
          <Button variant="outline" icon={Eye} iconPlacement="left">
            View
          </Button>
          <Button icon={Printer} iconPlacement="left">
            Print
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
