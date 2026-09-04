
import WeekSelector from "./../components/WeekSelector";
import type { Metadata } from "next";
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: "الحمل أسبوعًا بأسبوع",
  description:
    "تابعي رحلة الحمل أسبوعًا بأسبوع وتعرفي على تطورات الجنين وأعراض الحمل وأهم النصائح لكل مرحلة.",
  keywords: [
    "الحمل أسبوعًا بأسبوع",
    "متابعة الحمل",
    "مراحل الحمل",
    "تطور الجنين",
    "أعراض الحمل",
    "نصائح الحمل",
    "مهمة",
  ],
  alternates: { canonical: "/journey" },
  openGraph: {
    type: "website",
    url: "/journey",
    title: "الحمل أسبوعًا بأسبوع",
    description:
      "تابعي رحلة الحمل أسبوعًا بأسبوع وتعرفي على تطورات الجنين وأعراض الحمل وأهم النصائح لكل مرحلة.",
  },
  twitter: {
    card: "summary_large_image",
    title: "الحمل أسبوعًا بأسبوع",
    description:
      "تابعي رحلة الحمل أسبوعًا بأسبوع وتعرفي على تطورات الجنين وأهم النصائح لكل مرحلة.",
  },
};
export default async function JourneyPage() {
  return (
    <main
      dir="rtl"
      className="min-h-screen bg-background pb-32 text-on-background"
    >      <div className="mx-auto w-full max-w-3xl px-5 pt-8 md:px-6 md:pt-12">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebPage",
              name: "الحمل أسبوعًا بأسبوع",
              description: "تابعي رحلة الحمل أسبوعًا بأسبوع وتعرفي على تطورات الجنين وأعراض الحمل وأهم النصائح لكل مرحلة.",
              url: "https://mohema.vercel.app/journey",
              inLanguage: "ar",
            }),
          }}
        />

        {/* عنوان الصفحة */}
        <div className="mb-8">
          <p className="mb-2 text-sm font-medium text-primary">
            رحلتك الجميلة
          </p>

          <h1 className="text-3xl font-bold text-on-surface md:text-4xl">
            الحمل أسبوعًا بأسبوع
          </h1>

          <p className="mt-3 text-base leading-7 text-on-surface-variant">
            تابعي تطورات طفلك والتغيرات التي تحدث لجسمك خلال رحلة الحمل.
          </p>
        </div>

        {/* اختيار الأسبوع */}
        
        <WeekSelector />
        
       

      </div>

    </main>
  );
}