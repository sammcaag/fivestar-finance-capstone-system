// src/features/clients/api/getClients.ts
import axios from "axios";
import { ClientPayload, ClientTableProps } from "../types/client-types";
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

export const getClientBySerialNumber = async (
  serialNumber: string
): Promise<ClientPayload> => {
  try {
    const { data } = await axiosInstance.get<{
      success: boolean;
      data: ClientPayload;
    }>(`/api/users/client/${serialNumber}`);
    return data.data;
  } catch (error) {
    throw new Error(
      axios.isAxiosError(error)
        ? error.response?.data?.message || error.message
        : `Failed to fetch client with serial number ${serialNumber}`
    );
  }
};

export const createClientApi = async (payload: ClientPayload) => {
  try {
    const { data } = await axiosInstance.post("/api/users/client", payload);

    return data.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // throw the actual axios error back to the UI
      throw error;
    }
    throw new Error("Failed to create a client");
  }
};

export const updateClientApi = async (
  serialNumber: string,
  updatePayload: ClientPayload
) => {
  try {
    const { data } = await axiosInstance.put(
      `/api/users/client/${serialNumber}`,
      updatePayload
    );
    return data.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // throw the actual axios error back to the UI
      throw error;
    }
    throw new Error("Failed to create a client");
  }
};
