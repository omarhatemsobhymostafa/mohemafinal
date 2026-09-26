import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50">
      <SignUp
        routing="path"
        path="/signup"
        signInUrl="/signin"
        forceRedirectUrl="/"
        signInForceRedirectUrl="/"
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