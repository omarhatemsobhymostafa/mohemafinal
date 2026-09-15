  "use client";

  import { useEffect, useState } from "react";

  type AiProps = {
    week?: number | null;
  };

  export default function Ai({ week = null }: AiProps) {
    const [advice, setAdvice] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      let cancelled = false;
      setAdvice("");
      setLoading(true);

      async function loadAdvice() {
        try {
          if (week === null || week === undefined) {
            if (!cancelled) {
              setAdvice("اختاري أسبوع الحمل أولًا 🤍");
              setLoading(false);
            }
            return;
          }

          const currentWeek = Number(week);

          if (
            !Number.isInteger(currentWeek) ||
            currentWeek < 1 ||
            currentWeek > 40
          ) {
            if (!cancelled) {
              setAdvice("أسبوع الحمل غير صحيح.");
              setLoading(false);
            }
            return;
          }

          const cacheKey = `ai_advice_week_${currentWeek}`;
          const cachedAdvice = localStorage.getItem(cacheKey);

          if (cachedAdvice) {
            if (!cancelled) {
              setAdvice(cachedAdvice);
              setLoading(false);
            }
            return;
          }

          const res = await fetch("/api/ai", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              message: `
  أنا في الأسبوع ${currentWeek} من الحمل.

  اكتب نصيحة واحدة فقط مناسبة للأسبوع ${currentWeek} من الحمل.

  الشروط:
  - قصيرة ومفيدة.
  - باللغة العربية.
  - أسلوب دافئ ولطيف.
  - لا تستخدم Markdown.
  - لا تكتب عنوان.
  - لا تزيد عن 3 جمل.
  - لا تضف أي شيء آخر.
  `,
            }),
          });

          const data = await res.json();

          if (!res.ok) {
            throw new Error(data.error || "حدث خطأ في Gemini");
          }

          const generatedAdvice = data.response?.trim();

          if (!generatedAdvice) {
            throw new Error("Gemini لم يرجع نصيحة.");
          }

          localStorage.setItem(cacheKey, generatedAdvice);

          if (!cancelled) {
            setAdvice(generatedAdvice);
          }
        } catch (error) {
          console.error("AI ERROR:", error);

          if (!cancelled) {
            setAdvice(
              error instanceof Error
                ? error.message
                : "حدث خطأ أثناء تحميل نصيحة الأسبوع."
            );
          }
        } finally {
          if (!cancelled) {
            setLoading(false);
          }
        }
      }

      loadAdvice();

      return () => {
        cancelled = true;
      };
    }, [week]);

    return (
      <div
        dir="rtl"
        className="my-3 rounded-3xl border border-[#302a2d] bg-gradient-to-b from-[#211f26] to-[#1a191d] p-4"
      >
        <div className="mb-4 flex items-center gap-3 ">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary text-xl text-on-primary">
            ✦
          </div>

          <div>
            <h2 className="text-xl font-bold text-on-surface">
              نصيحة الأسبوع
            </h2>

            {week && (
              <p className="mt-1 text-sm text-on-surface-variant">
                الأسبوع {week}
              </p>
            )}
          </div>
        </div>

        {loading ? (
          <div className="space-y-3">
            <div className="h-4 w-full animate-pulse rounded-full bg-surface-container-high" />
            <div className="h-4 w-5/6 animate-pulse rounded-full bg-surface-container-high" />
            <div className="h-4 w-3/4 animate-pulse rounded-full bg-surface-container-high" />
          </div>
        ) : (
          <p className="text-base leading-8 text-on-surface-variant">
            {advice}
          </p>
        )}
      </div>
    );
  }