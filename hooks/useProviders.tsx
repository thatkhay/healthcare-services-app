"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchProviders } from "../services/api";
import { useStore } from "../hooks/store/useStore";

interface UseProvidersOptions {
  page?: number;
  perPage?: number;
  status?: "PENDING" | "APPROVED" | "REJECTED";
  serviceId?: string;
  enabled?: boolean;
}

export function useProviders(options: UseProvidersOptions = {}) {
  const token = useStore((s) => s.token);
  const setProviders = useStore((s) => s.setProviders);
  const setProvidersLoading = useStore((s) => s.setProvidersLoading);

  const { page = 1, perPage = 20, status, serviceId, enabled = true } = options;

  return useQuery({
    queryKey: ["providers", page, perPage, status, serviceId],
    queryFn: async () => {
      setProvidersLoading(true);
      try {
        const data = await fetchProviders({
          token: token!,
          page,
          perPage,
          status,
          serviceId,
        });
        console.log("Providers API response:", data);
        setProviders(data.providers || data.data || []);
        return data;
      } catch (error) {
        console.error("Error fetching providers:", error);
        throw error;
      } finally {
        setProvidersLoading(false);
      }
    },
    enabled: enabled && !!token,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}
