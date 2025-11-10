/**
 * =============================================================================
 * AUTH TOKEN STORAGE UTILITIES
 * =============================================================================
 * 
 * Purpose: Manage authentication tokens in browser storage
 * 
 * What are tokens?
 * - A token is like a "key" that proves you're logged in
 * - The backend gives you a token after successful login
 * - You send this token with every API request to prove your identity
 * 
 * Single Responsibility: Handle storing, retrieving, and removing auth tokens
 */

/**
 * Storage key - where we save the token in localStorage
 * Using a constant prevents typos and makes it easy to change later
 */
const TOKEN_KEY = "auth_token";

/**
 * Save authentication token to browser's localStorage
 * 
 * @param token - The JWT token string from your backend
 * 
 * Example usage:
 * saveAuthToken("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...")
 */
export const saveAuthToken = (token: string): void => {
  try {
    localStorage.setItem(TOKEN_KEY, token);
  } catch (error) {
    console.error("Failed to save auth token:", error);
  }
};

/**
 * Get authentication token from localStorage
 * 
 * @returns The token string or null if not found
 * 
 * Example usage:
 * const token = getAuthToken();
 * if (token) {
 *   // User is logged in
 * }
 */
export const getAuthToken = (): string | null => {
  try {
    return localStorage.getItem(TOKEN_KEY);
  } catch (error) {
    console.error("Failed to get auth token:", error);
    return null;
  }
};

/**
 * Remove authentication token from localStorage
 * Call this when user logs out
 * 
 * Example usage:
 * removeAuthToken();
 * // User is now logged out
 */
export const removeAuthToken = (): void => {
  try {
    localStorage.removeItem(TOKEN_KEY);
  } catch (error) {
    console.error("Failed to remove auth token:", error);
  }
};

/**
 * Check if user is currently authenticated
 * 
 * @returns true if token exists, false otherwise
 * 
 * Example usage:
 * if (isAuthenticated()) {
 *   // Show dashboard
 * } else {
 *   // Redirect to login
 * }
 */
export const isAuthenticated = (): boolean => {
  return getAuthToken() !== null;
};
