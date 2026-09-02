"use client"
import "./../../globals.css";


export default function Loading() {
  return (
    <main className="min-h-screen w-full bg-background text-on-background font-arabic">
      {/* Main Content */}
      <main className="mx-auto flex w-full max-w-lg flex-col gap-10 px-6 pb-32 pt-6">
        {/* Header Skeleton */}
        <header className="text-center">
          <div className="skeleton mx-auto mb-4 h-8 w-3/4" />
          <div className="skeleton mx-auto h-4 w-1/2" />
        </header>

        {/* Week Selector */}
        <section aria-label="اختيار الأسبوع">
          <div className="-mx-6 flex snap-x gap-2 overflow-x-auto px-6 py-2 hide-scrollbar">
            {[1, 2, 3, 4, 5].map((item) => (
              <div
                key={item}
                className="skeleton h-10 w-24 shrink-0 rounded-full"
              />
            ))}
          </div>
        </section>

        {/* Hero Card */}
        <section className="flex flex-col gap-4 rounded-xl border border-outline-variant bg-surface-container-lowest p-6 shadow-[0_10px_30px_rgba(0,0,0,0.2)]">
          <div className="flex items-center gap-4">
            <div className="skeleton skeleton-circle h-16 w-16 shrink-0" />

            <div className="flex-grow">
              <div className="skeleton mb-2 h-6 w-1/3" />
              <div className="skeleton h-4 w-2/3" />
            </div>
          </div>

          <div className="skeleton h-48 w-full rounded-lg" />

          <div className="mt-2 grid grid-cols-2 gap-4">
            <div className="skeleton h-20 w-full rounded-lg" />
            <div className="skeleton h-20 w-full rounded-lg" />
          </div>
        </section>

        {/* Content Cards */}
        <section className="flex flex-col gap-3">
          {/* Development */}
          <div className="rounded-xl border border-outline-variant bg-surface-container-lowest p-6 shadow-[0_10px_30px_rgba(0,0,0,0.2)]">
            <div className="mb-4 flex items-center gap-3">
              <div className="skeleton skeleton-circle h-6 w-6" />
              <div className="skeleton h-6 w-1/3" />
            </div>

            <div className="flex flex-col gap-2">
              <div className="skeleton h-4 w-full" />
              <div className="skeleton h-4 w-full" />
              <div className="skeleton h-4 w-3/4" />
            </div>
          </div>

          {/* Body Changes */}
          <div className="rounded-xl border border-outline-variant bg-surface-container-lowest p-6 shadow-[0_10px_30px_rgba(0,0,0,0.2)]">
            <div className="mb-4 flex items-center gap-3">
              <div className="skeleton skeleton-circle h-6 w-6" />
              <div className="skeleton h-6 w-1/3" />
            </div>

            <div className="flex flex-col gap-2">
              <div className="skeleton h-4 w-full" />
              <div className="skeleton h-4 w-full" />
              <div className="skeleton h-4 w-3/4" />
            </div>
          </div>
        </section>

        {/* Navigation Buttons */}
        <section className="flex items-center justify-between border-t border-outline-variant pt-3">
          <div className="skeleton h-12 w-32 rounded-full" />
          <div className="skeleton h-12 w-32 rounded-full" />
        </section>
      </main>
    </main>
  );
}

