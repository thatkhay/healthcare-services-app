"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { verifyToken } from "../services/api";
import { useStore } from "../hooks/store/useStore";

export function useAuth() {
  const router = useRouter();
  const { token, user, isAuthenticated, setAuth, logout } = useStore();

  useEffect(() => {
    const validateToken = async () => {
      if (token) {
        try {
          await verifyToken(token);
        } catch (error) {
          console.error("Token validation failed:", error);
          logout();
          router.push("/login");
        }
      }
    };

    validateToken();
  }, [token, logout, router]);

  return {
    token,
    user,
    isAuthenticated,
    setAuth,
    logout,
  };
}
