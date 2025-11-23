"use client";
import { useQuery } from "@tanstack/react-query";
import { fetchServices } from "@/services/api";
import { useStore } from "../../hooks/store/useStore"
import { ServiceCard } from "./ServiceCard";
import { LoadingSpinner } from "../common/LoadingSpinner";
import { ErrorMessage } from "../common/ErrorMessage";
import { Pagination } from "../common/Pagination";

export function ServicesList() {
  const servicesPage = useStore((s) => s.servicesPage);
  const perPage = useStore((s) => s.perPage);
  const setServicesPage = useStore((s) => s.setServicesPage);

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["services", servicesPage, perPage],
    queryFn: () => fetchServices({ page: servicesPage, perPage }),
  });

  if (isLoading) return <LoadingSpinner size="lg" />;
  if (isError)
    return <ErrorMessage message={error.message} onRetry={refetch} />;

  const services = data?.data || data?.services || data || [];
  const pagination = data?.pagination || data?.meta || {};
  const totalPages =
    pagination.totalPages ||
    Math.ceil((pagination.total || services.length) / perPage);

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {services.map((service) => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </div>

      {services.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          No services available
        </div>
      )}

      <Pagination
        currentPage={servicesPage}
        totalPages={totalPages}
        onPageChange={setServicesPage}
      />
    </div>
  );
}
