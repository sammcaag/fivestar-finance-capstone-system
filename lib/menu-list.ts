import {
  Users,
  LayoutGrid,
  LucideIcon,
  UserRoundPlus,
  Calculator,
  History,
  Settings,
  FileChartColumn,
  FilePenLine,
  CalendarClock,
  UserCog,
  Building,
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
        {
          href: "/loans", // get from /clients
          label: "Loans Overview",
          icon: FilePenLine,
        },
        // loan appointments
        {
          href: "/loans/appointments",
          label: "Mobile Appointments",
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
        // Staff Management
        {
          href: "/branch",
          label: "Branch Overview",
          icon: Building,
        },
        // Staff Management
        {
          href: "/staff",
          label: "Staff Management",
          icon: UserCog,
        },
        // Activity & Audit Logs
        {
          href: "/activity-logs",
          label: "Activity & Audit Logs",
          icon: History,
        },
        // Reports & Analytics
        {
          href: "/reports",
          label: "Reports & Analytics",
          icon: FileChartColumn,
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
