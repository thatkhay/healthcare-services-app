"use client";
import { useQuery } from "@tanstack/react-query";
import { fetchPrimaryConcerns } from "@/services/api";
import { useStore } from "@/store/useStore";
import { ConcernCard } from "./ConcernCard";
import { LoadingSpinner } from "../common/LoadingSpinner";
import { ErrorMessage } from "../common/ErrorMessage";
import { Pagination } from "../common/Pagination";
import { useEffect } from "react";

export function PrimaryConcernsDetail({ serviceId }) {
  const { concernsPage, perPage, setConcernsPage, selectedService } =
    useStore();

  console.log("PrimaryConcernsDetail - serviceId:", serviceId);
  console.log("Current concernsPage:", concernsPage);

  // Reset to page 1 when serviceId changes
  useEffect(() => {
    setConcernsPage(1);
  }, [serviceId, setConcernsPage]);

  const { data, isLoading, isError, error, refetch, isFetching } = useQuery({
    queryKey: ["concerns", serviceId, concernsPage, perPage],
    queryFn: () =>
      fetchPrimaryConcerns({ serviceId, page: concernsPage, perPage }),
    enabled: !!serviceId,
    keepPreviousData: true, // This prevents flickering when changing pages
  });

  console.log("Query data:", data);
  console.log("Is fetching:", isFetching);

  if (isLoading) return <LoadingSpinner size="lg" />;
  if (isError)
    return <ErrorMessage message={error.message} onRetry={refetch} />;

  const concerns = data?.data || data?.concerns || data || [];
  const pagination = data?.pagination || data?.meta || {};
  const totalPages =
    pagination.totalPages ||
    Math.ceil((pagination.total || concerns.length) / perPage);

  const handlePageChange = (newPage) => {
    console.log("Changing to page:", newPage);
    setConcernsPage(newPage);
  };

  return (
    <div>
      {selectedService && (
        <div
          className="mb-8 p-6 rounded-2xl"
          style={{
            backgroundColor: selectedService.backgroundColor || "#0292B7",
          }}
        >
          <h2 className="text-2xl font-bold text-white mb-2">
            {selectedService.name}
          </h2>
          <p className="text-white/80">{selectedService.description}</p>
        </div>
      )}

      <h3 className="text-xl font-semibold text-gray-900 mb-6">
        Primary Concerns ({pagination.total || concerns.length})
      </h3>

      {isFetching && (
        <div className="mb-4 text-center text-sm text-gray-500">Loading...</div>
      )}

      <div className="space-y-4">
        {concerns.map((concern) => (
          <ConcernCard key={concern.id} concern={concern} />
        ))}
      </div>

      {concerns.length === 0 && !isFetching && (
        <div className="text-center py-12 text-gray-500 bg-gray-50 rounded-xl">
          No primary concerns found for this service
        </div>
      )}

      {totalPages > 1 && (
        <Pagination
          currentPage={concernsPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
}
