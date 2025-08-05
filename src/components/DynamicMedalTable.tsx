"use client";

import React, { useMemo } from "react";

const MEDALS = ["Gold", "Silver", "Bronze"] as const;

interface MedalCount {
  Gold: number;
  Silver: number;
  Bronze: number;
}

interface MedalData {
  [category: string]: {
    [gender: string]: {
      [event: string]: {
        [subEvent: string]: {
          [sdo: string]: MedalCount;
        };
      };
    };
  };
}

interface DynamicMedalTableProps {
  category: string;
  gender: string;
  eventSelected: string;
  medalData: MedalData;
}

const DynamicMedalTable: React.FC<DynamicMedalTableProps> = ({
  category,
  gender,
  eventSelected,
  medalData,
}) => {
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
    medalType: typeof MEDALS[number]
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
  const getTotalMedals = (sdo: string, medalType: typeof MEDALS[number]) => {
    return subEvents.reduce(
      (sum, subEvent) => sum + getMedalCount(sdo, subEvent, medalType),
      0
    );
  };

  if (!category || !gender || !eventSelected) {
    return <p>Please select Category, Gender, and Event to view the table.</p>;
  }

  return (
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
                  {getMedalCount(sdo, subEvent, medal)}
                </td>
              ))
            )}
            {MEDALS.map((medal) => (
              <td key={`${sdo}-total-${medal}`} className="border border-black px-2 py-1">
                {getTotalMedals(sdo, medal)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DynamicMedalTable;
