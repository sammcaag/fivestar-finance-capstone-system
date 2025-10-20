"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ChevronLeft, ChevronRight, Lock, User } from "lucide-react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { PasswordInput } from "@/components/ui/password-input";

export default function LoginPage() {
  useEffect(() => {
    document.title = "Login - Stella | Five Star Finance Inc.";
  }, []);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

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

  // Auto-rotate slides
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  const handleLogin = (data: LoginSchema) => {
    setIsLoading(true);
    console.log("DATA SUBMITTED", data);
    setTimeout(() => {
      setIsLoading(false);
      window.location.href = "/dashboard";
    }, 1500);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const loginSchema = z.object({
    username: z.string().min(1, "Username is required"),
    password: z.string().min(1, "Password is required"),
  });

  type LoginSchema = z.infer<typeof loginSchema>;

  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-4xl">
        <Card className="overflow-hidden border-0 shadow-lg">
          <CardContent className="relative grid p-0 md:grid-cols-2">
            {/* Login Form */}
            <div className="relative flex flex-col justify-center p-8 md:p-10">
              <div className="relative top-0 mb-10 text-center">
                <h1 className="text-2xl font-bold text-primary">
                  Welcome Back
                </h1>
                <p className="text-muted-foreground mt-2">
                  Sign in to your account
                </p>
              </div>

              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(handleLogin)}
                  className="space-y-6"
                >
                  {/* Username Field */}
                  <div className="space-y-8 mb-14">
                    <FormField
                      control={form.control}
                      name="username"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Username</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <User className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                              <Input
                                {...field}
                                id="username"
                                placeholder="Enter your username"
                                className="pl-10 h-11 bg-blue-50/50 dark:bg-blue-900/20 border-blue-100 dark:border-blue-800 focus-visible:ring-primary"
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    {/* Password Field */}
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Lock className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                              <PasswordInput
                                placeholder="Password"
                                className="pl-10 py-5"
                                {...field}
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    className="relative bottom-0 w-full h-11 bg-primary hover:bg-primary/90 text-white font-medium"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <span className="flex items-center">
                        <svg
                          className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Signing in...
                      </span>
                    ) : (
                      "Sign In"
                    )}
                  </Button>
                </form>
              </Form>
            </div>

            {/* Image Slideshow */}
            <div className="relative hidden md:block bg-primary/5 dark:bg-primary/10">
              <div className="absolute inset-0 overflow-hidden">
                {slides.map((slide, index) => (
                  <div
                    key={index}
                    className={cn(
                      "absolute inset-0 transition-opacity duration-1000 ease-in-out",
                      currentSlide === index ? "opacity-100" : "opacity-0"
                    )}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
                    <div
                      className="h-full w-full bg-cover bg-center"
                      style={{ backgroundImage: `url(${slide.image})` }}
                    />
                    <div className="absolute bottom-10 left-0 right-0 z-20 px-8 text-white">
                      <h2 className="text-2xl font-bold mb-2">{slide.title}</h2>
                      <p className="text-sm opacity-90">{slide.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Slide Navigation */}
              <div className="absolute bottom-4 left-0 right-0 z-30 flex justify-center space-x-2">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    className={cn(
                      "w-2 h-2 rounded-full transition-all",
                      currentSlide === index
                        ? "bg-white w-6"
                        : "bg-white/50 hover:bg-white/80"
                    )}
                    onClick={() => setCurrentSlide(index)}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>

              {/* Slide Controls */}
              <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-1.5 rounded-full bg-black/20 hover:bg-black/40 text-white transition-colors"
                aria-label="Previous slide"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-1.5 rounded-full bg-black/20 hover:bg-black/40 text-white transition-colors"
                aria-label="Next slide"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
