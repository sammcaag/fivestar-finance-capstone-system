import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { TabsContent } from "@/components/ui/tabs";
import { File, FileText, ImageIcon, Paperclip } from "lucide-react";
import React from "react";
import { clientData } from "../../lib/client-metadata";
import { Download, Eye } from "lucide-react";

export default function AttachmentsTab() {
  return (
    <TabsContent value="attachments" className="mt-6">
      <Card className="border-0 shadow-md">
        <CardContent className="p-6">
          <div className="flex justify-between items-start mb-6">
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <Paperclip className="h-5 w-5 text-primary" />
              Client Attachments
            </h2>
            <Button
              variant="outline"
              effect="ringHover"
              className=" border-primary text-primary"
            >
              <Paperclip className="h-4 w-4 mr-2" />
              Upload New Document
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            {clientData.attachments && clientData.attachments.length > 0 ? (
              clientData.attachments.map((attachment, index) => (
                <Card
                  key={index}
                  className="border shadow-sm hover:shadow-md transition-shadow"
                >
                  <CardContent className="p-4">
                    <div className="flex flex-col items-center text-center">
                      <div className="w-full h-32 bg-gray-100 rounded-md flex items-center justify-center mb-3">
                        {attachment.type === "pdf" && (
                          <FileText className="h-12 w-12 text-destructive" />
                        )}
                        {attachment.type === "image" && (
                          <ImageIcon className="h-12 w-12 text-blue-500" />
                        )}
                        {attachment.type === "doc" && (
                          <File className="h-12 w-12 text-blue-700" />
                        )}
                      </div>
                      <h3 className="font-medium text-gray-900 mb-1">
                        {attachment.name}``
                      </h3>
                      <p className="text-sm text-gray-500 mb-2">
                        Uploaded on {attachment.date}
                      </p>
                      <div className="flex gap-2 mt-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-3.5 w-3.5 mr-1" />
                          View
                        </Button>
                        <Button variant="outline" size="sm">
                          <Download className="h-3.5 w-3.5 mr-1" />
                          Download
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="col-span-full bg-gray-50 p-8 text-center rounded-md border border-dashed">
                <Paperclip className="h-10 w-10 mx-auto text-gray-400 mb-2" />
                <p className="text-gray-500">
                  No documents have been uploaded yet
                </p>
                <p className="text-sm text-gray-400 mt-1">
                  Upload client documents by clicking the Upload New Document
                  button
                </p>
              </div>
            )}
          </div>

          <div className="bg-blue-50 p-4 rounded-md">
            <h3 className="font-medium text-primary mb-2">
              Document Requirements
            </h3>
            <ul className="text-sm text-primary space-y-1 ml-5 list-disc">
              <li>Maximum file size: 10MB</li>
              <li>Supported formats: PDF, JPG, PNG, DOC, DOCX</li>
              <li>Please ensure all documents are legible and complete</li>
              <li>Personal information should be clearly visible</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </TabsContent>
  );
}
