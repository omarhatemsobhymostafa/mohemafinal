
"use client";

import { Show, UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Header = () => {
  const pathname = usePathname();
  const { user } = useUser();

  const adminClerkIds = new Set(
    (process.env.NEXT_PUBLIC_ADMIN_CLERK_IDS ?? "")
    .split(",")
    .map((clerkId) => clerkId.trim())
    .filter(Boolean)
  );

  const isAdmin = !!user && adminClerkIds.has(user.id);

  const navLinks = [
    { name: user ? "لوحة الحمل" : "الرئيسية", path: user ? "/dashboard" : "/" },
    { name: "أسبوع بأسبوع", path: "/journey" },
    { name: "قرة عيني", path: "/product" },
    ...(isAdmin ? [{ name: "لوحة الإدارة", path: "/panel" }] : []),
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-surface-variant bg-surface/80 shadow-sm backdrop-blur-md">
      <nav className="mx-auto flex w-full max-w-7xl flex-row-reverse items-center justify-between px-container-padding py-4">
        

        <Show when={'signed-in'}>
          <UserButton/>
        </Show>
        <Link
          href={user ? "/dashboard" : "/"}
          className="flex cursor-pointer items-center gap-4"
        >
          <span className="text-xl font-bold text-primary md:text-2xl">
            مهمة
          </span>
        </Link>

        {/* Mobile Menu Button */}
        <button
          type="button"
          className="rounded-full p-2 text-primary md:hidden"
          aria-label="فتح القائمة"
        >
          <span className="material-symbols-outlined">
            menu
          </span>
        </button>

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

        {/* CTA */}
        <div className="hidden md:block">
          <Link
            href={user ? "/dashboard" : "/journey"}
            className="inline-block rounded-full bg-primary-container px-6 py-2.5 text-sm font-semibold text-on-primary-container"
          >
            {user ? "لوحة الحمل" : "ابدئي رحلتك"}
          </Link>
        </div>

      </nav>
    </header>
  );
};

export default Header;

