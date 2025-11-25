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

export const createClient = async (payload: ClientPayload) => {
  try {
    const { data } = await axiosInstance.post("/api/users/client", payload);
    return data.data;
  } catch (error) {
    throw new Error(
      axios.isAxiosError(error)
        ? error.response?.data?.message || error.message
        : "Failed to create a client"
    );
  }
};

// export async function getClientBySerialNumber(serialNumber: string) {
//   return prisma.user.findFirst({
//     where: {
//       clientPension: {
//         serialNumber: serialNumber,
//       },
//     },
//     include: {
//       userAuth: true,
//       address: true,
//       contactInfo: true,
//       clientAccount: true,
//       clientPension: true,
//       clientFamilyInfos: true,
//     },
//   });
// }
