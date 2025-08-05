"use client";

import React from "react";

interface MedalCount {
  Gold: number;
  Silver: number;
  Bronze: number;
}

interface MedalTableGroupedProps {
  category: string;
  gender: string;
  event: string;
  data: Record<
    string,
    {
      [subEvent: string]: MedalCount | undefined;
    }
  >;
}

const medalShort = {
  Gold: "G",
  Silver: "S",
  Bronze: "B",
};

export default function MedalTableGrouped({
  category,
  gender,
  event,
  data,
}: MedalTableGroupedProps) {
  const sdos = Object.keys(data);

  // Get sub-event keys dynamically from the first SDO's data
  const subEvents = sdos.length > 0 ? Object.keys(data[sdos[0]]) : [];

  // Calculate total medals per SDO across all sub-events
  const getTotalMedals = (sdo: string, medalType: "Gold" | "Silver" | "Bronze") => {
    return subEvents.reduce(
      (sum, subEvent) => sum + (data[sdo]?.[subEvent]?.[medalType] || 0),
      0
    );
  };

  return (
    <div className="overflow-auto max-h-[600px] border border-black rounded-md my-4">
      <table className="min-w-full border border-black border-collapse text-black">
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
              <th
                key={subEvent}
                colSpan={3}
                className="border border-black px-2 py-1 text-center"
              >
                {subEvent}
              </th>
            ))}
            <th colSpan={3} className="border border-black px-2 py-1 text-center">
              TOTAL
            </th>
          </tr>
          <tr>
            {subEvents.flatMap((subEvent) =>
              ["Gold", "Silver", "Bronze"].map((medal) => (
                <th
                  key={`${subEvent}-${medal}`}
                  className="border border-black px-2 py-1 text-center"
                >
                  {medalShort[medal as keyof typeof medalShort]}
                </th>
              ))
            )}
            {["Gold", "Silver", "Bronze"].map((medal) => (
              <th
                key={`total-${medal}`}
                className="border border-black px-2 py-1 text-center"
              >
                {medalShort[medal as keyof typeof medalShort]}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sdos.map((sdo) => (
            <tr key={sdo} className="even:bg-white odd:bg-gray-100">
              <td className="border border-black px-2 py-1 font-semibold text-left">
                {sdo}
              </td>
              {subEvents.map((subEvent) => {
                const medalCount = data[sdo]?.[subEvent] || {
                  Gold: 0,
                  Silver: 0,
                  Bronze: 0,
                };
                return (
                  <React.Fragment key={`${sdo}-${subEvent}`}>
                    <td className="border border-black px-2 py-1 text-center">
                      {medalCount.Gold || 0}
                    </td>
                    <td className="border border-black px-2 py-1 text-center">
                      {medalCount.Silver || 0}
                    </td>
                    <td className="border border-black px-2 py-1 text-center">
                      {medalCount.Bronze || 0}
                    </td>
                  </React.Fragment>
                );
              })}
              {/* Total medals per SDO */}
              <td className="border border-black px-2 py-1 text-center font-semibold">
                {getTotalMedals(sdo, "Gold")}
              </td>
              <td className="border border-black px-2 py-1 text-center font-semibold">
                {getTotalMedals(sdo, "Silver")}
              </td>
              <td className="border border-black px-2 py-1 text-center font-semibold">
                {getTotalMedals(sdo, "Bronze")}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
