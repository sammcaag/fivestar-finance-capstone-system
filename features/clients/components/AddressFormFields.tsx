import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Map, User, Users } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { ClientFormValues, regionOptions } from "../types/client-types";
import { FormFieldWrapper } from "./FormFieldWrapper";

type PrefixType = "spouse" | "firstChild" | "secondChild" | "thirdChild";

export const AddressFields = ({
  form,
  prefix,
}: {
  form: UseFormReturn<ClientFormValues>;
  prefix: PrefixType;
}) => {
  // Track if address was copied
  const copiedAddressRef = useRef(false);

  const clientAddress = {
    addressLine1: form.getValues("addressLine1") ?? "",
    addressLine2: form.getValues("addressLine2") ?? "",
    barangay: form.getValues("barangay") ?? "",
    cityOrMunicipality: form.getValues("cityOrMunicipality") ?? "",
    province: form.getValues("province") ?? "",
    region: form.getValues("region") ?? "",
    zipCode: form.getValues("zipCode") ?? 0,
  };

  const copyAddress = (
    fields: Record<string, string | number>,
    prefix: PrefixType
  ) => {
    const mapping = {
      addressLine1: `${prefix}AddressLine1`,
      addressLine2: `${prefix}AddressLine2`,
      barangay: `${prefix}Barangay`,
      cityOrMunicipality: `${prefix}CityOrMunicipality`,
      province: `${prefix}Province`,
      region: `${prefix}Region`,
      zipCode: `${prefix}ZipCode`,
    } as const;

    Object.entries(mapping).forEach(([src, target]) => {
      form.setValue(target, fields[src], {
        shouldDirty: true,
        shouldTouch: true,
      });
    });
  };

  // Copy client address
  const copyClientAddress = () => {
    copyAddress(clientAddress, prefix);
    copiedAddressRef.current = true;

    if (prefix === "spouse") form.setValue("spouseAddressSameAsClient", true);
    else {
      form.setValue(`${prefix}AddressSameAsClient`, true);
      form.setValue(`${prefix}AddressSameAsSpouse`, false);
    }
  };

  // Copy spouse address to child
  const copySpouseToChild = (
    childPrefix: "firstChild" | "secondChild" | "thirdChild"
  ) => {
    copyAddress(
      {
        addressLine1: form.getValues("spouseAddressLine1") ?? "",
        addressLine2: form.getValues("spouseAddressLine2") ?? "",
        barangay: form.getValues("spouseBarangay") ?? "",
        cityOrMunicipality: form.getValues("spouseCityOrMunicipality") ?? "",
        province: form.getValues("spouseProvince") ?? "",
        region: form.getValues("spouseRegion") ?? "",
        zipCode: form.getValues("spouseZipCode") ?? 0,
      },
      childPrefix
    );
    copiedAddressRef.current = true;

    if (form.getValues("spouseAddressSameAsClient") === true) {
      form.setValue(`${childPrefix}AddressSameAsClient`, true);
      form.setValue(`${childPrefix}AddressSameAsSpouse`, false);
    } else {
      form.setValue(`${childPrefix}AddressSameAsClient`, false);
      form.setValue(`${childPrefix}AddressSameAsSpouse`, true);
    }
  };

  // Detect manual typing
  const handleManualEdit = () => {
    copiedAddressRef.current = false; // user is typing manually

    if (prefix === "spouse") form.setValue("spouseAddressSameAsClient", false);
    else {
      form.setValue(`${prefix}AddressSameAsClient`, false);
      form.setValue(`${prefix}AddressSameAsSpouse`, false);
    }
  };

  // Determine if Clear Address button should be visible
  const showClearButton =
    prefix === "spouse"
      ? form.getValues("spouseAddressSameAsClient")
      : form.getValues(`${prefix}AddressSameAsClient`) ||
        form.getValues(`${prefix}AddressSameAsSpouse`);

  return (
    <>
      <div className="flex flex-row justify-between items-center mb-9 mt-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary rounded-lg shadow-md">
            <Map className="h-5 w-5 text-primary-foreground" />
          </div>
          <h3 className="text-xl font-semibold text-foreground">
            Address Information
          </h3>
        </div>
        <div className="flex justify-center gap-4">
          <Button
            type="button"
            variant="outline"
            className="text-sm"
            onClick={copyClientAddress}
          >
            <User className="w-4 h-4 mr-1" />
            Same Address as Client
          </Button>

          {prefix !== "spouse" && (
            <Button
              type="button"
              variant="outline"
              className="text-sm"
              onClick={() =>
                copySpouseToChild(
                  prefix as "firstChild" | "secondChild" | "thirdChild"
                )
              }
            >
              <Users className="w-4 h-4 mr-1" />
              Same Address as Spouse
            </Button>
          )}

          {showClearButton && (
            <Button
              type="button"
              variant="destructive"
              className="text-sm"
              onClick={() => {
                copyAddress(
                  {
                    addressLine1: "",
                    addressLine2: "",
                    barangay: "",
                    cityOrMunicipality: "",
                    province: "",
                    region: "",
                    zipCode: 0,
                  },
                  prefix
                );
                if (prefix === "spouse")
                  form.setValue("spouseAddressSameAsClient", false);
                else {
                  form.setValue(`${prefix}AddressSameAsClient`, false);
                  form.setValue(`${prefix}AddressSameAsSpouse`, false);
                }
                copiedAddressRef.current = false; // allow typing after clear
              }}
            >
              Clear Address
            </Button>
          )}
        </div>
      </div>

      {/* Address Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormFieldWrapper
          name={`${prefix}AddressLine1`}
          control={form.control}
          label="Address Line 1"
          type="input"
          placeholder="Door 203, De Leon Plaza Bldg"
          customFunctionOnChange={handleManualEdit}
        />
        <FormFieldWrapper
          name={`${prefix}AddressLine2`}
          control={form.control}
          label="Address Line 2"
          type="input"
          placeholder="Yacapin Velez St."
          customFunctionOnChange={handleManualEdit}
        />
        <FormFieldWrapper
          name={`${prefix}Barangay`}
          control={form.control}
          label="Barangay"
          type="input"
          placeholder="Macabalan"
          customFunctionOnChange={handleManualEdit}
        />
        <FormFieldWrapper
          name={`${prefix}CityOrMunicipality`}
          control={form.control}
          label="City or Municipality"
          type="input"
          placeholder="Cagayan De Oro City"
          customFunctionOnChange={handleManualEdit}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        <FormFieldWrapper
          name={`${prefix}Province`}
          control={form.control}
          label="Province"
          type="input"
          placeholder="Misamis Oriental"
          customFunctionOnChange={handleManualEdit}
        />
        <FormFieldWrapper
          name={`${prefix}Region`}
          control={form.control}
          label="Region"
          type="select"
          placeholder="Region X"
          options={regionOptions}
          customFunctionOnChange={handleManualEdit}
        />
        <FormFieldWrapper
          name={`${prefix}ZipCode`}
          control={form.control}
          label="Zip Code"
          type="input"
          placeholder="9000"
          asNumber
          customFunctionOnChange={handleManualEdit}
        />
      </div>
    </>
  );
};
