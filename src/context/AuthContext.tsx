"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

interface UserData {
  uid: string;
  email: string;
  role: string;
  name: string;
}

interface AuthContextType {
  user: UserData | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  userRole: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for development
const mockUsers: Record<string, UserData & { password: string }> = {
  "admin@metalysis.com": {
    uid: "admin-001",
    email: "admin@metalysis.com",
    password: "admin123",
    role: "Administrator",
    name: "Admin User"
  },
  "tabulation@metalysis.com": {
    uid: "tab-001",
    email: "tabulation@metalysis.com",
    password: "tab123",
    role: "Tabulation Team",
    name: "Tabulation User"
  },
  "rsac@metalysis.com": {
    uid: "rsac-001",
    email: "rsac@metalysis.com",
    password: "rsac123",
    role: "RSAC",
    name: "RSAC User"
  },
  "social@metalysis.com": {
    uid: "social-001",
    email: "social@metalysis.com",
    password: "social123",
    role: "Social Media Team",
    name: "Social Media User"
  }
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserData | null>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('user');
      return saved ? JSON.parse(saved) : null;
    }
    return null;
  });
  const [loading, setLoading] = useState(false);

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const mockUser = mockUsers[email];
      if (mockUser && mockUser.password === password) {
        setUser(mockUser);
        localStorage.setItem('user', JSON.stringify(mockUser));
      } else {
        throw new Error('Invalid email or password');
      }
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      setUser(null);
      localStorage.removeItem('user');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
        userRole: user?.role ?? null,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
