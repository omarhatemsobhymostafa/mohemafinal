"use client"
import Link from "next/link";

export default function NotFound() {
  return (
    <main
      dir="rtl"
      className="min-h-screen bg-[#131313] text-[#e5e2e1] flex flex-col antialiased"
    >
      {/* Header */}
      <header className="w-full sticky top-0 z-50 bg-[#131313]/70 backdrop-blur-[25px] border-b border-white/5">
        <div className="flex items-center justify-between px-5 md:px-16 h-16 w-full max-w-[1280px] mx-auto">
          <Link
            href="/"
            aria-label="العودة"
            className="text-[#ffb2be] hover:opacity-80 transition-opacity active:scale-95 flex items-center justify-center w-10 h-10 rounded-full"
          >
            <span className="material-symbols-outlined">
              arrow_forward
            </span>
          </Link>

          <h1 className="absolute left-1/2 -translate-x-1/2 text-[26px] md:text-[32px] leading-tight font-semibold tracking-tight">
            مهمة
          </h1>

          <div className="w-10" />
        </div>
      </header>

      {/* Main */}
      <main className="flex-grow flex flex-col items-center justify-center px-5 md:px-16 py-10 relative overflow-hidden">
        {/* Background Glow */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
          <div className="w-[60vw] h-[60vw] max-w-[600px] max-h-[600px] bg-[#ffb2be] rounded-full opacity-5 blur-[120px]" />
        </div>

        {/* Card */}
        <div className="relative z-10 w-full max-w-2xl mx-auto flex flex-col items-center text-center gap-8 bg-[#25292c]/70 backdrop-blur-[25px] border-t border-l border-white/5 p-8 md:p-12 rounded-[24px] shadow-[0_0_40px_-10px_rgba(255,178,190,0.15)]">

          {/* 404 */}
          <div className="w-full max-w-[400px] aspect-[1.79] rounded-2xl overflow-hidden border border-[#524345]/30 mb-4 relative flex items-center justify-center bg-[#201f1f]">
            <div className="absolute inset-0 bg-gradient-to-t from-[#25292c]/80 to-transparent z-10" />

            <span className="relative z-20 text-[80px] md:text-[110px] font-semibold text-[#ffb2be] tracking-tight">
              404
            </span>
          </div>

          {/* Message */}
          <div className="flex flex-col gap-4">
            <h2 className="text-[32px] md:text-[48px] leading-[1.25] font-semibold">
              عذراً، حدث خطأ ما
            </h2>

            <p className="text-[20px] leading-[30px] text-[#E2E2E6] max-w-md mx-auto">
              لا تقلقي، نحن معكِ. دعينا نعود إلى الطريق الصحيح.
            </p>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 mt-4 w-full sm:w-auto">
            <Link
              href="/"
              className="inline-flex items-center justify-center px-8 py-4 bg-[#FFB2BE] text-[#121212] text-base font-bold rounded-full hover:bg-white transition-colors duration-300 shadow-[0_0_20px_-5px_rgba(255,178,190,0.4)] w-full sm:w-auto"
            >
              العودة للرئيسية
            </Link>

            <button
              onClick={() => window.location.reload()}
              className="inline-flex items-center justify-center px-8 py-4 bg-transparent border-2 border-[#524345] text-[#e5e2e1] text-base font-semibold rounded-full hover:border-[#ffb2be] hover:text-[#ffb2be] transition-colors duration-300 w-full sm:w-auto"
            >
              المحاولة مرة أخرى
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full py-8 bg-[#0e0e0e] border-t border-[#524345]/20 mt-auto">
        <div className="flex flex-col md:flex-row-reverse justify-between items-center gap-4 px-5 md:px-16 w-full max-w-[1280px] mx-auto">

          <nav className="flex gap-6 items-center flex-wrap justify-center">
            <Link
              href="/privacy"
              className="text-xs font-semibold text-[#E2E2E6] hover:text-[#ffb2be] transition-colors"
            >
              سياسة الخصوصية
            </Link>

            <Link
              href="/terms"
              className="text-xs font-semibold text-[#E2E2E6] hover:text-[#ffb2be] transition-colors"
            >
              شروط الاستخدام
            </Link>

            <Link
              href="/contact"
              className="text-xs font-semibold text-[#E2E2E6] hover:text-[#ffb2be] transition-colors"
            >
              تواصل معنا
            </Link>
          </nav>

          <div className="flex flex-col items-center md:items-start gap-2">
            <span className="text-sm font-semibold text-[#e5e2e1] opacity-80">
              مهمة
            </span>

            <p className="text-xs text-[#E2E2E6]">
              © 2026 مهمة. جميع الحقوق محفوظة.
            </p>
          </div>

        </div>
      </footer>
    </main>
  );
}