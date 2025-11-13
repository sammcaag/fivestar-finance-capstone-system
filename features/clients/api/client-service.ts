// src/features/clients/api/getClients.ts
import axios from "axios";
import { ClientTableProps } from "../types/client-types";
import axiosInstance from "@/lib/axios-instance";

export const getClients = async (): Promise<ClientTableProps[]> => {
  try {
    const { data } = await axiosInstance.get<ClientTableProps[]>(
      "/api/users/clients"
    );
    return data;
  } catch (error) {
    throw new Error(
      axios.isAxiosError(error)
        ? error.response?.data?.message || error.message
        : "Failed to fetch clients"
    );
  }
};
