import axios from "axios";
import { IRequestUser } from "../types/auth.types";
import axiosInstance from "@/lib/axios-instance";

// ----------------------------
// Fetch current logged-in user
// ----------------------------
export const getCurrentUser = async (): Promise<IRequestUser> => {
  try {
    const { data } = await axiosInstance.get<{
      success: boolean;
      data: IRequestUser;
    }>("/api/auth/me");

    return data.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error;
    }
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
    const { data } = await axiosInstance.post("/api/auth/sign-in", payload);

    return data;
  } catch (error) {
    // Re-throw the error so it can be caught in AuthContext
    if (axios.isAxiosError(error)) {
      throw error;
    }
    throw new Error("Failed to sign in");
  }
};

// ----------------------------
// Logout API
// ----------------------------
export const logoutApi = async () => {
  try {
    await axiosInstance.post("/api/auth/sign-out");
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error;
    }
    throw new Error("Failed to sign out");
  }
};

// ----------------------------
// Refresh Token API
// ----------------------------
export const refreshTokenApi = async () => {
  try {
    await axiosInstance.post("/api/auth/refresh");
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error;
    }
    throw new Error("Failed to refresh token");
  }
};
