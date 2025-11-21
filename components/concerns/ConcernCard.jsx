export function ConcernCard({ concern }) {
  return (
    <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-all">
      <div className="flex items-start gap-4">
        <div className="w-10 h-10 rounded-lg bg-linear-to-br from-blue-500 to-blue-600 flex items-center justify-center shrink-0">
          <span className="text-white font-bold text-sm">
            {concern.name?.charAt(0) || "?"}
          </span>
        </div>

        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-gray-900 mb-1">{concern.name}</h4>
          {concern.description && (
            <p className="text-gray-500 text-sm">{concern.description}</p>
          )}
        </div>

        {concern.isActive !== undefined && (
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${
              concern.isActive
                ? "bg-green-100 text-green-700"
                : "bg-gray-100 text-gray-600"
            }`}
          >
            {concern.isActive ? "Active" : "Inactive"}
          </span>
        )}
      </div>
    </div>
  );
}
