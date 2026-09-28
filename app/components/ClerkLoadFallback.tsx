"use client";

import { useEffect, useState } from "react";

export default function ClerkLoadFallback() {
  const [isUnavailable, setIsUnavailable] = useState(false);

  useEffect(() => {
    const formRoot = document.getElementById("clerk-sign-in-root");
    if (!formRoot) return;

    const hasSignInForm = () => Boolean(formRoot.querySelector("form"));
    const showUnavailable = () => {
      if (!hasSignInForm()) setIsUnavailable(true);
    };

    const handleResourceError = (event: Event) => {
      const target = event.target;
      if (
        target instanceof HTMLScriptElement &&
        target.src.includes("clerk")
      ) {
        showUnavailable();
      }
    };

    const observer = new MutationObserver(() => {
      if (hasSignInForm()) setIsUnavailable(false);
    });
    observer.observe(formRoot, { childList: true, subtree: true });

    const timeout = window.setTimeout(showUnavailable, 8000);
    window.addEventListener("error", handleResourceError, true);

    if (hasSignInForm()) setIsUnavailable(false);

    return () => {
      window.clearTimeout(timeout);
      window.removeEventListener("error", handleResourceError, true);
      observer.disconnect();
    };
  }, []);

  if (!isUnavailable) return null;

  return (
    <section
      role="alert"
      className="w-full max-w-md rounded-lg border border-error-container bg-surface-container p-6 text-center shadow-xl"
    >
      <h1 className="text-lg font-bold text-on-surface">
        تعذر تحميل تسجيل الدخول
      </h1>
      <p className="mt-2 text-sm leading-6 text-on-surface-variant">
        خدمة المصادقة غير متاحة حاليًا. تحقق من اتصالك أو إعدادات نطاق Clerk، ثم
        أعد المحاولة.
      </p>
      <button
        type="button"
        onClick={() => window.location.reload()}
        className="mt-5 rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-on-primary"
      >
        إعادة المحاولة
      </button>
    </section>
  );
}