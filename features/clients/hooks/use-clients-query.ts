/**
 * =============================================================================
 * CLIENT REACT QUERY HOOKS
 * =============================================================================
 * 
 * Purpose: Provide React hooks for fetching and mutating client data
 * 
 * What are React Query Hooks?
 * - Custom hooks that use React Query to manage server state
 * - Handle loading, error, and success states automatically
 * - Provide data caching and automatic refetching
 * 
 * Single Responsibility: Expose client data operations as React hooks
 */

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import type { ClientTableProps, ClientFormValues } from "../types/client-types";
import {
  getAllClients,
  getClientById,
  createClient,
  updateClient,
  deleteClient,
  searchClients,
} from "../api/client-service";

/**
 * =============================================================================
 * QUERY KEYS
 * =============================================================================
 * 
 * What are Query Keys?
 * - Unique identifiers for cached data
 * - React Query uses these to know when to refetch or invalidate data
 * - Use arrays for better organization and filtering
 * 
 * Example: ["clients"] = all clients data
 *          ["clients", "123"] = specific client with ID 123
 */
export const clientKeys = {
  all: ["clients"] as const,
  lists: () => [...clientKeys.all, "list"] as const,
  list: (page?: number, limit?: number) =>
    [...clientKeys.lists(), { page, limit }] as const,
  details: () => [...clientKeys.all, "detail"] as const,
  detail: (id: string) => [...clientKeys.details(), id] as const,
  search: (term: string) => [...clientKeys.all, "search", term] as const,
};

/**
 * =============================================================================
 * QUERY HOOKS (for fetching data)
 * =============================================================================
 */

/**
 * Hook to fetch all clients
 * 
 * @param page - Page number for pagination (optional)
 * @param limit - Items per page (optional)
 * @returns Query result with clients data, loading state, and error
 * 
 * Example usage in a component:
 * ```tsx
 * const { data: clients, isLoading, error } = useGetClients();
 * 
 * if (isLoading) return <div>Loading...</div>;
 * if (error) return <div>Error: {error.message}</div>;
 * return <ClientTable data={clients} />;
 * ```
 */
export const useGetClients = (page?: number, limit?: number) => {
  return useQuery({
    // Unique key for this query
    queryKey: clientKeys.list(page, limit),
    
    // Function that fetches the data
    queryFn: () => getAllClients(page, limit),
    
    // Keep data fresh for 5 minutes (inherited from queryClient config)
    // You can override here if needed: staleTime: 10 * 60 * 1000
  });
};

/**
 * Hook to fetch a single client by ID
 * 
 * @param id - The client's unique identifier
 * @param enabled - Whether to run the query (default: true)
 * @returns Query result with client data
 * 
 * Example usage:
 * ```tsx
 * const { data: client, isLoading } = useGetClient("728ed52f");
 * ```
 * 
 * With conditional fetching:
 * ```tsx
 * const { data: client } = useGetClient(clientId, !!clientId);
 * // Only fetches if clientId exists
 * ```
 */
export const useGetClient = (id: string, enabled: boolean = true) => {
  return useQuery({
    queryKey: clientKeys.detail(id),
    queryFn: () => getClientById(id),
    enabled: enabled && !!id, // Only run if enabled and id exists
  });
};

/**
 * Hook to search clients
 * 
 * @param searchTerm - The search query
 * @param enabled - Whether to run the query (default: true)
 * @returns Query result with filtered clients
 * 
 * Example usage:
 * ```tsx
 * const [search, setSearch] = useState("");
 * const { data: results } = useSearchClients(search, search.length > 2);
 * // Only searches if user typed at least 3 characters
 * ```
 */
export const useSearchClients = (searchTerm: string, enabled: boolean = true) => {
  return useQuery({
    queryKey: clientKeys.search(searchTerm),
    queryFn: () => searchClients(searchTerm),
    enabled: enabled && searchTerm.length > 0,
  });
};

/**
 * =============================================================================
 * MUTATION HOOKS (for creating/updating/deleting data)
 * =============================================================================
 */

/**
 * Hook to create a new client
 * 
 * @returns Mutation object with mutate function and states
 * 
 * Example usage:
 * ```tsx
 * const createMutation = useCreateClient();
 * 
 * const handleSubmit = (data: ClientFormValues) => {
 *   createMutation.mutate(data, {
 *     onSuccess: (newClient) => {
 *       toast.success("Client created successfully!");
 *       router.push(`/clients/${newClient.id}`);
 *     },
 *     onError: (error) => {
 *       toast.error("Failed to create client");
 *     }
 *   });
 * };
 * ```
 */
export const useCreateClient = () => {
  const queryClient = useQueryClient();

  return useMutation({
    // The function that performs the mutation
    mutationFn: (clientData: ClientFormValues) => createClient(clientData),

    // Called when mutation succeeds
    onSuccess: (newClient) => {
      // Invalidate and refetch clients list
      // This ensures the list shows the new client
      queryClient.invalidateQueries({ queryKey: clientKeys.lists() });

      // Show success message
      toast.success("Client created successfully!");

      console.log("✅ Client created:", newClient);
    },

    // Called when mutation fails
    onError: (error: Error) => {
      toast.error(`Failed to create client: ${error.message}`);
      console.error("❌ Create client error:", error);
    },
  });
};

/**
 * Hook to update an existing client
 * 
 * @returns Mutation object with mutate function
 * 
 * Example usage:
 * ```tsx
 * const updateMutation = useUpdateClient();
 * 
 * const handleUpdate = () => {
 *   updateMutation.mutate(
 *     { id: "728ed52f", data: updatedData },
 *     {
 *       onSuccess: () => {
 *         toast.success("Client updated!");
 *       }
 *     }
 *   );
 * };
 * ```
 */
export const useUpdateClient = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: Partial<ClientFormValues>;
    }) => updateClient(id, data),

    onSuccess: (updatedClient, variables) => {
      // Invalidate both the list and the specific client detail
      queryClient.invalidateQueries({ queryKey: clientKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: clientKeys.detail(variables.id),
      });

      toast.success("Client updated successfully!");
      console.log("✅ Client updated:", updatedClient);
    },

    onError: (error: Error) => {
      toast.error(`Failed to update client: ${error.message}`);
      console.error("❌ Update client error:", error);
    },
  });
};

/**
 * Hook to delete a client
 * 
 * @returns Mutation object with mutate function
 * 
 * Example usage:
 * ```tsx
 * const deleteMutation = useDeleteClient();
 * 
 * const handleDelete = (id: string) => {
 *   if (confirm("Are you sure?")) {
 *     deleteMutation.mutate(id);
 *   }
 * };
 * ```
 */
export const useDeleteClient = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteClient(id),

    onSuccess: (_, deletedId) => {
      // Invalidate queries to refetch the list
      queryClient.invalidateQueries({ queryKey: clientKeys.lists() });

      // Remove the deleted client from cache
      queryClient.removeQueries({ queryKey: clientKeys.detail(deletedId) });

      toast.success("Client deleted successfully!");
      console.log("✅ Client deleted:", deletedId);
    },

    onError: (error: Error) => {
      toast.error(`Failed to delete client: ${error.message}`);
      console.error("❌ Delete client error:", error);
    },
  });
};

/**
 * =============================================================================
 * HELPER HOOKS
 * =============================================================================
 */

/**
 * Hook to manually refetch all clients
 * Useful for "refresh" buttons
 * 
 * Example usage:
 * ```tsx
 * const refetch = useRefetchClients();
 * 
 * <Button onClick={() => refetch()}>
 *   Refresh
 * </Button>
 * ```
 */
export const useRefetchClients = () => {
  const queryClient = useQueryClient();

  return () => {
    queryClient.invalidateQueries({ queryKey: clientKeys.lists() });
  };
};
