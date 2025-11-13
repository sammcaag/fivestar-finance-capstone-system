// src/features/clients/api/getClients.ts
import axios from "axios";
import { ClientTableProps } from "../types/client-types";
import axiosInstance from "@/lib/axios-instance";

export const getClients = async (): Promise<ClientTableProps[]> => {
  try {
    const { data } = await axiosInstance.get<{
      success: boolean;
      data: ClientTableProps[];
    }>("/api/users/clients");
    return data.data; // <-- return the inner array
  } catch (error) {
    throw new Error(
      axios.isAxiosError(error)
        ? error.response?.data?.message || error.message
        : "Failed to fetch clients"
    );
  }
};
