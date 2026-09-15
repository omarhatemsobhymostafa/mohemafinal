import type { Metadata } from "next";
import { privateMetadata } from "../lib/seo";

export const metadata: Metadata = {
  ...privateMetadata,
  title: "لوحة الحمل",
  description: "لوحة خاصة لمتابعة تقدم الحمل وحساب موعد الولادة المتوقع.",
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

export default function DashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}