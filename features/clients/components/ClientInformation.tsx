"use client";
import { useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SummaryTab from "./profile/SummaryTab";
import GeneralInformationTab from "./profile/GeneralInformationTab";
import FamilyInformationTab from "./profile/FamilyInformationTab";
import PensionInformationTab from "./profile/PensionInformationTab";
import AttachmentsTab from "./profile/AttachmentsTab";
import { Button } from "@/components/ui/button";
import { FileSearch } from "lucide-react";
import TabListCustomComp from "@/components/TabListCustomComp";

const tabs = [
  { value: "general", label: "General Information" },
  { value: "other", label: "Family Information" },
  { value: "pension", label: "Pension Information" },
  { value: "attachments", label: "Attachments" },
];

export default function ClientInformation() {
  const [activeTab, setActiveTab] = useState("general");

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <div className="flex justify-between items-center">
        <TabListCustomComp tabs={tabs} notFullWidth />

        <Button effect={"ringHover"}>
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
