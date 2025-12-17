"use client";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getMenuListWithRole, RoleKey } from "@/lib/menu-list";
import { cn } from "@/lib/utils";
import { Ellipsis, LogOut } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useAuth } from "@/features/auth/context/AuthContext";
import { CollapseMenuButton } from "./collapse-menu-button";

interface MenuProps {
  isOpen: boolean | undefined;
}

export function Menu({ isOpen }: MenuProps) {
  const pathname = usePathname();
  const { user, signOut, isLoading } = useAuth();
  console.log(user?.role);

  // Show loading skeleton or nothing until user data is ready
  if (isLoading) {
    return <div className="h-full w-full flex justify-center items-center">Loading...</div>;
  }

  // Fallback if no user (not logged in)
  if (!user) return null;

  const menuList = getMenuListWithRole(user.role as RoleKey);

  console.log(menuList);

  return (
    <ScrollArea className="[&>div>div[style]]:!block ">
      <nav className="h-full w-full mt-4">
        <ul className="flex flex-col min-h-[calc(100vh-48px-36px-16px-32px)] lg:min-h-[calc(100vh-32px-40px-32px)] items-start space-y-1 px-2">
          {menuList.map(({ groupLabel, menus }, index) => (
            <li className={cn("w-full space-y-3", groupLabel ? "pt-5" : "")} key={index}>
              {(isOpen && groupLabel) || isOpen === undefined ? (
                <p className="text-sm font-medium text-muted-foreground px-4 pb-2 max-w-[248px] truncate">
                  {groupLabel}
                </p>
              ) : !isOpen && isOpen !== undefined && groupLabel ? (
                <TooltipProvider>
                  <Tooltip delayDuration={100}>
                    <TooltipTrigger className="w-full">
                      <div className="w-full flex justify-center items-center">
                        <Ellipsis className="h-5 w-5" />
                      </div>
                    </TooltipTrigger>
                    <TooltipContent side="right">
                      <p>{groupLabel}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ) : (
                <p className="pb-2"></p>
              )}
              {menus.map(({ href, label, icon: Icon, active, submenus }, index) => {
                let isActive = false;

                if (href === "/clients") {
                  isActive =
                    pathname === "/clients" ||
                    (/^\/clients\/[^/]+(\/.*)?$/.test(pathname) &&
                      !pathname.startsWith("/clients/register"));
                } else if (href === "/staff") {
                  isActive =
                    pathname === "/staff" ||
                    (/^\/staff\/[^/]+(\/.*)?$/.test(pathname) &&
                      !pathname.startsWith("/staff/register"));
                } else if (href === "/branch") {
                  isActive =
                    pathname === "/branch" ||
                    (/^\/branch\/[^/]+(\/.*)?$/.test(pathname) &&
                      !pathname.startsWith("/branch/register"));
                } else if (href === "/finance/clients") {
                  isActive =
                    pathname === "/finance/clients" || pathname.startsWith("/finance/clients/");
                } else {
                  isActive = pathname === href;
                }

                if (!submenus || submenus.length === 0) {
                  return (
                    <TooltipProvider disableHoverableContent key={index}>
                      <Tooltip delayDuration={100}>
                        <TooltipTrigger asChild>
                          <Button
                            variant={isActive ? "default" : "ghost"}
                            className="w-full justify-start items-center h-10"
                            asChild
                          >
                            <Link href={href} className="flex items-center">
                              <div
                                className={cn(
                                  isOpen === false ? "w-full flex justify-center" : "mr-4"
                                )}
                              >
                                <Icon size={18} />
                              </div>
                              {isOpen && <p className="max-w-[200px]">{label}</p>}
                            </Link>
                          </Button>
                        </TooltipTrigger>
                        {isOpen === false && <TooltipContent side="right">{label}</TooltipContent>}
                      </Tooltip>
                    </TooltipProvider>
                  );
                } else {
                  return (
                    <div className="w-full" key={index}>
                      <CollapseMenuButton
                        icon={Icon}
                        label={label}
                        active={active === undefined ? pathname.startsWith(href) : active}
                        submenus={submenus}
                        isOpen={isOpen}
                      />
                    </div>
                  );
                }
              })}
            </li>
          ))}
          <li className="w-full mt-auto items-end">
            <TooltipProvider disableHoverableContent>
              <Tooltip delayDuration={100}>
                <TooltipTrigger asChild>
                  <Button
                    onClick={async () => await signOut()}
                    variant="outline"
                    className="w-full text-destructive hover:text-white hover:bg-destructive justify-center h-10 mt-5 hover:cursor-pointer"
                  >
                    <span className={cn(isOpen === false ? "" : "mr-4")}>
                      <LogOut size={18} />
                    </span>
                    <p
                      className={cn(
                        "whitespace-nowrap",
                        isOpen === false ? "opacity-0 hidden" : "opacity-100"
                      )}
                    >
                      Sign out
                    </p>
                  </Button>
                </TooltipTrigger>
                {isOpen === false && <TooltipContent side="right">Sign out</TooltipContent>}
              </Tooltip>
            </TooltipProvider>
          </li>
        </ul>
      </nav>
    </ScrollArea>
  );
}
