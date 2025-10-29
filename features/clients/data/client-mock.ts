import { Client, ClientHistoryRecord } from "../types/client-types";

type AddressInfo = {
  type: "current" | "home";
  houseNumber?: string;
  buildingNumber?: string;
  street?: string;
  barangay: string;
  cityOrMunicipality: string;
  province: string;
  region: string;
  zipCode: string;
  country: string;
  fullAddress: string;
};

type FamilyInfo = {
  id: string;
  fullName: string;
  relationship: string;
  dateOfBirth: string;
  contactNumber?: string;
  address?: AddressInfo;
};

export const clientData = {
  // Client table based structure
  id: "SPKND-EJIUS",
  fullName: "John Doe",
  dateOfBirth: "1958-01-15",
  gender: "Male",
  placeOfBirth: "Springfield, USA",
  civilStatus: "married",
  religion: "Roman Catholic",
  profileImageUrl: "https://github.com/shadcn.png",
  occupation: "Software Engineer",
  remarks:
    "Client has been with us for over 10 years. Very responsive to communications.",
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
    houseNumber: "550",
    buildingNumber: "N",
    street: "King St",
    barangay: "Honolulu",
    cityOrMunicipality: "Honolulu",
    province: "Hawaii",
    region: "Hawaii",
    zipCode: "96817",
    country: "USA",
    fullAddress: "550 N King St, Honolulu, Hawaii 96817",
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
      fullName: "Sarah Smith",
      relationship: "dependent",
      dateOfBirth: "March 22, 1960",
    },
    {
      id: "2",
      fullName: "Michael Smith",
      relationship: "dependent",
      dateOfBirth: "April 10, 1985",
    },
    {
      id: "3",
      fullName: "Jennifer Smith",
      relationship: "dependent",
      dateOfBirth: "July 18, 1988",
    },
    {
      id: "4",
      fullName: "Sarah Jane Smith",
      relationship: "spouse",
      dateOfBirth: "January 15, 1958",
      contactNumber: "(555) 234-5678",
      address: {
        type: "home",
        houseNumber: "550",
        buildingNumber: "N",
        street: "King St",
        barangay: "Honolulu",
        cityOrMunicipality: "Honolulu",
        province: "Hawaii",
        region: "Hawaii",
        zipCode: "96817",
        country: "USA",
        fullAddress: "550 N King St, Honolulu, Hawaii 96817",
      },
    },
    {
      id: "5",
      fullName: "Mary Johnson",
      relationship: "mother",
      dateOfBirth: "April 10, 1950",
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

export const clientHistoryRecords: ClientHistoryRecord[] = [
  {
    dedCode: "FI-1",
    productType: "NC",
    amount: "2,500.80",
    term: "60",
    releasedDate: "Sep 5, 2020",
    valueDate: "Dec 1, 2020",
    maturityDate: "Nov 1, 2025",
    status: "PROCESS",
  },
  {
    dedCode: "FI-2",
    productType: "ADDITIONAL",
    amount: "3,000.00",
    term: "48",
    releasedDate: "Sep 5, 2020",
    valueDate: "Dec 1, 2020",
    maturityDate: "Nov 1, 2024",
    status: "RELEASED",
  },
  {
    dedCode: "FI-2",
    productType: "EXTENSION",
    amount: "1,500.50",
    term: "12",
    releasedDate: "Oct 16, 2020",
    valueDate: "Nov 1, 2020",
    maturityDate: "Oct 1, 2023",
    status: "RELEASED",
  },
  {
    dedCode: "FI-3",
    productType: "ADDITIONAL",
    amount: "1,000.00",
    term: "60",
    releasedDate: "May 12, 2024",
    valueDate: "Aug 1, 2024",
    maturityDate: "Jul 1, 2029",
    status: "RELEASED",
  },
  {
    dedCode: "FI-2",
    productType: "NC",
    amount: "8,939.00",
    term: "60",
    releasedDate: "Sep 28, 2024",
    valueDate: "Dec 1, 2024",
    maturityDate: "Nov 1, 2029",
    status: "PROCESS",
  },
  {
    dedCode: "FI-5",
    productType: "RENEWAL",
    amount: "6,000.00",
    term: "60",
    releasedDate: "Oct 6, 2024",
    valueDate: "Jan 1, 2025",
    maturityDate: "Dec 1, 2029",
    status: "PROCESS",
  },
  {
    dedCode: "FI-4",
    productType: "RENEWAL",
    amount: "1,000.00",
    term: "60",
    releasedDate: "Oct 9, 2024",
    valueDate: "Jan 1, 2025",
    maturityDate: "Dec 1, 2029",
    status: "PROCESS",
  },
  {
    dedCode: "FI-2",
    productType: "ADDITIONAL",
    amount: "1,000.00",
    term: "60",
    releasedDate: "Feb 14, 2025",
    valueDate: "May 1, 2025",
    maturityDate: "Apr 1, 2030",
    status: "RELEASED",
  },
];

export const clientTableData: Client[] = [
  {
    id: "728ed52f",
    name: "John Smith",
    email: "john.smith@example.com",
    loanAmount: 25000,
    loanType: "Personal",
    status: "active",
    lastPayment: "2023-11-10",
    nextPayment: "2023-12-10",
  },
  {
    id: "489e1d42",
    name: "Sarah Johnson",
    email: "sarah.j@example.com",
    loanAmount: 150000,
    loanType: "Mortgage",
    status: "active",
    lastPayment: "2023-11-15",
    nextPayment: "2023-12-15",
  },
  {
    id: "573a1a8c",
    name: "Michael Brown",
    email: "m.brown@example.com",
    loanAmount: 5000,
    loanType: "Personal",
    status: "inactive",
    lastPayment: "2023-10-05",
    nextPayment: "2023-11-05",
  },
  {
    id: "632b9a1f",
    name: "Emily Davis",
    email: "emily.d@example.com",
    loanAmount: 75000,
    loanType: "Business",
    status: "pending",
    lastPayment: "",
    nextPayment: "",
  },
  {
    id: "892c7d3e",
    name: "Robert Wilson",
    email: "r.wilson@example.com",
    loanAmount: 200000,
    loanType: "Mortgage",
    status: "active",
    lastPayment: "2023-11-20",
    nextPayment: "2023-12-20",
  },
  {
    id: "912e5f8b",
    name: "Jennifer Lee",
    email: "j.lee@example.com",
    loanAmount: 15000,
    loanType: "Auto",
    status: "inactive",
    lastPayment: "2023-11-25",
    nextPayment: "",
  },
  {
    id: "342a9c7d",
    name: "David Martinez",
    email: "d.martinez@example.com",
    loanAmount: 10000,
    loanType: "Personal",
    status: "processed",
    lastPayment: "",
    nextPayment: "",
  },
  {
    id: "762d4e8a",
    name: "Lisa Thompson",
    email: "lisa.t@example.com",
    loanAmount: 50000,
    loanType: "Business",
    status: "active",
    lastPayment: "2023-11-05",
    nextPayment: "2023-12-05",
  },
  {
    id: "219f6b3c",
    name: "James Anderson",
    email: "j.anderson@example.com",
    loanAmount: 8000,
    loanType: "Personal",
    status: "processed",
    lastPayment: "2023-10-15",
    nextPayment: "2023-11-15",
  },
  {
    id: "538e2a7f",
    name: "Patricia Garcia",
    email: "p.garcia@example.com",
    loanAmount: 120000,
    loanType: "Mortgage",
    status: "active",
    lastPayment: "2023-11-12",
    nextPayment: "2023-12-12",
  },
];
