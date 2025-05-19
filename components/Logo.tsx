import Image from "next/image";
import React from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface LogoProps {
  withLabel?: boolean;
  imageSize?: number;
  getOpenState: () => boolean;
}

const Logo = ({ withLabel = false, imageSize, getOpenState }: LogoProps) => {
  return (
    <Link
      href="/dashboard"
      className={cn(
        "flex items-center w-full px-6",
        getOpenState() ? "gap-4" : ""
      )}
    >
      <div
        className={cn(
          "flex aspect-square size-10 items-center justify-center rounded-lg",
          !getOpenState() ? "w-full" : ""
        )}
      >
        <Image
          src="/logo.svg"
          width={imageSize || 40}
          height={imageSize || 40}
          priority={true}
          alt="Stella Logo"
        />
      </div>
      <div className="grid flex-1 text-left text-sm leading-tight">
        <h1
          className={cn(
            "font-bold text-foreground text-lg whitespace-nowrap transition-[transform,opacity,display] ease-in-out duration-300 tracking-wide",
            !getOpenState()
              ? "-translate-x-96 opacity-0 hidden"
              : "translate-x-0 opacity-100"
          )}
        >
          STELLA
        </h1>
        {withLabel && (
          <p className="truncate text-sm text-muted-foreground">
            Five Star Finance Inc.
          </p>
        )}
      </div>
    </Link>
  );
};

export default Logo;
