"use client";

import React, { useEffect, useState } from "react";
import Modal from "../src/components/ui/Modal";
import MedalUpdateForm from "../src/components/MedalUpdateForm";

interface Athlete {
  id: string;
  passportNumber: string;
  name: string;
  age: string;
  gender: string;
  category: string;
  yearLevel: string;
  sportsEvent: string;
  schoolDivision: string;
  weight?: string;
  height?: string;
  birthdate?: string;
  medals?: {
    gold: number;
    silver: number;
    bronze: number;
  };
}

export default function AthletesList({ isReadOnly }: { isReadOnly?: boolean }) {
  const [athletes, setAthletes] = useState<Athlete[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    division: "",
    category: "",
    yearLevel: "",
  });

  // New state for athlete input form
  const [newAthlete, setNewAthlete] = useState<Omit<Athlete, "id">>({
    passportNumber: "",
    name: "",
    age: "",
    gender: "",
    category: "",
    yearLevel: "",
    sportsEvent: "",
    schoolDivision: "",
    weight: "",
    height: "",
    birthdate: "",
  });

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAthlete, setSelectedAthlete] = useState<Athlete | null>(null);

  useEffect(() => {
    // For demo, load from localStorage if available
    const data = localStorage.getItem("athletes");
    if (data) {
      setAthletes(JSON.parse(data));
    }
  }, []);

  const saveAthletesToStorage = (data: Athlete[]) => {
    localStorage.setItem("athletes", JSON.stringify(data));
  };

  const handleDelete = (id: string) => {
    if (isReadOnly) return;
    const updated = athletes.filter((a) => a.id !== id);
    setAthletes(updated);
    saveAthletesToStorage(updated);
  };

  const handleEdit = (id: string) => {
    if (isReadOnly) return;
    const athlete = athletes.find((a) => a.id === id);
    if (!athlete) return;
    const newName = prompt("Edit athlete name:", athlete.name);
    if (newName && newName.trim() !== "") {
      const updated = athletes.map((a) =>
        a.id === id ? { ...a, name: newName.trim() } : a
      );
      setAthletes(updated);
      saveAthletesToStorage(updated);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setNewAthlete({ ...newAthlete, [e.target.name]: e.target.value });
  };

  const generateUniqueId = () => {
    return Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
  };

  const handleAddAthlete = () => {
    // Basic validation: check required fields
    if (
      !newAthlete.passportNumber ||
      !newAthlete.name ||
      !newAthlete.age ||
      !newAthlete.gender ||
      !newAthlete.category ||
      !newAthlete.yearLevel ||
      !newAthlete.sportsEvent ||
      !newAthlete.schoolDivision
    ) {
      alert("Please fill all required fields.");
      return;
    }
    const athleteToAdd: Athlete = {
      id: generateUniqueId(),
      ...newAthlete,
    };
    const updated = [...athletes, athleteToAdd];
    setAthletes(updated);
    saveAthletesToStorage(updated);
    setNewAthlete({
      passportNumber: "",
      name: "",
      age: "",
      gender: "",
      category: "",
      yearLevel: "",
      sportsEvent: "",
      schoolDivision: "",
      weight: "",
      height: "",
      birthdate: "",
    });
    alert("Athlete added successfully.");
  };

  const filteredAthletes = athletes.filter((athlete) => {
    const matchesSearch =
      athlete.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      athlete.passportNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDivision =
      !filters.division || athlete.schoolDivision === filters.division;
    const matchesCategory =
      !filters.category || athlete.category === filters.category;
    const matchesYearLevel =
      !filters.yearLevel || athlete.yearLevel === filters.yearLevel;
    return matchesSearch && matchesDivision && matchesCategory && matchesYearLevel;
  });

  const openModal = (athlete: Athlete) => {
    setSelectedAthlete(athlete);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedAthlete(null);
    setIsModalOpen(false);
  };

  const handleMedalSave = (medalData: { gold: number; silver: number; bronze: number }, selectedLevel: string, selectedSport: string, selectedEvent: string) => {
    if (!selectedAthlete) return;
    const updated = athletes.map((a) =>
      a.id === selectedAthlete.id
        ? {
            ...a,
            medals: {
              gold: medalData.gold,
              silver: medalData.silver,
              bronze: medalData.bronze,
            },
            level: selectedLevel,
            sportsEvent: selectedSport,
            event: selectedEvent,
          }
        : a
    );
    setAthletes(updated);
    saveAthletesToStorage(updated);
    alert(`Medal data saved for athlete: ${selectedAthlete.name}`);
    closeModal();
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 text-black">List of Athletes</h2>

      {/* Athlete input form */}
      {!isReadOnly && false && (
        <div className="mb-6 border border-gray-300 rounded p-4">
          <h3 className="text-lg font-semibold mb-4">Add New Athlete</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              type="text"
              name="passportNumber"
              placeholder="Passport Number"
              value={newAthlete.passportNumber}
              onChange={handleInputChange}
              className="p-2 border border-gray-300 rounded"
              required
            />
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={newAthlete.name}
              onChange={handleInputChange}
              className="p-2 border border-gray-300 rounded"
              required
            />
            <input
              type="number"
              name="age"
              placeholder="Age"
              value={newAthlete.age}
              onChange={handleInputChange}
              className="p-2 border border-gray-300 rounded"
              required
            />
            <select
              name="gender"
              value={newAthlete.gender}
              onChange={handleInputChange}
              className="p-2 border border-gray-300 rounded"
              required
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
            <input
              type="text"
              name="category"
              placeholder="Category"
              value={newAthlete.category}
              onChange={handleInputChange}
              className="p-2 border border-gray-300 rounded"
              required
            />
            <input
              type="text"
              name="yearLevel"
              placeholder="Year Level"
              value={newAthlete.yearLevel}
              onChange={handleInputChange}
              className="p-2 border border-gray-300 rounded"
              required
            />
            <input
              type="text"
              name="sportsEvent"
              placeholder="Sports Event"
              value={newAthlete.sportsEvent}
              onChange={handleInputChange}
              className="p-2 border border-gray-300 rounded"
              required
            />
            <input
              type="text"
              name="schoolDivision"
              placeholder="School Division"
              value={newAthlete.schoolDivision}
              onChange={handleInputChange}
              className="p-2 border border-gray-300 rounded"
              required
            />
            <input
              type="text"
              name="weight"
              placeholder="Weight"
              value={newAthlete.weight}
              onChange={handleInputChange}
              className="p-2 border border-gray-300 rounded"
            />
            <input
              type="text"
              name="height"
              placeholder="Height"
              value={newAthlete.height}
              onChange={handleInputChange}
              className="p-2 border border-gray-300 rounded"
            />
            <input
              type="date"
              name="birthdate"
              placeholder="Birthdate"
              value={newAthlete.birthdate}
              onChange={handleInputChange}
              className="p-2 border border-gray-300 rounded"
            />
          </div>
          <button
            onClick={handleAddAthlete}
            className="mt-4 px-4 py-2 bg-black text-white rounded-md hover:bg-gray-900 transition"
          >
            Add Athlete
          </button>
        </div>
      )}

      <div className="flex flex-wrap gap-4 mb-4">
        {/* ... filters unchanged ... */}
      </div>
      <div className="overflow-auto max-h-[600px] border border-gray-300 rounded-md">
        <table
          id="athletes-table"
          className="min-w-full divide-y divide-gray-200"
        >
          <thead className="bg-gray-50 sticky top-0">
            <tr>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Passport Number
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Category
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
                  {athlete.passportNumber}
                </td>
                <td
                  className="px-4 py-2 whitespace-nowrap text-sm text-blue-600 cursor-pointer underline"
                  onClick={() => openModal(athlete)}
                >
                  {athlete.name}
                </td>
                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                  {athlete.category}
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

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={`Add Medal for ${selectedAthlete?.name || ""}`}
      >
        <MedalUpdateForm athlete={selectedAthlete} onSave={handleMedalSave} />
      </Modal>
    </div>
  );
}
