"use client";

import { ChevronDown, FilePenLine, LayoutGrid, LogOut, Users } from "lucide-react";
import Link from "next/link";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useAuth } from "@/features/auth/context/AuthContext";
import { ModeToggle } from "../ModeToggle";

export function UserNav() {
  const dropdownItems = [
    {
      label: "Dashboard",
      href: "/dashboard",
      icon: LayoutGrid,
    },
    {
      label: "Clients Overview",
      href: "/clients",
      icon: Users,
    },
    {
      label: "Loans Overview",
      href: "/loans",
      icon: FilePenLine,
    },
  ];

  const { user, signOut } = useAuth();
  // Safe initials computation
  const initials = (() => {
    if (!user?.name) return " "; // fallback if name is missing
    return user.name
      .split(" ")
      .filter(Boolean) // remove empty strings
      .map((word) => word[0].toUpperCase()) // now word[0] is guaranteed
      .join("");
  })();
  return (
    <DropdownMenu>
      <TooltipProvider disableHoverableContent>
        <Tooltip delayDuration={100}>
          <TooltipTrigger asChild>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="relative bg-transparent h-12 hover:border-primary"
              >
                <Avatar className="size-8 mr-1">
                  <AvatarImage src={"https://github.com/shadcn.png"} alt={user?.name} />
                  <AvatarFallback className="rounded-lg">{initials}</AvatarFallback>
                </Avatar>
                <span className="truncate font-semibold">{user?.name}</span>
                <ChevronDown className="w-4 h-4 ml-2 transition-transform duration-300 ease-in-out group-[data-state=open]:rotate-180" />
              </Button>
            </DropdownMenuTrigger>
          </TooltipTrigger>
          <TooltipContent side="bottom">Profile</TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user?.name}</p>
            <p className="text-xs leading-none text-muted-foreground">{user?.email}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {dropdownItems.map((item) => (
            <DropdownMenuItem key={item.label} className="hover:cursor-pointer" asChild>
              <Link href={item.href} className="flex items-center">
                <item.icon className="w-4 h-4 mr-3 text-muted-foreground" />
                {item.label}
              </Link>
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        {/*Add the dark mode theme here below*/}
        <DropdownMenuItem className="hover:cursor-pointer p-0" onClick={() => {}}>
          <ModeToggle />
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="hover:cursor-pointer" onClick={async () => await signOut()}>
          <LogOut className="w-4 h-4 mr-3 text-muted-foreground" />
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
