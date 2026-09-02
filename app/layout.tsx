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

export const metadata: Metadata = { metadataBase: new URL("https://mohema.vercel.app"), title: { default: "مهمة | دليلك في رحلة الحمل والأمومة", template: "%s | مهمة", }, description: "مهمة تساعدك في متابعة رحلة الحمل أسبوعًا بأسبوع، ومعرفة أهم المعلومات والنصائح خلال فترة الحمل والأمومة.", keywords: ["مهمة", "الحمل", "الحمل أسبوعًا بأسبوع", "متابعة الحمل", "تطور الجنين", "الأمومة", "صحة الأم", "نصائح الحمل", "قرة عيني",], authors: [{ name: "مهمة", },], creator: "مهمة", publisher: "مهمة", applicationName: "مهمة", category: "health", alternates: { canonical: "/", }, openGraph: { type: "website", locale: "ar_AR", url: "/", siteName: "مهمة", title: "مهمة | دليلك في رحلة الحمل والأمومة", description: "تابعي رحلة الحمل أسبوعًا بأسبوع مع مهمة، واكتشفي أهم المعلومات والنصائح خلال كل مرحلة.", images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "مهمة - رحلة الحمل والأمومة", },], }, twitter: { card: "summary_large_image", title: "مهمة | دليلك في رحلة الحمل والأمومة", description: "تابعي رحلة الحمل أسبوعًا بأسبوع مع مهمة.", images: ["/og-image.png"], }, icons: { icon: [{ url: "/favicon.ico", }, { url: "/icon.png", type: "image/png", },], apple: [{ url: "/apple-icon.png", },], }, robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1, }, }, };

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${publicSans.variable} ${publicSans.variable} h-full antialiased`}
    >
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,400,0,0"
        />
      </head>

      <body className="min-h-full flex flex-col">
        <div className="hidden md:block"> <Header /> </div>
        {children}
        <div className="md:hidden"> <BottomNav /> </div>
      </body>
    </html>
  );
}
