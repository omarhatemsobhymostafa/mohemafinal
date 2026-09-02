
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const Header = () => {
  const pathname = usePathname();

  const navLinks = [
    { name: "الرئيسية", path: "/" },
    { name: "أسبوع بأسبوع", path: "/journey" },
    { name: "قرة عيني", path: "/product" },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-surface-variant bg-surface/80 shadow-sm backdrop-blur-md">
      <nav className="mx-auto flex w-full max-w-7xl flex-row-reverse items-center justify-between px-container-padding py-4">
        
        {/* Logo */}
        <Link
          href="/"
          className="flex cursor-pointer items-center gap-4"
        >
          <span className="text-xl font-bold text-primary md:text-2xl">
            مهمة
          </span>
        </Link>

        {/* Mobile Menu Button */}
        <button
          type="button"
          className="rounded-full p-2 text-primary transition-colors hover:bg-surface-variant/20 md:hidden"
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
                  className={`text-sm font-medium transition-colors hover:text-primary ${
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
            href="/journey"
            className="inline-block rounded-full bg-primary-container px-6 py-2.5 text-sm font-semibold text-on-primary-container transition-all hover:opacity-80"
          >
            ابدئي رحلتك
          </Link>
        </div>

      </nav>
    </header>
  );
};

export default Header;

