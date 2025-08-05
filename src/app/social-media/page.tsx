"use client";

import React from "react";

export default function SocialMediaPage() {
  const handleLogout = () => {
    window.localStorage.removeItem("user");
    window.localStorage.removeItem("userRole");
    window.location.href = "/login";
  };

  return (
    <div className="p-6 flex flex-col min-h-screen">
      <h1 className="text-3xl font-bold mb-4">Social Media</h1>
      <p className="mb-6">This is the Social Media page. Content coming soon.</p>
      <button
        onClick={handleLogout}
        className="mt-auto px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition w-32"
      >
        Logout
      </button>
    </div>
  );
}
