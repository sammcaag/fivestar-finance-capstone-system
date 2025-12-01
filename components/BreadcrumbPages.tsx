import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "./ui/breadcrumb";
import Link from "next/link";

interface BreadcrumbPagesProps {
  links: {
    href: string;
    label: string;
  }[];
}

export default function BreadcrumbPages({ links }: BreadcrumbPagesProps) {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {links.map((link, index) => (
          <div key={index} className="flex items-center">
            <BreadcrumbItem>
              {index === links.length - 1 ? (
                <BreadcrumbPage>{link.label}</BreadcrumbPage>
              ) : (
                <BreadcrumbLink asChild>
                  <Link href={link.href} className="text-muted-foreground">
                    {link.label}
                  </Link>
                </BreadcrumbLink>
              )}
            </BreadcrumbItem>
            {index !== links.length - 1 && <BreadcrumbSeparator className="ml-2" />}
          </div>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
