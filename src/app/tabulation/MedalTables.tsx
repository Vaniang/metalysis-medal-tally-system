"use client";

import React from "react";

interface MedalCount {
  Gold: number;
  Silver: number;
  Bronze: number;
}

interface MedalTableProps {
  category: string;
  gender: string;
  event: string;
  data: Record<string, Record<string, MedalCount>>; // SDO -> SubEvent -> medal count
}

// Medal icons as SVG or emoji for simplicity
const medalIcons = {
  Gold: "🥇",
  Silver: "🥈",
  Bronze: "🥉",
};

export function MedalTable({ category, gender, event, data }: MedalTableProps) {
  // Extract SDOs and sub-events from data
  const sdos = Object.keys(data);
  const subEvents = sdos.length > 0 ? Object.keys(data[sdos[0]]) : [];

  return (
    <div className="overflow-auto max-h-[600px] border border-gray-300 rounded-md my-4">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-700 text-white sticky top-0">
          <tr>
            <th className="px-4 py-2 text-left">SDO</th>
            {subEvents.map((subEvent) => (
              <th key={subEvent} className="px-4 py-2 text-center" colSpan={3}>
                {subEvent}
              </th>
            ))}
          </tr>
          <tr className="bg-gray-600 text-white">
            <th></th>
            {subEvents.map((subEvent) => (
              <React.Fragment key={subEvent}>
                <th className="px-2 py-1 text-center">{medalIcons.Gold}</th>
                <th className="px-2 py-1 text-center">{medalIcons.Silver}</th>
                <th className="px-2 py-1 text-center">{medalIcons.Bronze}</th>
              </React.Fragment>
            ))}
          </tr>
        </thead>
        <tbody>
          {sdos.map((sdo) => (
            <tr key={sdo} className="even:bg-gray-50">
              <td className="px-4 py-2 font-semibold">{sdo}</td>
              {subEvents.map((subEvent) => {
                const medals = data[sdo][subEvent];
                const gold = typeof medals === "object" && medals !== null ? medals.Gold : 0;
                const silver = typeof medals === "object" && medals !== null ? medals.Silver : 0;
                const bronze = typeof medals === "object" && medals !== null ? medals.Bronze : 0;
                return (
                  <React.Fragment key={subEvent}>
                    <td className="px-2 py-1 text-center">{gold || 0}</td>
                    <td className="px-2 py-1 text-center">{silver || 0}</td>
                    <td className="px-2 py-1 text-center">{bronze || 0}</td>
                  </React.Fragment>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
