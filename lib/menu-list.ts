import {
  Users,
  LayoutGrid,
  LucideIcon,
  UserRoundPlus,
  Calculator,
  FilePlus2,
  ClockPlus,
  History,
  StretchHorizontal,
  FileUser,
  Settings,
  FileChartColumn,
  FilePen,
  FilePenLine,
  CalendarClock,
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
          href: "/dashboard",
          label: "Dashboard",
          icon: LayoutGrid,
        },
      ],
    },
    {
      groupLabel: "Clients",
      menus: [
        {
          href: "/clients",
          label: "All Clients",
          icon: Users,
        },
        {
          href: "/clients/register",
          label: "Register Client",
          icon: UserRoundPlus,
        },
        {
          href: "/clients/info",
          label: "Client Information",
          icon: FileUser,
        },
      ],
    },
    {
      groupLabel: "Loans",
      menus: [
        // loan applications
        {
          href: "/loans/applications",
          label: "Loan Applications",
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
              href: "/loan-computations/new-client",
              label: "New Client",
            },
            {
              href: "/loan-computations/additional",
              label: "Additional",
            },
            {
              href: "/loan-computations/reloan",
              label: "Reloan",
            },
            {
              href: "/loan-computations/renewal",
              label: "Renewal",
            },
            {
              href: "/loan-computations/extension",
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
          href: "/activity",
          label: "Activity & Audit Logs",
          icon: History,
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
