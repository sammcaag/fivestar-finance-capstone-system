import { Map, User, Users } from "lucide-react";
import { FormFieldWrapper } from "./FormFieldWrapper";
import { Button } from "@/components/ui/button";
import { UseFormReturn } from "react-hook-form";
import { ClientFormValues, regionOptions } from "../types/client-types";

export const AddressFields = ({
  form,
  prefix,
}: {
  form: UseFormReturn<ClientFormValues>;
  prefix: "spouse" | "firstChild" | "secondChild" | "thirdChild";
}) => {
  // Client's address (from previous step)
  const clientAddress = {
    addressLine1: form.getValues("addressLine1") ?? "",
    addressLine2: form.getValues("addressLine2") ?? "",
    barangay: form.getValues("barangay") ?? "",
    cityOrMunicipality: form.getValues("cityOrMunicipality") ?? "",
    province: form.getValues("province") ?? "",
    region: form.getValues("region") ?? "",
    zipCode: Number(form.getValues("zipCode") ?? 0),
  };

  const copyAddress = (
    fields: Record<string, string | number>,
    prefix: "spouse" | "firstChild" | "secondChild" | "thirdChild"
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
        zipCode: Number(form.getValues("spouseZipCode") ?? 0),
      },
      childPrefix
    );
  };

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
            onClick={() => copyAddress(clientAddress, prefix)}
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
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormFieldWrapper
          name={`${prefix}AddressLine1`}
          control={form.control}
          label="Address Line 1"
          type="input"
          placeholder="Door 203, De Leon Plaza Bldg"
        />
        <FormFieldWrapper
          name={`${prefix}AddressLine2`}
          control={form.control}
          label="Address Line 2"
          type="input"
          placeholder="Yacapin Velez St."
        />
        <FormFieldWrapper
          name={`${prefix}Barangay`}
          control={form.control}
          label="Barangay"
          type="input"
          placeholder="Macabalan"
        />
        <FormFieldWrapper
          name={`${prefix}CityOrMunicipality`}
          control={form.control}
          label="City or Municipality"
          type="input"
          placeholder="Cagayan De Oro City"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        <FormFieldWrapper
          name={`${prefix}Province`}
          control={form.control}
          label="Province"
          type="input"
          placeholder="Misamis Oriental"
        />
        <FormFieldWrapper
          name={`${prefix}Region`}
          control={form.control}
          label="Region"
          type="select"
          placeholder="Region X"
          options={regionOptions}
        />
        <FormFieldWrapper
          name={`${prefix}ZipCode`}
          control={form.control}
          label="Zip Code"
          type="input"
          placeholder="9000"
          asNumber
        />
      </div>
    </>
  );
};
