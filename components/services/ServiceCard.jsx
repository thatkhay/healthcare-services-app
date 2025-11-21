/* eslint-disable react-hooks/static-components */
import Link from "next/link";
import { getIcon } from "@/constants/icons";
import { useStore } from "@/store/useStore";

export function ServiceCard({ service }) {
  const setSelectedService = useStore((s) => s.setSelectedService);

  const IconComponent = getIcon(service.iconName);

  return (
    <Link
      href={`/services/${service.id}`}
      onClick={() => setSelectedService(service)}
      className="group block h-full"
    >
      <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-primary/30 h-full flex flex-col">
        <div
          className="h-32 flex items-center justify-center flex-shrink-0"
          style={{ backgroundColor: service.backgroundColor || "#0292B7" }}
        >
          {IconComponent && <IconComponent className="w-16 h-16 text-white" />}
        </div>

        <div className="p-6 flex flex-col flex-grow">
          <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-primary transition-colors">
            {service.name}
          </h3>
          <p className="text-gray-600 text-sm mb-4 flex-grow">
            {service.description || "Healthcare service"}
          </p>
          <span className="text-primary font-medium text-sm inline-flex items-center mt-auto text-gray-600">
            View Details
            <svg
              className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  );
}
