
'use client'
import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-sm border-b border-gray-100">
      <div className="flex items-center justify-between p-4 md:p-6">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-linear-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">W</span>
          </div>
          <span className="font-bold text-xl text-gray-900">WellChild</span>
        </Link>

        <div className="hidden md:flex  items-center gap-6 lg:gap-12">
          <Link
            href="/dashboard"
            className="text-gray-900 hover:text-blue-600 transition"
          >
            Dashboard
          </Link>
          <Link
            href="/services"
            className="text-gray-900 hover:text-blue-600 transition"
          >
            Services
          </Link>

          <Link
            href="/login"
            className="text-gray-700 hover:text-gray-900 px-4 py-2 border border-transparent hover:border-gray-900 hover:shadow-md rounded-md transition"
          >
            Login
          </Link>
        </div>

        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden p-2 text-gray-700 hover:text-gray-900 transition"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {isMenuOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white">
          <div className="flex flex-col p-4 space-y-3">
            <Link
              href="/services"
              className="text-gray-900 hover:text-blue-600 py-2 px-3 rounded-md hover:bg-gray-50 transition"
              onClick={() => setIsMenuOpen(false)}
            >
              Services
            </Link>
            <Link
              href="/dashboard"
              className="text-gray-900 hover:text-blue-600 py-2 px-3 rounded-md hover:bg-gray-50 transition"
              onClick={() => setIsMenuOpen(false)}
            >
              Dashboard
            </Link>
            <Link
              href="/login"
              className="text-gray-700 hover:text-gray-900 py-2 px-3 border border-gray-300 hover:border-gray-900 hover:shadow-md rounded-md transition text-center"
              onClick={() => setIsMenuOpen(false)}
            >
              Login
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
