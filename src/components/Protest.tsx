"use client";

import React, { useEffect, useState } from "react";
import { getProtests, saveProtests } from "@/lib/localStorageService";
import { useAuth } from "@/context/AuthContext";
import NotificationBell from "./NotificationBell";

interface ProtestData {
  id: string;
  description: string;
  protester: string;
  respondent: string;
  resolution?: string;
  resolved: boolean;
}

interface ProtestProps {
  protestId: string;
}

export default function Protest({ protestId }: ProtestProps) {
  const { userRole } = useAuth();
  const [protests, setProtests] = useState<ProtestData[]>([]);
  const [newProtest, setNewProtest] = useState({
    description: "",
    protester: "",
    respondent: "",
  });
  const [showNotifications, setShowNotifications] = useState(false);
  const [unresolvedCount, setUnresolvedCount] = useState(0);
  const [tabulationAlert, setTabulationAlert] = useState(false);

  useEffect(() => {
    const data = getProtests();
    setProtests(data);
    const unresolved = data.filter((p) => !p.resolved).length;
    setUnresolvedCount(unresolved);
  }, []);

  useEffect(() => {
    if (userRole === "Tabulation Team") {
      const resolvedProtests = protests.filter((p) => p.resolved);
      if (resolvedProtests.length > 0) {
        setTabulationAlert(true);
      }
    }
  }, [protests, userRole]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setNewProtest({ ...newProtest, [e.target.name]: e.target.value });
  };

  const generateUniqueId = () => {
    return Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
  };

  const handleAddProtest = () => {
    if (userRole !== "Tabulation Team") {
      alert("Only Tabulation Team can add protests.");
      return;
    }
    if (!newProtest.description || !newProtest.protester || !newProtest.respondent) {
      alert("Please fill all protest fields.");
      return;
    }
    const protestToAdd: ProtestData = {
      id: generateUniqueId(),
      description: newProtest.description,
      protester: newProtest.protester,
      respondent: newProtest.respondent,
      resolved: false,
    };
    const updated = [...protests, protestToAdd];
    setProtests(updated);
    saveProtests(updated);
    setNewProtest({ description: "", protester: "", respondent: "" });
    setUnresolvedCount(unresolvedCount + 1);
    alert("Protest added and RSAC notified.");
  };

  const handleAddResolution = (id: string) => {
    if (userRole !== "RSAC") {
      alert("Only RSAC can add resolution.");
      return;
    }
    const resolution = prompt("Enter resolution/settlement:");
    if (!resolution) return;
    const updated = protests.map((p) =>
      p.id === id ? { ...p, resolution, resolved: true } : p
    );
    setProtests(updated);
    saveProtests(updated);
    setUnresolvedCount(unresolvedCount - 1);
    alert("Resolution added and Tabulation Team notified.");
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-black">Protest</h2>
        {userRole === "RSAC" && (
          <NotificationBell
            count={unresolvedCount}
            onClick={() => setShowNotifications(!showNotifications)}
          />
        )}
      </div>

      {tabulationAlert && userRole === "Tabulation Team" && (
        <div className="mb-4 p-3 bg-yellow-100 border border-yellow-400 text-yellow-700 rounded">
          Some of your protests have been resolved.
          <button
            className="ml-4 underline"
            onClick={() => setTabulationAlert(false)}
          >
            Dismiss
          </button>
        </div>
      )}

      {userRole === "Tabulation Team" && (
        <div className="mb-6 border border-gray-300 rounded p-4">
          <h3 className="text-lg font-semibold mb-2">Add Protest (Tabulation Team)</h3>
          <textarea
            name="description"
            placeholder="Protest Description"
            value={newProtest.description}
            onChange={handleInputChange}
            className="w-full mb-2 p-2 border border-gray-300 rounded"
            rows={3}
          />
          <input
            type="text"
            name="protester"
            placeholder="Protester"
            value={newProtest.protester}
            onChange={handleInputChange}
            className="w-full mb-2 p-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            name="respondent"
            placeholder="Respondent"
            value={newProtest.respondent}
            onChange={handleInputChange}
            className="w-full mb-2 p-2 border border-gray-300 rounded"
          />
          <button
            onClick={handleAddProtest}
            className="px-4 py-2 bg-black text-white rounded hover:bg-gray-900 transition"
          >
            Submit Protest
          </button>
        </div>
      )}

      <div className="overflow-auto max-h-[400px] border border-gray-300 rounded-md">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50 sticky top-0">
            <tr>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Description
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Protester
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Respondent
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Resolution
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {protests.map((protest) => (
              <tr key={protest.id} className="hover:bg-gray-50">
                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                  {protest.description}
                </td>
                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                  {protest.protester}
                </td>
                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                  {protest.respondent}
                </td>
                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                  {protest.resolution || "-"}
                </td>
                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                  {protest.resolved ? (
                    <span className="text-green-600 font-semibold">RESOLVED</span>
                  ) : (
                    <span className="text-red-600 font-semibold">PENDING</span>
                  )}
                </td>
                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900 space-x-2">
                  {!protest.resolved && userRole === "RSAC" && (
                    <button
                      onClick={() => handleAddResolution(protest.id)}
                      className="px-2 py-1 bg-black text-white rounded hover:bg-gray-900 transition"
                    >
                      Add Resolution
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
