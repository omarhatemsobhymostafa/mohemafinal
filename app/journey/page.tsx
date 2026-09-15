
import WeekSelector from "./../components/WeekSelector";
import { createPageMetadata } from "../lib/seo";

export const metadata = createPageMetadata({
  title: "الحمل أسبوعًا بأسبوع",

  description:
    "تابعي رحلة الحمل أسبوعًا بأسبوع وتعرفي على تطورات الجنين وأعراض الحمل وأهم النصائح لكل مرحلة.",

  path: "/journey",

  keywords: [
    "الحمل أسبوعًا بأسبوع",
    "متابعة الحمل",
    "مراحل الحمل",
    "تطور الجنين",
    "أعراض الحمل",
    "نصائح الحمل",
    "مهمة",
  ],

  alternates: {
    canonical: "/journey",
  },

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
      "تابعي رحلة الحمل أسبوعًا بأسبوع وتعرفي على تطورات الجنين وأعراض الحمل وأهم النصائح لكل مرحلة.",
  },
});

export default async function JourneyPage() {
  return (
    <main>
      <div className="container mx-auto px-4 py-8">
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

