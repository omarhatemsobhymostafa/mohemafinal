import type { Metadata } from "next";
import { privateMetadata } from "../lib/seo";

export const metadata: Metadata = {
  ...privateMetadata,
  title: "لوحة إدارة المحتوى",
  description: "لوحة خاصة لإدارة محتوى أسابيع الحمل.",
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

export default function PanelLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}