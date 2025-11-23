"use client";

import { useSearchParams } from "next/navigation";
import { LoginForm } from "../../../components/auth/LoginComponent";

export default function LoginPage() {
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/";

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <LoginForm redirectTo={redirect} />
    </div>
  );
}
