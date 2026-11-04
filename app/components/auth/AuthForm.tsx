"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState, type FormEvent } from "react";
import { useAuth } from "./AuthProvider";

type AuthFormProps = {
  mode: "sign-in" | "sign-up";
};

export default function AuthForm({ mode }: AuthFormProps) {
  const isSignUp = mode === "sign-up";
  const router = useRouter();
  const { signIn, signUp, status, user } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (user) router.replace("/dashboard");
  }, [router, user]);

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
      router.replace("/dashboard");
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

  return (
    <main
      dir="rtl"
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#151219] px-4 py-10 text-[#e8e0ea]"
    >
      <Image
        src="/artistic_cozy_intimate_motherhood_visual_a_silhouette_of_a_serene_pregnant.png"
        alt=""
        fill
        priority
        className="object-cover object-center opacity-30"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#151219]/70 to-[#151219]" />

      <section className="relative z-10 w-full max-w-md rounded-3xl border border-[#f3bce1]/20 bg-[#211f26]/95 p-6 shadow-2xl backdrop-blur sm:p-8">
        <Link href="/" className="mb-6 flex justify-center">
          <Image
            src="/logo.png"
            alt="Femora"
            width={140}
            height={50}
            className="h-14 w-auto object-contain"
          />
        </Link>

        <div className="mb-6 text-center">
          <p className="mb-2 text-sm font-medium text-[#f3bce1]">
            مساحتكِ الدافئة والآمنة
          </p>
          <h1 className="text-2xl font-bold">
            {isSignUp ? "ابدئي رحلتكِ معنا" : "أهلًا بعودتكِ"}
          </h1>
          <p className="mt-2 text-sm leading-6 text-[#d2c2ca]">
            {isSignUp
              ? "أنشئي حسابًا لمتابعة رحلة حملكِ أسبوعًا بأسبوع."
              : "سجّلي الدخول لمتابعة بيانات حملكِ."}
          </p>
        </div>

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
                className="mt-2 w-full rounded-xl border border-[#633642] bg-[#18171c] px-4 py-3 text-[#f5eef0] outline-none focus:border-[#f3bce1]"
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
              className="mt-2 w-full rounded-xl border border-[#633642] bg-[#18171c] px-4 py-3 text-[#f5eef0] outline-none focus:border-[#f3bce1]"
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
              className="mt-2 w-full rounded-xl border border-[#633642] bg-[#18171c] px-4 py-3 text-[#f5eef0] outline-none focus:border-[#f3bce1]"
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
                className="mt-2 w-full rounded-xl border border-[#633642] bg-[#18171c] px-4 py-3 text-[#f5eef0] outline-none focus:border-[#f3bce1]"
                placeholder="أعيدي كتابة كلمة المرور"
              />
            </label>
          )}

          {message && (
            <p className="text-sm text-[#ffb2be]" role="alert">
              {message}
            </p>
          )}

          <button
            type="submit"
            disabled={isSubmitting || status === "loading"}
            className="w-full rounded-full bg-[#d6a1c5] px-6 py-3.5 font-bold text-[#151219] transition hover:bg-[#f3bce1] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting
              ? "جارٍ الإرسال..."
              : isSignUp
                ? "إنشاء حساب"
                : "تسجيل الدخول"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-[#d2c2ca]">
          {isSignUp ? "لديكِ حساب بالفعل؟ " : "ليس لديكِ حساب؟ "}
          <Link
            href={isSignUp ? "/sign-in" : "/signup"}
            className="font-semibold text-[#f3bce1] underline underline-offset-4"
          >
            {isSignUp ? "تسجيل الدخول" : "إنشاء حساب"}
          </Link>
        </p>
      </section>
    </main>
  );
}
