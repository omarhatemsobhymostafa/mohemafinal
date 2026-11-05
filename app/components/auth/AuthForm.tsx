"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState, type FormEvent } from "react";
import { useAuth } from "./AuthProvider";
import GoogleSignInButton from "./GoogleSignInButton";

type AuthFormProps = {
  mode: "sign-in" | "sign-up";
};

const fieldClassName =
  "mt-2 w-full rounded-xl border border-[#633642] bg-[#18171c] px-4 py-3 text-[#f5eef0] outline-none transition placeholder:text-[#8e878c] focus:border-[#ffb2be]";

export default function AuthForm({ mode }: AuthFormProps) {
  const isSignUp = mode === "sign-up";
  const router = useRouter();
  const { signIn, signInWithGoogle, signUp, status, user } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (status === "authenticated" && user) {
      router.replace("/dashboard");
    }
  }, [router, status, user]);

  // Keep the shared form simple while delegating each auth method to the provider.
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");

    if (isSignUp && password !== confirmPassword) {
      setMessage("كلمتا المرور غير متطابقتين.");
      return;
    }

    setIsSubmitting(true);
    try {
      if (isSignUp) {
        await signUp(name.trim(), email.trim(), password);
      } else {
        await signIn(email.trim(), password);
      }
    } catch (submitError) {
      setMessage(
        submitError instanceof Error
          ? submitError.message
          : "تعذر تسجيل الدخول. حاولي مرة أخرى.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleGoogleCredential(credential: string) {
    setMessage("");
    setIsSubmitting(true);
    try {
      await signInWithGoogle(credential);
    } catch (submitError) {
      setMessage(
        submitError instanceof Error
          ? submitError.message
          : "تعذر تسجيل الدخول بجوجل. حاولي مرة أخرى.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  const isBusy = isSubmitting || status === "loading";

  return (
    <main
      dir="rtl"
      className="flex min-h-[calc(100vh-5rem)] items-center justify-center bg-[#121214] px-4 py-10 pb-32 text-[#f5eef0] antialiased md:px-6"
    >
      <section className="w-full max-w-md rounded-3xl border border-[#302a2d] bg-[#211f26] p-6 shadow-[0_0_35px_rgba(255,178,190,0.08)] sm:p-8">
        <Link
          href="/"
          className="mb-6 block text-center text-2xl font-extrabold tracking-tight text-[#ffb2be]"
        >
          Femora
        </Link>

        <header className="mb-6 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl border border-[#ffb2be]/30 bg-[#40242e] text-[#ffb2be]">
            <span className="material-symbols-outlined">
              {isSignUp ? "person_add" : "favorite"}
            </span>
          </div>
          <h1 className="mt-4 text-2xl font-extrabold text-[#f5eef0]">
            {isSignUp ? "ابدئي رحلتكِ مع فيمورا" : "أهلًا بعودتكِ"}
          </h1>
          <p className="mt-2 text-sm leading-6 text-[#bdb5ba]">
            {isSignUp
              ? "أنشئي حسابًا لمتابعة رحلة حملكِ أسبوعًا بأسبوع."
              : "سجّلي الدخول لمتابعة بيانات حملكِ المحفوظة."}
          </p>
        </header>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {isSignUp && (
            <label className="block text-sm font-medium" htmlFor="name">
              الاسم
              <input
                id="name"
                name="name"
                autoComplete="name"
                required
                minLength={2}
                value={name}
                onChange={(event) => setName(event.target.value)}
                className={fieldClassName}
                placeholder="اسمكِ"
              />
            </label>
          )}

          <label className="block text-sm font-medium" htmlFor="email">
            البريد الإلكتروني
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className={fieldClassName}
              placeholder="name@example.com"
              dir="ltr"
            />
          </label>

          <label className="block text-sm font-medium" htmlFor="password">
            كلمة المرور
            <input
              id="password"
              name="password"
              type="password"
              autoComplete={isSignUp ? "new-password" : "current-password"}
              required
              minLength={isSignUp ? 8 : 1}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className={fieldClassName}
              placeholder={isSignUp ? "٨ أحرف على الأقل" : "كلمة المرور"}
            />
          </label>

          {isSignUp && (
            <label
              className="block text-sm font-medium"
              htmlFor="confirm-password"
            >
              تأكيد كلمة المرور
              <input
                id="confirm-password"
                name="confirm-password"
                type="password"
                autoComplete="new-password"
                required
                minLength={8}
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
                className={fieldClassName}
                placeholder="أعيدي كتابة كلمة المرور"
              />
            </label>
          )}

          {message && (
            <p
              className="rounded-xl border border-red-400/20 bg-red-950/30 px-3 py-2 text-sm text-red-200"
              role="alert"
            >
              {message}
            </p>
          )}

          <button
            type="submit"
            disabled={isBusy}
            className="w-full rounded-xl bg-[#8c354e] px-6 py-3.5 font-bold text-[#fff5f6] shadow-[0_4px_18px_rgba(140,53,78,0.35)] transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting
              ? "جارٍ الإرسال..."
              : isSignUp
                ? "إنشاء حساب"
                : "تسجيل الدخول"}
          </button>
        </form>

        <div className="mt-5 space-y-4">
          <div className="flex items-center gap-3 text-xs text-[#8e878c]">
            <span className="h-px flex-1 bg-[#633642]" />
            <span>أو تابعي باستخدام</span>
            <span className="h-px flex-1 bg-[#633642]" />
          </div>
          <GoogleSignInButton
            clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}
            disabled={isBusy}
            onCredential={handleGoogleCredential}
            onError={setMessage}
          />
        </div>

        <p className="mt-6 text-center text-sm text-[#bdb5ba]">
          {isSignUp ? "لديكِ حساب بالفعل؟ " : "ليس لديكِ حساب؟ "}
          <Link
            href={isSignUp ? "/sign-in" : "/signup"}
            className="font-bold text-[#ffb2be] underline underline-offset-4"
          >
            {isSignUp ? "تسجيل الدخول" : "إنشاء حساب"}
          </Link>
        </p>
      </section>
    </main>
  );
}
