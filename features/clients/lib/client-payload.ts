import { decodeFullName } from "@/utils/decode-full-name";
import type { Address, ClientFormValues } from "../types/client-types";
import { formatFullName } from "@/utils/format-full-name";
import { formatSpouseFullName } from "@/utils/format-spouse-full-name";
import { decodeSpouseFullName } from "@/utils/decode-spouse-full-name";
import { formatContactNumber } from "@/utils/format-contact-number";
import { ClientPayload, FamilyInfo } from "../types/clients";
import { generateEmail } from "@/utils/generate-email";

export const clientPayload = (data: ClientFormValues): ClientPayload => {
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
    ].filter(Boolean) as FamilyInfo[], // remove nulls
  };
};

export function mapBackendToClientFormValues(
  clientData: ClientPayload
): ClientFormValues {
  const clientAddress: Address = clientData.address;

  const mother = clientData.clientFamilyInfos.find(
    (f) => f.relationship.toUpperCase() === "MOTHER"
  );
  const spouse = clientData.clientFamilyInfos.find(
    (f) => f.relationship.toUpperCase() === "SPOUSE"
  );
  const children = clientData.clientFamilyInfos.filter(
    (f) => f.relationship.toUpperCase() === "CHILD"
  );

  const isSameAddress = (
    addr1: Address | undefined,
    addr2: Address | undefined
  ) => {
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

  // Spouse address flag
  const spouseAddressSameAsClient = spouse
    ? isSameAddress(spouse.address, clientAddress)
    : false;

  // Map children dynamically
  const mappedChildren = children.slice(0, 3).map((child) => {
    let sameAsClient = false;
    let sameAsSpouse = false;

    if (child.address) {
      if (
        spouseAddressSameAsClient &&
        isSameAddress(child.address, spouse?.address)
      ) {
        sameAsClient = true;
      } else if (isSameAddress(child.address, spouse?.address)) {
        sameAsSpouse = true;
      }
    }

    return {
      name: child.name,
      birthDate: child.birthDate,
      addressSameAsClient: sameAsClient,
      addressSameAsSpouse: sameAsSpouse,
      addressLine1: child.address?.addressLine1 ?? "",
      addressLine2: child.address?.addressLine2 ?? "",
      barangay: child.address?.barangay ?? "",
      cityOrMunicipality: child.address?.cityOrMunicipality ?? "",
      province: child.address?.province ?? "",
      region: child.address?.region ?? "",
      zipCode: child.address?.zipCode ?? 0,
    };
  });

  const { firstName, middleName, lastName, suffix } = decodeFullName(
    clientData.fullName
  );

  const {
    firstName: spouseFirstName,
    middleName: spouseMiddleName,
    lastName: spouseLastName,
  } = decodeSpouseFullName(mother?.name) || {};

  return {
    // Client General Information
    firstName,
    middleName,
    lastName,
    suffix,
    dateOfBirth: new Date(clientData.birthDate),
    gender: clientData.gender.toUpperCase().trim(),
    addressLine1: clientAddress.addressLine1,
    addressLine2: clientAddress.addressLine2 ?? "",
    barangay: clientAddress.barangay ?? "",
    cityOrMunicipality: clientAddress.cityOrMunicipality,
    province: clientAddress.province,
    region: clientAddress.region,
    zipCode: clientAddress.zipCode,
    primaryContact: formatContactNumber(clientData.contactInfo.primary_contact),
    secondaryContact: formatContactNumber(
      clientData.contactInfo.secondary_contact
    ),
    religion: clientData.religion,
    civilStatus: clientData.civilStatus.toUpperCase().trim(),
    occupation: clientData.occupation,
    mothersMaidenName: mother?.name,
    placeOfBirth: clientData.placeOfBirth,

    // Spouse Information
    spouseFirstName: spouseFirstName,
    spouseMiddleName: spouseMiddleName,
    spouseLastName: spouseLastName,
    spouseDateOfBirth: spouse?.birthDate
      ? new Date(spouse.birthDate)
      : undefined,
    spouseAddressSameAsClient,
    spouseAddressLine1: spouse?.address?.addressLine1 ?? "",
    spouseAddressLine2: spouse?.address?.addressLine2 ?? "",
    spouseBarangay: spouse?.address?.barangay ?? "",
    spouseCityOrMunicipality: spouse?.address?.cityOrMunicipality ?? "",
    spouseProvince: spouse?.address?.province ?? "",
    spouseRegion: spouse?.address?.region ?? "",
    spouseZipCode: spouse?.address?.zipCode ?? 0,
    spouseContactNumber:
      formatContactNumber(spouse?.contactInfo?.primary_contact) ?? "",

    // Children
    firstChildName: mappedChildren[0]?.name ?? "",
    firstChildDateOfBirth: mappedChildren[0]?.birthDate,
    firstChildAddressSameAsClient:
      mappedChildren[0]?.addressSameAsClient ?? false,
    firstChildAddressSameAsSpouse:
      mappedChildren[0]?.addressSameAsSpouse ?? false,
    firstChildAddressLine1: mappedChildren[0]?.addressLine1 ?? "",
    firstChildAddressLine2: mappedChildren[0]?.addressLine2,
    firstChildBarangay: mappedChildren[0]?.barangay,
    firstChildCityOrMunicipality: mappedChildren[0]?.cityOrMunicipality ?? "",
    firstChildProvince: mappedChildren[0]?.province ?? "",
    firstChildRegion: mappedChildren[0]?.region ?? "",
    firstChildZipCode: mappedChildren[0]?.zipCode ?? 0,

    secondChildName: mappedChildren[1]?.name ?? "",
    secondChildDateOfBirth: mappedChildren[1]?.birthDate,
    secondChildAddressSameAsClient:
      mappedChildren[1]?.addressSameAsClient ?? false,
    secondChildAddressSameAsSpouse:
      mappedChildren[1]?.addressSameAsSpouse ?? false,
    secondChildAddressLine1: mappedChildren[1]?.addressLine1 ?? "",
    secondChildAddressLine2: mappedChildren[1]?.addressLine2,
    secondChildBarangay: mappedChildren[1]?.barangay,
    secondChildCityOrMunicipality: mappedChildren[1]?.cityOrMunicipality ?? "",
    secondChildProvince: mappedChildren[1]?.province ?? "",
    secondChildRegion: mappedChildren[1]?.region ?? "",
    secondChildZipCode: mappedChildren[1]?.zipCode ?? 0,

    thirdChildName: mappedChildren[2]?.name ?? "",
    thirdChildDateOfBirth: mappedChildren[2]?.birthDate,
    thirdChildAddressSameAsClient:
      mappedChildren[2]?.addressSameAsClient ?? false,
    thirdChildAddressSameAsSpouse:
      mappedChildren[2]?.addressSameAsSpouse ?? false,
    thirdChildAddressLine1: mappedChildren[2]?.addressLine1 ?? "",
    thirdChildAddressLine2: mappedChildren[2]?.addressLine2,
    thirdChildBarangay: mappedChildren[2]?.barangay,
    thirdChildCityOrMunicipality: mappedChildren[2]?.cityOrMunicipality ?? "",
    thirdChildProvince: mappedChildren[2]?.province ?? "",
    thirdChildRegion: mappedChildren[2]?.region ?? "",
    thirdChildZipCode: mappedChildren[2]?.zipCode ?? 0,

    // Pensioner's Information
    rank: clientData.clientPension.rank,
    pensionType: clientData.clientPension.pensionType,
    serialNumber: clientData.clientPension.serialNumber,
    idNumber: clientData.clientPension.idNumber,
    dateEnteredService: new Date(clientData.clientPension.dateEnteredService),
    dateSeparationService: new Date(
      clientData.clientPension.dateSeparationService
    ),
    dateRetiredService: new Date(clientData.clientPension.dateRetiredService),
    lengthOfService: Number(clientData.clientPension.lengthOfService),
    lastUnitAssigned: clientData.clientPension.lastUnitAssigned,
    branchOfService: clientData.clientPension.branchOfService,

    // Account's Information
    monthlyPension: clientData.clientAccount.monthlyPension,
    monthlyDeduction: clientData.clientAccount.monthlyDeduction,
    atmAccountNumber: clientData.clientAccount.atmAccountNumber,
    bankName: clientData.clientAccount.bankName,
    branchOfBank: clientData.clientAccount.branchOfBank,
  };
}
