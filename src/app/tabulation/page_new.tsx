"use client";

import React, { useState, useMemo } from "react";
import { EVENTS } from "./events";
import Protest from "../../components/Protest";
import AthletesList from "../../components/AthletesList";
import { useMedalData } from "../../context/MedalDataContext";

const MEDALS = ["Gold", "Silver", "Bronze"];

export default function TabulationPageNew() {
  const [category, setCategory] = useState<"ELEMENTARY" | "SECONDARY" | "">("");
  const [gender, setGender] = useState<"BOYS" | "GIRLS" | "">("");
  const [eventSelected, setEventSelected] = useState<string>("");

  const { medalData } = useMedalData();

  // Get sub-events dynamically for the selected category, gender, and event
  const subEvents = useMemo(() => {
    if (
      category &&
      gender &&
      eventSelected &&
      medalData[category] &&
      medalData[category][gender] &&
      medalData[category][gender][eventSelected]
    ) {
      return Object.keys(medalData[category][gender][eventSelected]);
    }
    return [];
  }, [category, gender, eventSelected, medalData]);

  // Get all SDOs dynamically from medalData for the selected event and sub-events
  const sdos = useMemo(() => {
    if (!category || !gender || !eventSelected) return [];
    const sdoSet = new Set<string>();
    subEvents.forEach((subEvent) => {
      const sdoMedals = medalData[category][gender][eventSelected][subEvent];
      if (sdoMedals) {
        Object.keys(sdoMedals).forEach((sdo) => sdoSet.add(sdo));
      }
    });
    return Array.from(sdoSet);
  }, [category, gender, eventSelected, subEvents, medalData]);

  // Function to get medal count for a given sdo, subEvent, and medal type
  const getMedalCount = (
    sdo: string,
    subEvent: string,
    medalType: "Gold" | "Silver" | "Bronze"
  ) => {
    if (
      medalData[category] &&
      medalData[category][gender] &&
      medalData[category][gender][eventSelected] &&
      medalData[category][gender][eventSelected][subEvent] &&
      medalData[category][gender][eventSelected][subEvent][sdo]
    ) {
      return (
        medalData[category][gender][eventSelected][subEvent][sdo][medalType] || 0
      );
    }
    return 0;
  };

  // Calculate total medals per SDO across all sub-events
  const getTotalMedals = (sdo: string, medalType: "Gold" | "Silver" | "Bronze") => {
    return subEvents.reduce(
      (sum, subEvent) => sum + getMedalCount(sdo, subEvent, medalType),
      0
    );
  };

  return (
    <div className="p-6 bg-white text-black min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Tabulation - Medal Tables</h1>

      <div className="mb-4 flex space-x-4">
        <select
          value={category}
          onChange={(e) => {
            setCategory(e.target.value as "ELEMENTARY" | "SECONDARY" | "");
            setEventSelected("");
            setGender("");
          }}
          className="border border-gray-400 rounded px-3 py-2"
        >
          <option value="">Select Category</option>
          <option value="ELEMENTARY">ELEMENTARY</option>
          <option value="SECONDARY">SECONDARY</option>
        </select>

        <select
          value={gender}
          onChange={(e) => {
            setGender(e.target.value as "BOYS" | "GIRLS" | "");
            setEventSelected("");
          }}
          disabled={!category}
          className="border border-gray-400 rounded px-3 py-2"
        >
          <option value="">Select Gender</option>
          <option value="BOYS">BOYS</option>
          <option value="GIRLS">GIRLS</option>
        </select>

        <select
          value={eventSelected}
          onChange={(e) => setEventSelected(e.target.value)}
          disabled={!category || !gender}
          className="border border-gray-400 rounded px-3 py-2"
        >
          <option value="">Select Event</option>
          {category &&
            gender &&
            Object.keys(EVENTS[category]?.[gender] || {}).map((ev) => (
              <option key={ev} value={ev}>
                {ev}
              </option>
            ))}
        </select>
      </div>

      {category && gender && eventSelected ? (
        <div>
          <h2 className="text-xl font-semibold mb-4">
            {category} - {eventSelected} - {gender}
          </h2>

          <table className="border border-black border-collapse w-full text-center">
            <thead>
              <tr>
                <th
                  rowSpan={2}
                  className="border border-black px-2 py-1 text-left"
                  style={{ minWidth: "150px" }}
                >
                  SDO/DELEGATION
                </th>
                {subEvents.map((subEvent) => (
                  <th key={subEvent} colSpan={3} className="border border-black px-2 py-1">
                    {subEvent}
                  </th>
                ))}
                <th colSpan={3} className="border border-black px-2 py-1">
                  TOTAL
                </th>
              </tr>
              <tr>
                {subEvents.map((subEvent) =>
                  MEDALS.map((medal) => (
                    <th key={`${subEvent}-${medal}`} className="border border-black px-2 py-1">
                      {medal.charAt(0)}
                    </th>
                  ))
                )}
                {MEDALS.map((medal) => (
                  <th key={`total-${medal}`} className="border border-black px-2 py-1">
                    {medal.charAt(0)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sdos.map((sdo) => (
                <tr key={sdo}>
                  <td className="border border-black px-2 py-1 font-semibold text-left">{sdo}</td>
                  {subEvents.map((subEvent) =>
                    MEDALS.map((medal) => (
                      <td key={`${sdo}-${subEvent}-${medal}`} className="border border-black px-2 py-1">
                        {getMedalCount(sdo, subEvent, medal as "Gold" | "Silver" | "Bronze")}
                      </td>
                    ))
                  )}
                  {MEDALS.map((medal) => (
                    <td key={`${sdo}-total-${medal}`} className="border border-black px-2 py-1">
                      {getTotalMedals(sdo, medal as "Gold" | "Silver" | "Bronze")}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>Please select Category, Gender, and Event to view the table.</p>
      )}

      <div className="mt-10">
        <Protest protestId="tabulation-protest" />
      </div>

      <div className="mt-10">
        <AthletesList />
      </div>
    </div>
  );
}
