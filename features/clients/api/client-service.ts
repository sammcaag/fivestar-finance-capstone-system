// src/features/clients/api/getClients.ts
import axiosInstance from "@/lib/axios-instance";
import axios from "axios";
import { ApprovalStatus, ClientPayload, ClientTableProps } from "../types/client-types";

export const getClients = async (): Promise<ClientTableProps[]> => {
  try {
    const { data } = await axiosInstance.get<{
      success: boolean;
      data: ClientTableProps[];
    }>("/api/users/clients");
    return data.data; // <-- return the inner array
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // throw the actual axios error back to the UI
      throw error;
    }
    throw new Error(`Failed to fetch clients`);
  }
};

export const getClientBySerialNumber = async (serialNumber: string): Promise<ClientPayload> => {
  try {
    const { data } = await axiosInstance.get<{
      success: boolean;
      data: ClientPayload;
    }>(`/api/users/client/${serialNumber}`);
    return data.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // throw the actual axios error back to the UI
      throw error;
    }
    throw new Error(`Failed to fetch client ${serialNumber}`);
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

export const updateClientApi = async (serialNumber: string, updatePayload: ClientPayload) => {
  try {
    const { data } = await axiosInstance.put(`/api/users/client/${serialNumber}`, updatePayload);
    return data.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // throw the actual axios error back to the UI
      throw error;
    }
    throw new Error("Failed to update a client");
  }
};

export const updateClientApprovalStatusApi = async (
  serialNumber: string,
  patchPayload: {
    approvalStatus: ApprovalStatus;
    remarks: string;
  }
) => {
  try {
    const { data } = await axiosInstance.patch(`/api/users/client/${serialNumber}`, patchPayload);
    return data.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // throw the actual axios error back to the UI
      throw error;
    }
    throw new Error("Failed to update client approval status");
  }
};
