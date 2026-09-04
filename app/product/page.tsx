import Image from "next/image";
import type { Metadata } from "next";
import ScrollReavel from "../components/ScrollReavel";

export const metadata: Metadata = {
  title: "قرة عيني | جورنال الحمل والأمومة",
  description:
    "قرة عيني جورنال مخصص لتوثيق أجمل لحظات رحلة الحمل، وتسجيل المشاعر والذكريات قبل ولادة طفلك.",
  keywords: [
    "قرة عيني",
    "جورنال الحمل",
    "دفتر الحمل",
    "ذكريات الحمل",
    "جورنال الأمومة",
    "مهمة",
  ],
  alternates: {
    canonical: "/product",
  },
  openGraph: {
    title: "قرة عيني | جورنال الحمل والأمومة",
    description:
      "وثقي أجمل لحظات رحلة الحمل مع جورنال قرة عيني من مهمة.",
    type: "website",
    url: "/product",
    images: [
      {
        url: "/product.jpeg",
        width: 800,
        height: 800,
        alt: "قرة عيني - جورنال الحمل والأمومة",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "قرة عيني | جورنال الحمل والأمومة",
    description:
      "قرة عيني جورنال مميز لتوثيق رحلة الحمل واللحظات الجميلة خلال فترة الحمل والأمومة.",
    images: ["/product.jpeg"],
  },
};

const features = [
  {
    icon: "favorite",
    title: "تصميم دافئ",
    iconClass:
      "bg-primary-container text-on-primary-container",
  },
  {
    icon: "menu_book",
    title: "مساحة للاحتفاظ بالأفكار والصور",
    iconClass:
      "bg-secondary-container text-on-secondary-container",
  },
  {
    icon: "workspace_premium",
    title: "جودة عالية",
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
      className="min-h-screen bg-background text-on-background"
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

      {/* Hero */}
      <ScrollReavel>
        <section className="min-h-[80vh] bg-surface-container-lowest">
          <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-5 py-12 md:grid-cols-2 md:px-10 md:py-20">
            <div className="overflow-hidden rounded-2xl border border-outline-variant bg-surface-container">
              <Image
                src="/product.jpeg"
                alt="قرة عيني - جورنال الحمل والأمومة"
                width={800}
                height={800}
                className="h-full w-full object-cover"
                priority
              />
            </div>

            <div className="space-y-6">
              <div>
                <h1 className="text-5xl font-bold text-primary md:text-6xl">
                  قرة عيني
                </h1>

                <p className="mt-4 max-w-lg text-xl leading-[30px] text-on-surface-variant">
                  رفيقك في رحلة الأمومة. صُمم هذا الدفتر بعناية لتوثيق أجمل
                  اللحظات، وتدوين مشاعرك، وتنظيم أفكارك خلال هذه المرحلة
                  الاستثنائية.
                </p>
              </div>

              <div className="border-b border-outline-variant pb-4">
                <span className="text-2xl font-semibold text-on-surface">
                  300 جـــــــ . م
                </span>
              </div>

              <div>
                <a
                  href="https://wa.link/42g7lb"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full items-center justify-center gap-3 rounded-xl bg-whatsapp-green px-8 py-4 text-base font-semibold text-white sm:w-auto"
                >
                  <span className="material-symbols-outlined">
                    chat
                  </span>

                  اطلبي عبر واتساب
                </a>
              </div>
            </div>
          </div>
        </section>
      </ScrollReavel>

      {/* Features */}
      <ScrollReavel>
        <section className="mx-auto max-w-6xl px-5 py-16 md:px-10">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-semibold text-primary">
              لماذا قرة عيني؟
            </h2>

            <p className="mx-auto mt-3 max-w-2xl text-on-surface-variant">
              أكثر من مجرد صفحات إنه مساحة آمنة لتفريغ مشاعرك
              والاحتفاظ بذكريات لا تُنسى من اول الحمل الي وصول الطفل سنتين
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {features.map((item, index) => (
              <div
                key={index}
                className="rounded-2xl bg-surface-container p-8 text-center"
              >
                <div
                  className={`mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full ${item.iconClass}`}
                >
                  <span className="material-symbols-outlined text-3xl">
                    {item.icon}
                  </span>
                </div>

                <h3 className="text-xl font-medium">
                  {item.title}
                </h3>

              </div>
            ))}
          </div>
        </section>
      </ScrollReavel>

      {/* Quote */}
      <ScrollReavel>
        <section className="border-y border-outline-variant/30 bg-surface-container-high px-5 py-16 text-center">
          <span className="material-symbols-outlined text-4xl text-primary">
            format_quote
          </span>

          <p className="mt-4 text-2xl font-medium leading-relaxed text-primary md:text-3xl">
            كل ركلة، كل شعور، وكل حلم.. تستحق أن تُروى.
          </p>

          <p className="mt-4 text-on-surface-variant">
            ابدئي بكتابة قصة طفلك قبل أن يولد.
          </p>
        </section>
      </ScrollReavel>

      {/* Steps */}
      <ScrollReavel>
        <section className="mx-auto mb-4 max-w-5xl px-5 py-16 md:px-10">
          <h2 className="mb-10 text-center text-3xl font-semibold text-primary">
            خطوات بسيطة لاقتنائه
          </h2>

          <div className="grid gap-8 md:grid-cols-3">
            {steps.map((step) => (
              <div
                key={step.number}
                className="text-center"
              >
                <div
                  className={`mx-auto flex h-20 w-20 items-center justify-center rounded-full text-2xl font-bold ${step.className}`}
                >
                  {step.number}
                </div>

                <h3 className="mt-4 text-xl font-medium">
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