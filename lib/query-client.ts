/**
 * =============================================================================
 * REACT QUERY CONFIGURATION
 * =============================================================================
 * 
 * Purpose: Configure React Query (TanStack Query) settings for the entire app
 * 
 * What is React Query?
 * - A library that manages server state (data from APIs)
 * - Handles caching, loading states, and refetching automatically
 * - Makes your app faster by storing data in memory
 * 
 * Single Responsibility: Configure global React Query behavior
 */

import { QueryClient } from "@tanstack/react-query";

/**
 * Create a new QueryClient instance with custom default options
 * 
 * Think of this as the "brain" that manages all your API data
 */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      /**
       * staleTime: How long data is considered "fresh" (in milliseconds)
       * - 5 minutes = 5 * 60 * 1000 = 300000ms
       * - If data is fresh, React Query won't refetch it
       * - Adjust based on how often your data changes
       */
      staleTime: 5 * 60 * 1000, // 5 minutes

      /**
       * gcTime (garbage collection time): How long unused data stays in cache
       * - 10 minutes = 10 * 60 * 1000 = 600000ms
       * - After this time, unused data is removed from memory
       * - Previously called "cacheTime" in older versions
       */
      gcTime: 10 * 60 * 1000, // 10 minutes

      /**
       * retry: How many times to retry a failed request
       * - false = don't retry (good for development to see errors quickly)
       * - Change to 1 or 2 in production for better reliability
       */
      retry: false,

      /**
       * refetchOnWindowFocus: Refetch data when user returns to the tab
       * - true = always get fresh data when user comes back
       * - false = use cached data (faster but might be outdated)
       */
      refetchOnWindowFocus: false,

      /**
       * refetchOnReconnect: Refetch when internet connection is restored
       * - true = get fresh data after reconnecting
       */
      refetchOnReconnect: true,
    },
    mutations: {
      /**
       * retry: How many times to retry a failed create/update/delete
       * - false = don't retry mutations (safer to avoid duplicate actions)
       */
      retry: false,
    },
  },
});
