import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TabsContent } from "@/components/ui/tabs";
import { File, FileText, ImageIcon, Paperclip, Printer } from "lucide-react";
import React from "react";
import { clientData } from "../../data/mock-clients-data";
import { Download, Eye } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import AttachmentsCard from "@/features/loans/components/AttachmentsCard";

export default function AttachmentsTab() {
  return (
    <TabsContent value="attachments" className="mt-3">
      <Card className="border">
        <CardHeader className="flex flex-row justify-between items-center">
          <div className="flex flex-row items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Paperclip className="h-5 w-5" />
            </span>
            <div>
              <CardTitle className="text-xl">Client Attachments</CardTitle>
              <CardDescription>
                View, upload, or manage the client's supporting documents such as IDs, pension
                slips, and authorization forms.
              </CardDescription>
            </div>
          </div>
          <Button variant="outline" effect="ringHover" className=" border-primary text-primary">
            <Paperclip className="h-4 w-4 mr-2" />
            Upload New Document
          </Button>
        </CardHeader>
        <Separator className="mb-6" />
        <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {clientData.attachments && clientData.attachments.length > 0 ? (
            clientData.attachments.map((attachment, index) => (
              <AttachmentsCard attachment={attachment} key={index} />
            ))
          ) : (
            <div className="col-span-full bg-gray-50 p-8 text-center rounded-md border border-dashed">
              <Paperclip className="h-10 w-10 mx-auto text-gray-400 mb-2" />
              <p className="text-gray-500">No documents have been uploaded yet</p>
              <p className="text-sm text-gray-400 mt-1">
                Upload client documents by clicking the Upload New Document button
              </p>
            </div>
          )}
        </CardContent>
        <CardFooter>
          <div className="bg-blue-50 p-4 rounded-md flex flex-col items-start w-full">
            <h3 className="font-medium text-primary mb-2">Document Requirements</h3>
            <ul className="text-sm text-primary space-y-1 ml-5 list-disc">
              <li>Maximum file size: 10MB</li>
              <li>Supported formats: PDF, JPG, PNG, DOC, DOCX</li>
              <li>Please ensure all documents are legible and complete</li>
              <li>Personal information should be clearly visible</li>
            </ul>
          </div>
        </CardFooter>
      </Card>
    </TabsContent>
  );
}
