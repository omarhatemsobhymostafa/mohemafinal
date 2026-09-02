import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "قرة عيني | جورنال الحمل والأمومة | مهمة",
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
  openGraph: {
    title: "قرة عيني | جورنال الحمل والأمومة",
    description:
      "وثقي أجمل لحظات رحلة الحمل مع جورنال قرة عيني من مهمة.",
    type: "website",
  },
};
export default function QoratEinyPage() {
  return (
    <main
      dir="rtl"
      className="min-h-screen bg-background text-on-background"
    >
      {/* Hero */}
      <section className="min-h-[80vh] bg-surface-container-lowest">
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-5 py-12 md:grid-cols-2 md:px-10 md:py-20">

          {/* Image */}
          <div className="overflow-hidden rounded-2xl border border-outline-variant bg-surface-container">
            <Image
              src="/product.jpeg"
              alt="قرة عيني Journal"
              width={800}
              height={800}
              className="h-full w-full object-cover"
              priority
            />
          </div>

          {/* Details */}
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

            {/* Price */}
            <div className="border-b border-outline-variant pb-4">
              <span className="text-2xl font-semibold text-on-surface">
                300 جـــــــ . م
              </span>
            </div>

            {/* WhatsApp */}
            <div>
              <a
                href="https://wa.me/01224653326"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center gap-3 rounded-xl bg-whatsapp-green px-8 py-4 text-base font-semibold text-white transition hover:scale-[1.01] sm:w-auto"
              >
                <span className="material-symbols-outlined">
                  chat
                </span>

                اطلبي عبر واتساب
              </a>

              <p className="mt-3 text-sm text-outline">
                🚚 شحن سريع لجميع مدن المملكة
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-6xl px-5 py-16 md:px-10">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-semibold text-primary">
            لماذا قرة عيني؟
          </h2>

          <p className="mx-auto mt-3 max-w-2xl text-on-surface-variant">
            أكثر من مجرد صفحات فارغة، إنه مساحة آمنة لتفريغ مشاعرك
            والاحتفاظ بذكريات لا تُنسى.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">

          <div className="rounded-2xl bg-surface-container p-8 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary-container text-on-primary-container">
              <span className="material-symbols-outlined text-3xl">
                favorite
              </span>
            </div>

            <h3 className="text-xl font-medium">
              تصميم دافئ
            </h3>

            <p className="mt-3 leading-7 text-on-surface-variant">
              ألوان هادئة وتصميم مستوحى من نعومة الأمومة، يبعث على الراحة.
            </p>
          </div>

          <div className="rounded-2xl bg-surface-container p-8 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-secondary-container text-on-secondary-container">
              <span className="material-symbols-outlined text-3xl">
                menu_book
              </span>
            </div>

            <h3 className="text-xl font-medium">
              محتوى موجه
            </h3>

            <p className="mt-3 leading-7 text-on-surface-variant">
              أسئلة وتلميحات تساعدك على التعبير عن مشاعرك ومتابعة تطورات الحمل.
            </p>
          </div>

          <div className="rounded-2xl bg-surface-container p-8 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full border border-outline-variant bg-surface-variant text-on-surface-variant">
              <span className="material-symbols-outlined text-3xl">
                workspace_premium
              </span>
            </div>

            <h3 className="text-xl font-medium">
              جودة عالية
            </h3>

            <p className="mt-3 leading-7 text-on-surface-variant">
              ورق فاخر وغلاف قوي يحفظ ذكرياتك لسنوات.
            </p>
          </div>

        </div>
      </section>

      {/* Quote */}
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

      {/* Steps */}
      <section className="mx-auto max-w-5xl px-5 py-16 md:px-10">
        <h2 className="mb-10 text-center text-3xl font-semibold text-primary">
          خطوات بسيطة لاقتنائه
        </h2>

        <div className="grid gap-8 md:grid-cols-3">

          <div className="text-center">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-surface-container text-2xl font-bold text-primary">
              1
            </div>

            <h3 className="mt-4 text-xl font-medium">
              تواصلي معنا
            </h3>

            <p className="mt-2 text-on-surface-variant">
              اضغطي على زر الواتساب للبدء.
            </p>
          </div>

          <div className="text-center">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-surface-container text-2xl font-bold text-primary">
              2
            </div>

            <h3 className="mt-4 text-xl font-medium">
              أكدي الطلب
            </h3>

            <p className="mt-2 text-on-surface-variant">
              زودينا ببيانات التوصيل وسنقوم بتأكيد طلبك.
            </p>
          </div>

          <div className="text-center">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-primary-container text-2xl font-bold text-on-primary-container">
              3
            </div>

            <h3 className="mt-4 text-xl font-medium">
              استلمي الدفتر
            </h3>

            <p className="mt-2 text-on-surface-variant">
              سيصلك الدفتر مغلفًا بكل حب خلال أيام معدودة.
            </p>
          </div>

        </div>
      </section>
    </main>
  );
}