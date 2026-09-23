"use client";

import Image from "next/image";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function HomePage() {
  const router = useRouter();
  const { isLoaded, user } = useUser();

  useEffect(() => {
    if (isLoaded && user) {
      router.replace("/dashboard");
    }
  }, [isLoaded, router, user]);

  const getStartedHref = user
    ? "/dashboard"
    : "/signup";

  return (
    <main
      dir="rtl"
      className="relative flex min-h-screen w-full flex-col overflow-hidden bg-[#151219] text-[#e8e0ea] antialiased"
    >
      <div className="pointer-events-none fixed inset-0 z-0 h-full w-full overflow-hidden">
        <Image
          src="/artistic_cozy_intimate_motherhood_visual_a_silhouette_of_a_serene_pregnant.png"
          alt="Femora - مساحة دافئة لمرافقة الأمومة"
          fill
          priority
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-linear-to-b from-[#151219]/90 via-[#151219]/35 to-[#151219]/95" />
        <div className="absolute inset-0 bg-linear-to-t from-[#151219] via-[#151219]/75 to-transparent" />
      </div>

      <div className="relative z-10 flex min-h-screen flex-col justify-between px-5 py-6 sm:px-8">
        <header className="flex items-center justify-center pt-2 text-center">
          <div className="inline-flex items-center gap-2.5 rounded-full border border-[#f3bce1]/20 bg-[#221e26]/70 px-4 py-2 shadow-lg backdrop-blur-md">
            <div className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-[#f3bce1]/20 bg-[#37333b]/60 p-0.5">
              <Image
                src="/logo2.png"
                alt="شعار Femora"
                width={36}
                height={36}
                className="h-full w-full rounded-full object-contain"
              />
            </div>

            <div className="flex flex-col text-right">
              <span className="text-[19px] font-semibold leading-tight tracking-wide text-[#f3bce1]">
                Femora
              </span>
              <span className="text-[11px] leading-none text-[#ebc5ac]">
                ملاذكِ الهادئ لمرافقة الأمومة
              </span>
            </div>
          </div>
        </header>

        <section className="flex grow flex-col justify-end pb-8 text-right">
          <div className="mx-auto flex w-full max-w-md flex-col gap-3.5">
            <div className="inline-flex w-fit items-center gap-1.5 rounded-full border border-[#f3bce1]/25 bg-[#221e26]/80 px-3.5 py-1.5 shadow-sm backdrop-blur-md">
              <span className="text-sm text-[#f3bce1]">✿</span>
              <span className="text-[10px] font-medium text-[#e8e0ea]">
                رعاية دافئة لكل نبضة
              </span>
            </div>

            <h1 className="text-[30px] font-semibold leading-[1.35] text-[#e8e0ea] drop-shadow-md sm:text-[40px]">
              رحلتكِ نحو{" "}
              <span className="text-[#f3bce1] underline decoration-[#f3bce1]/40 underline-offset-8">
                الأمومة
              </span>
              ،
              <br />
              <span className="text-[24px] font-normal text-[#d2c2ca] sm:text-[28px]">
                بكل لحظة وسكون فيها.
              </span>
            </h1>

            <p className="pt-0.5 text-sm leading-relaxed text-[#d2c2ca]/90 drop-shadow-sm sm:text-base">
              Femora يساعدكِ على متابعة رحلة حملكِ أسبوعًا بأسبوع، بطريقة بسيطة،
              هادئة وجميلة كقلبكِ تمامًا.
            </p>

            <div className="mt-4 flex flex-col gap-3">
              <Link
                href={getStartedHref}
                className="flex w-full items-center justify-center gap-2.5 rounded-full border border-[#ffd7f0]/40 bg-[#d6a1c5] px-6 py-4 font-semibold text-[#151219] shadow-xl shadow-[#d6a1c5]/25 transition-all duration-200 hover:bg-[#f3bce1] active:scale-[0.98]"
              >
                <span className="tracking-wide">ابدئي مع Femora</span>
                <span className="text-xl transition-transform">←</span>
              </Link>

              <Link
                href="/signin"
                className="w-full py-2.5 text-center text-xs text-[#d2c2ca] transition-colors hover:text-[#f3bce1] active:opacity-80"
              >
                لديكِ حساب بالفعل؟{" "}
                <span className="font-medium text-[#ebc5ac] underline underline-offset-4">
                  تسجيل الدخول
                </span>
              </Link>
            </div>

            <div className="flex items-center justify-center gap-2 pt-1 text-center">
              <span className="text-sm text-[#f3bce1]/80">✓</span>
              <span className="text-[11px] tracking-wide text-[#d2c2ca]/80">
                خصوصية تامة وآمنة • تجربة هادئة بدون إعلانات
              </span>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
