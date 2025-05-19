"use client";
import { useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SummaryTab from "./profile/SummaryTab";
import GeneralInformationTab from "./profile/GeneralInformationTab";
import FamilyInformationTab from "./profile/FamilyInformationTab";
import PensionInformationTab from "./profile/PensionInformationTab";
import AttachmentsTab from "./profile/AttachmentsTab";
import { Button } from "@/components/ui/button";
import { File, FileSearch } from "lucide-react";

export default function ClientInformation() {
  const [activeTab, setActiveTab] = useState("general");

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <div className="flex justify-between items-center">
        <TabsList className="tabs-container">
          {/* <TabsTrigger value="summary" className={`tabs-trigger-style`}>
          Summary
        </TabsTrigger> */}
          <TabsTrigger value="general" className={`tabs-trigger-style`}>
            General Information
          </TabsTrigger>
          <TabsTrigger value="other" className={`tabs-trigger-style`}>
            Family Information
          </TabsTrigger>
          <TabsTrigger value="pension" className={`tabs-trigger-style`}>
            Pension Information
          </TabsTrigger>
          <TabsTrigger value="attachments" className={`tabs-trigger-style`}>
            Attachments
          </TabsTrigger>
        </TabsList>
        <Button
         
        >
          <FileSearch /> Advance Documents
        </Button>
      </div>

      {/* Summary Tab */}
      {/* <SummaryTab /> */}

      {/* General Information Tab */}
      <GeneralInformationTab />

      {/* Other Information Tab */}
      <FamilyInformationTab />

      {/* Pension Information Tab */}
      <PensionInformationTab />

      {/* Attachments Tab */}
      <AttachmentsTab />
    </Tabs>
  );
}
