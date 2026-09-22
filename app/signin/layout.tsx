import type { Metadata } from "next";
import { privateMetadata } from "../lib/seo";

export const metadata: Metadata = {
  ...privateMetadata,
  title: "تسجيل الدخول",
  description: "سجلي الدخول إلى Femora لمتابعة رحلة الحمل الخاصة بك.",
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

export default function SignInLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}