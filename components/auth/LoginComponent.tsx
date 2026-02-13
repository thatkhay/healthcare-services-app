"use client";

import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { Eye, EyeOff, Loader2 } from "lucide-react";
import { loginUser } from "../../services/api";
import { useStore } from "../../hooks/store/useStore";

interface LoginFormProps {
  onSwitchToSignup?: () => void;
  redirectTo?: string;
}

export function LoginForm({
  onSwitchToSignup,
  redirectTo = "/dashboard", 
}: LoginFormProps) {
  const router = useRouter();
  const setAuth = useStore((s) => s.setAuth);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

 const loginMutation = useMutation({
   mutationFn: loginUser,
   onSuccess: (data) => {
     console.log("Login response:", data);

     const token = data.data.tokens.accessToken;
     const user = data.data.user;

     setAuth(token, user);

     if (typeof document !== "undefined") {
       document.cookie = `auth_token=${token}; path=/; max-age=${
         7 * 24 * 60 * 60
       }; SameSite=Lax`; 
     }

     setError("");

     setTimeout(() => {
       router.replace(redirectTo);
     }, 100);
   },
   onError: (error: Error) => {
     setError(error.message);
   },
 });

  const handleSubmit = () => {
    setError("");
    if (!email || !password) {
      setError("Please enter email and password");
      return;
    }
    loginMutation.mutate({ email, password });
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
      <h2 className="text-2xl font-bold mb-6 text-red-500">Admin sign in</h2>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-green-700 mb-1">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyPress={handleKeyPress}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="admin@wellchild.com"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyPress={handleKeyPress}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-700"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}

        <button
          type="button"
          onClick={handleSubmit}
          disabled={loginMutation.isPending}
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 disabled:bg-blue-400 flex items-center justify-center transition"
        >
          {loginMutation.isPending ? (
            <>
              <Loader2 className="animate-spin mr-2" size={20} />
              Logging in...
            </>
          ) : (
            "Login"
          )}
        </button>
      </div>

      {onSwitchToSignup && (
        <button
          type="button"
          onClick={onSwitchToSignup}
          className="mt-4 w-full text-blue-600 hover:text-blue-700 text-sm"
        >
          Need to create a user account? Sign up here
        </button>
      )}
    </div>
  );
}
