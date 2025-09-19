"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { cn } from "@/lib/utils";
import { getMenuList } from "@/lib/menu-list";
import { Button } from "@/components/ui/button";
import { Ellipsis, LogOut } from "lucide-react";

interface MenuProps {
  isOpen: boolean | undefined;
}

export function Menu({ isOpen }: MenuProps) {
  const pathname = usePathname();
  const menuList = getMenuList();
  const router = useRouter();
  const [accordionValue, setAccordionValue] = useState<string>("");

  // Load saved value on first render
  useEffect(() => {
    const saved = localStorage.getItem("accordionValue");
    if (saved) setAccordionValue(saved);
  }, []);

  // Save value when it changes
  useEffect(() => {
    localStorage.setItem("accordionValue", accordionValue);
  }, [accordionValue]);

  return (
    <div>
      <nav className="h-full w-full">
        <ul className="flex flex-col min-h-[calc(100vh-48px-36px-16px-30px)] lg:min-h-[calc(100vh-32px-60px-32px)] items-start space-y-1 px-3 lg:px-5">
          {menuList.map(({ groupLabel, menus }, groupIndex) => (
            <li className="w-full" key={groupIndex}>
              {groupLabel === "Loan Computations" ? (
                <>
                  {isOpen ? (
                    <Accordion
                      type="single"
                      collapsible
                      value={accordionValue}
                      onValueChange={setAccordionValue}
                      className="w-full"
                    >
                      <AccordionItem
                        value="loan-computations"
                        className="border-none"
                      >
                        <AccordionTrigger
                          className={cn(
                            "text-sm font-medium text-muted-foreground px-4 py-2 max-w-[248px] truncate transition-opacity duration-200 hover:no-underline",
                            groupIndex !== 0 && "mt-2"
                          )}
                        >
                          {groupLabel}
                        </AccordionTrigger>
                        <AccordionContent className="pb-0">
                          {menus.map(
                            (
                              { href, label, icon: Icon, active },
                              menuIndex
                            ) => (
                              <div className="w-full" key={menuIndex}>
                                <Button
                                  variant={
                                    (active === undefined &&
                                      pathname === href) ||
                                    active
                                      ? "default"
                                      : "ghost"
                                  }
                                  className="w-full justify-start h-10 mb-1"
                                  asChild
                                >
                                  <Link href={href}>
                                    <span className="mr-2">
                                      <Icon
                                        size={18}
                                        className="w-[18px] h-[18px] shrink-0"
                                      />
                                    </span>
                                    <p className="max-w-[200px] truncate">
                                      {label}
                                    </p>
                                  </Link>
                                </Button>
                              </div>
                            )
                          )}
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  ) : !isOpen && isOpen !== undefined ? (
                    <>
                      <div
                        className={cn(
                          "w-full flex justify-center items-center",
                          groupIndex !== 0 && "mt-2"
                        )}
                      >
                        <Ellipsis className="h-5 w-5" />
                      </div>
                      {accordionValue &&
                        menus.map(
                          ({ href, label, icon: Icon, active }, menuIndex) => (
                            <div className="w-full" key={menuIndex}>
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
                                  <span>
                                    <Icon
                                      size={18}
                                      className="w-[18px] h-[18px] shrink-0"
                                    />
                                  </span>
                                  <p
                                    className={cn(
                                      "max-w-[200px] truncate transition-all duration-200 -translate-x-96 opacity-0"
                                    )}
                                  >
                                    {label}
                                  </p>
                                </Link>
                              </Button>
                            </div>
                          )
                        )}
                    </>
                  ) : null}
                </>
              ) : (
                <>
                  {isOpen ? (
                    <p
                      className={cn(
                        "text-sm font-medium text-muted-foreground px-4 pb-2 max-w-[248px] truncate transition-opacity duration-200",
                        groupIndex !== 0 && "mt-2"
                      )}
                    >
                      {groupLabel}
                    </p>
                  ) : !isOpen && isOpen !== undefined && groupLabel ? (
                    <div
                      className={cn(
                        "w-full flex justify-center items-center",
                        groupIndex !== 0 && "mt-2"
                      )}
                    >
                      <Ellipsis className="h-5 w-5" />
                    </div>
                  ) : (
                    <p className="pb-2"></p>
                  )}
                  {menus.map(
                    ({ href, label, icon: Icon, active }, menuIndex) => {
                      return (
                        <div className="w-full" key={menuIndex}>
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
                                className={cn(isOpen === false ? "" : "mr-2")}
                              >
                                <Icon
                                  size={18}
                                  className="w-[18px] h-[18px] shrink-0"
                                />
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
                        </div>
                      );
                    }
                  )}
                </>
              )}
            </li>
          ))}

          <li className="w-full grow flex items-end">
            <Button
              onClick={() => {
                router.push("/login");
              }}
              variant="outline"
              className="w-full justify-center h-10 cursor-pointer"
            >
              <span className={cn(!isOpen ? "" : "mr-4")}>
                <LogOut size={18} className="text-destructive" />
              </span>
              <p
                className={cn(
                  "whitespace-nowrap transition-all duration-200",
                  !isOpen ? "hidden" : "visible"
                )}
              >
                Sign out
              </p>
            </Button>
          </li>
        </ul>
      </nav>
    </div>
  );
}
