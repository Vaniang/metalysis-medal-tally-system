"use client";

import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { useRouter } from "next/navigation";
import AthletesListWithModal from "../../../patches/AthletesList_with_modal";
import AthletesAward from "../../../patches/AthletesAward_fixed";
import Protest from "../../components/Protest";
import RSACDashboardMain from "../../components/RSACDashboardMain";

export default function RSACDashboard() {
  const { user, userRole, loading, logout } = useAuth();
  const router = useRouter();

  const [activeTab, setActiveTab] = useState("dashboard");

  useEffect(() => {
    if (!loading) {
      if (!user || userRole !== "RSAC") {
        router.push("/login");
      }
    }
  }, [user, userRole, loading, router]);

  if (loading || !user || userRole !== "RSAC") {
    return null;
  }

  const handleLogout = async () => {
    await logout();
    router.push("/login");
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-100 p-6 flex flex-col relative">
        <h2 className="text-2xl font-bold mb-6 text-black">RSAC Dashboard</h2>
        <nav className="flex flex-col space-y-4 flex-grow">
          <button
            onClick={() => setActiveTab("dashboard")}
            className={`text-left px-4 py-2 rounded ${
              activeTab === "dashboard" ? "bg-black text-white" : "text-gray-700"
            }`}
          >
            Dashboard
          </button>
          <button
            onClick={() => setActiveTab("athletes-list")}
            className={`text-left px-4 py-2 rounded ${
              activeTab === "athletes-list" ? "bg-black text-white" : "text-gray-700"
            }`}
          >
            List of Athletes
          </button>
          <button
            onClick={() => setActiveTab("athletes-award")}
            className={`text-left px-4 py-2 rounded ${
              activeTab === "athletes-award" ? "bg-black text-white" : "text-gray-700"
            }`}
          >
            Athletes Award
          </button>
          <button
            onClick={() => setActiveTab("protest")}
            className={`text-left px-4 py-2 rounded ${
              activeTab === "protest" ? "bg-black text-white" : "text-gray-700"
            }`}
          >
            Protest
          </button>
        </nav>
        <button
          onClick={handleLogout}
          className="absolute bottom-6 left-6 right-6 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
        >
          Logout
        </button>
      </aside>

      {/* Main content */}
      <main className="flex-grow p-6 bg-white">
        {activeTab === "dashboard" && <RSACDashboardMain />}
        {activeTab === "athletes-list" && <AthletesListWithModal isReadOnly={false} />}
        {activeTab === "athletes-award" && <AthletesAward isReadOnly={true} />}
        {activeTab === "protest" && <Protest protestId="rsac-protest" />}
      </main>
    </div>
  );
}
