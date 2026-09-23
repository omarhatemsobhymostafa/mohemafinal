
"use client";

import {
  Show,
  UserButton,
  useUser,
} from "@clerk/nextjs";

import Link from "next/link";
import { usePathname } from "next/navigation";

const BottomNav = () => {
  const pathname = usePathname();
  const { user } = useUser();

  const adminClerkIds = new Set(
    (process.env.NEXT_PUBLIC_ADMIN_CLERK_IDS ?? "")
    .split(",")
    .map((clerkId) => clerkId.trim())
    .filter(Boolean)
  );

  const isAdmin = !!user && adminClerkIds.has(user.id);

  const navItems = [
    {
      href: user ? "/dashboard" : "/",
      icon: "dashboard",
      label: user ? "لوحتي" : "الرئيسية",
      active: user ? pathname.startsWith("/dashboard") : pathname === "/",
    },
    {
      href: "/journey/week_4",
      icon: "calendar_month",
      label: "أسبوع",
      active: pathname.startsWith("/journey"),
    },
    {
      href: "/product",
      icon: "auto_stories",
      label: "قرة عيني",
      active: pathname.startsWith("/product"),
    },
    ...(isAdmin
      ? [{
          href: "/panel",
          icon: "admin_panel_settings",
          label: "الإدارة",
          active: pathname.startsWith("/panel"),
        }]
      : []),
  ];

  return (
    <nav
      dir="rtl"
      className="
        fixed bottom-3 left-3 right-3 z-50
        mx-auto max-w-md
        md:hidden
        rounded-[26px]
        border border-outline-variant/60
        bg-surface-container-lowest/95
        px-5 py-2
        pb-[calc(0.5rem+env(safe-area-inset-bottom))]
        shadow-[0_8px_30px_rgba(0,0,0,0.10)]
        backdrop-blur-xl
      "
    >
      <div className="flex items-center justify-between">

        {/* Navigation */}
        <div className="flex flex-1 items-center justify-around">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`
                relative flex flex-col items-center
                px-4 py-2
                transition-all duration-200
                ${
                  item.active
                    ? "text-primary"
                    : "text-on-surface-variant"
                }
              `}
            >
              {/* Select Effect */}
              {item.active && (
                <div
                  className="
                    absolute inset-0
                    -z-10
                    w-2/3
                    h-11/12
                    m-auto
                    rounded-full
                    bg-primary-container
                    opacity-30
                    blur-sm
                  "
                />
              )}

              <span
                className={`
                  material-symbols-outlined
                  mb-1
                  text-[24px]
                  transition-transform duration-200
                  ${item.active ? "scale-110" : ""}
                `}
              >
                {item.icon}
              </span>

              <span
                className={`
                  text-[10px]
                  transition-all duration-200
                  ${item.active ? "font-bold" : "font-medium"}
                `}
              >
                {item.label}
              </span>
            </Link>
          ))}
        </div>

        {/* Separator */}
        <div className="mx-2 h-8 w-px bg-outline-variant/50" />

        {/* Authentication */}
        <Show when="signed-in">
          <div className="flex items-center justify-center px-1">
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "h-9 w-9",
                },
              }}
            />
          </div>
        </Show>

        <Show when="signed-out">
          <div className="flex items-center gap-1">
            <Link
              href="/signin"
              className="rounded-xl px-2 py-2 text-[11px] font-bold text-primary transition-colors hover:bg-primary-container/40"
            >
              تسجيل الدخول
            </Link>
            <Link
              href="/signup"
              className="rounded-xl bg-primary px-2.5 py-2 text-[11px] font-bold text-on-primary shadow-sm transition-transform hover:scale-105 active:scale-95"
            >
              إنشاء حساب
            </Link>
          </div>
        </Show>

      </div>
    </nav>
  );
};

export default BottomNav;

