"use client";

import Link from "next/link";

type RouteErrorProps = {
  reset: () => void;
};

export default function RouteError({ reset }: RouteErrorProps) {
  return (
    <main
      dir="rtl"
      className="flex min-h-dvh flex-col bg-[#131313] text-[#e5e2e1] antialiased"
    >
      <header className="border-b border-white/10">
        <div className="mx-auto flex h-16 w-full max-w-7xl items-center px-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="rounded-sm text-xl font-semibold text-[#ffb2be] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#ffb2be]"
          >
            Femora
          </Link>
        </div>
      </header>

      <section className="flex flex-1 items-center justify-center px-4 py-10 sm:px-6">
        <div className="w-full max-w-lg rounded-2xl border border-[#524345] bg-[#1c1b1b] p-5 text-center sm:p-8">
          <p className="text-sm font-semibold text-[#ffb2be]">Femora</p>
          <h1 className="mt-3 text-2xl font-semibold leading-relaxed sm:text-3xl">
            تعذر تحميل هذه الصفحة
          </h1>
          <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-[#d6c2c3] sm:text-base">
            حدثت مشكلة أثناء تحميل المحتوى. يمكنكِ المحاولة مرة أخرى أو العودة
            إلى الصفحة الرئيسية.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <button
              type="button"
              onClick={reset}
              className="inline-flex min-h-12 items-center justify-center rounded-xl bg-[#ffb2be] px-6 py-3 font-semibold text-[#52202b] transition-colors hover:bg-[#ffdade]"
            >
              المحاولة مرة أخرى
            </button>
            <Link
              href="/"
              className="inline-flex min-h-12 items-center justify-center rounded-xl border border-[#524345] px-6 py-3 font-semibold text-[#e5e2e1] transition-colors hover:bg-[#25292c]"
            >
              العودة للرئيسية
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
