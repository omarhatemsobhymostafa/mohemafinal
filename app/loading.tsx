
export default function Loading() {
  return (
    <main
      dir="rtl"
      className="flex min-h-screen items-center justify-center bg-[#131313]"
    >
      <div className="flex flex-col items-center gap-6 text-center">
        <div>
          <h1 className="text-5xl font-bold text-[#ffb2be]">
            مهمة
          </h1>

        </div>

        <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#ffb2be]/20 border-t-[#ffb2be]" />

        <p className="text-sm text-white/70">
          جاري التحميل...
        </p>
      </div>
    </main>
  );
}

