
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const BottomNav = () => {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 z-50 flex w-full items-center justify-between border-t border-outline-variant bg-surface-container-lowest px-12 py-2 pb-safe shadow-lg md:hidden">

      {/* الرئيسية */}
      <Link
        href="/"
        className={`relative flex flex-col items-center ${pathname === "/"
          ? "text-primary"
          : "text-on-surface-variant"
          }`}
      >
        {pathname === "/" && (
          <div className="absolute inset-0 -z-10 scale-150 rounded-full bg-primary-container opacity-30 blur-sm" />
        )}
        <span className="material-symbols-outlined mb-1">
          home
        </span>
        
        <span className="text-[10px]">
          الرئيسية
        </span>
      </Link>

      {/* أسبوع بأسبوع */}
      <Link
        href="/journey/week_4"
        className={`relative flex flex-col items-center ${pathname === "/journey/week_4"
          ? "text-primary"
          : "text-on-surface-variant"
          }`}
      >
        {pathname === "/journey/week_4" && (
          <div className="absolute inset-0 -z-10 scale-150 rounded-full bg-primary-container opacity-30 blur-sm" />
        )}

        <span className="material-symbols-outlined mb-1">
          calendar_month
        </span>

        <span className="text-[10px]">
          أسبوع
        </span>
      </Link>

      {/* قرة عيني */}
      <Link
        href="/product"
        className={`relative flex flex-col items-center ${pathname === "/product"
          ? "text-primary"
          : "text-on-surface-variant"
          }`}
      >
        {pathname === "/product" && (
          <div className="absolute inset-0 -z-10 scale-150 rounded-full bg-primary-container opacity-30 blur-sm" />
        )}
        <span className="material-symbols-outlined mb-1">
          auto_stories
        </span>

        <span className="text-[10px]">
          قرة عيني
        </span>
      </Link>



    </nav>
  );
};

export default BottomNav;

