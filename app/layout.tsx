import type { Metadata } from "next";
import { IBM_Plex_Sans_Arabic, Public_Sans } from "next/font/google";
import "./globals.css";
import Header from './components/Header';
import BottomNav from './components/BottomNav';

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

const BASE_URL = "https://mohema.vercel.app";
const socialImage = { url: "/og-image.png", alt: "مهمة - رحلة الحمل والأمومة" };

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "مهمة | دليلك في رحلة الحمل والأمومة",
    template: "%s | مهمة",
  },
  description:
    "مهمة تساعدك في متابعة رحلة الحمل أسبوعًا بأسبوع، ومعرفة تطورات الجنين وأهم النصائح والمعلومات خلال رحلة الحمل والأمومة.",
  keywords: [
    "مهمة", "الحمل", "الحمل أسبوعًا بأسبوع", "متابعة الحمل", "تطور الجنين",
    "مراحل الحمل", "أعراض الحمل", "نصائح الحمل", "الأمومة", "قرة عيني",
  ],
  authors: [{ name: "مهمة" }],
  creator: "مهمة",
  publisher: "مهمة",
  applicationName: "مهمة",
  category: "health",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "ar_AR",
    url: BASE_URL,
    siteName: "مهمة",
    title: "مهمة | دليلك في رحلة الحمل والأمومة",
    description:
      "مهمة تساعدك في متابعة رحلة الحمل أسبوعًا بأسبوع، ومعرفة تطورات الجنين وأهم النصائح والمعلومات خلال رحلة الحمل والأمومة.",
    images: [socialImage],
  },
  twitter: {
    card: "summary_large_image",
    title: "مهمة | دليلك في رحلة الحمل والأمومة",
    description: "مهمة تساعدك في متابعة رحلة الحمل أسبوعًا بأسبوع ومعرفة تطورات الجنين.",
    images: [socialImage.url],
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
  );
}
