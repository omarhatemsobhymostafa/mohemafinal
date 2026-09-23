import Image from "next/image";
import ScrollReavel from "../components/ScrollReavel";
import { createPageMetadata } from "../lib/seo";

export const metadata = createPageMetadata({
  title: "قرة عيني | جورنال الحمل والأمومة",
  description:
    "قرة عيني جورنال مخصص لتوثيق أجمل لحظات رحلة الحمل، وتسجيل المشاعر والذكريات قبل ولادة طفلك.",
  keywords: [
    "قرة عيني",
    "جورنال الحمل",
    "دفتر الحمل",
    "ذكريات الحمل",
    "جورنال الأمومة",
    "Femora",
  ],
  path: "/product",
  image: [
    {
      url: "/product.jpg",
      width: 800,
      height: 800,
      alt: "قرة عيني - جورنال الحمل والأمومة",
    },
  ],
});

const features = [
  {
    icon: "favorite",
    title: "تصميم دافئ",
    description: "تفاصيل ناعمة تشبه اللحظات التي تستحق أن تتذكريها.",
    iconClass:
      "bg-primary-container text-on-primary-container",
  },
  {
    icon: "menu_book",
    title: "مساحة للاحتفاظ بالأفكار والصور",
    description: "اكتبي، الصقي الصور، واتركي لكل مرحلة مساحتها الخاصة.",
    iconClass:
      "bg-secondary-container text-on-secondary-container",
  },
  {
    icon: "workspace_premium",
    title: "جودة عالية",
    description: "دفتر عملي ليبقى معك من أول نبضة حتى سنوات طفلك الأولى.",
    iconClass:
      "border border-outline-variant bg-surface-variant text-on-surface-variant",
  },
];

const steps = [
  {
    number: 1,
    title: "تواصلي معنا",
    description: "اضغطي على زر الواتساب للبدء.",
    className:
      "bg-surface-container text-primary",
  },
  {
    number: 2,
    title: "أكدي الطلب",
    description:
      "زودينا ببيانات التوصيل وسنقوم بتأكيد طلبك.",
    className:
      "bg-surface-container text-primary",
  },
  {
    number: 3,
    title: "استلمي الدفتر",
    description:
      "سيصلك الدفتر مغلفًا بكل حب.",
    className:
      "bg-primary-container text-on-primary-container",
  },
];

export default function QoratEinyPage() {
  return (
    <main
      dir="rtl"
      className="min-h-screen bg-background text-on-background mb-12"
    >
      {/* SEO Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "قرة عيني | جورنال الحمل والأمومة",
            description:
              "قرة عيني جورنال مميز لتوثيق رحلة الحمل واللحظات الجميلة خلال فترة الحمل والأمومة.",
            url: "https://mohema.vercel.app/product",
            inLanguage: "ar",
          }),
        }}
      />

      <ScrollReavel>
        <section className="overflow-hidden border-b border-outline-variant/40 bg-surface-container-lowest">
          <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-5 py-8 md:grid-cols-[1.05fr_0.95fr] md:gap-16 md:px-10 md:py-16">
            <div className="relative order-1 overflow-hidden rounded-[1.75rem] border border-outline-variant/70 bg-surface-container shadow-[0_24px_70px_rgba(0,0,0,0.28)] md:order-2">
              <Image
                src="/product.jpg"
                alt="قرة عيني - جورنال الحمل والأمومة"
                width={800}
                height={800}
                className="aspect-square h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                priority
              />
              <div className="absolute bottom-4 right-4 rounded-full border border-white/25 bg-black/55 px-4 py-2 text-sm font-medium text-white backdrop-blur-md">
                من الحمل حتى سنتين
              </div>
            </div>

            <div className="order-2 space-y-7 md:order-1">
              <div className="space-y-4">
                <p className="text-sm font-semibold tracking-[0.18em] text-secondary">
                  جورنال الحمل والأمومة
                </p>
                <h1 className="max-w-xl text-5xl font-bold leading-[1.15] text-primary md:text-7xl">
                  احفظي تفاصيل البداية.
                </h1>

                <p className="max-w-lg text-lg leading-8 text-on-surface-variant md:text-xl">
                  قرة عيني هو المساحة التي تجمع أول شعور، أول صورة، وكل تفصيلة
                  صغيرة ستصبح لاحقًا حكاية تحبين الرجوع إليها.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-x-8 gap-y-3 border-y border-outline-variant/70 py-5">
                <div>
                  <p className="text-xs text-on-surface-variant">السعر</p>
                  <p className="mt-1 text-3xl font-bold text-on-surface">500 ج.م</p>
                </div>
                <div className="h-10 w-px bg-outline-variant/70" />
                <p className="max-w-48 text-sm leading-6 text-on-surface-variant">
                  تغليف أنيق، وهدية تحفظينها لنفسك ولطفلك.
                </p>
              </div>

              <a
                href="https://wa.link/42g7lb"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center gap-3 rounded-xl bg-whatsapp-green px-8 py-4 text-base font-bold text-white shadow-[0_12px_30px_rgba(37,211,102,0.18)] transition-transform hover:-translate-y-1 sm:w-auto"
              >
                <span className="material-symbols-outlined">chat</span>
                اطلبي عبر واتساب
                <span className="material-symbols-outlined text-lg">arrow_back</span>
              </a>
              <p className="flex items-center gap-2 text-xs text-on-surface-variant">
                <span className="material-symbols-outlined text-base text-tertiary">verified</span>
                نؤكد تفاصيل التوصيل معك قبل الشحن
              </p>
            </div>
          </div>
        </section>
      </ScrollReavel>

      <ScrollReavel>
        <section className="mx-auto max-w-6xl px-5 py-20 md:px-10 md:py-24">
          <div className="mb-12 flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <p className="mb-3 text-sm font-semibold tracking-[0.16em] text-secondary">صُمم ليبقى</p>
              <h2 className="text-3xl font-semibold text-primary md:text-4xl">كل صفحة لها معنى.</h2>
            </div>
            <p className="max-w-md leading-7 text-on-surface-variant">
              أكثر من مجرد صفحات؛ مساحة آمنة لتفريغ مشاعرك والاحتفاظ بذكريات
              لا تُنسى من أول الحمل حتى وصول الطفل إلى عامه الثاني.
            </p>
          </div>

          <div className="grid gap-px overflow-hidden rounded-2xl border border-outline-variant/60 bg-outline-variant/60 md:grid-cols-3">
            {features.map((item, index) => (
              <div
                key={index}
                className="bg-surface-container p-7 md:p-8"
              >
                <div
                  className={`mb-8 flex h-12 w-12 items-center justify-center rounded-xl ${item.iconClass}`}
                >
                  <span className="material-symbols-outlined text-2xl">
                    {item.icon}
                  </span>
                </div>

                <h3 className="text-lg font-semibold">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-on-surface-variant">{item.description}</p>
              </div>
            ))}
          </div>
        </section>
      </ScrollReavel>

      <ScrollReavel>
        <section className="border-y border-outline-variant/30 bg-primary-container px-5 py-16 text-center text-on-primary-container md:py-20">
          <span className="material-symbols-outlined text-4xl">format_quote</span>
          <p className="mx-auto mt-4 max-w-3xl text-2xl font-semibold leading-relaxed md:text-4xl">
            كل ركلة، كل شعور، وكل حلم.. تستحق أن تُروى.
          </p>
          <p className="mt-4 opacity-80">ابدئي بكتابة قصة طفلك قبل أن يولد.</p>
        </section>
      </ScrollReavel>

      <ScrollReavel>
        <section className="mx-auto max-w-6xl px-5 py-20 md:px-10 md:py-24">
          <div className="mb-12 text-center">
            <p className="mb-3 text-sm font-semibold tracking-[0.16em] text-secondary">جاهزة للبداية؟</p>
            <h2 className="text-3xl font-semibold text-primary md:text-4xl">ثلاث خطوات وتصل الحكاية.</h2>
          </div>

          <div className="grid gap-10 md:grid-cols-3 md:gap-6">
            {steps.map((step) => (
              <div
                key={step.number}
                className="relative text-center"
              >
                <div
                  className={`mx-auto flex h-14 w-14 items-center justify-center rounded-full text-xl font-bold ${step.className}`}
                >
                  {step.number}
                </div>

                <h3 className="mt-5 text-lg font-semibold">
                  {step.title}
                </h3>

                <p className="mt-2 text-on-surface-variant">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      </ScrollReavel>
    </main>
  );
}