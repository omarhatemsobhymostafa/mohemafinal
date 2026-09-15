"use client";

import { Show, SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50">
      <Show when={'signed-out'}>
        <SignUp
          signInUrl="/signin"
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
