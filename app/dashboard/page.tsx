"use client";

import { ProtectedRoute } from "../../components/ProtectedRoute";
import { useRouter } from "next/navigation";
import { ProvidersList } from "../../components/providers/ProvidersList";
import { useStore } from "../../hooks/store/useStore";
import { LogOut, Menu } from "lucide-react";
import { useState } from "react";

export default function DashboardPage() {
  const router = useRouter();
  const user = useStore((s) => s.user);
  const logout = useStore((s) => s.logout);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    if (typeof document !== "undefined") {
      document.cookie = "auth_token=; path=/; max-age=0";
    }
    logout();
    router.push("/login");
  };

  const userName =
    user?.firstName && user?.lastName
      ? `${user.firstName} ${user.lastName}`
      : user?.email || "User";

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow-sm sticky top-0 z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center">
                <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">
                  Dashboard
                </h1>
              </div>

              <div className="hidden md:flex items-center gap-4">
                <div className="text-right">
                  <p className="text-xs text-gray-500">Welcome back</p>
                  <p className="text-sm font-medium text-gray-900 truncate max-w-[200px]">
                    {userName}
                  </p>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
                >
                  <LogOut size={16} />
                  <span>Logout</span>
                </button>
              </div>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <Menu size={24} className="text-gray-700" />
              </button>
            </div>

            {mobileMenuOpen && (
              <div className="md:hidden border-t border-gray-200 py-4 space-y-3">
                <div className="px-2">
                  <p className="text-xs text-gray-500">Logged in as</p>
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {userName}
                  </p>
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
                >
                  <LogOut size={16} />
                  <span>Logout</span>
                </button>
              </div>
            )}
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
          <ProvidersList />
        </main>
      </div>
    </ProtectedRoute>
  );
}
