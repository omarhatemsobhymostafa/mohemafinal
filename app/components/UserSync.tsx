"use client";

import { useUser } from "@clerk/nextjs";
import axios from "axios";
import { useEffect } from "react";

export default function UserSync() {
  const { user, isLoaded } = useUser();

  useEffect(() => {
    if (!isLoaded || !user) return;

    axios.post("https://mohema.onrender.com/signup", {
      clerkId: user.id,
    }).catch((error) => {
      console.error("User sync error:", error);
    });
  }, [isLoaded, user]);

  return null;
}
