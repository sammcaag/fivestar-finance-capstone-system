// src/features/clients/api/getClients.ts
import axios from "axios";
import axiosInstance from "@/lib/axios-instance";
import { StaffTableProps } from "../types/staff-types";

export const getStaffs = async (): Promise<StaffTableProps[]> => {
  try {
    const { data } = await axiosInstance.get<{
      success: boolean;
      data: StaffTableProps[];
    }>("/api/users/staffs");
    return data.data; // <-- return the inner array
  } catch (error) {
    throw new Error(
      axios.isAxiosError(error)
        ? error.response?.data?.message || error.message
        : "Failed to fetch staffs"
    );
  }
};
