import { ClientTableProps } from "../types/client-types";

type AddressInfo = {
  addressLine1: string;
  addressLine2?: string;
  barangay?: string;
  cityOrMunicipality: string;
  province: string;
  region: string;
  zipCode: number;
};

type FamilyInfo = {
  id: string;
  name: string;
  relationship: string;
  birthDate: Date;
  contactNumber?: string;
  address?: AddressInfo;
};

export const clientData = {
  // Client table based structure
  id: "SPKND-EJIUS",
  fullName: "John Doe",
  birthDate: "1958-01-15",
  gender: "Male",
  placeOfBirth: "Springfield, USA",
  civilStatus: "married",
  religion: "Roman Catholic",
  profileImageUrl: "https://github.com/shadcn.png",
  occupation: "Software Engineer",
  remarks: "Client has been with us for over 10 years. Very responsive to communications.",
  contactInfo: [
    {
      id: "1",
      type: "primary",
      number: "(555) 123-4567",
    },
    {
      id: "2",
      type: "secondary",
      number: "(555) 987-6543",
    },
  ],
  branch: {
    id: "1",
    name: "Branch 1",
    code: "BR1",
    address: "123 Main St, Springfield, USA",
  },

  status: "ACTIVE", //???

  // Address Info based structure
  address: {
    type: "home",
    addressLine1: "550",
    addressLine2: "N",
    barangay: "Honolulu",
    cityOrMunicipality: "Honolulu",
    province: "Hawaii",
    region: "Hawaii",
    zipCode: 89656,
  } as AddressInfo,

  // Pension Info based structure
  rank: "Captain",
  pensionType: "Military",
  serialNumber: "M12345678",
  idNumber: "12345678",
  dateEnteredService: "1980-06-10",
  dateSeparationService: "2010-06-10",
  dateRetiredService: "2010-06-15",
  lengthOfService: "30 years",
  lastUnitAssigned: "7th Infantry Division",
  branchOfService: "Army",

  // Account Information based structure
  accountNumber: "123456789",
  monthlyPension: 12870,
  monthlyDeduction: 1500,
  atmAccountNumber: "ATM123456789",
  bankName: "First National Bank",
  branchOfBank: "Downtown Branch",

  fi1: 1230, // No idea where this should be

  // Family Members
  familyMembers: [
    {
      id: "1",
      name: "Sarah Smith",
      relationship: "child",
      birthDate: new Date(),
    },
    {
      id: "2",
      name: "Michael Smith",
      relationship: "child",
      birthDate: new Date(),
    },
    {
      id: "3",
      name: "Jennifer Smith",
      relationship: "child",
      birthDate: new Date(),
    },
    {
      id: "4",
      name: "Sarah Jane Smith",
      relationship: "spouse",
      birthDate: new Date(),
      contactNumber: "(555) 234-5678",
      address: {
        type: "home",
        addressLine1: "550",
        addressLine2: "N",
        barangay: "Honolulu",
        cityOrMunicipality: "Honolulu",
        province: "Hawaii",
        region: "Hawaii",
        zipCode: "96817",
      },
    },
    {
      id: "5",
      name: "Mary Johnson",
      relationship: "mother",
      birthDate: new Date(),
      contactNumber: "(555) 345-6789",
    },
  ] as FamilyInfo[],

  // Attachments based structure
  attachments: [
    {
      name: "Birth Certificate.pdf",
      type: "pdf",
      date: "Jan 15, 2023",
      size: "1.2 MB",
    },
    {
      name: "Military ID Card.jpg",
      type: "image",
      date: "Feb 3, 2023",
      size: "0.8 MB",
    },
    {
      name: "Service Record.pdf",
      type: "pdf",
      date: "Mar 12, 2023",
      size: "3.5 MB",
    },
    {
      name: "Medical Report.doc",
      type: "doc",
      date: "Apr 5, 2023",
      size: "1.7 MB",
    },
    {
      name: "Pension Application.pdf",
      type: "pdf",
      date: "May 20, 2023",
      size: "2.1 MB",
    },
  ],
};

export const clientTableData: ClientTableProps[] = [
  {
    id: "728ed52f",
    name: "John Smith",
    email: "john.smith@example.com",
    status: "active",
    createdAt: "2023-11-10",

    gender: "Male",
    birthDate: new Date(),
    rank: "TSG",
    branchName: "Cagayan de Oro City",
  },
  {
    id: "489e1d42",
    name: "Sarah Johnson",
    email: "sarah.j@example.com",
    status: "active",
    createdAt: "2023-11-15",

    gender: "Male",
    birthDate: new Date(),
    rank: "TSG",
    branchName: "Zamboanga City",
  },
  {
    id: "573a1a8c",
    name: "Michael Brown",
    email: "m.brown@example.com",
    status: "inactive",
    createdAt: "2023-10-05",

    gender: "Male",
    birthDate: new Date(),
    rank: "TSG",
    branchName: "Ilo-Ilo City",
  },
  {
    id: "632b9a1f",
    name: "Emily Davis",
    email: "emily.d@example.com",
    status: "pending",
    createdAt: "2023-11-20",

    gender: "Male",
    birthDate: new Date(),
    rank: "TSG",
    branchName: "Davao City",
  },
  {
    id: "892c7d3e",
    name: "Robert Wilson",
    email: "r.wilson@example.com",
    status: "active",
    createdAt: "2023-11-20",

    gender: "Male",
    birthDate: new Date(),
    rank: "TSG",
    branchName: "Quezon City",
  },
  {
    id: "912e5f8b",
    name: "Jennifer Lee",
    email: "j.lee@example.com",
    status: "inactive",
    createdAt: "2023-11-25",

    gender: "Male",
    birthDate: new Date(),
    rank: "TSG",
    branchName: "Calapan City",
  },
  {
    id: "342a9c7d",
    name: "David Martinez",
    email: "d.martinez@example.com",
    status: "processed",
    createdAt: "2023-11-25",

    gender: "Male",
    birthDate: new Date(),
    rank: "TSG",
    branchName: "Tuguegarao City",
  },
  {
    id: "762d4e8a",
    name: "Lisa Thompson",
    email: "lisa.t@example.com",
    status: "active",
    createdAt: "2023-11-05",

    gender: "Male",
    birthDate: new Date(),
    rank: "TSG",
    branchName: "Tuguegarao City",
  },
  {
    id: "219f6b3c",
    name: "James Anderson",
    email: "j.anderson@example.com",
    status: "processed",
    createdAt: "2023-10-15",

    gender: "Male",
    birthDate: new Date(),
    rank: "TSG",
    branchName: "Cagayan de Oro City",
  },
  {
    id: "538e2a7f",
    name: "Patricia Garcia",
    email: "p.garcia@example.com",
    status: "active",
    createdAt: "2023-11-12",

    gender: "Male",
    birthDate: new Date(),
    rank: "TSG",
    branchName: "Zamboanga City",
  },
];
