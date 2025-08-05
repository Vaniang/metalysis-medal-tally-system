"use client";

import React, { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { MedalCount } from "@/lib/types";
import MedalUpdateForm from "@/components/MedalUpdateForm";
import { DashboardMenu } from "@/components/DashboardMenu";
import { getMedalCounts, initializeLocalStorage } from "@/lib/localStorageService";

export default function MedalTallyPage() {
  const { user, userRole } = useAuth();
  const router = useRouter();
  const [medalCounts, setMedalCounts] = useState<MedalCount[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState<{
    key: keyof MedalCount;
    direction: 'asc' | 'desc';
  }>({ key: 'total', direction: 'desc' });

  useEffect(() => {
    if (!user) {
      router.push("/login");
      return;
    }
    
    // Initialize local storage with mock data if needed
    initializeLocalStorage();
    fetchMedalCounts();
  }, [user, router]);

  const fetchMedalCounts = () => {
    try {
      const counts = getMedalCounts();
      setMedalCounts(counts);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching medal counts:", error);
      setLoading(false);
    }
  };

  const handleSort = (key: keyof MedalCount) => {
    setSortConfig(current => ({
      key,
      direction: current.key === key && current.direction === 'desc' ? 'asc' : 'desc'
    }));
  };

  const sortedMedals = React.useMemo(() => {
    const sorted = [...medalCounts].sort((a, b) => {
      const aValue = a[sortConfig.key] ?? 0;
      const bValue = b[sortConfig.key] ?? 0;

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortConfig.direction === 'asc' 
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }

      const aNum = Number(aValue);
      const bNum = Number(bValue);

      return sortConfig.direction === 'asc' ? aNum - bNum : bNum - aNum;
    });

    if (searchTerm) {
      return sorted.filter(medal => 
        medal.country.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return sorted;
  }, [medalCounts, sortConfig, searchTerm]);

  const canEditMedals = userRole === "Administrator" || userRole === "Tabulation Team";

  return (
    <div className="min-h-screen bg-gray-100 py-6">
      <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
      <DashboardMenu
        currentPath="/medal-tally"
        onNavigate={(href) => router.push(href)}
        items={[
          { label: "Medal Tally", href: "/medal-tally" },
          { label: "Athletes", href: "/athletes" },
          { label: "RSAC", href: "/rsac" },
          { label: "Social Media", href: "/social-media" },
          { label: "Logout", href: "/login" },
        ]}
      />
        <div className="bg-white shadow-md rounded-md p-6">
          <div className="md:flex md:items-center md:justify-between mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-4 md:mb-0">Medal Tally</h1>
            <div className="w-full md:w-80">
              <input
                type="text"
                placeholder="Search countries..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 rounded-md border border-gray-300 shadow-sm focus:border-black focus:ring-black"
              />
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center items-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-700"></div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      onClick={() => handleSort('country')}
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-200"
                    >
                      Country {sortConfig.key === 'country' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                    </th>
                    <th
                      onClick={() => handleSort('gold')}
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-200"
                    >
                      Gold {sortConfig.key === 'gold' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                    </th>
                    <th
                      onClick={() => handleSort('silver')}
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-200"
                    >
                      Silver {sortConfig.key === 'silver' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                    </th>
                    <th
                      onClick={() => handleSort('bronze')}
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-200"
                    >
                      Bronze {sortConfig.key === 'bronze' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                    </th>
                    <th
                      onClick={() => handleSort('total')}
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-200"
                    >
                      Total {sortConfig.key === 'total' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {sortedMedals.map((count) => (
                    <tr key={count.id} className="hover:bg-gray-100">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{count.country}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                          {count.gold}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                          {count.silver}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                          {count.bronze}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{count.total ?? count.gold + count.silver + count.bronze}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {canEditMedals && (
            <div className="mt-6 p-4 bg-gray-50 rounded-md">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Update Medal Counts</h2>
              <MedalUpdateForm />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
