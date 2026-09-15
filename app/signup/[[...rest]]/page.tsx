
"use client";

import { Show, SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50">
      <Show when="signed-out">
        <SignIn
          signUpUrl="/signup"
          appearance={{
            elements: {
              rootBox: "w-full max-w-md",
              card: "shadow-xl rounded-2xl",
            },
          }}
        />
      </Show>
    </main>
  );
}

