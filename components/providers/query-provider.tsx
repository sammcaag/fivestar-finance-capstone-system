/**
 * =============================================================================
 * REACT QUERY PROVIDER COMPONENT
 * =============================================================================
 * 
 * Purpose: Wrap the app with React Query's QueryClientProvider
 * 
 * Why do we need this?
 * - React Query needs a provider at the root of your app
 * - The provider gives all components access to the QueryClient
 * - This is similar to how Context API works in React
 * 
 * Single Responsibility: Provide React Query context to the entire app
 */

"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { queryClient } from "@/lib/query-client";

interface QueryProviderProps {
  children: React.ReactNode;
}

/**
 * QueryProvider Component
 * 
 * Wraps your app to enable React Query functionality
 * 
 * What's included:
 * 1. QueryClientProvider - Makes React Query available
 * 2. ReactQueryDevtools - Developer tools (only in development)
 * 
 * The devtools show:
 * - All active queries and their states
 * - Cached data
 * - Query invalidation
 * - Network requests
 * 
 * How to use the devtools:
 * - Look for a floating icon in the bottom corner (development only)
 * - Click it to see all your queries
 * - Great for debugging!
 */
export function QueryProvider({ children }: QueryProviderProps) {
  return (
    <QueryClientProvider client={queryClient}>
      {/* Your app components */}
      {children}

      {/* 
        React Query DevTools
        - Only shows in development mode
        - Automatically hidden in production
        - Helps you debug queries and mutations
      */}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
