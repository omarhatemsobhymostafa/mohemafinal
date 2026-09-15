import type { Metadata } from "next";
import { privateMetadata } from "../lib/seo";

export const metadata: Metadata = {
  ...privateMetadata,
  title: "إنشاء حساب",
  description: "أنشئي حسابًا في مهمة وابدئي متابعة رحلة الحمل أسبوعًا بأسبوع.",
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