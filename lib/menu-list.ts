import {
  Building,
  Building2Icon,
  Calculator,
  CalendarClock,
  ClipboardList,
  LayoutGrid,
  LucideIcon,
  Settings,
  User,
  UserCog,
  UserRoundPlus,
  Users,
  Users2,
  UserX,
} from "lucide-react";

type Submenu = {
  href: string;
  label: string;
  active?: boolean;
};

type Menu = {
  href: string;
  label: string;
  active?: boolean;
  icon: LucideIcon;
  submenus?: Submenu[];
};

type Group = {
  groupLabel: string;
  menus: Menu[];
};

export function getMenuList(): Group[] {
  return [
    {
      groupLabel: "Home",
      menus: [
        {
          href: "/dashboard", // has page
          label: "Dashboard",
          icon: LayoutGrid,
        },
      ],
    },
    {
      groupLabel: "Clients",
      menus: [
        {
          href: "/clients", //split the page
          label: "Clients Overview",
          icon: Users,
        },
        {
          href: "/clients/register", // refine form
          label: "Register Client",
          icon: UserRoundPlus,
        },
      ],
    },
    {
      groupLabel: "Loans",
      menus: [
        // All Loans showcase
        // {
        //   href: "/loans", // get from /clients
        //   label: "Loans Overview",
        //   icon: FilePenLine,
        // },
        // loan appointments
        {
          href: "/loans/appointments",
          label: "Mobile Appointments",
          icon: CalendarClock,
        },
        {
          href: "/loans/computations",
          label: "Loan Computations",
          icon: Calculator,
          submenus: [
            {
              href: "/loans/computations/new-client",
              label: "New Client",
            },
            {
              href: "/loans/computations/additional",
              label: "Additional",
            },
            {
              href: "/loans/computations/reloan",
              label: "Reloan",
            },
            {
              href: "/loans/computations/renewal",
              label: "Renewal",
            },
            {
              href: "/loans/computations/extension",
              label: "Extension",
            },
          ],
        },
      ],
    },
    {
      groupLabel: "Branch",
      menus: [
        // Branch Overview
        {
          href: "/branch",
          label: "Branch Overview",
          icon: Building2Icon,
        },
        // Register Branch
        {
          href: "/branch/register",
          label: "Register Branch",
          icon: Building,
        },
      ],
    },
    {
      groupLabel: "Staff",
      menus: [
        // Staff Overview
        {
          href: "/staff",
          label: "Staff Overview",
          icon: Users2,
        },
        // Staff Branch
        {
          href: "/staff/register",

          label: "Register Staff",
          icon: UserCog,
        },
      ],
    },
    {
      groupLabel: "Verification",
      menus: [
        // Client Information Verfication
        {
          href: "/finance/clients",
          label: "Clients Overview",
          icon: User,
        },
        {
          href: "/finance/loans",
          label: "Loans Overview",
          icon: ClipboardList,
        },
        {
          href: "/finance/deceased",
          label: "Deceased Clients",
          icon: UserX,
        },
      ],
    },
    {
      groupLabel: "Settings",
      menus: [
        // Settings
        {
          href: "/settings",
          label: "Settings",
          icon: Settings,
          submenus: [
            {
              href: `/settings/profile`,
              label: "Profile",
            },
            {
              href: "/settings/security",
              label: "Security",
            },
          ],
        },
      ],
    },
  ];
}

const ROLE_PERMISSIONS = {
  ADMIN: ["Home", "Clients", "Loans", "Branch", "Staff", "Settings"],
  SALES: ["Home", "Clients", "Loans", "Settings"],
  LOANS: ["Home", "Clients", "Loans", "Settings"],
  FINANCE: ["Verification", "Settings"],
  CLIENT: [],
} as const;
export type RoleKey = keyof typeof ROLE_PERMISSIONS;

export const normalizeRole = (role?: string): RoleKey => {
  const upper = role?.toUpperCase();
  return upper && upper in ROLE_PERMISSIONS ? (upper as RoleKey) : "CLIENT";
};

const getAllowedGroupLabels = (role: RoleKey): readonly string[] => {
  return ROLE_PERMISSIONS[role];
};

export function getMenuListWithRole(role: string): Group[] {
  const normalizedRole = normalizeRole(role);
  const allowedGroups = getAllowedGroupLabels(normalizedRole);

  return getMenuList().filter((group) => allowedGroups.includes(group.groupLabel));
}
