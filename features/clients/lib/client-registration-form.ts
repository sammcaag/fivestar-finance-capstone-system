import { ClientFormValues } from "../../schema/client-zod-schema";

//steps we created in the stepper
export const steps = [
  {
    id: "Step 1",
    name: "Client General Information",
    fields: [
      "firstName",
      "middleName",
      "lastName",
      "suffix",
      "dateOfBirth",
      "gender",
      "address",
      "contactNumber",
      "alternativeContactNumber",
      "religion",
      "civilStatus",
      "mothersMaidenName",
      "placeOfBirth",
    ],
  },
  {
    id: "Step 2",
    name: "Client's Family Information",
    fields: [
      "spouseFirstName",
      "spouseMiddleName",
      "spouseLastName",
      "spouseDateOfBirth",
      "spouseAddress",
      "spouseContactNumber",
      "firstChildName",
      "firstChildDateOfBirth",
      "secondChildName",
      "secondChildDateOfBirth",
    ],
  },
  {
    id: "Step 3",
    name: "Pensioner's Information",
    fields: [
      "rank",
      "pensionType",
      "serialNumber",
      "idNumber",
      "dateEnteredService",
      "dateSeparationService",
      "dateRetiredService",
      "lengthOfService",
      "lastUnitAssigned",
      "branchOfService",
    ],
  },
  {
    id: "Step 4",
    name: "Account's Information",
    fields: [
      "accountNumber",
      "monthlyPension",
      "monthlyDeduction",
      "atmAccountNumber",
      "bankName",
      "branchOfBank",
    ],
  },
];

// Default Values in Forms
export const defaultValues = {
  firstName: "",
  middleName: "",
  lastName: "",
  suffix: "",
  dateOfBirth: new Date(),
  gender: "",
  address: "",
  contactNumber: "",
  alternativeContactNumber: "",
  religion: "",
  civilStatus: "",
  mothersMaidenName: "",
  placeOfBirth: "",
  spouseFirstName: "",
  spouseMiddleName: "",
  spouseLastName: "",
  spouseDateOfBirth: new Date(),
  spouseAddress: "",
  spouseContactNumber: "",
  firstChildName: "",
  firstChildDateOfBirth: new Date(),
  secondChildName: "",
  secondChildDateOfBirth: new Date(),
  rank: "",
  pensionType: "",
  serialNumber: 0,
  idNumber: 0,
  dateEnteredService: new Date(),
  dateSeparationService: new Date(),
  dateRetiredService: new Date(),
  lengthOfService: 0,
  lastUnitAssigned: "",
  branchOfService: "",
  accountNumber: 0,
  monthlyPension: 0,
  monthlyDeduction: 0,
  atmAccountNumber: 0,
  bankName: "",
  branchOfBank: "",
};

// The 'keyof ClientFormValues' type ensures that each value in the 'formDates' array
// matches a valid key from the 'ClientFormValues' type. This prevents typos or invalid keys
// by allowing only existing property names of 'ClientFormValues'.
export const formDates: (keyof ClientFormValues)[] = [
  "dateOfBirth",
  "spouseDateOfBirth",
  "firstChildDateOfBirth",
  "secondChildDateOfBirth",
  "dateEnteredService",
  "dateSeparationService",
  "dateRetiredService",
];

// This will be used to make the dates null if the dates of this component are untouched
export const optionalFormDates: (keyof ClientFormValues)[] = [
  "spouseDateOfBirth",
  "firstChildDateOfBirth",
  "secondChildDateOfBirth",
];

// returns array for pensionser's information rank selection
export const ranks = [
  "CPL",
  "SGT",
  "SSG",
  "SSGT",
  "MSGT",
  "MSG",
  "WO1",
  "1LT",
  "2LT",
  "CPT",
  "MAJ",
  "LTC",
  "COL",
  "BG",
  "MG",
  "LTG",
  "GEN",
  "PO1",
  "PO2",
  "PO3",
  "CPO",
  "ENS",
  "PVT",
  "PFC",
  "LTCOL",
  "E-W",
];

// returns array for pensionser's information pensionTypes selection
export const pensionTypes = [
  "COMPULSORY",
  "OPTIONAL",
  "CDD",
  "1044",
  "GUARDIAN",
  "ALLOTEE",
  "WIDOW",
];
