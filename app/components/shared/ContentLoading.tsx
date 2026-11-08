export default function ContentLoading() {
  return (
    <main
      dir="rtl"
      className="min-h-dvh w-full bg-background text-on-background"
    >
      <div className="mx-auto flex w-full max-w-lg flex-col gap-8 px-4 pb-32 pt-6 sm:gap-10 sm:px-6">
        <header className="text-center">
          <div className="skeleton mx-auto mb-4 h-8 w-3/4" />
          <div className="skeleton mx-auto h-4 w-1/2" />
        </header>

        <section aria-label="اختيار الأسبوع">
          <div className="-mx-4 flex snap-x gap-2 overflow-x-auto px-4 py-2 hide-scrollbar sm:-mx-6 sm:px-6">
            {[1, 2, 3, 4, 5].map((item) => (
              <div
                key={item}
                className="skeleton h-10 w-24 shrink-0 rounded-full"
              />
            ))}
          </div>
        </section>

        <section className="flex flex-col gap-4 rounded-xl border border-outline-variant bg-surface-container-lowest p-4 sm:p-6">
          <div className="flex items-center gap-4">
            <div className="skeleton skeleton-circle h-16 w-16 shrink-0" />
            <div className="min-w-0 flex-1">
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

        <section className="flex flex-col gap-3">
          {[1, 2].map((item) => (
            <div
              key={item}
              className="rounded-xl border border-outline-variant bg-surface-container-lowest p-4 sm:p-6"
            >
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
          ))}
        </section>

        <section className="flex items-center justify-between border-t border-outline-variant pt-3">
          <div className="skeleton h-12 w-32 rounded-full" />
          <div className="skeleton h-12 w-32 rounded-full" />
        </section>
      </div>
    </main>
  );
}
