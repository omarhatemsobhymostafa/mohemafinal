"use client"
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Ai from "../components/pregnancy/Ai";
import { useAuth } from "../components/auth/AuthProvider";
import { apiRequest, ApiError } from "../lib/api";

type Pregnancy = {
  lastPeriodDate: string;
  dueDate: string;
  currentWeek: number;
  currentDay: number;
};

function getPregnancyStats(lastPeriod: string) {
  if (!lastPeriod) return null;

  const periodDate = new Date(`${lastPeriod}T00:00:00`);
  const elapsedDays = Math.max(
    0,
    Math.floor((Date.now() - periodDate.getTime()) / 86400000),
  );
  const week = Math.min(40, Math.floor(elapsedDays / 7) + 1);
  const day = elapsedDays % 7;
  const progress = Math.min(100, Math.round((elapsedDays / 280) * 100));
  const dueDate = new Date(periodDate);
  dueDate.setDate(dueDate.getDate() + 280);

  return {
    week,
    day,
    progress,
    remainingWeeks: Math.max(0, 40 - Math.floor(elapsedDays / 7)),
    dueDate: dueDate.toLocaleDateString("ar-EG", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }),
  };
}

export default function HomePage() {
    const router = useRouter();
    const { user, status, error: authError } = useAuth();
    const [lastPeriod, setLastPeriod] = useState("");
    const [pregnancy, setPregnancy] = useState<Pregnancy | null>(null);
    const [isLoadingPregnancy, setIsLoadingPregnancy] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [saveMessage, setSaveMessage] = useState("");
    const pregnancyStats = getPregnancyStats(lastPeriod);

    useEffect(() => {
      if (status === "unauthenticated") {
        router.replace("/sign-in");
        return;
      }

      if (status !== "authenticated") return;

      let cancelled = false;
      apiRequest<{ pregnancies: Pregnancy[] }>("/api/v1/get-pregnancy")
        .then(({ pregnancies }) => {
          if (cancelled) return;
          const currentPregnancy = pregnancies[0] ?? null;
          setPregnancy(currentPregnancy);
          setLastPeriod(
            currentPregnancy?.lastPeriodDate
              ? currentPregnancy.lastPeriodDate.slice(0, 10)
              : "",
          );
        })
        .catch((error: unknown) => {
          if (cancelled) return;
          if (error instanceof ApiError && error.status === 404) {
            setPregnancy(null);
            setLastPeriod("");
            return;
          }
          setSaveMessage(
            error instanceof Error
              ? error.message
              : "تعذر تحميل بيانات الحمل.",
          );
        })
        .finally(() => {
          if (!cancelled) setIsLoadingPregnancy(false);
        });

      return () => {
        cancelled = true;
      };
    }, [router, status]);

    if (status === "loading" || status === "error") {
      return (
        <main dir="rtl" className="min-h-screen bg-[#121214] text-[#f5eef0] flex items-center justify-center">
          {status === "loading"
            ? "جارٍ التحقق من تسجيل الدخول..."
            : authError ?? "تعذر الاتصال بالخادم للتحقق من الحساب. أعيدي تحميل الصفحة."}
        </main>
      );
    }

    if (!user) {
      return (
        <main dir="rtl" className="min-h-screen bg-[#121214] text-[#f5eef0] flex items-center justify-center px-6 ">
          <div className="text-center">
            <h1 className="mb-3 text-2xl font-bold">يجب تسجيل الدخول للوصول إلى لوحة الحمل</h1>
            <p className="mb-6 text-[#bdb5ba]">قم بتسجيل الدخول أولاً لعرض بيانات الحمل والرحلة الأسبوعية.</p>
            <Link href="/sign-in" className="rounded-lg bg-[#6e2b3e] px-6 py-3 font-bold text-[#fff5f6]">
              تسجيل الدخول
            </Link>
          </div>
        </main>
      );
    }

    async function savePregnancyDate() {
      if (!user || !lastPeriod) return;

      setIsSaving(true);
      setSaveMessage("");

      try {
        const result = await apiRequest<{ pregnancy: Pregnancy }>(
          pregnancy
            ? "/api/v1/update-pregnancy"
            : "/api/v1/create-pregnancy",
          {
            method: pregnancy ? "PATCH" : "POST",
            body: JSON.stringify({ lastPeriodDate: lastPeriod }),
          },
        );
        setPregnancy(result.pregnancy);
        setLastPeriod(result.pregnancy.lastPeriodDate.slice(0, 10));
        setSaveMessage("تم حفظ التاريخ بنجاح");
      } catch (error) {
        setSaveMessage(
          error instanceof Error ? error.message : "تعذر حفظ التاريخ",
        );
      } finally {
        setIsSaving(false);
      }
    }

    if (isLoadingPregnancy) {
      return (
        <main dir="rtl" className="min-h-screen bg-[#121214] text-[#f5eef0] flex items-center justify-center">
          جارٍ تحميل بيانات الحمل...
        </main>
      );
    }

  return (
    <main
      dir="rtl"
      className="min-h-screen bg-[#121214] text-[#f5eef0] antialiased "
    >
      <div
        id="app-wrapper"
        className="relative mx-auto flex min-h-dvh w-full max-w-[1440px] flex-col overflow-x-hidden bg-[#121214] pb-24 lg:border-x lg:border-[#302a2d]"
      >
        {/* =========================
            Header
        ========================== */}
        <header className="sticky top-0 right-0 left-0 z-40 flex h-16 items-center justify-between border-b border-[#302a2d] bg-[#121214] px-4 lg:px-8">
          <div className="flex items-center gap-3">
            {/* Profile Avatar */}
            <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-[#40242e] text-sm font-bold text-[#ffb2be] ring-1 ring-[#ffb2be]/30">
              <span className="material-symbols-outlined text-[20px]">
                person
              </span>

              {/* Online Indicator */}
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 ring-2 ring-[#121214]" />
            </div>

            {/* User Info */}
            <div className="flex flex-col text-right">
              <span className="font-bold text-[14px] text-[#f5eef0] leading-snug">
                {user.name}
              </span>

              <span className="text-[11px] text-[#ffb2be] font-medium leading-none mt-0.5">
                    {pregnancyStats ? `الأسبوع ${pregnancyStats.week} (حامل)` : "لم يتم اختيار التاريخ"}
              </span>
            </div>
          </div>
        </header>

        {/* =========================
            Main Content
        ========================== */}
        <section className="grid w-full grid-cols-1 items-start gap-4 px-4 pb-6 pt-4 sm:gap-5 lg:px-8 xl:grid-cols-12 xl:gap-6">

          {/* =========================
              Welcome Card
          ========================== */}
          <section className="relative z-10 flex w-full flex-col gap-3 rounded-2xl border border-[#302a2d] bg-[#211f26] p-4 sm:p-5 xl:col-span-12 xl:flex-row xl:items-center xl:justify-between xl:px-7 xl:py-6">
            <div className="space-y-1.5">

              {/* Badge */}
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#3a2027] border border-[#633642] text-[#ffb2be] text-[11px] font-medium">
                <span className="material-symbols-outlined text-[14px]">
                  favorite
                </span>

                <span>مساحتكِ الدافئة والآمنة</span>
              </div>

              {/* Title */}
              <h1 className="text-[21px] font-extrabold text-[#f5eef0] tracking-tight leading-snug">
                أهلاً بيكي، {user.name.split(" ")[0]} 
              </h1>

              {/* Description */}
              <p className="text-[12.5px] text-[#bdb5ba] leading-relaxed">
                نتمنى لكِ ولطفلكِ يوماً مريحاً مفعماً بالسكينة والرضا 🌸
              </p>
            </div>
            <div className="hidden min-w-[280px] items-center gap-3 rounded-xl border border-[#633642]/50 bg-[#18171c] px-4 py-3 xl:flex">
              <span className="material-symbols-outlined flex h-11 w-11 shrink-0  items-center content-center justify-center rounded-full bg-[#40242e] text-center text-[22px] text-[#ffb2be]">
                calendar_month
              </span>
              <div className="min-w-0">
                <span className="block text-[11px] text-[#8e878c]">
                  {pregnancyStats ? "رحلتكِ الآن" : "ابدئي رحلتكِ"}
                </span>
                <span className="mt-1 block text-sm font-bold text-[#f5eef0]">
                  {pregnancyStats
                    ? `الأسبوع ${pregnancyStats.week} من الحمل`
                    : "حددي تاريخ آخر دورة"}
                </span>
                {pregnancyStats && (
                  <span className="mt-0.5 block text-xs text-[#ffb2be]">
                    موعد الولادة المتوقع: {pregnancyStats.dueDate}
                  </span>
                )}
              </div>
            </div>
          </section>

          {/* =========================
              Pregnancy Calculator
          ========================== */}
          <section className="relative flex w-full flex-col gap-3 overflow-hidden rounded-2xl border border-[#633642]/40 bg-[#232128] p-4 sm:p-5 xl:col-span-5 xl:p-6">

            {/* Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">

                {/* Icon */}
                <div className="w-8 h-8 rounded-lg bg-[#40242e] text-[#ffb2be] flex items-center justify-center border border-[#ffb2be]/30">
                  <span className="material-symbols-outlined text-[18px]">
                    calendar_month
                  </span>
                </div>

                <div>
                  <span className="text-[10px] text-[#8e878c] font-bold block">
                    حاسبة الحمل التفاعلية
                  </span>

                  <h3 className="text-[14px] font-bold text-[#f5eef0] leading-tight">
                    تاريخ أول يوم لآخر دورة (LMP)
                  </h3>
                </div>
              </div>

              {/* Medical Badge */}
              <span className="px-2.5 py-1 rounded-full bg-[#3a2027] border border-[#633642] text-[#ffb2be] text-[11px] font-semibold flex items-center gap-1">
                <span className="material-symbols-outlined text-[13px]">
                  verified
                </span>

                معتمد طبياً
              </span>
            </div>

            {/* Calculator Box */}
            <div className="p-3 rounded-xl bg-[#18171c] border border-[#302a2d] flex flex-col gap-2.5">

              {/* Small Info */}
              <div className="flex items-center justify-between text-[11px] text-[#bdb5ba]">
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[#ffb2be] text-[15px]">
                    edit_calendar
                  </span>

                  منتقي التاريخ المباشر:
                </span>

                <span className="text-[#d6c59d] text-[10.5px]">
                  دورة منتظمة (٢٨ يوماً)
                </span>
              </div>

              {/* Date picker */}
              <div className="flex flex-col gap-2">
                <label htmlFor="last-period" className="text-[10px] text-[#8e878c]">
                  اختاري تاريخ أول يوم لآخر دورة
                </label>

                <input
                  id="last-period"
                  type="date"
                  value={lastPeriod}
                  onChange={(event) => setLastPeriod(event.target.value)}
                  className="min-h-11 w-full rounded-lg border border-[#ffb2be]/30 bg-[#211f24] px-3 py-2 text-[#ffb2be] outline-none focus:border-[#ffb2be]"
                />

                <button
                  type="button"
                  onClick={savePregnancyDate}
                  disabled={!user || !lastPeriod || isSaving}
                  className="min-h-11 w-full rounded-lg bg-[#6e2b3e] px-3 py-2 text-[12px] font-bold text-[#fff5f6] transition-colors hover:bg-[#8c354e] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {isSaving ? "جارٍ الحفظ..." : "حفظ التاريخ"}
                </button>

                {saveMessage && (
                  <span className="text-[11px] text-[#ffb2be]" role="status">
                    {saveMessage}
                  </span>
                )}
              </div>

              {/* Pregnancy Age */}
              <div className="flex items-center justify-between pt-2 border-t border-[#302a2d]/60 text-[11px]">
                <span className="text-[#8e878c] flex items-center gap-1">
                  <span className="material-symbols-outlined text-[13px] text-[#ffb2be]">
                    timelapse
                  </span>

                  العمر الجنيني المحسوب:
                </span>

                <span className="font-bold text-[#ffb2be] text-[12px] bg-[#3a2027] px-2 py-0.5 rounded-md border border-[#633642]/50">
                  {pregnancyStats
                    ? `${pregnancyStats.week} أسبوعاً و ${pregnancyStats.day} أيام`
                    : "اختاري تاريخ آخر دورة"}
                </span>
              </div>
            </div>
          </section>

          {/* =========================
              Pregnancy Tracking
          ========================== */}
          <section className="relative flex w-full min-w-0 flex-col gap-4 overflow-hidden rounded-2xl border border-[#302a2d] bg-[#232128] p-4 sm:p-5 xl:col-span-7 xl:p-6">

            {/* Decorative Glow */}
            {/* Card Header */}
            <div className="flex items-center justify-between relative z-10">

              <div className="flex items-center gap-2.5">

                {/* Icon */}
                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#ffb2be]/30 bg-[#40242e] text-[#ffb2be]">
                  <span className="material-symbols-outlined text-[22px]">
                    pregnant_woman
                  </span>
                </div>

                <div>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-[#8e878c] block">
                    المسار الأول
                  </span>

                  <h2 className="text-[17px] font-bold text-[#f5eef0] flex items-center gap-1.5">
                    حملي 
                  </h2>
                </div>
              </div>
            </div>

            {/* =========================
                Current Week
            ========================== */}
            <div className="grid grid-cols-3 gap-2.5 items-center bg-[#18171c] rounded-xl p-3 border border-[#302a2d]">

              <div className="col-span-2 space-y-0.5">
                <span className="text-[11px] text-[#8e878c] block">
                  المرحلة الحالية
                </span>

                <p className="text-[17px] font-extrabold text-[#f5eef0] leading-tight">
                  {pregnancyStats ? `الأسبوع ${pregnancyStats.week}` : "لم يبدأ الحساب"}
                </p>

                <span className="text-[12px] text-[#ffb2be] font-medium block">
                  {pregnancyStats ? "حمل نشط" : "اختاري تاريخ آخر دورة"}
                </span>
              </div>

              {/* Baby Size */}
              <div className="col-span-1 flex flex-col items-center justify-center rounded-lg border border-[#302a2d] bg-[#211f24] p-2 text-center">
                <span className="text-2xl font-medium text-[#ffb2be]">
                  {pregnancyStats?.remainingWeeks ?? 40}
                </span>

                <span className="text-[10px] text-[#8e878c] block mt-0.5">
                 اسبوع متبقي
                </span>

                <span className="text-[11px] font-bold text-[#ffb2be] block leading-tight">
                  
                </span>
              </div>
            </div>

            {/* =========================
                Progress
            ========================== */}
            <div className="space-y-1.5">

              <div className="flex justify-between items-center text-[12px]">
                <span className="font-medium text-[#f5eef0]">
                  اكتمال الرحلة: {pregnancyStats?.progress ?? 0}٪
                </span>

                <span className="text-[#ffb2be] font-bold text-[11px] flex items-center gap-1">
                  <span>
                    متبقي {pregnancyStats?.remainingWeeks ?? 40} أسبوعًا
                  </span>

                  <span>✨</span>
                </span>
              </div>

              {/* Progress Bar */}
              <div className="relative w-full h-2.5 bg-[#17161b] rounded-full overflow-hidden border border-[#302a2d] p-px">
                <div
                  className="h-full rounded-full bg-[#ffb2be]"
                  style={{ width: `${pregnancyStats?.progress ?? 0}%` }}
                />
              </div>

              {/* Progress Labels */}
              <div className="flex justify-between text-[10px] text-[#8e878c] px-0.5">
                <span>الأسبوع ١</span>
                <span>الأسبوع ٢٠</span>
                <span>الأسبوع ٤٠</span>
              </div>
            </div>

            {/* =========================
                Due Date
            ========================== */}
            <div className="flex items-center justify-between text-[12px] bg-[#18171c] border border-[#302a2d] px-3 py-2 rounded-xl">

              <span className="text-[#bdb5ba] flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[#d6c59d] text-[18px]">
                  event_available
                </span>

                موعد الولادة المتوقع:
              </span>

              <span className="text-[#ffb2be] font-bold">
                {pregnancyStats?.dueDate ?? "سيظهر بعد اختيار التاريخ"}
              </span>
            </div>

            {/* =========================
                Weekly Tip
            ========================== */}
     
            <Ai week={pregnancyStats?.week} />


            {/* =========================
                CTA
            ========================== */}
            <Link
              href={`/journey/week_${pregnancyStats?.week}`}
              className="flex min-h-12 w-full items-center justify-center gap-2 rounded-xl border border-[#ffb2be]/30 bg-[#8c354e] py-3 text-[13px] font-bold text-[#fff5f6] transition-colors hover:bg-[#a44760]"
            >
              <span>
                متابعة تفاصيل الحمل
              </span>

              <span className="material-symbols-outlined text-[16px]">
                arrow_back
              </span>
              </Link>
          </section>


        </section>

      </div>
    </main>
  );
}