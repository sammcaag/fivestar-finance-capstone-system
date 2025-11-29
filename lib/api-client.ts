import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import { getAuthToken, removeAuthToken } from "./auth-storage";

/**
 * Get the API base URL from environment variables
 * Falls back to localhost if not set (useful for development)
 */
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5500";

/**
 * Get the request timeout from environment variables
 * Falls back to 30 seconds if not set
 */
const API_TIMEOUT = parseInt(process.env.NEXT_PUBLIC_API_TIMEOUT || "1000", 10);

/**
 * Create the main Axios instance with default configuration
 * This is what you'll use to make all API calls
 */
export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: API_TIMEOUT,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Get the auth token from localStorage
    const token = getAuthToken();

    // If token exists, add it to the Authorization header
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Log the request in development (helps with debugging)
    if (process.env.NODE_ENV === "development") {
      console.log(
        `🚀 API Request: ${config.method?.toUpperCase()} ${config.url}`
      );
    }

    return config;
  },
  (error) => {
    // Handle request setup errors
    console.error("❌ Request Error:", error);
    return Promise.reject(error);
  }
);

/**
 * =============================================================================
 * RESPONSE INTERCEPTOR
 * =============================================================================
 *
 * Runs AFTER every response is received
 * Purpose: Handle errors globally and log responses
 */
apiClient.interceptors.response.use(
  (response) => {
    // Log successful responses in development
    if (process.env.NODE_ENV === "development") {
      console.log(`✅ API Response: ${response.config.url}`, response.data);
    }

    return response;
  },
  (error: AxiosError) => {
    // Handle different types of errors

    if (error.response) {
      /**
       * The server responded with an error status code (4xx, 5xx)
       */
      const status = error.response.status;

      // Handle specific status codes
      switch (status) {
        case 401:
          // Unauthorized - token is invalid or expired
          console.error("❌ 401 Unauthorized: Logging out...");
          removeAuthToken(); // Clear the invalid token

          // Redirect to login page
          if (typeof window !== "undefined") {
            window.location.href = "/sign-in";
          }
          break;

        case 403:
          // Forbidden - user doesn't have permission
          console.error("❌ 403 Forbidden: Access denied");
          break;

        case 404:
          // Not Found - endpoint or resource doesn't exist
          console.error("❌ 404 Not Found:", error.config?.url);
          break;

        case 500:
          // Internal Server Error - something wrong on backend
          console.error("❌ 500 Server Error: Backend issue");
          break;

        default:
          console.error(`❌ Error ${status}:`, error.response.data);
      }
    } else if (error.request) {
      /**
       * Request was sent but no response received
       * Usually means network error or backend is down
       */
      console.error("❌ Network Error: No response from server");
    } else {
      /**
       * Something went wrong setting up the request
       */
      console.error("❌ Request Setup Error:", error.message);
    }

    // Always reject the promise so the calling code can handle it
    return Promise.reject(error);
  }
);

/**
 * Extract error message from API error response
 * Useful for showing user-friendly error messages
 *
 * @param error - The error object from a failed API call
 * @returns A user-friendly error message string
 */
export const getErrorMessage = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    // Try to get error message from response
    return (
      error.response?.data?.message ||
      error.response?.data?.error ||
      error.message ||
      "An unexpected error occurred"
    );
  }

  // Handle non-Axios errors
  if (error instanceof Error) {
    return error.message;
  }

  return "An unexpected error occurred";
};
