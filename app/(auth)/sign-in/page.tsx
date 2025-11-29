"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import LoginForm from "@/features/auth/components/LoginForm";
import SlideShow from "@/features/auth/components/SlideShow";

export default function LoginPage() {
  useEffect(() => {
    document.title = "Login | Stella - Five Star Finance Inc.";
  }, []);

  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      image: "/auth/fsfi-1.jpg",
      title: "Welcome to Five Star Finance",
      description: "Your trusted partner in financial solutions",
    },
    {
      image: "/auth/fsfi-2.jpg",
      title: "Streamlined Lending",
      description: "Efficient processes for AFP retirees and beneficiaries",
    },
    {
      image: "/auth/fsfi-3.jpg",
      title: "Secure & Reliable",
      description: "Your data is protected with industry-leading security",
    },
  ];

  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-4xl">
        <Card className="overflow-hidden border-0 shadow-lg">
          <CardContent className="relative grid p-0 md:grid-cols-2">
            <LoginForm />
            <SlideShow
              slides={slides}
              currentSlide={currentSlide}
              setCurrentSlide={setCurrentSlide}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
