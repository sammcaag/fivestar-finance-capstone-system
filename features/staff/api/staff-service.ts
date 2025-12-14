// src/features/clients/api/getClients.ts
import axiosInstance from "@/lib/axios-instance";
import axios from "axios";
import { StaffPayload, StaffTableProps } from "../types/staff-types";

export const getStaffs = async (): Promise<StaffTableProps[]> => {
  try {
    const { data } = await axiosInstance.get<{
      success: boolean;
      data: StaffTableProps[];
    }>("/api/users/staffs");
    return data.data; // <-- return the inner array
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // throw the actual axios error back to the UI
      throw error;
    }
    throw new Error(`Failed to fetch staff`);
  }
};

export const getStaffByStaffId = async (staffId: string): Promise<StaffPayload> => {
  try {
    const { data } = await axiosInstance.get<{
      success: boolean;
      data: StaffPayload;
    }>(`/api/users/staff/${staffId}`);
    console.log("THIS IS THE RETURN STAFF DATA", data.data);
    return data.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // throw the actual axios error back to the UI
      throw error;
    }
    throw new Error(`Failed to fetch staff ${staffId}`);
  }
};

export const getStaffByBranchId = async () => {
  try {
    const { data } = await axiosInstance.get(`/api/users/staffs-branch`);
    return data.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // throw the actual axios error back to the UI
      throw error;
    }
    throw new Error(`Failed to fetch staff within the same branch`);
  }
};

export const createStaffApi = async (payload: StaffPayload) => {
  try {
    const { data } = await axiosInstance.post("/api/users/staff", payload);

    return data.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // throw the actual axios error back to the UI
      throw error;
    }
    throw new Error("Failed to create a client");
  }
};

export const updateStaffApi = async (staffId: string, updatePayload: StaffPayload) => {
  try {
    const { data } = await axiosInstance.put(`/api/users/staff/${staffId}`, updatePayload);
    return data.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // throw the actual axios error back to the UI
      throw error;
    }
    throw new Error("Failed to update a staff");
  }
};
