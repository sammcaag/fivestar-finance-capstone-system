"use client";
import { Tabs } from "@/components/ui/tabs";
import PersonalInformationTab from "./profile/PersonalInformationTab";
import FamilyInformationTab from "./profile/FamilyInformationTab";
import PensionInformationTab from "./profile/PensionInformationTab";
import AttachmentsTab from "./profile/AttachmentsTab";
import TabListCustomComp from "@/components/TabListCustomComp";
import { useSearchParams } from "next/navigation";

const tabs = [
  { value: "personal", label: "Personal Information" },
  { value: "family", label: "Family Information" },
  { value: "pension", label: "Pension Information" },
  { value: "military", label: "Military Information" },
  { value: "attachments", label: "Attachments" },
];

export default function ClientInformation() {
  // get link details and detect if tab is present then assign it as defaultvalue
  const searchParams = useSearchParams();
  const defaultValue = searchParams.get("tab");
  return (
    <Tabs className="w-full" defaultValue={defaultValue || "personal"}>
      <TabListCustomComp tabs={tabs} />

      {/* General Information Tab */}
      <PersonalInformationTab />

      {/* Other Information Tab */}
      <FamilyInformationTab />

      {/* Pension Information Tab */}
      <PensionInformationTab />

      {/* Attachments Tab */}
      <AttachmentsTab />
    </Tabs>
  );
}
