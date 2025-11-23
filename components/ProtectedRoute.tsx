"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useStore } from "../hooks/store/useStore";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
}

export function ProtectedRoute({
  children,
  requireAdmin = false,
}: ProtectedRouteProps) {
  const router = useRouter();
  const isAuthenticated = useStore((s) => s.isAuthenticated);
  const token = useStore((s) => s.token);
  const isAdmin = useStore((s) => s.isAdmin);

  useEffect(() => {
    if (token && typeof document !== "undefined") {
      document.cookie = `auth_token=${token}; path=/; max-age=${
        7 * 24 * 60 * 60
      }`;
    }

    if (!isAuthenticated || !token) {
      router.push("/login");
      return;
    }

    if (requireAdmin && !isAdmin()) {
      router.push("/unauthorized");
    }
  }, [isAuthenticated, token, requireAdmin, router, isAdmin]);

  if (!isAuthenticated || !token) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-600">Loading...</div>
      </div>
    );
  }

  if (requireAdmin && !isAdmin()) {
    return null;
  }

  return <>{children}</>;
}
