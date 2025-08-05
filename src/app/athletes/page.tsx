"use client";

import React from "react";
import AthletesList from "../../components/AthletesList";

export default function AthletesPage() {
  return (
    <div className="min-h-screen bg-white p-6">
      <h1 className="text-3xl font-bold text-black mb-6">Athletes List</h1>
      <AthletesList />
    </div>
  );
}
