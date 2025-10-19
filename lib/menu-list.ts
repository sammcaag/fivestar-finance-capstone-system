import {
  Users,
  LayoutGrid,
  LucideIcon,
  UserRoundPlus,
  Calculator,
  History,
  FileUser,
  Settings,
  FileChartColumn,
  FilePenLine,
  CalendarClock,
  UserCog,
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
          label: "All Clients",
          icon: Users,
        },
        {
          href: "/clients/register", // refine form
          label: "Register Client",
          icon: UserRoundPlus,
        },
        {
          href: "/clients/info", // with page client info
          label: "Client Information",
          icon: FileUser,
        },
      ],
    },
    {
      groupLabel: "Loans",
      menus: [
        // All Loans showcase
        {
          href: "/loans", // get from /clients
          label: "All Loans",
          icon: FilePenLine,
        },
        // loan appointments
        {
          href: "/loans/appointments",
          label: "Loan Appointments",
          icon: CalendarClock,
        },
        //  loan computations
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
      groupLabel: "Monitoring & Control",
      menus: [
        // Reports & Analytics
        {
          href: "/reports",
          label: "Reports & Analytics",
          icon: FileChartColumn,
        },
        // Activity & Audit Logs
        {
          href: "/audit",
          label: "Activity & Audit Logs",
          icon: History,
        },
        // Staff Management
        {
          href: "/staff",
          label: "Staff Management",
          icon: UserCog,
        },
        // Settings
        {
          href: "/settings",
          label: "Settings",
          icon: Settings,
        },
      ],
    },
  ];
}
