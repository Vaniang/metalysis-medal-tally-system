"use client";

import React, { useState, useEffect } from "react";
import { MedalTable } from "./MedalTables";

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

// Events and Sub-Events data (simplified for demo, full data to be added)

const EVENTS = {
  ELEMENTARY: {
    BOYS: {
      ARCHERY: [
        "15 M 1st Distance",
        "15 M 2nd Distance",
        "20 M 1st Distance",
        "20 M 2nd Distance",
        "Single FITA 1140 Round",
        "Olympic Round Ind'l",
      ],
      ARNIS: [
        "Individual Single Weapon NT",
        "Individual Double Weapon NT",
        "Team Likha-Synchronized Single Weapon NT",
        "Team Likha-Synchronized Double Weapon NT",
        "Anyo-Individual S&D Weapon NT",
        "Anyo Event Team S&D",
        "Pair Team Likha Anyo Double Baston",
      ],
      ATHLETICS: [
        "TRACKS - 100M Dash",
        "TRACKS - 200M Dash",
        "TRACKS - 400M Dash",
        "TRACKS - 800M Run",
        "TRACKS - 1500M Run",
        "TRACKS - 100MH",
        "TRACKS - 400MH",
        "TRACKS - 4x100M Relay",
        "TRACKS - 4x400M Relay",
        "THROWS - Javelin Throw",
        "THROWS - Discus Throw",
        "THROWS - Shot Put",
        "JUMPS - High Jump",
        "JUMPS - Long Jump",
        "JUMPS - Triple Jump",
      ],
      BALL_GAMES: [
        "Baseball",
        "Basketball Regular",
        "Basketball 3 on 3 - Demo Sports",
        "Football",
        "Volleyball",
      ],
      SEPAK_TAKRAW: ["Junior - Team", "Double Takraw"],
      CHESS: [
        "Standard - Individual",
        "Standard - Team",
        "Rapid - Individual",
        "Rapid - Team",
        "Blitz - Individual",
        "Blitz – Team",
      ],
      RACKET_GAMES: [
        "BADMINTON - Singles",
        "BADMINTON - Doubles",
        "BADMINTON - Mixed",
        "TABLE_TENNIS - Singles",
        "TABLE_TENNIS - Doubles",
        "TABLE_TENNIS - Mixed Doubles",
        "TENNIS - Singles",
        "TENNIS - Doubles",
      ],
      DANCE_SPORTS: [
        "LATIN_SINGLE_DANCE - Chacha",
        "LATIN_SINGLE_DANCE - Samba",
        "LATIN_SINGLE_DANCE - Rumba",
        "LATIN_SINGLE_DANCE - Pasadoble",
        "LATIN_SINGLE_DANCE - Jive",
        "LATIN_SINGLE_DANCE - Grade A - C, S, R, P, D, J",
        "MODERN_STANDARD_SINGLE_DANCE - Waltz",
        "MODERN_STANDARD_SINGLE_DANCE - Tango",
        "MODERN_STANDARD_SINGLE_DANCE - V-Waltz",
        "MODERN_STANDARD_SINGLE_DANCE - Foxtrot",
        "MODERN_STANDARD_SINGLE_DANCE - Quickstep",
        "MODERN_STANDARD_SINGLE_DANCE - Grade A - W, T, VW, SF, Q",
      ],
      GYMNASTICS: [
        "MAG_CLUSTER_2 - Floor Exercise",
        "MAG_CLUSTER_2 - Vaulting Table",
        "MAG_CLUSTER_2 - Mushroom",
        "MAG_CLUSTER_2 - Individual Around",
        "MAG_CLUSTER_2 - Horizontal Bar",
        "MAG_CLUSTER_1 - Floor Exercise",
        "MAG_CLUSTER_1 - Vaulting Table",
        "MAG_CLUSTER_1 - Mushroom",
        "MAG_CLUSTER_1 - Individual Around",
        "MAG_CLUSTER_1 - Horizontal Bar",
        "WAG_CLUSTER_1 - Floor Exercise",
        "WAG_CLUSTER_1 - Balance Beam",
        "WAG_CLUSTER_1 - Vault",
        "WAG_CLUSTER_1 - Single Bar",
        "WAG_CLUSTER_1 - Individual All Around",
        "WAG_CLUSTER_1 - Team",
        "WAG_CLUSTER_2 - Floor Exercise",
        "WAG_CLUSTER_2 - Balance Beam",
        "WAG_CLUSTER_2 - Vault",
        "WAG_CLUSTER_2 - Single Bar",
        "WAG_CLUSTER_2 - Individual All Around",
        "WAG_CLUSTER_2 - Team",
        "RG - Ball",
        "RG - Rope",
        "RG - Hoop",
        "RG - Free Hand",
        "RG - Individual All Around",
        "RG - Team",
        "AEROGYMNASTICS - Individual Men",
        "AEROGYMNASTICS - Individual Women",
        "AEROGYMNASTICS - Trio",
        "AEROGYMNASTICS - Mix Pair",
        "AEROGYMNASTICS - Aero Dance",
        "AEROGYMNASTICS - Team",
      ],
      SWIMMING: [
        "TRACKS - 50M Back Stroke",
        "TRACKS - 50M Breaststroke",
        "TRACKS - 50M Butterfly",
        "TRACKS - 50M Free Style",
        "TRACKS - 100M Back Stroke",
        "TRACKS - 100M Free Style",
        "TRACKS - 200M Freestyle",
        "TRACKS - 200M Individual Medley",
        "TRACKS - 400M Free Style",
        "TRACKS - 4x50M Medley Relay",
        "TRACKS - 4x50M Medley Relay",
        "TRACKS - 4x100M Free Style Relay",
        "TRACKS - 4x100M Medley Relay",
      ],
      TAEKWONDO: [
        "KYORUGI - Over 144cm to 150cm",
        "KYORUGI - Over 152cm to 158cm",
        "KYORUGI - Over 160cm",
        "KYORUGI - Group A – Individual",
        "POOMSAE - Group A - Individual",
        "POOMSAE - Group B - Individual",
        "POOMSAE - Team - Event",
        "POOMSAE - Mix Pair",
      ],
    },
    GIRLS: {
      ARCHERY: [
        "15 M 1st Distance",
        "15 M 2nd Distance",
        "20 M 1st Distance",
        "20 M 2nd Distance",
        "Single FITA 1140 Round",
        "Olympic Round Ind'l",
      ],
      ARNIS: [
        "Individual Single Weapon NT",
        "Individual Double Weapon NT",
        "Team Likha-Synchronized Single Weapon NT",
        "Team Likha-Synchronized Double Weapon NT",
        "Anyo-Individual S&D Weapon NT",
        "Anyo Event Team S&D",
        "Pair Team Likha Anyo Double Baston",
      ],
      ATHLETICS: [
        "TRACKS - 100M Dash",
        "TRACKS - 200M Dash",
        "TRACKS - 400M Dash",
        "TRACKS - 800M Run",
        "TRACKS - 1500M Run",
        "TRACKS - 100MH",
        "TRACKS - 400MH",
        "TRACKS - 4x100M Relay",
        "TRACKS - 4x400M Relay",
        "THROWS - Javelin Throw",
        "THROWS - Discus Throw",
        "THROWS - Shot Put",
        "JUMPS - High Jump",
        "JUMPS - Long Jump",
        "JUMPS - Triple Jump",
      ],
      BALL_GAMES: ["Softball", "Volleyball"],
      CHESS: [
        "Standard - Individual",
        "Standard - Team",
        "Rapid - Individual",
        "Rapid - Team",
        "Blitz - Individual",
        "Blitz – Team",
      ],
      RACKET_GAMES: [
        "BADMINTON - Singles",
        "BADMINTON - Doubles",
        "BADMINTON - Mixed",
        "TABLE_TENNIS - Singles",
        "TABLE_TENNIS - Doubles",
        "TABLE_TENNIS - Mixed Doubles",
        "TENNIS - Singles",
        "TENNIS - Doubles",
      ],
      DANCE_SPORTS: [
        "LATIN_SINGLE_DANCE - Chacha",
        "LATIN_SINGLE_DANCE - Samba",
        "LATIN_SINGLE_DANCE - Rumba",
        "LATIN_SINGLE_DANCE - Pasadoble",
        "LATIN_SINGLE_DANCE - Jive",
        "LATIN_SINGLE_DANCE - Grade A - C, S, R, P, D, J",
        "MODERN_STANDARD_SINGLE_DANCE - Waltz",
        "MODERN_STANDARD_SINGLE_DANCE - Tango",
        "MODERN_STANDARD_SINGLE_DANCE - V-Waltz",
        "MODERN_STANDARD_SINGLE_DANCE - Foxtrot",
        "MODERN_STANDARD_SINGLE_DANCE - Quickstep",
        "MODERN_STANDARD_SINGLE_DANCE - Grade A - W, T, VW, SF, Q",
      ],
      GYMNASTICS: [
        "MAG_CLUSTER_2 - Floor Exercise",
        "MAG_CLUSTER_2 - Vaulting Table",
        "MAG_CLUSTER_2 - Mushroom",
        "MAG_CLUSTER_2 - Individual Around",
        "MAG_CLUSTER_2 - Horizontal Bar",
        "MAG_CLUSTER_1 - Floor Exercise",
        "MAG_CLUSTER_1 - Vaulting Table",
        "MAG_CLUSTER_1 - Mushroom",
        "MAG_CLUSTER_1 - Individual Around",
        "MAG_CLUSTER_1 - Horizontal Bar",
        "WAG_CLUSTER_1 - Floor Exercise",
        "WAG_CLUSTER_1 - Balance Beam",
        "WAG_CLUSTER_1 - Vault",
        "WAG_CLUSTER_1 - Single Bar",
        "WAG_CLUSTER_1 - Individual All Around",
        "WAG_CLUSTER_1 - Team",
        "WAG_CLUSTER_2 - Floor Exercise",
        "WAG_CLUSTER_2 - Balance Beam",
        "WAG_CLUSTER_2 - Vault",
        "WAG_CLUSTER_2 - Single Bar",
        "WAG_CLUSTER_2 - Individual All Around",
        "WAG_CLUSTER_2 - Team",
        "RG - Ball",
        "RG - Rope",
        "RG - Hoop",
        "RG - Free Hand",
        "RG - Individual All Around",
        "RG - Team",
        "AEROGYMNASTICS - Individual Men",
        "AEROGYMNASTICS - Individual Women",
        "AEROGYMNASTICS - Trio",
        "AEROGYMNASTICS - Mix Pair",
        "AEROGYMNASTICS - Aero Dance",
        "AEROGYMNASTICS - Team",
      ],
      SWIMMING: [
        "TRACKS - 50M Back Stroke",
        "TRACKS - 50M Breaststroke",
        "TRACKS - 50M Butterfly",
        "TRACKS - 50M Free Style",
        "TRACKS - 100M Back Stroke",
        "TRACKS - 100M Free Style",
        "TRACKS - 200M Freestyle",
        "TRACKS - 200M Individual Medley",
        "TRACKS - 400M Free Style",
        "TRACKS - 4x50M Medley Relay",
        "TRACKS - 4x50M Medley Relay",
        "TRACKS - 4x100M Free Style Relay",
        "TRACKS - 4x100M Medley Relay",
      ],
      TAEKWONDO: [
        "KYORUGI - Over 144cm to 150cm",
        "KYORUGI - Over 152cm to 158cm",
        "KYORUGI - Over 160cm",
        "KYORUGI - Group A – Individual",
        "POOMSAE - Group A - Individual",
        "POOMSAE - Group B - Individual",
        "POOMSAE - Team - Event",
        "POOMSAE - Mix Pair",
      ],
    },
  },
  SECONDARY: {
    BOYS: {
      ARCHERY: [
        "70M Distance",
        "60M Distance",
        "50M Distance",
        "30M Distance",
        "1140 Round",
        "Olympic Round (Ind'l 70M)",
        "Olympic Team Even (70M)",
        "Mixed Team (60M)",
      ],
      ARNIS: [
        "Ind’l Solo Baston (Single Weapon)",
        "Ind’l Doble Baston (Double Weapon)",
        "Team (Synd)-Solo Baston (Single Weapon)",
        "Team (Synd)-Double Baston (Double Weapon)",
        "EVENT Individual Espada Y Daga",
        "EVENT Team Espada Y Daga",
        "Pin Weight (43kg up to 47kg)",
        "Bantam-weight (47kg up to 51kg)",
        "Feather-weight (51kg up to 55kg)",
        "Extra Light weight (55kg up to 60kg)",
        "Half Light weight (60kg up to 65kg)",
      ],
      ATHLETICS: {
        TRACKS: [
          "100M Dash",
          "200M Dash",
          "400M Dash",
          "800M Run",
          "1500M Run",
          "110MH",
          "400MH",
          "3000M Steeple Chase",
          "5000M Run",
          "4x100M Relay",
          "4x400M Relay",
          "2000M Walk",
        ],
        THROWS: ["Javelin Throw", "Discus Throw", "Shot Put"],
        JUMPS: ["High Jump", "Long Jump", "Triple Jump", "Pole Vault"],
      },
      "RACKET GAMES": {
        BADMINTON: ["Singles", "Doubles", "Mixed"],
        "TABLE TENNIS": ["Singles", "Doubles", "Mixed Doubles"],
        TENNIS: ["Singles", "Doubles"],
      },
      "BALL GAMES": [
        "Baseball",
        "Basketball (Regular)",
        "Basketball (3 on 3)",
        "Football",
        "Volleyball",
      ],
      "SEPAK TAKRAW": ["Best Regu", "Team"],
      BILLIARDS: ["8 Balls", "9 Balls"],
      CHESS: [
        "Standard - Individual",
        "Standard - Team",
        "Rapid - Individual",
        "Rapid - Team",
        "Blitz - Individual",
        "Blitz – Team",
      ],
      "PENCAK SILAT": {
        COMBAT: [
          "Class A Over 42kg up to 45kg",
          "Class B Over 45kg up to 48kg",
          "Class C Over 48kg up to 51kg",
          "Class D Over 51kg up to 54kg",
          "Class E Over 54kg up to 57kg",
        ],
        DEMO: [
          "Tunggal-Ind’l Weapon",
          "Ganda – Double Weapon",
          "Regu-Team Artistic",
        ],
        "MODERN STANDARD SINGLE DANCE": [
          "Waltz",
          "Tango",
          "V-Waltz",
          "Foxtrot",
          "Quickstep",
          "Grade A - W, T, VW, SF, Q",
        ],
      },
      GYMNASTICS: {
        "MAG CLUSTER 3": [
          "Floor Exercise",
          "Vaulting Table",
          "Mushroom",
          "Individual All Around",
          "Horizontal Bar",
          "Team",
        ],
      },
      BOXING: [
        "Pin Weight (SB)",
        "Light Flyweight (SB)",
        "Pin Weight (JB)",
        "Light Flyweight (JB)",
        "Flyweight (JB)",
        "Light Bantam weight (JB)",
        "Bantam Weight (JB)",
        "Minimum Weight (YB)",
        "Flyweight (YB)",
        "Bantam Weight (YB)",
      ],
      SWIMMING: {
        TRACKS: [
          "50M Back Stroke",
          "50M Breaststroke",
          "50M Butterfly",
          "50M Free Style",
          "100M Back Stroke",
          "100M Butterfly",
          "100M Freestyle",
          "200M Backstroke",
          "200M Breaststroke",
          "200M Butterfly",
          "200M Free style",
          "400M Free Style",
          "800M Free Style",
          "1500M Free Style",
          "200M Individual Medley",
          "400M Individual Medley",
          "200M Free style Relay",
          "200M Medley Relay",
          "400M Free style Relay",
          "400M Medley Relay",
        ],
      },
      TAEKWONDO: {
        KYORUGI: [
          "Fin Weight",
          "Fly Weight",
          "Bantam Weight",
          "Feather Weight",
          "Light Weight",
          "Welter Weight",
          "Lt Middle Weight",
        ],
        POOMSAE: [
          "Group A - Individual",
          "Group B - Individual",
          "Team - Event",
          "Mix Pair",
        ],
      },
      WUSHU: {
        "Wushu – Boys (Group A)": ["48kgs", "52kgs", "56kgs"],
        "Wushu – Boys (Group B)": ["42kgs", "45kgs", "48kgs"],
      },
      WRESTLING: [
        "Cadet 42kgs",
        "Cadet 46kgs",
        "Cadet 50kgs",
        "Cadet 54kgs",
        "Junior 54kgs",
        "Junior 58kgs",
        "Junior 62kgs",
        "Junior 66kgs",
      ],
    },
    GIRLS: {
      ARCHERY: [
        "70M Distance",
        "60M Distance",
        "50M Distance",
        "30M Distance",
        "1140 Round",
        "Olympic Round (Ind'l 70M)",
        "Olympic Team Even (70M)",
        "Mixed Team (60M)",
      ],
      ARNIS: [
        "Ind’l Solo Baston (Single Weapon)",
        "Ind’l Doble Baston (Double Weapon)",
        "Team (Synd)-Solo Baston (Single Weapon)",
        "Team (Synd)-Double Baston (Double Weapon)",
        "EVENT Individual Espada Y Daga",
        "EVENT Team Espada Y Daga",
        "Pin Weight (43kg up to 47kg)",
        "Bantam-weight (47kg up to 51kg)",
        "Feather-weight (51kg up to 55kg)",
        "Extra Light weight (55kg up to 60kg)",
        "Half Light weight (60kg up to 65kg)",
      ],
      ATHLETICS: {
        TRACKS: [
          "100M Dash",
          "200M Dash",
          "400M Dash",
          "800M Run",
          "1500M Run",
          "110MH",
          "400MH",
          "3000M Steeple Chase",
          "5000M Run",
          "4x100M Relay",
          "4x400M Relay",
          "2000M Walk",
        ],
        THROWS: ["Javelin Throw", "Discus Throw", "Shot Put"],
        JUMPS: ["High Jump", "Long Jump", "Triple Jump", "Pole Vault"],
      },
      RACKET_GAMES: {
        BADMINTON: ["Singles", "Doubles", "Mixed"],
        TABLE_TENNIS: ["Singles", "Doubles", "Mixed Doubles"],
        TENNIS: ["Singles", "Doubles"],
      },
      BALL_GAMES: [
        "Softball",
        "Basketball (Regular)",
        "Basketball (3 on 3)",
        "Futsal",
        "Volleyball",
      ],
      SEPAK_TAKRAW: ["Best Regu", "Double"],
      BILLIARDS: ["8 Balls", "9 Balls"],
      CHESS: [
        "Standard - Individual",
        "Standard - Team",
        "Rapid - Individual",
        "Rapid - Team",
        "Blitz - Individual",
        "Blitz – Team",
      ],
      PENCAK_SILAT: {
        COMBAT: [
          "Class A Over 42kg up to 45kg",
          "Class B Over 45kg up to 48kg",
          "Class C Over 48kg up to 51kg",
          "Class D Over 51kg up to 54kg",
          "Class E Over 54kg up to 57kg",
        ],
        DEMO: [
          "Tunggal-Ind’l Weapon",
          "Ganda – Double Weapon",
          "Regu-Team Artistic",
        ],
        MODERN_STANDARD_SINGLE_DANCE: [
          "Waltz",
          "Tango",
          "V-Waltz",
          "Foxtrot",
          "Quickstep",
          "Grade A - W, T, VW, SF, Q",
        ],
      },
      GYMNASTICS: {
        WAG_CLUSTER_3: [
          "Floor Exercise",
          "Balance Beam",
          "Vault",
          "Individual All Around",
          "Single Bar",
          "Team",
        ],
        RG: [
          "Ball",
          "Club",
          "Ribbon",
          "Hoop",
          "Ind’l All Around",
          "Team",
        ],
      },
      SWIMMING: {
        TRACKS: [
          "50M Back Stroke",
          "50M Breaststroke",
          "50M Butterfly",
          "50M Free Style",
          "100M Back Stroke",
          "100M Butterfly",
          "100M Freestyle",
          "200M Backstroke",
          "200M Breaststroke",
          "200M Butterfly",
          "200M Free style",
          "400M Free Style",
          "800M Free Style",
          "1500M Free Style",
          "200M Individual Medley",
          "400M Individual Medley",
          "200M Free style Relay",
          "200M Medley Relay",
          "400M Free style Relay",
          "400M Medley Relay",
        ],
      },
      TAEKWONDO: {
        KYORUGI: [
          "Fin Weight",
          "Fly Weight",
          "Bantam Weight",
          "Feather Weight",
          "Light Weight",
          "Welter Weight",
          "Lt Middle Weight",
        ],
        POOMSAE: [
          "Group A - Individual",
          "Group B - Individual",
          "Team - Event",
          "Mix Pair",
        ],
      },
      WUSHU: {
        Wushu_Girls_Group_A: ["48kgs", "52kgs", "56kgs"],
        Wushu_Girls_Group_B: ["42kgs", "45kgs", "48kgs"],
      },
      WRESTLING: [
        "Cadet 42kgs",
        "Cadet 46kgs",
        "Cadet 50kgs",
        "Cadet 54kgs",
        "Junior 54kgs",
        "Junior 58kgs",
        "Junior 62kgs",
        "Junior 66kgs",
      ],
    },
    },
    "PARA GAMES": {
      BOYS: {
        ATHLETICS: [
          "VI-100 M Dash – T11/TB",
          "VI-100 M Dash-T12/LV",
          "VI-100 M Dash-T13/LV",
          "VI-Running Long Jump T11/TB",
          "VI-Running Long Jump-T12/LV",
          "VI-Running Long Jump-T13/LV",
          "VI-Shot Put T11/TB",
          "VI-Shot Put T12/LV",
          "VI-Shot Put T13/LV",
          "ID-100M-15yrs old below (Youth)",
          "ID-100M-16-25yrs old below (Junior)",
          "ID-200M-15yrs old below (Youth)",
          "ID-200M-16-25yrs old below (Junior)",
          "ID-400M-15yrs old below (Youth)",
          "ID-400M-16-25yrs old below (Junior)",
          "ID-4x100M Relay-15yrs old below (Youth)",
          "ID-4x100M Relay-16-25yrs old below (Junior)",
          "ID-Running Long Jump-15yrs old below (Youth)",
          "ID-Running Long Jump-16-25yrs old below (Junior)",
          "ID-Sot Put-T14-15yrs old below (Youth)",
          "ID-Shot Put-T14-16-25yrs old below (Junior)",
          "Goal Boal (VI)",
        ],
        BOCCE: [
          "Bocce-Single T14",
          "Bocce Double T14",
          "Bocce-Mixed Doubles",
          "Bocce-Team",
        ],
        SWIMMING: [
          "OH-50M Ortho Special Event – Freestyle",
          "OH-50M Ortho Special Event – Backstroke",
          "OH-50M Ortho Special – Breaststroke",
          "ID-50M Freestyle",
          "ID-50M Butterfly",
          "ID-50M Backstroke",
          "ID-50M Breaststroke",
        ],
      },
      GIRLS: {
        ATHLETICS: [
          "VI-100 M Dash – T11/TB",
          "VI-100 M Dash-T12/LV",
          "VI-100 M Dash-T13/LV",
          "VI-Running Long Jump T11/TB",
          "VI-Running Long Jump-T12/LV",
          "VI-Running Long Jump-T13/LV",
          "VI-Shot Put T11/TB",
          "VI-Shot Put T12/LV",
          "VI-Shot Put T13/LV",
          "ID-100M-15yrs old below (Youth)",
          "ID-100M-16-25yrs old below (Junior)",
          "ID-200M-15yrs old below (Youth)",
          "ID-200M-16-25yrs old below (Junior)",
          "ID-400M-15yrs old below (Youth)",
          "ID-400M-16-25yrs old below (Junior)",
          "ID-4x100M Relay-15yrs old below (Youth)",
          "ID-4x100M Relay-16-25yrs old below (Junior)",
          "ID-Running Long Jump-15yrs old below (Youth)",
          "ID-Running Long Jump-16-25yrs old below (Junior)",
          "ID-Sot Put-T14-15yrs old below (Youth)",
          "ID-Shot Put-T14-16-25yrs old below (Junior)",
          "Goal Boal (VI)",
        ],
        BOCCE: [
          "Bocce-Single T14",
          "Bocce Double T14",
          "Bocce-Mixed Doubles",
          "Bocce-Team",
        ],
        SWIMMING: [
          "OH-50M Ortho Special Event – Freestyle",
          "OH-50M Ortho Special Event – Backstroke",
          "OH-50M Ortho Special – Breaststroke",
          "ID-50M Freestyle",
          "ID-50M Butterfly",
          "ID-50M Backstroke",
          "ID-50M Breaststroke",
        ],
      },
    },
};

export default function TabulationPage() {
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [activeSubTab, setActiveSubTab] = useState("");
  const [activeSubSubTab, setActiveSubSubTab] = useState(""); // third level dropdown
  const [category, setCategory] = useState("");
  const [gender, setGender] = useState("");
  const [eventSelected, setEventSelected] = useState("");
  const [subEventSelected, setSubEventSelected] = useState("");
  const [sdoSelected, setSdoSelected] = useState("");
  const [medalSelected, setMedalSelected] = useState("");

  // Helper to get sub-sub-tabs (third level) based on activeSubTab
  const getSubSubTabs = () => {
    if (activeSubTab === "Elementary") {
      // Return keys of EVENTS.ELEMENTARY.BOYS (or GIRLS if needed)
      return Object.keys(EVENTS.ELEMENTARY.BOYS);
    } else if (activeSubTab === "Secondary") {
      return Object.keys(EVENTS.SECONDARY.BOYS);
    } else if (activeSubTab === "Best Performing") {
      return Object.keys(BEST_PERFORMING_EVENTS);
    }
    return [];
  };

  // Tabs and sub-tabs structure
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

  return (
    <div className="flex min-h-screen bg-white text-black">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-100 p-6 flex flex-col">
        <h2 className="text-2xl font-bold mb-6">Tabulation</h2>

        {/* Navigation Tabs */}
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
                      {/* Third level dropdown for Elementary, Secondary, Best Performing */}
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
                                // Optionally update category, eventSelected etc. here
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

      {/* Main content */}
      <main className="flex-grow p-6 overflow-auto">
        <h1 className="text-3xl font-bold mb-6">
          {activeSubSubTab || activeSubTab || activeTab}
        </h1>

        {/* Render content based on active tab and sub-tab */}
        {activeTab === "Regular Games" &&
        (activeSubTab === "Elementary" ||
          activeSubTab === "Secondary" ||
          activeSubTab === "Best Performing") &&
        activeSubSubTab ? (
          <div>
            {/* Medal Tables */}
            {category && gender && eventSelected ? (
              <div className="p-4 border rounded shadow-sm max-w-4xl">
                <MedalTable
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
            {/* Summary content as before */}
            <p>No summary data available.</p>
          </div>
        ) : activeTab === "Dashboard" ? (
          <div>
            {/* Dashboard content as before */}
            <p>Dashboard content coming soon.</p>
          </div>
        ) : activeTab === "Athletes List" ? (
          <p>Athletes List content coming soon.</p>
        ) : activeTab === "Protest" ? (
          <p>Protest content coming soon.</p>
        ) : (
          <p>Select a tab to view content.</p>
        )}
      </main>
    </div>
  );
}