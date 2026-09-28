import { SignIn } from "@clerk/nextjs";
import ClerkLoadFallback from "../../components/ClerkLoadFallback";

export default function SignInPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 px-4 py-8">
      <div id="clerk-sign-in-root" className="flex w-full justify-center">
        <SignIn path="/sign-in" routing="path" signUpUrl="/signup" />
      </div>
      <ClerkLoadFallback />
    </div>
  );
}
