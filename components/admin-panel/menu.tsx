"use client";

import Link from "next/link";
import { Ellipsis, LogOut } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";

import { cn } from "@/lib/utils";
import { getMenuList } from "@/lib/menu-list";
import { Button } from "@/components/ui/button";
import { CollapseMenuButton } from "@/components/admin-panel/collapse-menu-button";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "@/components/ui/tooltip";

interface MenuProps {
  isOpen: boolean | undefined;
}

export function Menu({ isOpen }: MenuProps) {
  const pathname = usePathname();
  const menuList = getMenuList();
  const router = useRouter();
  const [hoveredIcon, setHoveredIcon] = useState<number | null>(null);

  // Notify parent components about icon hover state
  useEffect(() => {
    const isHovering = hoveredIcon !== null;
    const event = new CustomEvent("menuIconHover", {
      detail: { isHovering },
    });
    window.dispatchEvent(event);
  }, [hoveredIcon]);

  // Handle icon hover
  const handleIconMouseEnter = (index: number) => {
    if (!isOpen) {
      setHoveredIcon(index);
    }
  };

  const handleIconMouseLeave = () => {
    setHoveredIcon(null);
  };

  return (
    <div>
      <nav className="h-full w-full">
        <ul className="flex flex-col min-h-[calc(100vh-48px-36px-16px-50px)] lg:min-h-[calc(100vh-32px-60px-32px)] items-start space-y-1 px-2">
          {menuList.map(({ groupLabel, menus }, groupIndex) => (
            <li className={cn("w-full")} key={groupIndex}>
              {/* Only show group label when sidebar is open */}
              {isOpen ? (
                <p className="text-sm font-medium text-muted-foreground px-4 pb-2 max-w-[248px] truncate transition-opacity duration-200">
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
                      <p className="">{groupLabel}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ) : (
                <p className="pb-2"></p>
              )}
              {menus.map(
                ({ href, label, icon: Icon, active, submenus }, menuIndex) => {
                  const uniqueIndex = groupIndex * 100 + menuIndex;
                  return !submenus || submenus.length === 0 ? (
                    <div className="w-full" key={menuIndex}>
                      <TooltipProvider disableHoverableContent>
                        <Tooltip delayDuration={100}>
                          <TooltipTrigger asChild>
                            <Button
                              variant={
                                (active === undefined && pathname === href) ||
                                active
                                  ? "default"
                                  : "ghost"
                              }
                              className="w-full justify-start h-10 mb-1"
                              asChild
                            >
                              <Link href={href}>
                                <span
                                  className={cn(isOpen === false ? "" : "mr-4")}
                                  onMouseEnter={() =>
                                    handleIconMouseEnter(uniqueIndex)
                                  }
                                  onMouseLeave={handleIconMouseLeave}
                                >
                                  <Icon size={18} />
                                </span>
                                <p
                                  className={cn(
                                    "max-w-[200px] truncate transition-all duration-200",
                                    isOpen === false
                                      ? "-translate-x-96 opacity-0"
                                      : "translate-x-0 opacity-100"
                                  )}
                                >
                                  {label}
                                </p>
                              </Link>
                            </Button>
                          </TooltipTrigger>
                          {isOpen === false && (
                            <TooltipContent side="right">
                              {label}
                            </TooltipContent>
                          )}
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  ) : (
                    <div className="w-full" key={menuIndex}>
                      <CollapseMenuButton
                        icon={Icon}
                        label={label}
                        active={
                          active === undefined ? pathname === href : active
                        }
                        submenus={submenus}
                        isOpen={isOpen}
                        onIconHover={(isHovering) => {
                          if (isHovering) {
                            handleIconMouseEnter(uniqueIndex);
                          } else {
                            handleIconMouseLeave();
                          }
                        }}
                      />
                    </div>
                  );
                }
              )}
            </li>
          ))}
          <li className="w-full grow flex items-end">
            <TooltipProvider disableHoverableContent>
              <Tooltip delayDuration={100}>
                <TooltipTrigger asChild>
                  <Button
                    onClick={() => {
                      router.push("/login");
                    }}
                    variant="outline"
                    className="w-full justify-center h-10 mt-5"
                  >
                    <span
                      className={cn(isOpen === false ? "" : "mr-4")}
                      onMouseEnter={() => handleIconMouseEnter(9999)} // Use a unique index for logout
                      onMouseLeave={handleIconMouseLeave}
                    >
                      <LogOut size={18} />
                    </span>
                    <p
                      className={cn(
                        "whitespace-nowrap transition-all duration-200",
                        isOpen === false ? "opacity-0 hidden" : "opacity-100"
                      )}
                    >
                      Sign out
                    </p>
                  </Button>
                </TooltipTrigger>
                {isOpen === false && (
                  <TooltipContent side="right">Sign out</TooltipContent>
                )}
              </Tooltip>
            </TooltipProvider>
          </li>
        </ul>
      </nav>
    </div>
  );
}
