// app/not-found.tsx
"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function NotFoundPages() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-transparent">
      <div className="max-w-2xl w-full text-center space-y-6">
        {/* Icon */}
        <div className="relative size-[500px] mx-auto">
          <Image src="/not-found-icon.png" alt="Not Found" fill className="object-contain" />
        </div>

        {/* Title */}
        <h1 className="text-4xl font-bold text-foreground">Page Not Found</h1>

        {/* Subtitle */}
        <p className="text-lg text-muted-foreground">
          Sorry, we couldn’t find what you were looking for.
        </p>

        {/* Go Back Button */}
        <Button variant="default" className="mt-4" onClick={() => router.push("/")}>
          Go to Home
        </Button>
      </div>
    </div>
  );
}
