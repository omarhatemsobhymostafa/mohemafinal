"use client";
import Image from "next/image";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { startTransition, useEffect, useState } from "react";
import ScrollReavel from './components/ScrollReavel'
const HomePage = () => {
  const router = useRouter();
  const { isLoaded, user } = useUser();
  const [selectedWeek, setSelectedWeek] = useState<string | null>(null);

  useEffect(() => {
    if (isLoaded && user) {
      router.replace("/dashboard");
    }
  }, [isLoaded, router, user]);

  useEffect(() => {
    if (isLoaded && user) return;

    const storedWeek = localStorage.getItem("selectedWeek");
    startTransition(() => setSelectedWeek(storedWeek));
  }, [isLoaded, user]);

  const benefits = [
    {
      icon: "calendar_month",
      title: "متابعة الحمل",
      description: "تابعي أسبوعك الحالي واحصلي على نصائح مناسبة لكل مرحلة.",
      href: "/dashboard",
      color: "bg-secondary-fixed/30",
      text: "text-secondary",
    },
    {
      icon: "child_care",
      title: "معرفة نمو وتطور طفلك ",
      description: "اكتشفي كيف ينمو طفلك أسبوعًا بعد أسبوع بطريقة بسيطة.",
      href: selectedWeek ? `/journey/${selectedWeek}` : "/journey/week_4",
      color: "bg-primary-fixed/30",
      text: "text-primary",
    },
    {
      icon: "family_restroom",
      title: "رحلة أسبوعية واضحة",
      description: "تنقلي بين أسابيع الحمل واقرئي أهم المعلومات في مكان واحد.",
      href: "/journey",
      color: "bg-tertiary-fixed/30",
      text: "text-tertiary",
    },
    {
      icon: "favorite",
      title: "قرة عيني",
      description: "اكتبي لحظاتك واحتفظي بذكريات رحلة حملك في دفتر مميز.",
      href: "/product",
      color: "bg-error-container/30",
      text: "text-on-error-container",
    },
  ];

  

  return (
    <div className="flex flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "Femora | دليلك في رحلة الحمل والأمومة",
            description:
              "Femora تساعدك في متابعة رحلة الحمل أسبوعًا بأسبوع، ومعرفة تطورات الجنين وأهم النصائح والمعلومات خلال رحلة الحمل والأمومة.",
            url: "https://mohema.vercel.app/",
            inLanguage: "ar",
            isPartOf: {
              "@type": "WebSite",
              name: "Femora",
              url: "https://mohema.vercel.app/",
            },
          }),
        }}
      />
      <main className="mx-auto flex max-w-7xl flex-col gap-20 px-container-padding py-10 md:py-20">

        {/* Hero Section */}
        <ScrollReavel>

          <section className="flex flex-col items-center gap-8 text-center">

            <div className="soft-floating mb-4 w-full max-w-[320px] overflow-hidden rounded-[20px] bg-surface-container-low p-6 md:max-w-[400px] ">
              <Image
                src="/hero.png"
                width={600}
                height={600}
                loading="eager"
                alt="Femora - رحلة الحمل أسبوعًا بأسبوع"
                className=" h-auto w-full scale-150 object-contain mix-blend-screen "
              />
            </div>

            <h1 className="text-4xl font-bold leading-tight text-primary md:text-6xl">
              مهمة، رفيقك في رحلة الأمومة
            </h1>

            <p className="max-w-2xl text-lg leading-relaxed text-on-surface-variant md:text-xl">
              كل ما تحتاجينه لتفهمي حملك، تتابعي نمو طفلك، وتعيشي كل مرحلة
              بثقة واطمئنان.
            </p>

            <div className="mt-4 flex w-full flex-col gap-4 md:flex-row md:justify-center">
              <Link
                href={selectedWeek ? `/journey/${selectedWeek}` : "/journey/week_4"}
                className="rounded-full bg-primary-container px-10 py-4 text-lg font-bold text-on-primary-container transition-transform hover:-translate-y-1"
              >
                ابدئي رحلتك الآن
              </Link>

              <Link
                href="/dashboard"
                className="rounded-full border border-outline-variant bg-surface-container-lowest px-10 py-4 text-lg font-medium text-on-surface transition-colors hover:border-primary"
              >
                افتحي لوحة المتابعة
              </Link>
            </div>
          </section>
        </ScrollReavel>

        {/* Benefits Grid */}
        <ScrollReavel>

          <section className="flex flex-col gap-8 mb-12">

            <h2 className="text-center text-2xl font-bold text-primary md:text-3xl">
              كل أدوات رحلتك في مكان واحد
            </h2>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 ">

{benefits.map((item, index) => (
  <Link
    key={index}
    href={item.href}
    className="relative soft-floating flex flex-col items-center gap-4 rounded-[32px] border border-outline-variant bg-surface-container-low p-8 text-center"
  >
    <div
      className={`${item.color} ${item.text} flex h-16 w-16 items-center justify-center rounded-full p-5 shadow-md`}
    >
      <span className="material-symbols-outlined text-4xl">
        {item.icon}
      </span>
    </div>

    <span className="text-xl font-semibold text-on-surface">
      {item.title}
    </span>
    <p className="text-sm leading-relaxed text-on-surface-variant">
      {item.description}
    </p>
    <span className="text-sm font-semibold text-primary">اكتشفي المزيد ←</span>
  </Link>
))}

            </div>
          </section>
        </ScrollReavel>

        <ScrollReavel>
          <section className="grid gap-8 rounded-[32px] border border-outline-variant bg-surface-container-low p-8 md:grid-cols-3 md:p-12">
            <div className="md:col-span-3">
              <h2 className="text-2xl font-bold text-primary md:text-3xl">
                كيف تبدئين مع مهمة؟
              </h2>
              <p className="mt-3 max-w-2xl leading-relaxed text-on-surface-variant">
                اختاري ما يناسبك الآن، وسنرافقك بالمعلومة التي تحتاجينها في الوقت المناسب.
              </p>
            </div>
            {[
              ["01", "اختاري أسبوعك", "ابدئي من أسبوعك الحالي أو تصفحي الرحلة كاملة."],
              ["02", "افهمي التغييرات", "تعرّفي على تطورات طفلك والنصائح المهمة لكل أسبوع."],
              ["03", "احتفظي بذكرياتك", "اكتبي تجربتك واحتفظي بها مع قرة عيني."],
            ].map(([number, title, description]) => (
              <div key={number} className="border-t border-outline-variant pt-5">
                <span className="text-sm font-bold text-secondary">{number}</span>
                <h3 className="mt-3 text-lg font-bold text-on-surface">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-on-surface-variant">{description}</p>
              </div>
            ))}
          </section>
        </ScrollReavel>


      </main>
    </div>
  );
};

export default HomePage;