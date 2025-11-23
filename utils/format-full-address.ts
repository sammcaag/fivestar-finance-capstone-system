import { Address } from "@/features/clients/types/client-types";

export function formatFullAddress(addr: Address) {
  return [
    addr.addressLine1,
    addr.addressLine2,
    addr.barangay,
    addr.cityOrMunicipality,
    addr.province,
    addr.region,
    addr.zipCode,
  ]
    .filter(Boolean)
    .join(", ");
}
