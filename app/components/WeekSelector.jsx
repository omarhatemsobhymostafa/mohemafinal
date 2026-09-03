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
      <div className="mb-3 flex items-center gap-2">
        <span className="material-symbols-outlined text-primary">
          calendar_month
        </span>

        <h2 className="font-semibold text-on-surface">
          اختر أسبوع الحمل
        </h2>
      </div>

      <div className="hide-scrollbar flex gap-2 overflow-x-auto py-2">
        {weeksData.map((item) => {
          const href = `/journey/${item.weekNumber}`;
          const isActive = pathname === href;

          return (
            <Link
              key={item.weekNumber}
              ref={isActive ? activeWeekRef : null}
              href={href}
              className={
                isActive
                  ? "shrink-0 whitespace-nowrap rounded-full bg-primary px-6 py-2 text-sm font-medium text-on-primary shadow-sm"
                  : "shrink-0 whitespace-nowrap rounded-full bg-surface-container px-6 py-2 text-sm font-medium text-on-surface"
              }
            >
              الأسبوع {item.weekNumber.replace("week_", "")}
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default WeekSelector;