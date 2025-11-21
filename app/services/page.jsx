import { ServicesList } from "@/components/services/ServicesList";

export default function ServicesPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Healthcare Services
        </h1>
        <p className="text-gray-500">
          Select a service to view primary concerns
        </p>
      </div>
      <ServicesList />
    </div>
  );
}
