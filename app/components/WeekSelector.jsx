"use client";

import axios from "axios";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const WeekSelector = () => {
  const pathname = usePathname();
  const activeWeekRef = useRef(null);

  const [weeksData, setWeeksData] = useState([]);

  useEffect(() => {
    const getWeeks = async () => {
      try {
        const response = await axios.get(
          "https://mohema.onrender.com/weeksdata/"
        );

        setWeeksData(response.data);
      } catch (error) {
        console.error("Failed to fetch weeks:", error);
      }
    };

    getWeeks();
  }, []);

  // حفظ الأسبوع الحالي
  useEffect(() => {
    const currentWeek = pathname.split("/").pop();

    if (currentWeek?.startsWith("week_")) {
      localStorage.setItem("selectedWeek", currentWeek);
    }
  }, [pathname]);

  // Scroll للأسبوع المختار
  useEffect(() => {
    if (activeWeekRef.current) {
      activeWeekRef.current.scrollIntoView({
        behavior: "instant",
        block: "nearest",
        inline: "center",
      });
    }
  }, [pathname, weeksData]);

return (
  <section
    aria-label="اختيار الأسبوع"
    className="rounded-xl border border-outline-variant bg-surface-container-lowest p-4"
  >
    {/* الثلثات */}
    <div className="mb-5 overflow-x-auto hide-scrollbar">
      <div className="flex w-max gap-3 rounded-full border-2 border-dashed border-stone-700 p-2">
        <Link
          href="/journey/week_4"
          className="shrink-0 whitespace-nowrap rounded-full bg-surface-container px-5 py-2 text-sm font-medium text-on-surface transition hover:scale-105"
        >
          الثلث الأول
        </Link>

        <Link
          href="/journey/week_13"
          className="shrink-0 whitespace-nowrap rounded-full bg-surface-container px-5 py-2 text-sm font-medium text-on-surface transition hover:scale-105"
        >
          الثلث الثاني
        </Link>

        <Link
          href="/journey/week_28"
          className="shrink-0 whitespace-nowrap rounded-full bg-surface-container px-5 py-2 text-sm font-medium text-on-surface transition hover:scale-105"
        >
          الثلث الثالث
        </Link>
      </div>
    </div>

    {/* العنوان */}
    <div className="mb-4 flex items-center gap-2">
      <span className="material-symbols-outlined text-primary">
        calendar_month
      </span>

      <h2 className="font-semibold text-on-surface">
        اختر أسبوع الحمل
      </h2>
    </div>

    {/* الشهور */}
    <div className="hide-scrollbar flex gap-4 overflow-x-auto pb-2">
      {[
        { name: "الشهر الأول", from: 1, to: 4 },
        { name: "الشهر الثاني", from: 5, to: 8 },
        { name: "الشهر الثالث", from: 9, to: 12 },
        { name: "الشهر الرابع", from: 13, to: 16 },
        { name: "الشهر الخامس", from: 17, to: 20 },
        { name: "الشهر السادس", from: 21, to: 24 },
        { name: "الشهر السابع", from: 25, to: 28 },
        { name: "الشهر الثامن", from: 29, to: 32 },
        { name: "الشهر التاسع", from: 33, to: 36 },
        { name: "الشهر العاشر", from: 37, to: 40 },
      ].map((month) => {
        const monthWeeks = weeksData.filter((item) => {
          const week = Number(
            item.weekNumber.replace("week_", "")
          );

          return week >= month.from && week <= month.to;
        });

        if (monthWeeks.length === 0) return null;

        return (
          <div
            key={month.name}
            className="flex shrink-0 flex-col gap-2"
          >
            {/* اسم الشهر */}
            <h3 className="px-2 text-sm font-bold text-stone-400">
              {month.name}
            </h3>

            {/* الأسابيع */}
            <div className="flex w-max gap-2 rounded-full border-2 border-dashed border-stone-700 p-2">
              {monthWeeks.map((item) => {
                const week = Number(
                  item.weekNumber.replace("week_", "")
                );

                const href = `/journey/${item.weekNumber}`;
                const isActive = pathname === href;

                return (
                  <Link
                    key={item.weekNumber}
                    ref={isActive ? activeWeekRef : null}
                    href={href}
                    className={
                      isActive
                        ? "shrink-0 whitespace-nowrap rounded-full bg-primary px-5 py-2 text-sm font-medium text-on-primary shadow-sm"
                        : "shrink-0 whitespace-nowrap rounded-full bg-surface-container px-5 py-2 text-sm font-medium text-on-surface transition hover:scale-105"
                    }
                  >
                    الأسبوع {week}
                  </Link>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  </section>
);


};

export default WeekSelector;