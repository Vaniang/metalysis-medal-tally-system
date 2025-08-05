"use client";

import React, { useEffect, useState } from "react";
import { Athlete } from "../src/lib/types";
import { getAthletes, saveAthletes } from "../src/lib/localStorageService";
import { exportToExcel, printTable } from "../src/lib/utils";

interface AthletesAwardProps {
  isReadOnly?: boolean;
}

export default function AthletesAward({ isReadOnly }: AthletesAwardProps) {
  const [athletes, setAthletes] = useState<Athlete[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    division: "",
    category: "",
    yearLevel: "",
  });

  useEffect(() => {
    const data = getAthletes();
    setAthletes(data);
  }, []);

  const handleDelete = (id: string) => {
    if (isReadOnly) return;
    const updated = athletes.filter((a) => a.id !== id);
    setAthletes(updated);
    saveAthletes(updated);
  };

  const handleEdit = (id: string) => {
    if (isReadOnly) return;
    const athlete = athletes.find((a) => a.id === id);
    if (!athlete) return;
    const newSport = prompt("Edit sports event:", athlete.sportsEvent);
    if (newSport && newSport.trim() !== "") {
      const gold = parseInt(prompt("Gold medals:", athlete.medals?.gold?.toString() || "0") || "0", 10);
      const silver = parseInt(prompt("Silver medals:", athlete.medals?.silver?.toString() || "0") || "0", 10);
      const bronze = parseInt(prompt("Bronze medals:", athlete.medals?.bronze?.toString() || "0") || "0", 10);
      const updated = athletes.map((a) =>
        a.id === id
          ? { ...a, sportsEvent: newSport.trim(), medals: { gold, silver, bronze } }
          : a
      );
      setAthletes(updated);
      saveAthletes(updated);
    }
  };

  const filteredAthletes = athletes.filter((athlete) => {
    const matchesSearch = athlete.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDivision = !filters.division || athlete.schoolDivision === filters.division;
    const matchesCategory = !filters.category || athlete.category === filters.category;
    const matchesYearLevel = !filters.yearLevel || athlete.yearLevel === filters.yearLevel;
    return matchesSearch && matchesDivision && matchesCategory && matchesYearLevel;
  });

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 text-black">Athletes Award</h2>
      <div className="flex flex-wrap gap-4 mb-4">
        <input
          type="text"
          placeholder="Search by athlete name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent flex-grow min-w-[200px]"
        />
        <select
          value={filters.division}
          onChange={(e) => setFilters({ ...filters, division: e.target.value })}
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
        >
          <option value="">All Divisions</option>
          {[...new Set(athletes.map((a) => a.schoolDivision))].map((div, index) => (
            <option key={`${div}-${index}`} value={div}>
              {div}
            </option>
          ))}
        </select>
        <select
          value={filters.category}
          onChange={(e) => setFilters({ ...filters, category: e.target.value })}
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
        >
          <option value="">All Categories</option>
          {[...new Set(athletes.map((a) => a.category))].map((cat, index) => (
            <option key={`${cat}-${index}`} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        <select
          value={filters.yearLevel}
          onChange={(e) => setFilters({ ...filters, yearLevel: e.target.value })}
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
        >
          <option value="">All Year Levels</option>
          {[...new Set(athletes.map((a) => a.yearLevel))].map((year, index) => (
            <option key={`${year}-${index}`} value={year}>
              {year}
            </option>
          ))}
        </select>
        <button
          onClick={() => printTable("athletes-award-table")}
          className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-900 transition"
        >
          Print
        </button>
        <button
          onClick={() => exportToExcel(athletes, "athletes_award.xlsx")}
          className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-900 transition"
        >
          Export Excel
        </button>
      </div>
      <div className="overflow-auto max-h-[600px] border border-gray-300 rounded-md">
        <table
          id="athletes-award-table"
          className="min-w-full divide-y divide-gray-200"
        >
          <thead className="bg-gray-50 sticky top-0">
            <tr>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Sports Event
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Category
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                SDO
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Gold Medal
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Silver Medal
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Bronze Medal
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredAthletes.map((athlete) => (
              <tr key={athlete.id} className="hover:bg-gray-50">
                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                  {athlete.name}
                </td>
                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                  {athlete.sportsEvent}
                </td>
                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                  {athlete.category}
                </td>
                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                  {athlete.schoolDivision}
                </td>
                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                  {athlete.medals?.gold || 0}
                </td>
                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                  {athlete.medals?.silver || 0}
                </td>
                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                  {athlete.medals?.bronze || 0}
                </td>
                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900 space-x-2">
                  {!isReadOnly && (
                    <>
                      <button
                        onClick={() => handleEdit(athlete.id)}
                        className="px-2 py-1 bg-black text-white rounded hover:bg-gray-900 transition"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(athlete.id)}
                        className="px-2 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition"
                      >
                        Delete
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
