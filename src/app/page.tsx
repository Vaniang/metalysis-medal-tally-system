"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";

export default function HomePage() {
  const { userRole, user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/login");
      return;
    }
    if (userRole === "Tabulation Team") {
      router.push("/tabulation");
    } else if (userRole === "RSAC") {
      router.push("/rsac");
    } else if (userRole === "Administrator") {
      router.push("/medal-tally");
    } else if (userRole === "Social Media Team") {
      router.push("/social-media");
    } else {
      router.push("/login");
    }
  }, [user, userRole, router]);

  return null;
}
