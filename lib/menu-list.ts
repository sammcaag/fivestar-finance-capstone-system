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
          submenus: [],
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
      groupLabel: "Loan Computations",
      menus: [
        {
          href: "/loan-computations/new-client",
          label: "New Client Computation",
          icon: Calculator,
        },
        {
          href: "/loan-computations/additional",
          label: "Additional Computation",
          icon: FilePlus2,
        },
        {
          href: "/loan-computations/reloan",
          label: "Reloan Computation",
          icon: History,
        },
        {
          href: "/loan-computations/renewal",
          label: "Renewal Computation",
          icon: ClockPlus,
        },
        {
          href: "/loan-computations/extension",
          label: "Extension Computation",
          icon: StretchHorizontal,
        },
      ],
    },
  ];
}

//   submenus: [
//     {
//       href: "/clients",
//       label: "All Clients"
//     },
//     {
//       href: "/posts/new",
//       label: "New Post"
//     }
//   ]
