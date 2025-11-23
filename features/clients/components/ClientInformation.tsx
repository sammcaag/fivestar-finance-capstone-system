"use client";
import { Tabs } from "@/components/ui/tabs";
import PersonalInformationTab from "./profile/PersonalInformationTab";
import FamilyInformationTab from "./profile/FamilyInformationTab";
import PensionInformationTab from "./profile/PensionInformationTab";
import AttachmentsTab from "./profile/AttachmentsTab";
import TabListCustomComp from "@/components/TabListCustomComp";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { ClientPayload } from "../types/client-types";
import { formatFullAddress } from "@/utils/format-full-address";

const tabs = [
  { value: "personal", label: "Personal Information" },
  { value: "family", label: "Family Information" },
  { value: "pension", label: "Pension Information" },
  { value: "attachments", label: "Attachments" },
];

export default function ClientInformation(client: ClientPayload) {
  const router = useRouter();
  // get link details and detect if tab is present then assign it as defaultvalue
  const searchParams = useSearchParams();
  const defaultValue = searchParams.get("tab");

  const handleChange = (value: string) => {
    router.push(`?tab=${value}`, { scroll: false });
  };

  return (
    <Tabs
      className="w-full"
      defaultValue={defaultValue || "personal"}
      onValueChange={handleChange}
    >
      <TabListCustomComp tabs={tabs} />

      {/* General Information Tab */}
      <PersonalInformationTab
        birthDate={client.birthDate}
        civilStatus={client.civilStatus}
        religion={client.religion}
        birthPlace={client.placeOfBirth}
        address={formatFullAddress(client.address)}
        primaryContact={client.contactInfo.primaryContact}
        secondaryContact={client.contactInfo.secondaryContact}
      />

      {/* Other Information Tab */}
      <FamilyInformationTab familyInfos={client.clientFamilyInfos} />

      {/* Pension Information Tab */}
      <PensionInformationTab />

      {/* Attachments Tab */}
      <AttachmentsTab />
    </Tabs>
  );
}
