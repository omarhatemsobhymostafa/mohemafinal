import type { Metadata } from "next";
import { privateMetadata } from "../lib/seo";

export const metadata: Metadata = {
  ...privateMetadata,
  title: "تسجيل الدخول",
  description:
    "سجّلي الدخول إلى Femora لمتابعة الحمل أسبوعًا بأسبوع والوصول إلى بيانات رحلتكِ المحفوظة.",
  keywords: ["تسجيل الدخول", "حساب Femora", "متابعة الحمل"],
  openGraph: {
    title: "تسجيل الدخول إلى Femora",
    description:
      "تابعي رحلة حملكِ وبياناتكِ المحفوظة عبر تسجيل الدخول إلى Femora.",
    siteName: "Femora",
    locale: "ar_AR",
    type: "website",
  },
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