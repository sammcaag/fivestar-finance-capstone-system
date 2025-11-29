"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/sign-in");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}
