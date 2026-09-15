"use client";

import { useUser } from "@clerk/nextjs";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

type Week = {
  _id?: string;
  weekNumber: string;
  babySize: string;
  WhappenInBody: string;
  sympotyms: string;
  babyLooks: string;
  option1: string;
  option2: string;
};

type FieldName = Exclude<keyof Week, "_id" | "weekNumber">;

const API_URL = "http://localhost:5000";
const ADMIN_EMAILS = (process.env.NEXT_PUBLIC_ADMIN_EMAILS ?? "")
  .split(",")
  .map((email) => email.trim().toLowerCase())
  .filter(Boolean);

const fields: Array<{
  name: FieldName;
  label: string;
  hint: string;
  icon: string;
  rows: number;
}> = [
  {
    name: "babySize",
    label: "حجم الجنين",
    hint: "الحجم والتشبيه المناسب لهذا الأسبوع",
    icon: "straighten",
    rows: 3,
  },
  {
    name: "babyLooks",
    label: "تطور طفلك",
    hint: "التغيرات والنمو الذي يحدث للجنين",
    icon: "child_friendly",
    rows: 6,
  },
  {
    name: "WhappenInBody",
    label: "جسمك هذا الأسبوع",
    hint: "التغيرات الجسدية التي قد تلاحظها الأم",
    icon: "woman",
    rows: 6,
  },
  {
    name: "sympotyms",
    label: "الأعراض",
    hint: "الأعراض الشائعة والنصائح المرتبطة بها",
    icon: "healing",
    rows: 5,
  },
  {
    name: "option1",
    label: "نصيحة إضافية",
    hint: "معلومة أو نصيحة اختيارية تظهر في صفحة الأسبوع",
    icon: "lightbulb",
    rows: 4,
  },
  {
    name: "option2",
    label: "نصيحة إضافية",
    hint: "محتوى اختياري آخر، اتركيه فارغاً إذا لم تحتاجيه",
    icon: "lightbulb",
    rows: 4,
  },
];

const emptyWeek = (weekNumber = "week_1"): Week => ({
  weekNumber,
  babySize: "",
  WhappenInBody: "",
  sympotyms: "",
  babyLooks: "",
  option1: "",
  option2: "",
});

export default function PanelPage() {
  const router = useRouter();
  const { user, isLoaded } = useUser();
  const [weeks, setWeeks] = useState<Week[]>([]);
  const [selectedWeek, setSelectedWeek] = useState("week_1");
  const [week, setWeek] = useState<Week>(emptyWeek());
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const isAdmin =
    !!user &&
    (user.publicMetadata?.role === "admin" ||
      user.emailAddresses.some(({ emailAddress }) =>
        ADMIN_EMAILS.includes(emailAddress.toLowerCase())
      ));

  useEffect(() => {
    if (isLoaded && !isAdmin) {
      router.replace("/dashboard");
      return;
    }

    if (!isLoaded || !isAdmin) return;

    axios
      .get<Week[]>(`${API_URL}/weeksdata`)
      .then((response) => {
        setWeeks(response.data);
        if (response.data.length > 0) {
          const firstWeek = response.data[0];
          setSelectedWeek(firstWeek.weekNumber);
          setWeek(firstWeek);
        }
      })
      .catch(() => setMessage({ type: "error", text: "تعذر تحميل بيانات الأسابيع" }))
      .finally(() => setIsLoading(false));
  }, [isAdmin, isLoaded, router]);

  if (!isLoaded) {
    return <main dir="rtl" className="min-h-screen bg-[#121214] text-[#f5eef0] flex items-center justify-center">جارٍ التحقق من权限...</main>;
  }

  if (!isAdmin) {
    return <main dir="rtl" className="min-h-screen bg-[#121214] text-[#f5eef0] flex items-center justify-center">غير مسموح لك بالدخول إلى لوحة الإدارة.</main>;
  }

  const filteredWeeks = useMemo(() => {
    const query = search.trim();
    if (!query) return weeks;

    return weeks.filter((item) => item.weekNumber.replace("week_", "").includes(query));
  }, [search, weeks]);

  function selectWeek(weekNumber: string) {
    const nextWeek = weeks.find((item) => item.weekNumber === weekNumber);
    if (!nextWeek) return;
    setSelectedWeek(weekNumber);
    setWeek(nextWeek);
    setMessage(null);
  }

  function updateField(name: FieldName, value: string) {
    setWeek((current) => ({ ...current, [name]: value }));
    setMessage(null);
  }

  async function saveWeek() {
    setIsSaving(true);
    setMessage(null);

    try {
      const response = await axios.patch<{
        week: Week;
      }>(`${API_URL}/weeksdata/${selectedWeek}`, week);
      const savedWeek = response.data.week;
      setWeek(savedWeek);
      setWeeks((current) => current.map((item) => (item.weekNumber === selectedWeek ? savedWeek : item)));
      setMessage({ type: "success", text: "تم حفظ تغييرات الأسبوع بنجاح" });
    } catch {
      setMessage({ type: "error", text: "تعذر الحفظ. تأكدي من تشغيل الخادم ثم حاولي مرة أخرى" });
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <main dir="rtl" className="min-h-screen bg-[#121214] text-[#f5eef0] pb-10">
      <div className="mx-auto flex min-h-screen w-full max-w-[1440px] flex-col px-4 py-5 sm:px-6 lg:px-10 lg:py-8">
        <header className="mb-8 flex flex-col gap-5 border-b border-[#302a2d] pb-6 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#633642] bg-[#3a2027] px-3 py-1 text-xs font-semibold text-[#ffb2be]">
              <span className="material-symbols-outlined text-[16px]">edit_note</span>
              مساحة الإدارة
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight text-[#f5eef0] sm:text-4xl">محرر أسابيع الحمل</h1>
            <p className="mt-2 max-w-2xl text-sm leading-7 text-[#bdb5ba]">حدّثي تفاصيل رحلة الحمل أسبوعاً بأسبوع من مكان واحد، مع معاينة سريعة للمحتوى قبل نشره.</p>
          </div>
          <Link href="/dashboard" className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#633642] bg-[#211f24] px-4 py-3 text-sm font-bold text-[#ffb2be] transition hover:bg-[#3a2027]">
            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            العودة للوحة الرئيسية
          </Link>
        </header>

        <section className="grid flex-1 gap-5 lg:grid-cols-[260px_minmax(0,1fr)]">
          <aside className="rounded-2xl border border-[#302a2d] bg-gradient-to-b from-[#211f26] to-[#1a191d] p-4 shadow-[0_0_25px_rgba(255,178,190,0.05)]">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="text-[11px] font-bold text-[#8e878c]">المحتوى المتاح</p>
                <h2 className="mt-1 text-lg font-bold">اختاري أسبوعاً</h2>
              </div>
              <span className="rounded-lg border border-[#633642] bg-[#3a2027] px-2 py-1 text-xs font-bold text-[#ffb2be]">{weeks.length || "-"}</span>
            </div>
            <label className="relative mb-4 block">
              <span className="material-symbols-outlined pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[18px] text-[#8e878c]">search</span>
              <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="ابحثي برقم الأسبوع" className="w-full rounded-xl border border-[#302a2d] bg-[#18171c] py-2.5 pr-10 pl-3 text-sm text-[#f5eef0] outline-none transition placeholder:text-[#70696e] focus:border-[#ffb2be]/60" />
            </label>
            <div className="hide-scrollbar flex max-h-[540px] flex-row gap-2 overflow-x-auto pb-1 lg:flex-col lg:overflow-y-auto lg:overflow-x-hidden">
              {isLoading ? (
                <p className="px-2 py-5 text-sm text-[#8e878c]">جارٍ تحميل الأسابيع...</p>
              ) : filteredWeeks.length === 0 ? (
                <p className="px-2 py-5 text-sm text-[#8e878c]">لا توجد نتائج</p>
              ) : (
                filteredWeeks.map((item) => {
                  const number = item.weekNumber.replace("week_", "");
                  const isActive = item.weekNumber === selectedWeek;
                  return (
                    <button key={item.weekNumber} type="button" onClick={() => selectWeek(item.weekNumber)} className={`flex shrink-0 items-center justify-between rounded-xl border px-3 py-3 text-right text-sm transition lg:w-full ${isActive ? "border-[#ffb2be]/60 bg-[#3a2027] text-[#ffb2be] shadow-[0_0_14px_rgba(255,178,190,0.1)]" : "border-[#302a2d] bg-[#18171c] text-[#bdb5ba] hover:border-[#633642] hover:text-[#f5eef0]"}`}>
                      <span>الأسبوع {number}</span>
                      <span className={`material-symbols-outlined text-[17px] ${isActive ? "text-[#ffb2be]" : "text-[#70696e]"}`}>{isActive ? "edit" : "chevron_left"}</span>
                    </button>
                  );
                })
              )}
            </div>
          </aside>

          <div className="min-w-0">
            <section className="mb-5 rounded-2xl border border-[#633642]/60 bg-gradient-to-r from-[#2c1e24] via-[#211f26] to-[#1e1c22] p-4 sm:p-5">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-[#ffb2be]/30 bg-[#40242e] text-[#ffb2be]"><span className="material-symbols-outlined text-[25px]">calendar_month</span></div>
                  <div>
                    <p className="text-xs font-medium text-[#8e878c]">أنتِ تعدّلين الآن</p>
                    <h2 className="text-xl font-extrabold text-[#f5eef0]">الأسبوع {selectedWeek.replace("week_", "")}</h2>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-xs text-[#bdb5ba]"><span className="h-2 w-2 rounded-full bg-emerald-400" />المحتوى محفوظ في قاعدة البيانات</div>
              </div>
            </section>

            <div className="grid gap-5 xl:grid-cols-[minmax(0,1.4fr)_minmax(280px,0.6fr)]">
              <section className="rounded-2xl border border-[#302a2d] bg-gradient-to-b from-[#232128] to-[#1c1b21] p-4 sm:p-6">
                <div className="mb-6 flex items-start justify-between gap-3 border-b border-[#302a2d] pb-5">
                  <div>
                    <p className="text-[11px] font-bold text-[#ffb2be]">بيانات الأسبوع</p>
                    <h2 className="mt-1 text-xl font-bold">المعلومات الأساسية</h2>
                  </div>
                  <span className="material-symbols-outlined text-[24px] text-[#d6c59d]">fact_check</span>
                </div>
                <div className="grid gap-5">
                  {fields.map((field) => (
                    <label key={field.name} className="block">
                      <span className="mb-2 flex items-center gap-2 text-sm font-bold text-[#f5eef0]"><span className="material-symbols-outlined text-[18px] text-[#ffb2be]">{field.icon}</span>{field.label}</span>
                      <span className="mb-2 block text-[11px] text-[#8e878c]">{field.hint}</span>
                      <textarea rows={field.rows} value={week[field.name] || ""} onChange={(event) => updateField(field.name, event.target.value)} className="w-full resize-y rounded-xl border border-[#302a2d] bg-[#18171c] px-3 py-3 text-sm leading-7 text-[#f5eef0] outline-none transition placeholder:text-[#70696e] focus:border-[#ffb2be]/60 focus:ring-1 focus:ring-[#ffb2be]/20" placeholder="اكتبي محتوى هذا القسم هنا..." />
                    </label>
                  ))}
                </div>
                <div className="mt-6 flex flex-col-reverse gap-3 border-t border-[#302a2d] pt-5 sm:flex-row sm:items-center sm:justify-between">
                  <div aria-live="polite" className={`text-sm ${message?.type === "error" ? "text-red-300" : "text-[#b9efc5]"}`}>{message?.text}</div>
                  <button type="button" onClick={saveWeek} disabled={isSaving || isLoading || !week.weekNumber} className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#6e2b3e] via-[#8c354e] to-[#6e2b3e] px-5 py-3 text-sm font-bold text-[#fff5f6] shadow-[0_4px_18px_rgba(140,53,78,0.35)] transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50">
                    <span className="material-symbols-outlined text-[18px]">{isSaving ? "sync" : "save"}</span>
                    {isSaving ? "جارٍ حفظ التغييرات..." : "حفظ تغييرات الأسبوع"}
                  </button>
                </div>
              </section>


            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
