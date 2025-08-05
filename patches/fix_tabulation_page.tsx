import React, { useState } from "react";
import MedalTable from "../../app/tabulation/MedalTables";
import AthletesList from "../../components/AthletesList";
import Protest from "../../components/Protest";
import AthletesAwardTab from "../../components/AthletesAwardTab";

export default function TabulationPage() {
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [activeSubTab, setActiveSubTab] = useState("");
  const [activeSubSubTab, setActiveSubSubTab] = useState("");
  const [category, setCategory] = useState("");
  const [gender, setGender] = useState("");
  const [eventSelected, setEventSelected] = useState("");

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
    "Athletes Award",
  ];

  const getSubSubTabs = () => {
    if (activeSubTab === "Elementary") return ["Category A", "Category B"];
    if (activeSubTab === "Secondary") return ["Category C", "Category D"];
    if (activeSubTab === "Best Performing") return ["Top 10", "Top 20"];
    return [];
  };

  return (
    <div className="flex min-h-screen bg-white text-black">
      <aside className="w-64 bg-gray-100 p-6 flex flex-col">
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
              <div className="p-4 border rounded shadow-sm max-w-4xl">
                <MedalTable
                  category={category}
                  gender={gender}
                  event={eventSelected}
                  data={{}} // Replace with actual data
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
            <p>No summary data available.</p>
          </div>
        ) : activeTab === "Dashboard" ? (
          <div>
            <p>Dashboard content coming soon.</p>
          </div>
        ) : activeTab === "Athletes List" ? (
          <div>
            <AthletesList />
          </div>
        ) : activeTab === "Protest" ? (
          <div>
            <Protest protestId="tabulation-protest" />
          </div>
        ) : activeTab === "Athletes Award" ? (
          <div>
            <AthletesAwardTab />
          </div>
        ) : (
          <p>Select a tab to view content.</p>
        )}
      </main>
    </div>
  );
}
