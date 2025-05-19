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
import { AnimatedBackground } from "@/components/motion-primitives/animated-background";

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
        <TabsList className="tabs-container">
          <AnimatedBackground
            className="bg-primary-hover"
            transition={{
              type: "spring",
              bounce: 0.2,
              duration: 0.6,
            }}
            enableHover
          >
            {tabs.map((tab, index) => (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                data-id={index}
                className={`tabs-trigger-style`}
              >
                {tab.label}
              </TabsTrigger>
            ))}
          </AnimatedBackground>
        </TabsList>

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
