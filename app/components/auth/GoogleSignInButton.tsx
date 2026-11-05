"use client";

import Script from "next/script";
import { useCallback, useRef } from "react";

type GoogleCredentialResponse = {
  credential?: string;
};

type GoogleIdentity = {
  accounts: {
    id: {
      initialize: (options: {
        client_id: string;
        callback: (response: GoogleCredentialResponse) => void;
      }) => void;
      renderButton: (
        element: HTMLElement,
        options: {
          theme: "outline";
          size: "large";
          shape: "pill";
          text: "continue_with";
          width: number;
          locale: "ar";
        },
      ) => void;
    };
  };
};

declare global {
  interface Window {
    google?: GoogleIdentity;
  }
}

type GoogleSignInButtonProps = {
  clientId: string | undefined;
  disabled: boolean;
  onCredential: (credential: string) => Promise<void>;
  onError: (message: string) => void;
};

export default function GoogleSignInButton({
  clientId,
  disabled,
  onCredential,
  onError,
}: GoogleSignInButtonProps) {
  const buttonRef = useRef<HTMLDivElement>(null);

  const renderButton = useCallback(() => {
    const google = window.google;
    const element = buttonRef.current;

    if (!google || !element || !clientId) {
      onError(
        clientId
          ? "تعذر تحميل تسجيل الدخول بجوجل. حاولي تحديث الصفحة."
          : "تسجيل الدخول بجوجل غير مهيأ. أضيفي NEXT_PUBLIC_GOOGLE_CLIENT_ID.",
      );
      return;
    }

    // Google returns a signed credential; the auth provider validates it with our API.
    google.accounts.id.initialize({
      client_id: clientId,
      callback: (response) => {
        if (!response.credential) {
          onError("لم يكتمل تسجيل الدخول بجوجل.");
          return;
        }

        void onCredential(response.credential);
      },
    });
    google.accounts.id.renderButton(element, {
      theme: "outline",
      size: "large",
      shape: "pill",
      text: "continue_with",
      width: Math.floor(element.getBoundingClientRect().width),
      locale: "ar",
    });
  }, [clientId, onCredential, onError]);

  return (
    <>
      <Script
        src="https://accounts.google.com/gsi/client"
        strategy="afterInteractive"
        onReady={renderButton}
        onError={() =>
          onError("تعذر تحميل خدمة تسجيل الدخول بجوجل. حاولي مرة أخرى.")
        }
      />
      <div
        ref={buttonRef}
        aria-busy={disabled}
        className={`flex min-h-10 justify-center overflow-hidden ${
          disabled ? "pointer-events-none opacity-60" : ""
        }`}
      />
    </>
  );
}
