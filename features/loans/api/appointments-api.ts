import axiosInstance from "@/lib/axios-instance";
import axios from "axios";

export const getAllAppointments = async () => {
  try {
    const { data } = await axiosInstance.get("/api/loan-appointments");

    return data.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // throw the actual axios error back to the UI
      throw error;
    }
    throw new Error("Failed to create a client");
  }
};

export const getAppointmentById = async ({ id }: { id: string }) => {
  try {
    const { data } = await axiosInstance.get(`/api/loan-appointments/${id}`);

    return data.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // throw the actual axios error back to the UI
      throw error;
    }
    throw new Error("Failed to create a client");
  }
};

export const createAppointment = async ({ payload }: { payload: any }) => {
  try {
    const { data } = await axiosInstance.post("/api/loan-appointments", payload);

    return data.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // throw the actual axios error back to the UI
      throw error;
    }
    throw new Error("Failed to create a client");
  }
};

export const updateAppointment = async ({ id, payload }: { id: string; payload: any }) => {
  try {
    const { data } = await axiosInstance.put(`/api/loan-appointments/${id}`, payload);

    return data.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // throw the actual axios error back to the UI
      throw error;
    }
    throw new Error("Failed to create a client");
  }
};

export const deleteAppointment = async ({ id }: { id: string }) => {
  try {
    const { data } = await axiosInstance.delete(`/api/loan-appointments/${id}`);

    return data.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // throw the actual axios error back to the UI
      throw error;
    }
    throw new Error("Failed to create a client");
  }
};

// approve appointment
export const approveAppointment = async ({ id }: { id: string }) => {
  try {
    const { data } = await axiosInstance.put(`/api/loan-appointments/${id}/approve`);

    return data.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // throw the actual axios error back to the UI
      throw error;
    }
    throw new Error("Failed to create a client");
  }
};
// reject appointment
export const rejectAppointment = async ({ id }: { id: string }) => {
  try {
    const { data } = await axiosInstance.put(`/api/loan-appointments/${id}/reject`);

    return data.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // throw the actual axios error back to the UI
      throw error;
    }
    throw new Error("Failed to create a client");
  }
};
