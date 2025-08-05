"use client";

import React, { useState, useEffect } from "react";

export default function AthletesAwardTab() {
  const [athletes, setAthletes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const data = localStorage.getItem("athletes");
    if (data) {
      setAthletes(JSON.parse(data));
    }
  }, []);

  const filteredAthletes = athletes.filter((athlete) =>
    athlete.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddMedal = (athleteId) => {
    alert(`Add Medal clicked for athlete ID: ${athleteId}`);
    // Implement modal or form to add medals here
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 text-black">Athletes Award</h2>
      <input
        type="text"
        placeholder="Search by athlete name"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-4 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent w-full max-w-md"
      />
      <div className="overflow-auto max-h-[600px] border border-gray-300 rounded-md">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50 sticky top-0">
            <tr>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                School Division
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Category
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Event
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredAthletes.length > 0 ? (
              filteredAthletes.map((athlete) => (
                <tr key={athlete.id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                    {athlete.name}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                    {athlete.schoolDivision}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                    {athlete.category}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                    {athlete.sportsEvent}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                    <button
                      onClick={() => handleAddMedal(athlete.id)}
                      className="px-3 py-1 bg-black text-white rounded hover:bg-gray-900 transition"
                    >
                      Add Medal
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="px-4 py-2 text-center text-gray-500">
                  No athletes found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
