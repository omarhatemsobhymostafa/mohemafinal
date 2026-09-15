import type { Metadata } from "next";
import { IBM_Plex_Sans_Arabic, Public_Sans } from "next/font/google";
import "./globals.css";
import Header from './components/Header';
import BottomNav from './components/BottomNav';
import UserSync from './components/UserSync';
import { ClerkProvider } from "@clerk/nextjs";
import {
  BASE_URL,
  DEFAULT_DESCRIPTION,
  SITE_NAME,
  SOCIAL_IMAGE,
} from "./lib/seo";

const arabicFont = IBM_Plex_Sans_Arabic({
  variable: "--font-ibm-plex-arabic",
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
});

const publicSans = Public_Sans({
  variable: "--font-public-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: `${SITE_NAME} | دليلك في رحلة الحمل والأمومة`,
    template: "%s | مهمة",
  },
  description: DEFAULT_DESCRIPTION,
  keywords: [
    "مهمة", "الحمل", "الحمل أسبوعًا بأسبوع", "متابعة الحمل", "تطور الجنين",
    "مراحل الحمل", "أعراض الحمل", "نصائح الحمل", "الأمومة", "قرة عيني",
  ],
  authors: [{ name: "مهمة" }],
  creator: "مهمة",
  publisher: "مهمة",
  applicationName: "مهمة",
  category: "health",
  alternates: { canonical: BASE_URL },
  openGraph: {
    type: "website",
    locale: "ar_AR",
    url: BASE_URL,
    siteName: "مهمة",
    title: `${SITE_NAME} | دليلك في رحلة الحمل والأمومة`,
    description: DEFAULT_DESCRIPTION,
    images: [SOCIAL_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} | دليلك في رحلة الحمل والأمومة`,
    description: DEFAULT_DESCRIPTION,
    images: [SOCIAL_IMAGE.url],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
        <ClerkProvider>

    <html
      lang="ar"
      dir="rtl"
      className={`${arabicFont.variable} ${publicSans.variable} h-full antialiased`}
    >
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,400,0,0"
        />
      </head>

      <body className="min-h-full flex flex-col">
        <UserSync />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              { "@context": "https://schema.org", "@type": "Organization", name: "مهمة", url: BASE_URL },
              { "@context": "https://schema.org", "@type": "WebSite", name: "مهمة", url: BASE_URL, inLanguage: "ar" },
            ]),
          }}
        />
        <div className="hidden md:block"> <Header /> </div>
        {children}
        <div className="md:hidden"> <BottomNav /> </div>
      </body>
    </html>
        </ClerkProvider>

  );
}
