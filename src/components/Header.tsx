"use client";

import React from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Header() {
  const { user, userRole, logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logout();
      router.push("/login");
    } catch (error) {
      console.error("Failed to logout:", error);
    }
  };

  const getNavLinks = () => {
    const links = [
      { href: "/medal-tally", label: "Medal Tally", roles: ["Administrator", "Tabulation Team", "RSAC", "Social Media Team"] },
      { href: "/athletes", label: "Athletes", roles: ["Administrator", "Tabulation Team", "RSAC"] },
      { href: "/rsac", label: "RSAC", roles: ["RSAC"] },
      { href: "/social-media", label: "Social Media", roles: ["Social Media Team"] },
    ];

    return links.filter(link => 
      userRole && link.roles.includes(userRole)
    );
  };

  return (
    <header className="bg-white/80 border-b border-gray-200 fixed w-full top-0 z-50 backdrop-blur-lg shadow-sm supports-[backdrop-filter]:bg-white/60">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Link 
              href="/medal-tally" 
              className="flex-shrink-0 flex items-center"
            >
              <h1 className="text-2xl font-bold text-black hover:scale-105 transition-transform duration-200">Metalysis</h1>
            </Link>

            {user && (
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                {getNavLinks().map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="border-transparent text-gray-500 hover:border-black hover:text-black inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-all duration-200 relative group"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <div className="flex items-center">
          {user && pathname !== "/login" ? (
            <div className="flex items-center space-x-4">
              <div className="hidden sm:flex sm:items-center sm:space-x-2">
                <span className="text-sm text-gray-500 group-hover:text-gray-700 transition-colors duration-200">Logged in as</span>
                <span className="text-sm font-medium text-black">{userRole}</span>
              </div>
              {userRole !== "Tabulation Team" && (
                <button
                  onClick={handleLogout}
                  className="bg-black text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition-all duration-200 hover:scale-105"
                >
                  Logout
                </button>
              )}
            </div>
          ) : (
              <Link
                href="/login"
                className="bg-black text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition-all duration-200 hover:scale-105"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}
