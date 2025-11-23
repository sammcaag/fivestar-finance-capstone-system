// app/not-found.tsx
"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function NotFoundPage({ title }: { title: string }) {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center -mt-16">
      <div className="w-full text-center">
        {/* Icon */}
        <div className="relative size-[600px] mx-auto">
          <Image
            src="/not-found-icon.png"
            alt="Not Found"
            fill
            className="object-contain"
          />
        </div>

        {/* Title */}
        <h1 className="text-4xl font-bold text-foreground -mt-10">
          {title} Not Found
        </h1>

        {/* Subtitle */}
        <p className="text-lg text-muted-foreground">
          Sorry, we couldnt find what you were looking for.
        </p>

        {/* Go Back Button */}
        <Button
          variant="default"
          className="mt-4"
          onClick={() => router.push("/dashboard")}
        >
          Go to Dashboard
        </Button>
      </div>
    </div>
  );
}
