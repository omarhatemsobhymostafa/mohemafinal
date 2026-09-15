"use client"
import { SignInButton, useUser } from "@clerk/nextjs";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Ai from './../components/Ai'

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
    const { user, isLoaded } = useUser();
    const [lastPeriod, setLastPeriod] = useState("");
    const [isSaving, setIsSaving] = useState(false);
    const [saveMessage, setSaveMessage] = useState("");
    const pregnancyStats = getPregnancyStats(lastPeriod);

    useEffect(() => {
      if (isLoaded && !user) {
        router.replace("/");
        return;
      }

      if (!user) return;

      axios.get(`https://mohema.onrender.com/users/${user.id}`)
        .then((response) => {
          const savedDate = response.data.user?.pregnancies?.[0]?.lastPeriod;
          if (savedDate) {
            setLastPeriod(new Date(savedDate).toISOString().slice(0, 10));
          }
        })
        .catch((error) => {
          if (error.response?.status !== 404) {
            console.error("User data fetch error:", error);
          }
        });
    }, [isLoaded, router, user]);

    if (!isLoaded) {
      return (
        <main dir="rtl" className="min-h-screen bg-[#121214] text-[#f5eef0] flex items-center justify-center">
          جارٍ التحقق من تسجيل الدخول...
        </main>
      );
    }

    if (!user) {
      return (
        <main dir="rtl" className="min-h-screen bg-[#121214] text-[#f5eef0] flex items-center justify-center px-6">
          <div className="text-center">
            <h1 className="mb-3 text-2xl font-bold">يجب تسجيل الدخول للوصول إلى لوحة الحمل</h1>
            <p className="mb-6 text-[#bdb5ba]">قم بتسجيل الدخول أولاً لعرض بيانات الحمل والرحلة الأسبوعية.</p>
            <SignInButton mode="modal">
              <button className="rounded-lg bg-[#6e2b3e] px-6 py-3 font-bold text-[#fff5f6]">
                تسجيل الدخول
              </button>
            </SignInButton>
          </div>
        </main>
      );
    }

    async function savePregnancyDate() {
      if (!user || !lastPeriod) return;

      setIsSaving(true);
      setSaveMessage("");

      try {
        await axios.patch(`https://mohema.onrender.com/users/${user.id}/pregnancy`, {
          lastPeriod,
        });
        setSaveMessage("تم حفظ التاريخ بنجاح");
      } catch (error) {
        console.error("Pregnancy date save error:", error);
        setSaveMessage("تعذر حفظ التاريخ");
      } finally {
        setIsSaving(false);
      }
    }

  return (
    <main
      dir="rtl"
      className="min-h-screen bg-[#121214] text-[#f5eef0] antialiased"
    >
      <div
        id="app-wrapper"
        className="w-full max-w-[390px] mx-auto min-h-screen relative flex flex-col bg-[#121214] shadow-2xl overflow-x-hidden pb-24"
      >
        {/* =========================
            Header
        ========================== */}
        <header className="sticky top-0 right-0 left-0 h-16 bg-[#121214]/90 backdrop-blur-xl z-40 flex items-center justify-between px-4 border-b border-[#302a2d] shadow-md">
          <div className="flex items-center gap-3">
            {/* Profile Avatar */}
            <div className="relative w-10 h-10 rounded-full bg-gradient-to-tr from-[#3a2027] to-[#542a35] text-[#ffb2be] flex items-center justify-center font-bold text-sm shadow-md ring-1 ring-[#ffb2be]/30">
              <span className="material-symbols-outlined text-[20px]">
                person
              </span>

              {/* Online Indicator */}
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 ring-2 ring-[#121214]" />
            </div>

            {/* User Info */}
            <div className="flex flex-col text-right">
              <span className="font-bold text-[14px] text-[#f5eef0] leading-snug">
                {user?.fullName}
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
        <main className="w-full px-4 pt-4 pb-6 flex flex-col gap-4">

          {/* =========================
              Welcome Card
          ========================== */}
          <section className="relative z-10 w-full rounded-2xl bg-gradient-to-b from-[#211f26] to-[#1a191d] p-4 border border-[#302a2d] flex flex-col gap-3 shadow-[0_0_25px_rgba(255,178,190,0.08)]">
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
                أهلاً بيكي، {user?.firstName} 👋
              </h1>

              {/* Description */}
              <p className="text-[12.5px] text-[#bdb5ba] leading-relaxed">
                نتمنى لكِ ولطفلكِ يوماً مريحاً مفعماً بالسكينة والرضا 🌸
              </p>
            </div>
          </section>

          {/* =========================
              Pregnancy Calculator
          ========================== */}
          <section className="w-full rounded-2xl bg-gradient-to-b from-[#232128] to-[#1c1b21] p-4 border border-[#633642]/40 flex flex-col gap-3 relative overflow-hidden">

            {/* Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">

                {/* Icon */}
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#40242e] to-[#29171e] text-[#ffb2be] flex items-center justify-center border border-[#ffb2be]/30">
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
                  className="w-full rounded-lg bg-[#211f24] border border-[#ffb2be]/30 px-3 py-2 text-[#ffb2be] outline-none focus:border-[#ffb2be]"
                />

                <button
                  type="button"
                  onClick={savePregnancyDate}
                  disabled={!user || !lastPeriod || isSaving}
                  className="w-full rounded-lg bg-[#6e2b3e] px-3 py-2 text-[12px] font-bold text-[#fff5f6] transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50"
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
          <section className="w-full rounded-2xl bg-gradient-to-b from-[#232128] to-[#1c1b21] p-4 border border-[#302a2d] flex flex-col gap-4 relative overflow-hidden">

            {/* Decorative Glow */}
            <div className="absolute -top-12 -left-12 w-32 h-32 bg-[#ffb2be]/10 rounded-full blur-2xl pointer-events-none" />

            {/* Card Header */}
            <div className="flex items-center justify-between relative z-10">

              <div className="flex items-center gap-2.5">

                {/* Icon */}
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#40242e] to-[#29171e] text-[#ffb2be] flex items-center justify-center shadow-md border border-[#ffb2be]/30">
                  <span className="material-symbols-outlined text-[22px]">
                    pregnant_woman
                  </span>
                </div>

                <div>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-[#8e878c] block">
                    المسار الأول
                  </span>

                  <h2 className="text-[17px] font-bold text-[#f5eef0] flex items-center gap-1.5">
                    حملي 🤰
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
              <div className="col-span-1 flex flex-col items-center justify-center p-2 rounded-lg bg-[#211f24] border border-[#302a2d] shadow-inner text-center">
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
              <div className="relative w-full h-2.5 bg-[#17161b] rounded-full overflow-hidden border border-[#302a2d] p-[1px]">
                <div
                  className="h-full bg-gradient-to-r from-[#d97d91] to-[#ffb2be] rounded-full shadow-[0_0_10px_rgba(255,178,190,0.5)]"
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
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-[#6e2b3e] via-[#8c354e] to-[#6e2b3e] hover:brightness-110 text-[#fff5f6] font-bold text-[13px] shadow-[0_4px_18px_rgba(140,53,78,0.4)] active:scale-[0.98] transition-all border border-[#ffb2be]/30"
            >
              <span>
                متابعة تفاصيل الحمل
              </span>

              <span className="material-symbols-outlined text-[16px]">
                arrow_back
              </span>
              </Link>
          </section>


        </main>

      </div>
    </main>
  );
}