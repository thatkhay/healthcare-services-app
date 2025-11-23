'use client';
import { useMutation } from "@tanstack/react-query";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useState } from "react";
import { createUser } from "../../services/api";

interface SignupFormProps {
  onBack?: () => void;
  token?: string;
}

interface UserFormData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  roleIds: string[];
}

export function SignupForm({ onBack, token }: SignupFormProps) {
  const [formData, setFormData] = useState<UserFormData>({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    roleIds: [""],
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const signupMutation = useMutation({
    mutationFn: (userData: UserFormData) => createUser({ userData, token }),
    onSuccess: () => {
      setSuccess(true);
      setError("");
      setFormData({
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        roleIds: [""],
      });
    },
    onError: (error: Error) => {
      setError(error.message);
      setSuccess(false);
    },
  });

  const handleSubmit = () => {
    setError("");
    setSuccess(false);

    if (
      !formData.email ||
      !formData.password ||
      !formData.firstName ||
      !formData.lastName ||
      !formData.roleIds[0]
    ) {
      setError("All fields are required");
      return;
    }

    signupMutation.mutate(formData);
  };

  return (
    <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Create New User</h2>

      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              First Name
            </label>
            <input
              type="text"
              value={formData.firstName}
              onChange={(e) =>
                setFormData({ ...formData, firstName: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="John"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Last Name
            </label>
            <input
              type="text"
              value={formData.lastName}
              onChange={(e) =>
                setFormData({ ...formData, lastName: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Doe"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="user@wellchild.com"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter password"
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

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Role ID
          </label>
          <input
            type="text"
            value={formData.roleIds[0]}
            onChange={(e) =>
              setFormData({ ...formData, roleIds: [e.target.value] })
            }
            placeholder="Enter role ID"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded">
            User created successfully!
          </div>
        )}

        <button
          type="button"
          onClick={handleSubmit}
          disabled={signupMutation.isPending}
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 disabled:bg-blue-400 flex items-center justify-center transition"
        >
          {signupMutation.isPending ? (
            <>
              <Loader2 className="animate-spin mr-2" size={20} />
              Creating User...
            </>
          ) : (
            "Create User"
          )}
        </button>
      </div>

      {onBack && (
        <button
          type="button"
          onClick={onBack}
          className="mt-4 w-full text-gray-600 hover:text-gray-700 text-sm"
        >
          Back to Login
        </button>
      )}
    </div>
  );
}
