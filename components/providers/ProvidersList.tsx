/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Loader2 } from "lucide-react";
import { useProviders } from "../../hooks/useProviders";

export function ProvidersList() {
  const { data, isLoading, error } = useProviders();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="animate-spin mr-2" size={24} />
        <span>Loading providers...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
        Error loading providers: {error.message}
      </div>
    );
  }

  const providers = data?.data || data?.providers || [];

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <h2 className="text-xl md:text-2xl font-bold text-gray-900">
          Providers
        </h2>
        <p className="text-sm text-gray-600">Total: {providers.length}</p>
      </div>

      {providers.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">No providers found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
          {providers.map((provider: any) => (
            <div
              key={provider.id}
              className="bg-white p-4 md:p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-200"
            >
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 mb-4">
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-base md:text-lg text-gray-900 truncate">
                    {provider.user?.firstName} {provider.user?.lastName}
                  </h3>
                  <p className="text-xs md:text-sm text-gray-600 truncate">
                    {provider.user?.email}
                  </p>
                </div>
                <span
                  className={`inline-block px-3 py-1 text-xs font-medium rounded-full whitespace-nowrap ${
                    provider.applicationStatus === "APPROVED"
                      ? "bg-green-100 text-green-800"
                      : provider.applicationStatus === "PENDING"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {provider.applicationStatus}
                </span>
              </div>

              <div className="space-y-2 text-xs md:text-sm">
                <div className="flex flex-col sm:flex-row sm:gap-2">
                  <span className="font-medium text-gray-700">Practice:</span>
                  <span className="text-gray-600">{provider.practiceName}</span>
                </div>

                <div className="flex flex-col sm:flex-row sm:gap-2">
                  <span className="font-medium text-gray-700">License:</span>
                  <span className="text-gray-600">
                    {provider.licenseNumber} ({provider.licenseState})
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row sm:gap-2">
                  <span className="font-medium text-gray-700">
                    Consultation Fee:
                  </span>
                  <span className="text-gray-600 font-semibold">
                    ${provider.consultationFee}
                  </span>
                </div>

                {provider.bio && (
                  <p className="text-gray-600 text-xs md:text-sm line-clamp-3 mt-3 pt-3 border-t border-gray-100">
                    {provider.bio}
                  </p>
                )}

                {provider.serviceTypes?.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-3 pt-3 border-t border-gray-100">
                    {provider.serviceTypes.map((type: string) => (
                      <span
                        key={type}
                        className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded"
                      >
                        {type.replace("_", " ")}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
