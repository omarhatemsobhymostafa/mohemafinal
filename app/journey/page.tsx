
import axios from "axios";
import WeekSelector from "./../components/WeekSelector";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "رحلة الحمل | مهمة",
  description:
    "اكتشفي مراحل الحمل وتابعي تطورات الحمل أسبوعًا بأسبوع مع أهم المعلومات والنصائح.",
  keywords: [
    "رحلة الحمل",
    "الحمل أسبوعًا بأسبوع",
    "مراحل الحمل",
    "تطور الجنين",
    "مهمة",
  ],
};
export default async function JourneyPage() {
      const weeksData = await axios.get('https://mohema.onrender.com/weeksdata/')
  
  return (
    <main
      dir="rtl"
      className="min-h-screen bg-background pb-32 text-on-background"
    >      <div className="mx-auto w-full max-w-3xl px-5 pt-8 md:px-6 md:pt-12">

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