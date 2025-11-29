import axios from "axios";
import { IRequestUser } from "../types/auth.types";

// ----------------------------
// Fetch current logged-in user
// ----------------------------
export const getCurrentUser = async (): Promise<IRequestUser> => {
  try {
    const { data } = await axios.get<{
      success: boolean;
      user: IRequestUser;
    }>("/api/auth/me", { withCredentials: true });

    return data.user;
  } catch (error) {
    if (axios.isAxiosError(error)) throw error;
    throw new Error("Failed to fetch current user");
  }
};

// ----------------------------
// Login API
// ----------------------------
export const loginApi = async (payload: {
  email: string;
  password: string;
}) => {
  try {
    const { data } = await axios.post<{ success: boolean }>(
      "/api/auth/sign-in",
      payload,
      { withCredentials: true }
    );
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) throw error;
    throw new Error("Failed to sign in");
  }
};

// ----------------------------
// Logout API
// ----------------------------
export const logoutApi = async () => {
  try {
    await axios.post("/api/auth/sign-out", {}, { withCredentials: true });
  } catch (error) {
    if (axios.isAxiosError(error)) throw error;
    throw new Error("Failed to sign out");
  }
};

// ----------------------------
// Refresh Token API
// ----------------------------
export const refreshTokenApi = async () => {
  try {
    await axios.post("/api/auth/refresh", {}, { withCredentials: true });
  } catch (error) {
    if (axios.isAxiosError(error)) throw error;
    throw new Error("Failed to refresh token");
  }
};
