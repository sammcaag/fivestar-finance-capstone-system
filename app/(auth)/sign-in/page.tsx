"use client";

import Loading from "@/components/LoadingPage";
import { Card, CardContent } from "@/components/ui/card";
import LoginForm from "@/features/auth/components/LoginForm";
import SlideShow from "@/features/auth/components/SlideShow";
import { useAuth } from "@/features/auth/context/AuthContext";
import { useAuthSignInForm } from "@/features/auth/hooks/use-auth-form";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const { user, isLoading: authLoading } = useAuth();

  const { form, handleLogin, isLoading } = useAuthSignInForm();

  const [currentSlide, setCurrentSlide] = useState(0);

  // Redirect if already authenticated
  useEffect(() => {
    document.title = "Login | Stella - Five Star Finance Inc.";

    // If user is authenticated and not a CLIENT, redirect to dashboard
    if (user && user.role !== "CLIENT") {
      router.push("/dashboard");
    }

    if (user && user.role !== "FINANCE") {
      router.push("/finance/client-info");
    }
  }, [user, router]);

  // Show loading state while checking authentication
  if (authLoading) {
    return <Loading />;
  }

  // Don't render login form if user is already authenticated
  if (user) {
    return null;
  }

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
    <div className="flex min-h-svh flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 dark:from-sky-900 dark:to-sky-500 p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-4xl">
        <Card className="overflow-hidden border-0 shadow-lg">
          <CardContent className="relative grid p-0 md:grid-cols-2">
            <LoginForm
              form={form}
              onSubmit={form.handleSubmit(handleLogin)}
              isLoading={isLoading}
            />
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
