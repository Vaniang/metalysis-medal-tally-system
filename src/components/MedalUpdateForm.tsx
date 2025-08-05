"use client";

import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { eventsData } from "../lib/eventsData";

type Level = keyof typeof eventsData | "";
type Sport = string | "";
type Event = string | "";

function flattenEvents(events: any): string[] {
  if (Array.isArray(events)) {
    return events;
  } else if (typeof events === "object") {
    return Object.values(events).flatMap(flattenEvents);
  }
  return [];
}

interface MedalUpdateFormProps {
  athlete: any;
  onSave: (updatedMedals: { gold: number; silver: number; bronze: number }, selectedLevel: Level, selectedSport: Sport, selectedEvent: Event) => void;
}

export default function MedalUpdateForm({ athlete, onSave }: MedalUpdateFormProps) {
  const { userRole } = useAuth();
  const [selectedLevel, setSelectedLevel] = useState<Level | "">("");
  const [selectedSport, setSelectedSport] = useState<Sport | "">("");
  const [selectedEvent, setSelectedEvent] = useState<Event | "">("");
  const [medalCount, setMedalCount] = useState({ gold: 0, silver: 0, bronze: 0 });

  useEffect(() => {
    setSelectedSport("");
    setSelectedEvent("");
  }, [selectedLevel]);

  useEffect(() => {
    setSelectedEvent("");
  }, [selectedSport]);

  useEffect(() => {
    if (athlete && athlete.medals) {
      setMedalCount({
        gold: athlete.medals.gold || 0,
        silver: athlete.medals.silver || 0,
        bronze: athlete.medals.bronze || 0,
      });
      // Optionally set selectedLevel, selectedSport, selectedEvent from athlete data if available
      setSelectedLevel(athlete.level ? String(athlete.level) : "");
      setSelectedSport(athlete.sportsEvent ? String(athlete.sportsEvent) : "");
      setSelectedEvent(athlete.event ? String(athlete.event) : "");
    }
  }, [athlete]);

  if (userRole !== "Tabulation Team") {
    return <p>You do not have permission to update medals.</p>;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(medalCount, selectedLevel, selectedSport, selectedEvent);
  };

  console.log("Selected Level:", selectedLevel);
  const sports: Sport[] = selectedLevel && selectedLevel !== "" ? Object.keys(eventsData[selectedLevel as Level]) : [];
  console.log("Sports for selected level:", sports);
  const events: Event[] =
    selectedSport && selectedLevel && selectedLevel !== ""
      ? flattenEvents(eventsData[selectedLevel as Level][selectedSport as Sport])
      : [];

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded-md max-w-md">
      <h2 className="text-xl font-bold mb-4">Update Medals</h2>

      <label className="block mb-2">
        Select Level:
        <select
          value={selectedLevel}
          onChange={(e) => setSelectedLevel(e.target.value as Level)}
          className="w-full p-2 border rounded"
          required
        >
          <option value="">-- Select Level --</option>
          {Object.keys(eventsData).map((level) => (
            <option key={level} value={String(level)}>
              {level}
            </option>
          ))}
        </select>
      </label>

      {selectedLevel && (
        <label className="block mb-2">
          Select Sport:
          <select
          value={selectedSport}
          onChange={(e) => setSelectedSport(e.target.value as Sport)}
          className="w-full p-2 border rounded"
          required
        >
            <option value="">-- Select Sport --</option>
            {sports.map((sport) => (
              <option key={sport} value={String(sport)}>
                {sport}
              </option>
            ))}
          </select>
        </label>
      )}

      {selectedSport && (
        <label className="block mb-2">
          Event:
          <input
            type="text"
            value={selectedEvent}
            onChange={(e) => setSelectedEvent(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Enter event name"
            required
          />
        </label>
      )}

      <div className="mb-2">
        <label className="block">Gold Medals:</label>
        <input
          type="number"
          min="0"
          value={medalCount.gold}
          onChange={(e) => setMedalCount({ ...medalCount, gold: Number(e.target.value) })}
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="mb-2">
        <label className="block">Silver Medals:</label>
        <input
          type="number"
          min="0"
          value={medalCount.silver}
          onChange={(e) => setMedalCount({ ...medalCount, silver: Number(e.target.value) })}
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block">Bronze Medals:</label>
        <input
          type="number"
          min="0"
          value={medalCount.bronze}
          onChange={(e) => setMedalCount({ ...medalCount, bronze: Number(e.target.value) })}
          className="w-full p-2 border rounded"
        />
      </div>
      <button
        type="submit"
        className="px-4 py-2 bg-black text-white rounded hover:bg-gray-900 transition"
      >
        Update Medals
      </button>
    </form>
  );
}
