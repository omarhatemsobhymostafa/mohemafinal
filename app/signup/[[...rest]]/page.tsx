"use client";

import { Show, SignIn, SignUp, useUser } from "@clerk/nextjs";
import axios from "axios";
import { useEffect } from "react";

export default function SignUpPage() {
  const { user, isLoaded } = useUser();

  useEffect(() => {
    if (!isLoaded || !user) return;

    const createUser = async () => {
      try {
        await axios.post("http://localhost:5000/signup", {
          clerkId: user.id,
        });

        console.log("User created successfully");
      } catch (error) {
        console.error("Signup error:", error);
      }
    };

    createUser();
  }, [isLoaded, user]);

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50">
      <Show when={'signed-out'}>
        <SignUp
          appearance={{
            elements: {
              rootBox: "w-full max-w-md",
              card: "shadow-xl rounded-2xl",
            },
          }}
        />
      </Show>
      <Show when={'signed-in'}>
        <SignIn
          appearance={{
            elements: {
              rootBox: "w-full max-w-md",
              card: "shadow-xl rounded-2xl",
            },
          }}
        />
      </Show>

    </main >
  );
}
