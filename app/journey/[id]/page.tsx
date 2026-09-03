import axios from "axios";
import WeekSelector from "./../../components/WeekSelector";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { id } = await params;

  const weekMatch = /^week_([1-9]|[1-3][0-9]|40)$/.exec(id);

  const weekNumber = weekMatch?.[1] ?? "";

  const title = `الأسبوع ${weekNumber} من الحمل | تطورات الحمل ونصائح مهمة`;

  const description = `تعرفي على تطورات الجنين في الأسبوع ${weekNumber} من الحمل، وأعراض الحمل وأهم النصائح التي تساعدك خلال هذه المرحلة.`;

  return {
    title,
    description,

    keywords: [
      `الأسبوع ${weekNumber} من الحمل`,
      "الحمل",
      "تطور الجنين",
      "نصائح الحمل",
      "مهمة",
    ],

    alternates: {
      canonical: `/journey/${id}`,
    },

    openGraph: {
      type: "article",
      url: `/journey/${id}`,
      title,
      description,

      images: [
        {
          url: "/hero.png",
          alt: `مهمة - الأسبوع ${weekNumber} من الحمل`,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/hero.png"],
    },
  };
}

export default async function JourneyPage({
  params,
}: Props) {
  const { id } = await params;

  // التأكد أن الرابط صحيح
  const weekMatch = /^week_([1-9]|[1-3][0-9]|40)$/.exec(id);

  if (!weekMatch) {
    notFound();
  }

  // جلب بيانات الأسبوع
  const weeksData = await axios.get(
    `https://mohema.onrender.com/weeksdata/${id}`
  );

  // رقم الأسبوع
  const weekNo = Number(
    weeksData.data.weekNumber.replace("week_", "")
  );

  return (
    <main
      dir="rtl"
      className="min-h-screen bg-background pb-32 text-on-background"
    >
      <div className="mx-auto w-full max-w-3xl px-5 pt-8 md:px-6 md:pt-12">

        {/* SEO Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebPage",
              name: `الأسبوع ${weekNo} من الحمل`,
              url: `https://mohema.vercel.app/journey/${id}`,
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

        {/* الأسبوع الحالي */}
        <section className="mt-8 overflow-hidden rounded-2xl border border-outline-variant bg-surface-container">
          <div className="p-6 md:p-8">

            {/* عنوان الأسبوع */}
            <div className="mb-6 flex items-center justify-between">
              <div>
                <p className="text-sm text-primary">
                  أنتِ الآن في
                </p>

                <h2 className="mt-1 text-3xl font-bold text-on-surface">
                  الأسبوع {weekNo}
                </h2>
              </div>

              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary-container">
                <span className="material-symbols-outlined text-3xl text-on-primary-container">
                  child_care
                </span>
              </div>
            </div>

            {/* صورة الجنين */}
         <div className="grid grid-cols-2 gap-3">
  {/* صورة الجنين */}
  <div className="overflow-hidden rounded-full bg-surface-container-high border-oultine-variant">
    <Image
      src={`/wbw-baby/baby-week-${weekNo
        .toString()
        .padStart(2, "0")}.jpg`}
      alt={`حجم الجنين في الأسبوع ${weekNo} من الحمل`}
      width={800}
      height={800}
      className="aspect-square h-full w-full object-cover"
    />
  </div>

  {/* صورة الفاكهة */}
  <div className="overflow-hidden rounded-full bg-surface-container-high border-outline-variant ">
    <Image
      src={`/wbw-fruit/fruit-week-${weekNo
        .toString()
        .padStart(2, "0")}.png`}
      alt={`حجم الجنين مقارنة بالفاكهة في الأسبوع ${weekNo} من الحمل`}
      width={800}
      height={800}
      className="aspect-square h-full w-full object-cover"
    />
  </div>
</div>

            {/* حجم الجنين */}
            <div className="mt-6">
              <h3 className="text-xl font-semibold text-on-surface">
                {weeksData.data.babySize.slice(0, 30)}...
              </h3>

              <p className="mt-2 leading-7 text-on-surface-variant">
                {weeksData.data.babySize}
              </p>
            </div>

          </div>
        </section>

        {/* تطور الطفل */}
        <section className="mt-6 rounded-2xl border border-outline-variant bg-surface-container p-6 md:p-8">
          <div>

            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-secondary-container">
                <span className="material-symbols-outlined text-secondary">
                  child_friendly
                </span>
              </div>

              <h2 className="text-xl font-bold text-on-surface">
                تطور طفلك
              </h2>
            </div>

            <p className="mt-3 text-on-surface-variant">
              {weeksData.data.babyLooks}
            </p>

          </div>
        </section>

        {/* جسمك هذا الأسبوع */}
        <section className="mt-6 rounded-2xl border border-outline-variant bg-surface-container p-6 md:p-8">
          <div>

            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-secondary-container">
                <span className="material-symbols-outlined text-secondary">
                  woman
                </span>
              </div>

              <h2 className="text-xl font-bold text-on-surface">
                جسمك هذا الأسبوع
              </h2>
            </div>

            <p className="mt-3 text-on-surface-variant">
              {weeksData.data.WhappenInBody}
            </p>

          </div>
        </section>

        {/* الأعراض */}
        <section className="mt-6 rounded-2xl border border-outline-variant bg-surface-container p-6 md:p-8">
          <div>

            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-secondary-container">
                <span className="material-symbols-outlined text-secondary">
                  sick
                </span>
              </div>

              <h2 className="text-xl font-bold text-on-surface">
                الأعراض
              </h2>
            </div>

            <p className="mt-3 text-on-surface-variant">
{weeksData.data.sympotyms.split("\n").map((line, index) => (
  <div key={index}>{line}</div>
))}
            </p>

          </div>
        </section>

        {weeksData.data.option1 ? (        <section className="mt-6 rounded-2xl border border-outline-variant bg-surface-container p-6 md:p-8">
          <div>

            <p className="mt-3 text-on-surface-variant">
              {weeksData.data.option1}
            </p>

          </div>
        </section>):null
        }        {weeksData.data.option2 ? (        <section className="mt-6 rounded-2xl border border-outline-variant bg-surface-container p-6 md:p-8">
          <div>

            <p className="mt-3 text-on-surface-variant">
              {weeksData.data.option2}
            </p>

          </div>
        </section>):null
        }


        {/* التنقل بين الأسابيع */}
        <section className="mt-8 rounded-2xl border border-outline-variant bg-surface-container-lowest p-5">

          <h2 className="mb-4 text-center text-lg font-bold text-on-surface">
            التنقل بين الأسابيع
          </h2>

          <div className="grid grid-cols-2 gap-3">

            {/* الأسبوع السابق */}
            <Link
              href={`/journey/week_${Math.max(weekNo - 1, 1)}`}
              className="flex items-center justify-center gap-2 rounded-xl border border-outline-variant bg-surface-container px-4 py-3 text-sm font-semibold text-on-surface transition hover:bg-surface-container-high"
            >
              <span className="material-symbols-outlined">
                arrow_forward
              </span>

              الأسبوع السابق
            </Link>

            {/* الأسبوع التالي */}
            <Link
              href={`/journey/week_${Math.min(weekNo + 1, 40)}`}
              className="flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-on-primary transition hover:opacity-90"
            >
              الأسبوع التالي

              <span className="material-symbols-outlined">
                arrow_back
              </span>
            </Link>

          </div>
        </section>

      </div>
    </main>
  );
}
