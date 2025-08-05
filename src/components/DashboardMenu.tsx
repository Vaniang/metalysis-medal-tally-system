"use client";

import React from "react";

interface MenuItem {
  label: string;
  href: string;
  icon?: React.ReactNode;
}

interface DashboardMenuProps {
  items: MenuItem[];
  currentPath: string;
  onNavigate: (href: string) => void;
}

export function DashboardMenu({ items, currentPath, onNavigate }: DashboardMenuProps) {
  return (
    <nav className="bg-white shadow rounded-md p-4 mb-6">
      <ul className="flex space-x-4">
        {items.map((item) => (
          <li key={item.href}>
            <button
              onClick={() => onNavigate(item.href)}
              className={`px-3 py-2 rounded-md text-sm font-medium focus:outline-none ${
                currentPath === item.href
                  ? "bg-black text-white"
                  : "text-gray-700 hover:bg-gray-200"
              }`}
            >
              {item.icon && <span className="mr-2">{item.icon}</span>}
              {item.label}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
