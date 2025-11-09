/**
 * =============================================================================
 * CLIENT SERVICE LAYER
 * =============================================================================
 * 
 * Purpose: Handle all API calls related to clients
 * 
 * What is a Service Layer?
 * - A layer that talks directly to the backend API
 * - Keeps API logic separate from UI components
 * - Makes it easy to switch between mock data and real API
 * 
 * Single Responsibility: Make HTTP requests for client operations (CRUD)
 * - Create: Add new clients
 * - Read: Get client data
 * - Update: Modify existing clients
 * - Delete: Remove clients
 */

import { apiClient } from "@/lib/api-client";
import type { ClientTableProps, ClientFormValues } from "../types/client-types";

// TO DELETE: Import mock data (remove when backend is ready)
import { clientTableData } from "../data/client-mock";

/**
 * =============================================================================
 * CONFIGURATION
 * =============================================================================
 */

/**
 * Toggle between mock data and real API
 * 
 * How to use:
 * - Set to true: Use mock data (for development without backend)
 * - Set to false: Use real API (when backend is ready)
 * 
 * TO DELETE: Remove this flag when backend is fully integrated
 */
const USE_MOCK_DATA = true;

/**
 * API endpoint paths
 * These should match your Express.js backend routes
 */
const ENDPOINTS = {
  CLIENTS: "/clients",
  CLIENT_BY_ID: (id: string) => `/clients/${id}`,
};

/**
 * =============================================================================
 * API RESPONSE TYPES
 * =============================================================================
 * 
 * Define what the backend sends back
 * Adjust these based on your actual backend response structure
 */

/**
 * Standard API response wrapper
 * Most APIs wrap data in an object with success/error info
 */
interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

/**
 * Paginated response for list endpoints
 * Used when fetching multiple clients with pagination
 */
interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

/**
 * =============================================================================
 * SERVICE FUNCTIONS
 * =============================================================================
 */

/**
 * Get all clients (with optional pagination)
 * 
 * @param page - Page number (default: 1)
 * @param limit - Items per page (default: 10)
 * @returns Promise with array of clients
 * 
 * Example usage:
 * const clients = await getAllClients(1, 20);
 */
export const getAllClients = async (
  page: number = 1,
  limit: number = 10
): Promise<ClientTableProps[]> => {
  // TO DELETE: Mock data fallback (remove when backend is ready)
  if (USE_MOCK_DATA) {
    console.log("📦 Using mock data for getAllClients");
    // Simulate API delay for realistic testing
    await new Promise((resolve) => setTimeout(resolve, 500));
    return clientTableData;
  }

  // Real API call
  const response = await apiClient.get<PaginatedResponse<ClientTableProps>>(
    ENDPOINTS.CLIENTS,
    {
      params: { page, limit },
    }
  );

  return response.data.data;
};

/**
 * Get a single client by ID
 * 
 * @param id - The client's unique identifier
 * @returns Promise with client details
 * 
 * Example usage:
 * const client = await getClientById("728ed52f");
 */
export const getClientById = async (id: string): Promise<ClientTableProps> => {
  // TO DELETE: Mock data fallback (remove when backend is ready)
  if (USE_MOCK_DATA) {
    console.log(`📦 Using mock data for getClientById: ${id}`);
    await new Promise((resolve) => setTimeout(resolve, 300));
    
    const client = clientTableData.find((c) => c.id === id);
    if (!client) {
      throw new Error(`Client with ID ${id} not found`);
    }
    return client;
  }

  // Real API call
  const response = await apiClient.get<ApiResponse<ClientTableProps>>(
    ENDPOINTS.CLIENT_BY_ID(id)
  );

  return response.data.data;
};

/**
 * Create a new client
 * 
 * @param clientData - The client information from the registration form
 * @returns Promise with the created client
 * 
 * Example usage:
 * const newClient = await createClient(formData);
 */
export const createClient = async (
  clientData: ClientFormValues
): Promise<ClientTableProps> => {
  // TO DELETE: Mock data fallback (remove when backend is ready)
  if (USE_MOCK_DATA) {
    console.log("📦 Using mock data for createClient");
    await new Promise((resolve) => setTimeout(resolve, 800));
    
    // Simulate creating a new client
    const mockNewClient: ClientTableProps = {
      id: Math.random().toString(36).substring(7),
      name: `${clientData.firstName} ${clientData.lastName}`,
      email: "mock@example.com", // You might want to add email to ClientFormValues
      branch: "Mock Branch",
      loanAmount: 0,
      productType: "New Client",
      status: "pending",
      created_at: new Date().toISOString().split("T")[0],
    };
    
    return mockNewClient;
  }

  // Real API call
  const response = await apiClient.post<ApiResponse<ClientTableProps>>(
    ENDPOINTS.CLIENTS,
    clientData
  );

  return response.data.data;
};

/**
 * Update an existing client
 * 
 * @param id - The client's unique identifier
 * @param clientData - The updated client information
 * @returns Promise with the updated client
 * 
 * Example usage:
 * const updated = await updateClient("728ed52f", formData);
 */
export const updateClient = async (
  id: string,
  clientData: Partial<ClientFormValues>
): Promise<ClientTableProps> => {
  // TO DELETE: Mock data fallback (remove when backend is ready)
  if (USE_MOCK_DATA) {
    console.log(`📦 Using mock data for updateClient: ${id}`);
    await new Promise((resolve) => setTimeout(resolve, 600));
    
    const client = clientTableData.find((c) => c.id === id);
    if (!client) {
      throw new Error(`Client with ID ${id} not found`);
    }
    
    // Return the client with simulated updates
    return {
      ...client,
      name: clientData.firstName && clientData.lastName 
        ? `${clientData.firstName} ${clientData.lastName}`
        : client.name,
    };
  }

  // Real API call
  const response = await apiClient.put<ApiResponse<ClientTableProps>>(
    ENDPOINTS.CLIENT_BY_ID(id),
    clientData
  );

  return response.data.data;
};

/**
 * Delete a client
 * 
 * @param id - The client's unique identifier
 * @returns Promise that resolves when deletion is complete
 * 
 * Example usage:
 * await deleteClient("728ed52f");
 */
export const deleteClient = async (id: string): Promise<void> => {
  // TO DELETE: Mock data fallback (remove when backend is ready)
  if (USE_MOCK_DATA) {
    console.log(`📦 Using mock data for deleteClient: ${id}`);
    await new Promise((resolve) => setTimeout(resolve, 400));
    return;
  }

  // Real API call
  await apiClient.delete(ENDPOINTS.CLIENT_BY_ID(id));
};

/**
 * =============================================================================
 * SEARCH AND FILTER FUNCTIONS
 * =============================================================================
 */

/**
 * Search clients by name or other criteria
 * 
 * @param searchTerm - The search query
 * @returns Promise with filtered clients
 * 
 * Example usage:
 * const results = await searchClients("John");
 */
export const searchClients = async (
  searchTerm: string
): Promise<ClientTableProps[]> => {
  // TO DELETE: Mock data fallback (remove when backend is ready)
  if (USE_MOCK_DATA) {
    console.log(`📦 Using mock data for searchClients: ${searchTerm}`);
    await new Promise((resolve) => setTimeout(resolve, 300));
    
    return clientTableData.filter((client) =>
      client.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  // Real API call
  const response = await apiClient.get<ApiResponse<ClientTableProps[]>>(
    ENDPOINTS.CLIENTS,
    {
      params: { search: searchTerm },
    }
  );

  return response.data.data;
};
