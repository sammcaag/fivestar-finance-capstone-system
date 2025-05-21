"use client";

import type React from "react";

import { createContext, useContext, useEffect, useState } from "react";

type AnimationContextType = {
  shouldReduceMotion: boolean;
};

const AnimationContext = createContext<AnimationContextType>({
  shouldReduceMotion: false,
});

export function AnimationProvider({ children }: { children: React.ReactNode }) {
  const [shouldReduceMotion, setShouldReduceMotion] = useState(false);

  useEffect(() => {
    // Check for prefers-reduced-motion
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setShouldReduceMotion(mediaQuery.matches);

    // Listen for changes
    const handleChange = (e: MediaQueryListEvent) => {
      setShouldReduceMotion(e.matches);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return (
    <AnimationContext.Provider value={{ shouldReduceMotion }}>
      {children}
    </AnimationContext.Provider>
  );
}

export function useReducedMotion() {
  const context = useContext(AnimationContext);
  if (context === undefined) {
    throw new Error(
      "useReducedMotion must be used within an AnimationProvider"
    );
  }
  return context.shouldReduceMotion;
}

// Custom hook to get animation properties based on reduced motion preference
export function useAnimationConfig() {
  const shouldReduceMotion = useReducedMotion();

  return {
    // For framer-motion
    transition: (duration = 0.3, delay = 0) => ({
      duration: shouldReduceMotion ? 0 : duration,
      delay: shouldReduceMotion ? 0 : delay,
      ease: "easeOut",
    }),

    // For CSS transitions
    cssTransition: (
      properties = "all",
      duration = 0.3,
      easing = "ease-out"
    ) => {
      return shouldReduceMotion
        ? "none"
        : `${properties} ${duration}s ${easing}`;
    },

    // For staggered animations
    staggerChildren: shouldReduceMotion ? 0 : 0.05,

    // For hover animations
    hoverTransition: {
      duration: shouldReduceMotion ? 0 : 0.2,
      ease: "easeOut",
    },
  };
}
