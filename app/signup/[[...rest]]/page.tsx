"use client";

import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50">
      <SignUp
        signInUrl="/sign-in"
        appearance={{
          elements: {
            rootBox: "w-full max-w-md",
            card: "shadow-xl rounded-2xl",
          },
        }}
      />
    </main>
  );
}