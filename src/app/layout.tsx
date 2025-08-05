"use client";

import React from "react";
import { AuthProvider, useAuth } from "../context/AuthContext";
import { MedalDataProvider } from "../context/MedalDataContext";
import Header from "../components/Header_updated";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ 
  subsets: ["latin"],
  display: 'swap',
  variable: '--font-inter',
});

function LayoutContent({ children }: { children: React.ReactNode }) {
  const { userRole, loading, user, logout } = useAuth();
  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted || loading) {
    // Render null or a loading placeholder during hydration or loading
    return null;
  }

  const handleLogout = async () => {
    await logout();
  };

  return (
    <>
      {userRole !== "RSAC" && <></>}
      
      <main className="min-h-screen pt-16">{children}</main>
    </>
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`scroll-smooth ${inter.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="antialiased font-sans bg-white">
        <AuthProvider>
          <MedalDataProvider>
            <LayoutContent>{children}</LayoutContent>
          </MedalDataProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
