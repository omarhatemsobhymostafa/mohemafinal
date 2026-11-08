
"use client";

import { useAuth } from "../auth/AuthProvider";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Header = () => {
  const pathname = usePathname();
  const { user, signOut } = useAuth();

  const navLinks = [
    { name: user ? "لوحة الحمل" : "الرئيسية", path: user ? "/dashboard" : "/" },
    { name: "أسبوع بأسبوع", path: "/journey/week_4" },
    { name: "قرة عيني", path: "/product" },
    ...(user?.role === "admin" ? [{ name: "لوحة الإدارة", path: "/panel" }] : []),
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-surface-variant bg-surface">
      <nav className="mx-auto flex w-full max-w-7xl flex-row-reverse items-center justify-between px-container-padding py-4">
        

        <Link
          href={user ? "/dashboard" : "/"}
          className="flex cursor-pointer items-center gap-4"
        >
          <span className="text-xl font-bold text-primary md:text-2xl">
            Femora
          </span>
        </Link>

        {/* Navigation */}
        <ul className="hidden flex-row-reverse items-center gap-8 md:flex">
          {navLinks.map((link) => {
            const isActive = pathname === link.path;

            return (
              <li key={link.path}>
                <Link
                  href={link.path}
                  className={`text-sm font-medium ${
                    isActive
                      ? "border-b-2 border-primary pb-1 font-bold text-primary"
                      : "text-on-surface-variant"
                  }`}
                >
                  {link.name}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* CTA and authentication */}
        <div className="hidden items-center gap-3 md:flex">
          {user ? (
            <>
              <Link
                href="/dashboard"
                className="inline-block rounded-full bg-primary-container px-6 py-2.5 text-sm font-semibold text-on-primary-container"
              >
                لوحة الحمل
              </Link>
              <button
                type="button"
                onClick={signOut}
                className="rounded-full px-3 py-2.5 text-sm font-semibold text-on-surface-variant transition-colors hover:bg-primary-container/40"
              >
                تسجيل الخروج
              </button>
            </>
          ) : (
            <>
              <Link
                href="/sign-in"
                className="rounded-full px-4 py-2.5 text-sm font-semibold text-primary transition-colors hover:bg-primary-container/40"
              >
                تسجيل الدخول
              </Link>
              <Link
                href="/signup"
                className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-on-primary transition-transform hover:scale-105"
              >
                إنشاء حساب
              </Link>
            </>
          )}
        </div>

      </nav>
    </header>
  );
};

export default Header;
