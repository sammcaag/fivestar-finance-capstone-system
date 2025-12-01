import { decodeFullName } from "@/utils/decode-full-name";
import type {
  Address,
  ClientFamilyInfos,
  ClientFormValues,
  ClientPayload,
} from "../types/client-types";
import { formatFullName } from "@/utils/format-full-name";
import { formatSpouseFullName } from "@/utils/format-spouse-full-name";
import { decodeSpouseFullName } from "@/utils/decode-spouse-full-name";
import { formatContactNumber } from "@/utils/format-contact-number";
import { generateEmail } from "@/utils/generate-email";

export const clientPayload = (data: ClientFormValues, branchId: number): ClientPayload => {
  return {
    fullName: formatFullName({
      firstName: data.firstName,
      middleName: data.middleName,
      lastName: data.lastName,
      suffix: data.suffix,
    }),
    gender: data.gender,
    birthDate: data.dateOfBirth,
    religion: data.religion,
    civilStatus: data.civilStatus,
    occupation: data.occupation,
    placeOfBirth: data.placeOfBirth,
    branchId: branchId,
    userAuth: {
      email: generateEmail(
        formatFullName({
          firstName: data.firstName,
          middleName: data.middleName,
          lastName: data.lastName,
          suffix: data.suffix,
        })
      ),
      password: data.serialNumber,
      role: "CLIENT",
    },

    // Address
    address: {
      addressLine1: data.addressLine1,
      addressLine2: data.addressLine2 || null,
      barangay: data.barangay || null,
      cityOrMunicipality: data.cityOrMunicipality,
      province: data.province,
      region: data.region,
      zipCode: data.zipCode,
    },

    // ContactInfo
    contactInfo: {
      primary_contact: data.primaryContact,
      secondary_contact: data.secondaryContact || null,
    },

    // Pension info
    clientPension: {
      rank: data.rank,
      pensionType: data.pensionType,
      serialNumber: data.serialNumber,
      idNumber: data.idNumber,
      dateEnteredService: data.dateEnteredService,
      dateSeparationService: data.dateSeparationService,
      dateRetiredService: data.dateRetiredService,
      lengthOfService: data.lengthOfService,
      lastUnitAssigned: data.lastUnitAssigned,
      branchOfService: data.branchOfService,
    },

    // Account info
    clientAccount: {
      monthlyPension: data.monthlyPension,
      monthlyDeduction: data.monthlyDeduction,
      atmAccountNumber: data.atmAccountNumber,
      bankName: data.bankName,
      branchOfBank: data.branchOfBank,
    },

    // Family info
    clientFamilyInfos: [
      // Mother
      data.mothersMaidenName && {
        name: data.mothersMaidenName,
        birthDate: null, // optional if you don't have mother's DOB
        relationship: "MOTHER",
        address: null,
        contactInfo: null,
      },

      // Spouse
      data.spouseFirstName && {
        name: formatSpouseFullName({
          firstName: data.spouseFirstName,
          middleName: data.spouseMiddleName,
          lastName: data.spouseLastName,
        }),
        birthDate: data.spouseDateOfBirth,
        relationship: "SPOUSE",
        addressSameAsClient: data.spouseAddressSameAsClient,
        address: {
          addressLine1: data.spouseAddressLine1,
          addressLine2: data.spouseAddressLine2 || null,
          barangay: data.spouseBarangay || null,
          cityOrMunicipality: data.spouseCityOrMunicipality,
          province: data.spouseProvince,
          region: data.spouseRegion,
          zipCode: data.spouseZipCode,
        },
        // Only include contactInfo if spouseContactNumber is non-empty string
        ...(typeof data.spouseContactNumber === "string" &&
        data.spouseContactNumber.trim().length > 1
          ? {
              contactInfo: {
                primary_contact: data.spouseContactNumber.trim(),
              },
            }
          : {}),
      },

      // First child
      data.firstChildName && {
        name: data.firstChildName,
        birthDate: data.firstChildDateOfBirth,
        relationship: "CHILD",
        addressSameAsClient: data.firstChildAddressSameAsClient,
        addressSameAsSpouse: data.firstChildAddressSameAsSpouse,
        birthOrder: 1,
        address: {
          addressLine1: data.firstChildAddressLine1,
          addressLine2: data.firstChildAddressLine2 || null,
          barangay: data.firstChildBarangay || null,
          cityOrMunicipality: data.firstChildCityOrMunicipality,
          province: data.firstChildProvince,
          region: data.firstChildRegion,
          zipCode: data.firstChildZipCode,
        },
      },

      // Second child
      data.secondChildName && {
        name: data.secondChildName,
        birthDate: data.secondChildDateOfBirth,
        relationship: "CHILD",
        addressSameAsClient: data.secondChildAddressSameAsClient,
        addressSameAsSpouse: data.secondChildAddressSameAsSpouse,
        birthOrder: 2,
        address: {
          addressLine1: data.secondChildAddressLine1,
          addressLine2: data.secondChildAddressLine2 || null,
          barangay: data.secondChildBarangay || null,
          cityOrMunicipality: data.secondChildCityOrMunicipality,
          province: data.secondChildProvince,
          region: data.secondChildRegion,
          zipCode: data.secondChildZipCode,
        },
      },

      // Third child
      data.thirdChildName && {
        name: data.thirdChildName,
        birthDate: data.thirdChildDateOfBirth,
        relationship: "CHILD",
        addressSameAsClient: data.thirdChildAddressSameAsClient,
        addressSameAsSpouse: data.thirdChildAddressSameAsSpouse,
        birthOrder: 3,
        address: {
          addressLine1: data.thirdChildAddressLine1,
          addressLine2: data.thirdChildAddressLine2 || null,
          barangay: data.thirdChildBarangay || null,
          cityOrMunicipality: data.thirdChildCityOrMunicipality,
          province: data.thirdChildProvince,
          region: data.thirdChildRegion,
          zipCode: data.thirdChildZipCode,
        },
      },
    ].filter(Boolean) as ClientFamilyInfos[], // remove nulls
  };
};

export const clientUpdatePayload = (
  formData: ClientFormValues,
  fetchedData: ClientPayload
): ClientPayload => {
  // Helper to get child by birthOrder
  const getChildByBirthOrder = (order: number) =>
    fetchedData.clientFamilyInfos.find((f) => f.relationship === "CHILD" && f.birthOrder === order);

  return {
    id: fetchedData.id,
    fullName: formatFullName({
      firstName: formData.firstName,
      middleName: formData.middleName,
      lastName: formData.lastName,
      suffix: formData.suffix,
    }),
    gender: formData.gender,
    birthDate: formData.dateOfBirth,
    religion: formData.religion,
    civilStatus: formData.civilStatus,
    occupation: formData.occupation,
    placeOfBirth: formData.placeOfBirth,
    branchId: fetchedData.branchId,

    address: {
      id: fetchedData.address?.id,
      addressLine1: formData.addressLine1,
      addressLine2: formData.addressLine2 || null,
      barangay: formData.barangay || null,
      cityOrMunicipality: formData.cityOrMunicipality,
      province: formData.province,
      region: formData.region,
      zipCode: formData.zipCode,
    },

    contactInfo: {
      id: fetchedData.contactInfo?.id,
      primary_contact: formData.primaryContact,
      secondary_contact: formData.secondaryContact || null,
    },

    clientPension: {
      id: fetchedData.clientPension?.id,
      rank: formData.rank,
      pensionType: formData.pensionType,
      serialNumber: formData.serialNumber,
      idNumber: formData.idNumber,
      dateEnteredService: formData.dateEnteredService,
      dateSeparationService: formData.dateSeparationService,
      dateRetiredService: formData.dateRetiredService,
      lengthOfService: formData.lengthOfService,
      lastUnitAssigned: formData.lastUnitAssigned,
      branchOfService: formData.branchOfService,
    },

    clientAccount: {
      id: fetchedData.clientAccount?.id,
      monthlyPension: formData.monthlyPension,
      monthlyDeduction: formData.monthlyDeduction,
      atmAccountNumber: formData.atmAccountNumber,
      bankName: formData.bankName,
      branchOfBank: formData.branchOfBank,
    },

    clientFamilyInfos: [
      // Mother
      formData.mothersMaidenName && {
        id: fetchedData.clientFamilyInfos.find((f) => f.relationship === "MOTHER")?.id,
        name: formData.mothersMaidenName,
        birthDate: null,
        relationship: "MOTHER",
        address: null,
        contactInfo: null,
      },

      // Spouse
      formData.spouseFirstName && {
        id: fetchedData.clientFamilyInfos.find((f) => f.relationship === "SPOUSE")?.id,
        name: formatSpouseFullName({
          firstName: formData.spouseFirstName,
          middleName: formData.spouseMiddleName,
          lastName: formData.spouseLastName,
        }),
        birthDate: formData.spouseDateOfBirth,
        relationship: "SPOUSE",
        addressSameAsClient: formData.spouseAddressSameAsClient,
        address: {
          id: fetchedData.clientFamilyInfos.find((f) => f.relationship === "SPOUSE")?.address?.id,
          addressLine1: formData.spouseAddressLine1,
          addressLine2: formData.spouseAddressLine2 || null,
          barangay: formData.spouseBarangay || null,
          cityOrMunicipality: formData.spouseCityOrMunicipality,
          province: formData.spouseProvince,
          region: formData.spouseRegion,
          zipCode: formData.spouseZipCode,
        },
        contactInfo: formData.spouseContactNumber
          ? {
              id: fetchedData.clientFamilyInfos.find((f) => f.relationship === "SPOUSE")
                ?.contactInfo?.id,
              primary_contact: formData.spouseContactNumber,
            }
          : undefined,
      },

      // First child
      formData.firstChildName && {
        ...(() => {
          const child = getChildByBirthOrder(1);
          return {
            id: child?.id,
            name: formData.firstChildName,
            birthDate: formData.firstChildDateOfBirth,
            relationship: "CHILD",
            birthOrder: 1,
            addressSameAsClient: formData.firstChildAddressSameAsClient,
            addressSameAsSpouse: formData.firstChildAddressSameAsSpouse,
            address: {
              id: child?.address?.id,
              addressLine1: formData.firstChildAddressLine1,
              addressLine2: formData.firstChildAddressLine2 || null,
              barangay: formData.firstChildBarangay || null,
              cityOrMunicipality: formData.firstChildCityOrMunicipality,
              province: formData.firstChildProvince,
              region: formData.firstChildRegion,
              zipCode: formData.firstChildZipCode,
            },
          };
        })(),
      },

      // Second child
      formData.secondChildName && {
        ...(() => {
          const child = getChildByBirthOrder(2);
          return {
            id: child?.id,
            name: formData.secondChildName,
            birthDate: formData.secondChildDateOfBirth,
            relationship: "CHILD",
            birthOrder: 2,
            addressSameAsClient: formData.secondChildAddressSameAsClient,
            addressSameAsSpouse: formData.secondChildAddressSameAsSpouse,
            address: {
              id: child?.address?.id,
              addressLine1: formData.secondChildAddressLine1,
              addressLine2: formData.secondChildAddressLine2 || null,
              barangay: formData.secondChildBarangay || null,
              cityOrMunicipality: formData.secondChildCityOrMunicipality,
              province: formData.secondChildProvince,
              region: formData.secondChildRegion,
              zipCode: formData.secondChildZipCode,
            },
          };
        })(),
      },

      // Third child
      formData.thirdChildName && {
        ...(() => {
          const child = getChildByBirthOrder(3);
          return {
            id: child?.id,
            name: formData.thirdChildName,
            birthDate: formData.thirdChildDateOfBirth,
            relationship: "CHILD",
            birthOrder: 3,
            addressSameAsClient: formData.thirdChildAddressSameAsClient,
            addressSameAsSpouse: formData.thirdChildAddressSameAsSpouse,
            address: {
              id: child?.address?.id,
              addressLine1: formData.thirdChildAddressLine1,
              addressLine2: formData.thirdChildAddressLine2 || null,
              barangay: formData.thirdChildBarangay || null,
              cityOrMunicipality: formData.thirdChildCityOrMunicipality,
              province: formData.thirdChildProvince,
              region: formData.thirdChildRegion,
              zipCode: formData.thirdChildZipCode,
            },
          };
        })(),
      },
    ].filter(Boolean) as ClientFamilyInfos[],
  };
};

export function mapBackendToClientFormValues(clientData: ClientPayload): ClientFormValues {
  const clientAddress: Address = clientData.address;
  const mother = clientData.clientFamilyInfos.find((f) => f.relationship === "MOTHER");
  const spouse = clientData.clientFamilyInfos.find((f) => f.relationship === "SPOUSE");
  const children = clientData.clientFamilyInfos
    .filter((f) => f.relationship === "CHILD")
    .sort((a, b) => (a.birthOrder ?? 0) - (b.birthOrder ?? 0)); // sort by birthOrder

  const isSameAddress = (addr1?: Address, addr2?: Address) => {
    if (!addr1 || !addr2) return false;
    return (
      addr1.addressLine1 === addr2.addressLine1 &&
      (addr1.addressLine2 ?? "") === (addr2.addressLine2 ?? "") &&
      (addr1.barangay ?? "") === (addr2.barangay ?? "") &&
      addr1.cityOrMunicipality === addr2.cityOrMunicipality &&
      addr1.province === addr2.province &&
      addr1.region === addr2.region &&
      addr1.zipCode === addr2.zipCode
    );
  };

  // Map children explicitly using birthOrder (first = 1, second = 2, third = 3)
  const mapChild = (child: (typeof children)[0] | undefined) => {
    if (!child) return null;

    const sameAsClient = isSameAddress(child.address, clientAddress);
    const sameAsSpouse = !sameAsClient && isSameAddress(child.address, spouse?.address);

    return {
      name: child.name ?? "",
      birthDate: child.birthDate ? new Date(child.birthDate) : new Date(),
      birthOrder: child.birthOrder ?? 0,
      addressSameAsClient: sameAsClient,
      addressSameAsSpouse: sameAsSpouse,
      addressLine1: child.address?.addressLine1 ?? "",
      addressLine2: child.address?.addressLine2 ?? undefined,
      barangay: child.address?.barangay ?? undefined,
      cityOrMunicipality: child.address?.cityOrMunicipality ?? "",
      province: child.address?.province ?? "",
      region: child.address?.region ?? "",
      zipCode: child.address?.zipCode ?? 0,
    };
  };

  const firstChild = mapChild(children.find((c) => c.birthOrder === 1));
  const secondChild = mapChild(children.find((c) => c.birthOrder === 2));
  const thirdChild = mapChild(children.find((c) => c.birthOrder === 3));

  const { firstName, middleName, lastName, suffix } = decodeFullName(clientData.fullName);

  const {
    firstName: spouseFirstName,
    middleName: spouseMiddleName,
    lastName: spouseLastName,
  } = decodeSpouseFullName(spouse?.name) || {};

  return {
    // Client Info
    firstName,
    middleName,
    lastName,
    suffix,
    dateOfBirth: new Date(clientData.birthDate),
    gender: clientData.gender.toUpperCase(),
    addressLine1: clientAddress.addressLine1,
    addressLine2: clientAddress.addressLine2 ?? "",
    barangay: clientAddress.barangay ?? "",
    cityOrMunicipality: clientAddress.cityOrMunicipality,
    province: clientAddress.province,
    region: clientAddress.region,
    zipCode: clientAddress.zipCode,
    primaryContact: formatContactNumber(clientData.contactInfo.primary_contact),
    secondaryContact: formatContactNumber(clientData.contactInfo.secondary_contact),
    religion: clientData.religion,
    civilStatus: clientData.civilStatus.toUpperCase(),
    occupation: clientData.occupation,
    mothersMaidenName: mother?.name,
    placeOfBirth: clientData.placeOfBirth,

    // Spouse
    spouseFirstName,
    spouseMiddleName,
    spouseLastName,
    spouseDateOfBirth: spouse?.birthDate ? new Date(spouse.birthDate) : new Date(),
    spouseAddressSameAsClient: isSameAddress(spouse?.address, clientAddress),
    spouseAddressLine1: spouse?.address?.addressLine1 ?? "",
    spouseAddressLine2: spouse?.address?.addressLine2 ?? "",
    spouseBarangay: spouse?.address?.barangay ?? "",
    spouseCityOrMunicipality: spouse?.address?.cityOrMunicipality ?? "",
    spouseProvince: spouse?.address?.province ?? "",
    spouseRegion: spouse?.address?.region ?? "",
    spouseZipCode: spouse?.address?.zipCode ?? 0,
    spouseContactNumber: spouse?.contactInfo?.primary_contact ?? "",

    // Children
    firstChildName: firstChild?.name ?? "",
    firstChildDateOfBirth: firstChild?.birthDate ?? new Date(),
    firstChildAddressSameAsClient: firstChild?.addressSameAsClient ?? false,
    firstChildAddressSameAsSpouse: firstChild?.addressSameAsSpouse ?? false,
    firstChildBirthOrder: firstChild?.birthOrder ?? 1,
    firstChildAddressLine1: firstChild?.addressLine1 ?? "",
    firstChildAddressLine2: firstChild?.addressLine2 ?? undefined,
    firstChildBarangay: firstChild?.barangay ?? undefined,
    firstChildCityOrMunicipality: firstChild?.cityOrMunicipality ?? "",
    firstChildProvince: firstChild?.province ?? "",
    firstChildRegion: firstChild?.region ?? "",
    firstChildZipCode: firstChild?.zipCode ?? 0,

    secondChildName: secondChild?.name ?? "",
    secondChildDateOfBirth: secondChild?.birthDate ?? new Date(),
    secondChildAddressSameAsClient: secondChild?.addressSameAsClient ?? false,
    secondChildAddressSameAsSpouse: secondChild?.addressSameAsSpouse ?? false,
    secondChildBirthOrder: secondChild?.birthOrder ?? 2,
    secondChildAddressLine1: secondChild?.addressLine1 ?? "",
    secondChildAddressLine2: secondChild?.addressLine2 ?? undefined,
    secondChildBarangay: secondChild?.barangay ?? undefined,
    secondChildCityOrMunicipality: secondChild?.cityOrMunicipality ?? "",
    secondChildProvince: secondChild?.province ?? "",
    secondChildRegion: secondChild?.region ?? "",
    secondChildZipCode: secondChild?.zipCode ?? 0,

    thirdChildName: thirdChild?.name ?? "",
    thirdChildDateOfBirth: thirdChild?.birthDate ?? new Date(),
    thirdChildAddressSameAsClient: thirdChild?.addressSameAsClient ?? false,
    thirdChildAddressSameAsSpouse: thirdChild?.addressSameAsSpouse ?? false,
    thirdChildBirthOrder: thirdChild?.birthOrder ?? 3,
    thirdChildAddressLine1: thirdChild?.addressLine1 ?? "",
    thirdChildAddressLine2: thirdChild?.addressLine2 ?? undefined,
    thirdChildBarangay: thirdChild?.barangay ?? undefined,
    thirdChildCityOrMunicipality: thirdChild?.cityOrMunicipality ?? "",
    thirdChildProvince: thirdChild?.province ?? "",
    thirdChildRegion: thirdChild?.region ?? "",
    thirdChildZipCode: thirdChild?.zipCode ?? 0,

    // Pension and Account Info
    rank: clientData.clientPension.rank,
    pensionType: clientData.clientPension.pensionType,
    serialNumber: clientData.clientPension.serialNumber,
    idNumber: clientData.clientPension.idNumber,
    dateEnteredService: new Date(clientData.clientPension.dateEnteredService),
    dateSeparationService: new Date(clientData.clientPension.dateSeparationService),
    dateRetiredService: new Date(clientData.clientPension.dateRetiredService),
    lengthOfService: Number(clientData.clientPension.lengthOfService),
    lastUnitAssigned: clientData.clientPension.lastUnitAssigned,
    branchOfService: clientData.clientPension.branchOfService,
    monthlyPension: Number(clientData.clientAccount.monthlyPension ?? 0),
    monthlyDeduction: Number(clientData.clientAccount.monthlyDeduction ?? 0),
    atmAccountNumber: clientData.clientAccount.atmAccountNumber,
    bankName: clientData.clientAccount.bankName,
    branchOfBank: clientData.clientAccount.branchOfBank,
  };
}
