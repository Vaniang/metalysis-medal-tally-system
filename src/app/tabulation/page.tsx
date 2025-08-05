"use client";

import React, { useState } from "react";
import { useMedalData } from "../../context/MedalDataContext";
import MedalTableGrouped from "./MedalTableGrouped";
import AthletesList from "../../components/AthletesList";
import Protest from "../../components/Protest";
import { EVENTS } from "./events";
import BEST_PERFORMING_EVENTS from "./bestPerformingEvents";
import LogoutButton from "../../components/LogoutButton";

const CATEGORIES = ["ELEMENTARY", "SECONDARY", "PARA GAMES"];
const GENDERS = ["BOYS", "GIRLS"];
const MEDALS = ["Gold", "Silver", "Bronze"];
const SDOS = [
  "Alaminos City",
  "Batac City",
  "Candon City",
  "Dagupan City",
  "Ilocos Norte",
  "Ilocos Sur",
  "Laoag City",
  "La Union",
  "Pangasinan I",
  "Pangasinan II",
  "San Carlos City",
  "San Fernando City",
  "Urdaneta City",
  "Vigan City",
];

type CategoryType = "ELEMENTARY" | "SECONDARY" | "PARA GAMES" | "";
type GenderType = "BOYS" | "GIRLS" | "";

export default function TabulationPage() {
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [activeSubTab, setActiveSubTab] = useState("");
  const [activeSubSubTab, setActiveSubSubTab] = useState("");
  const [category, setCategory] = useState<CategoryType>("");
  const [gender, setGender] = useState<GenderType>("");
  const [eventSelected, setEventSelected] = useState<string>("");
  const [subEventSelected, setSubEventSelected] = useState<string>("");
  const [sdoSelected, setSdoSelected] = useState("");
  const [medalSelected, setMedalSelected] = useState("");
  const { medalData, setMedalData } = useMedalData();

  // Helper to get sub-sub-tabs based on activeSubTab
  const getSubSubTabs = () => {
    if (activeSubTab === "Elementary") {
      return Object.keys(EVENTS["ELEMENTARY"]?.BOYS || {});
    } else if (activeSubTab === "Secondary") {
      return Object.keys(EVENTS["SECONDARY"]?.BOYS || {});
    } else if (activeSubTab === "Best Performing") {
      return Object.keys(BEST_PERFORMING_EVENTS);
    }
    return [];
  };

  const tabs = [
    "Dashboard",
    {
      name: "Regular Games",
      subTabs: ["Elementary", "Secondary", "Best Performing"],
    },
    {
      name: "Summary",
      subTabs: [
        "Summary Elementary",
        "Summary Secondary",
        "Para Games",
        "Overall Para Games",
        "Overall Regular Games",
      ],
    },
    "Athletes List",
    "Protest",
  ];

  // Function to add medal data to specific category/gender/event only
  const addMedalToSpecificEvent = (
    category: string,
    gender: string,
    event: string,
    subEvent: string,
    sdo: string,
    medal: string
  ) => {
    console.log("Add medal called with:", { category, gender, event, subEvent, sdo, medal });
    
    if (!category || !gender || !event || !subEvent || !sdo || !medal) {
      alert("Please fill in all fields");
      return;
    }

    setMedalData(prevData => {
      const newData = { ...prevData };
      
      // Ensure the exact path exists - ONLY add to specific category/gender/event
      if (!newData[category]) newData[category] = {};
      if (!newData[category][gender]) newData[category][gender] = {};
      if (!newData[category][gender][event]) newData[category][gender][event] = {};
      if (!newData[category][gender][event][subEvent]) newData[category][gender][event][subEvent] = {};
      if (!newData[category][gender][event][subEvent][sdo]) newData[category][gender][event][subEvent][sdo] = { Gold: 0, Silver: 0, Bronze: 0 };
      
      // Increment the specific medal count - ONLY in the intended location
      newData[category][gender][event][subEvent][sdo][medal as "Gold" | "Silver" | "Bronze"] += 1;
      
      console.log("Medal added successfully!");
      return newData;
    });
  };

  return (
    <div className="flex min-h-screen bg-white text-black">
      <aside className="w-64 bg-gray-100 p-6 flex flex-col relative">
        <h2 className="text-2xl font-bold mb-6">Tabulation</h2>
        <nav className="flex flex-col space-y-2 flex-grow overflow-y-auto">
          {tabs.map((tab) =>
            typeof tab === "string" ? (
              <button
                key={tab}
                onClick={() => {
                  setActiveTab(tab);
                  setActiveSubTab("");
                  setActiveSubSubTab("");
                }}
                className={`text-left px-4 py-2 rounded ${
                  activeTab === tab ? "bg-black text-white" : "text-gray-700"
                }`}
              >
                {tab}
              </button>
            ) : (
              <div key={tab.name}>
                <div className="px-4 py-2 font-semibold">{tab.name}</div>
                <div className="flex flex-col ml-4">
                  {tab.subTabs.map((subTab) => (
                    <div key={subTab}>
                      <button
                        onClick={() => {
                          setActiveTab(tab.name);
                          setActiveSubTab(subTab);
                          setActiveSubSubTab("");
                          if (subTab === "Elementary") setCategory("ELEMENTARY");
                          else if (subTab === "Secondary") setCategory("SECONDARY");
                          else setCategory("");
                        }}
                        className={`text-left px-4 py-1 rounded text-sm ${
                          activeTab === tab.name && activeSubTab === subTab
                            ? "bg-black text-white"
                            : "text-gray-600"
                        }`}
                      >
                        {subTab}
                      </button>
                      {activeTab === tab.name &&
                      activeSubTab === subTab &&
                      ["Elementary", "Secondary", "Best Performing"].includes(
                        subTab
                      ) ? (
                        <div className="flex flex-col ml-6 mt-1">
                          {getSubSubTabs().map((subSubTab) => (
                            <button
                              key={subSubTab}
                              onClick={() => {
                                setActiveSubSubTab(subSubTab);
                                setEventSelected(subSubTab);
                              }}
                              className={`text-left px-3 py-1 rounded text-xs ${
                                activeSubSubTab === subSubTab
                                  ? "bg-gray-800 text-white"
                                  : "text-gray-500"
                              }`}
                            >
                              {subSubTab}
                            </button>
                          ))}
                        </div>
                      ) : null}
                    </div>
                  ))}
                </div>
              </div>
            )
          )}
        </nav>
        <LogoutButton />
      </aside>

      <main className="flex-grow p-6 overflow-auto">
        <h1 className="text-3xl font-bold mb-6">
          {activeSubSubTab || activeSubTab || activeTab}
        </h1>

        {activeTab === "Regular Games" &&
        (activeSubTab === "Elementary" ||
          activeSubTab === "Secondary" ||
          activeSubTab === "Best Performing") &&
        activeSubSubTab ? (
          <div>
            {category && gender && eventSelected ? (
              <div>
                <MedalTableGrouped
                  category={category}
                  gender={gender}
                  event={eventSelected}
                  data={medalData[category]?.[gender]?.[eventSelected] || {}}
                />
              </div>
            ) : (
              <p>Please select Category, Gender, and Event to view the table.</p>
            )}
          </div>
        ) : activeTab === "Summary" &&
          (activeSubTab === "Summary Elementary" ||
            activeSubTab === "Summary Secondary") ? (
          <div className="p-4 border rounded shadow-sm max-w-4xl">
            {/* Summary tables implementation */}
          </div>
        ) : activeTab === "Dashboard" ? (
          <div>
            <div className="p-4 border rounded shadow-sm max-w-4xl">
              <h2 className="text-xl font-semibold mb-4">Add Medal</h2>
              <div className="grid grid-cols-3 gap-4 mb-4">
                <select
                  value={category}
                  onChange={(e) => {
                    const val = e.target.value as CategoryType;
                    setCategory(val);
                    setEventSelected("");
                    setSubEventSelected("");
                  }}
                  className="border p-2 rounded"
                >
                  <option value="">Select Category</option>
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
                <select
                  value={gender}
                  onChange={(e) => {
                    const val = e.target.value as GenderType;
                    setGender(val);
                    setEventSelected("");
                    setSubEventSelected("");
                  }}
                  className="border p-2 rounded"
                >
                  <option value="">Select Gender</option>
                  {GENDERS.map((g) => (
                    <option key={g} value={g}>
                      {g}
                    </option>
                  ))}
                </select>
                <select
                  value={eventSelected}
                  onChange={(e) => {
                    setEventSelected(e.target.value);
                    setSubEventSelected("");
                  }}
                  className="border p-2 rounded"
                  disabled={!category || !gender}
                >
                  <option value="">Select Event</option>
                  {(() => {
                    if (!category || !gender) return null;
                    const normalizedGender = gender.trim().toUpperCase();
                    const eventsObj = (EVENTS[category as keyof typeof EVENTS] || {}) as Record<string, any>;
                    const eventKeys = eventsObj[normalizedGender] ? Object.keys(eventsObj[normalizedGender]) : [];
                    return eventKeys.map((ev) => (
                      <option key={ev} value={ev}>
                        {ev}
                      </option>
                    ));
                  })()}
                </select>
              </div>
              <div className="grid grid-cols-3 gap-4 mb-4">
                <select
                  value={subEventSelected}
                  onChange={(e) => setSubEventSelected(e.target.value)}
                  className="border p-2 rounded"
                  disabled={!eventSelected}
                >
                  <option value="">Select Sub-Event</option>
                  {(() => {
                    if (!category || !gender || !eventSelected) return null;
                    const eventsObj = (EVENTS[category as keyof typeof EVENTS] || {}) as Record<string, any>;
                    const subEvents = eventsObj[gender.trim().toUpperCase()]?.[eventSelected] || [];
                    return subEvents.map((ev: string) => (
                      <option key={ev} value={ev}>
                        {ev}
                      </option>
                    ));
                  })()}
                </select>
                <select
                  value={sdoSelected}
                  onChange={(e) => setSdoSelected(e.target.value)}
                  className="border p-2 rounded"
                >
                  <option value="">Select SDO</option>
                  {SDOS.map((sdo) => (
                    <option key={sdo} value={sdo}>
                      {sdo}
                    </option>
                  ))}
                </select>
                <select
                  value={medalSelected}
                  onChange={(e) => setMedalSelected(e.target.value)}
                  className="border p-2 rounded"
                >
                  <option value="">Select Medal</option>
                  {MEDALS.map((medal) => (
                    <option key={medal} value={medal}>
                      {medal}
                    </option>
                  ))}
                </select>
              </div>
              <button
                onClick={() => {
                  console.log("Add Medal button clicked!");
                  if (!category || !gender || !eventSelected || !subEventSelected || !sdoSelected || !medalSelected) {
                    alert("Please fill in all fields");
                    return;
                  }
                  addMedalToSpecificEvent(
                    category,
                    gender,
                    eventSelected,
                    subEventSelected,
                    sdoSelected,
                    medalSelected
                  );
                  // Reset form after adding
                  setSubEventSelected("");
                  setSdoSelected("");
                  setMedalSelected("");
                }}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition cursor-pointer font-medium"
                type="button"
              >
                Add Medal
              </button>
            </div>
          </div>
        ) : activeTab === "Athletes List" ? (
          <AthletesList />
        ) : activeTab === "Protest" ? (
          <Protest protestId="tabulation-protest" />
        ) : (
          <p>Select a tab to view content.</p>
        )}
      </main>
    </div>
  );
}
