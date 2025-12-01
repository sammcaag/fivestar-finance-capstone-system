// app/not-found.tsx
"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function UnauthorizedPage() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center -mt-16">
      <div className="w-full text-center">
        {/* Icon */}
        <div className="relative size-[800px] mx-auto">
          <Image
            src="/unauthorized-icon.png"
            alt="Access Denied"
            fill
            className="object-contain"
          />
        </div>

        {/* Title */}
        <h1 className="text-4xl font-bold text-foreground -mt-32">
          Access Denied
        </h1>

        {/* Subtitle */}
        <p className="text-lg text-muted-foreground mt-2">
          You are not authorized to access this page.
        </p>

        {/* Go Back Button */}
        <Button
          variant="default"
          className="mt-8 hover:!cursor-pointer"
          onClick={() => router.push("/sign-in")}
        >
          Go to Home
        </Button>
      </div>
    </div>
  );
}
