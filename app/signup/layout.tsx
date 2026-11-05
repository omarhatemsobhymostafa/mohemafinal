import type { Metadata } from "next";
import { privateMetadata } from "../lib/seo";

export const metadata: Metadata = {
  ...privateMetadata,
  title: "إنشاء حساب",
  description:
    "أنشئي حسابًا في Femora لمتابعة الحمل وتطور طفلكِ أسبوعًا بأسبوع.",
  keywords: ["إنشاء حساب", "حساب Femora", "الحمل أسبوعًا بأسبوع"],
  openGraph: {
    title: "إنشاء حساب في Femora",
    description:
      "ابدئي متابعة حملكِ وتطور طفلكِ أسبوعًا بأسبوع مع حساب Femora.",
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

export default function SignUpLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}