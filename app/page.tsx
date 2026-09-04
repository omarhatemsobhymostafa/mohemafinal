"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import ScrollReavel from './components/ScrollReavel'
const HomePage = () => {
  const [selectedWeek, setSelectedWeek] = useState<string | null>(null);

  useEffect(() => {
    setSelectedWeek(localStorage.getItem("selectedWeek"));
  }, []);

  const benefits = [
    {
      icon: "calendar_month",
      title: "متابعة الحمل",
      color: "bg-secondary-fixed/30",
      comming:false,
      text: "text-secondary",
    },
    {

      icon: "child_care",
      title: "معرفة نمو وتطور طفلك ",
      color: "bg-primary-fixed/30",
      comming:true,
      text: "text-primary",
    },
    {
      icon: "family_restroom",
      title: "التربية الايجابية",
      color: "bg-tertiary-fixed/30",
      comming:true,
      text: "text-tertiary",
    },
    {
      icon: "favorite",
      title: "كورسات  للأستعداد للولادة",
      color: "bg-error-container/30",
      comming:true,
      text: "text-on-error-container",
    },
  ];

  

  return (
    <div className="flex flex-col">
      <main className="mx-auto flex max-w-7xl flex-col gap-20 px-container-padding py-10 md:py-20">

        {/* Hero Section */}
        <ScrollReavel>

          <section className="flex flex-col items-center gap-8 text-center">

            <div className="soft-floating mb-4 w-full max-w-[320px] overflow-hidden rounded-[20px] bg-surface-container-low p-6 md:max-w-[400px] ">
              <Image
                src="/hero.png"
                width={600}
                height={600}
                alt="مهمة - رحلة الحمل أسبوعًا بأسبوع"
                className=" h-auto w-full scale-150 object-contain mix-blend-screen "
              />
            </div>

            <h1 className="text-4xl font-bold leading-tight text-primary md:text-6xl">
              رفيقك الرقمي لرحلة الامـــــــــومة

            </h1>

            <p className="max-w-2xl text-lg leading-relaxed text-on-surface-variant md:text-xl">
              مهمة تساعدك تتابعي حملك،نمو وتطور طفلك، وتحافظي على صحتك في كل
              مرحلة. رفيقك الرقمي لرحلة أمومة آمنة وسعيدة.
            </p>

            <div className="mt-4 flex w-full flex-col gap-4 md:flex-row md:justify-center">
              <Link
                href="/product"
                className="rounded-full border border-outline-variant bg-surface-container-lowest px-10 py-4 text-lg font-medium text-on-surface"
              >
                &quot;اكتشفي &quot;قرة عيني
              </Link>

              <Link
                href={selectedWeek ? `/journey/${selectedWeek}` : "/journey/week_4"}
                className="rounded-full bg-primary-container px-10 py-4 text-lg font-bold text-on-primary-container"
              >
                الحمل اسبوع باسبوع
              </Link>




              <Link
                href={"#"}
                className="relative rounded-full border border-outline-variant bg-surface-container-lowest px-10 py-4 text-lg font-medium text-on-surface"
              >
          <div className="absolute right-3 top-3 rounded-full bg-primary-container px-3 py-1 text-sm font-medium text-on-primary-container">
        قريبًا
      </div>
                تطور طفـــلي
              </Link>
            </div>
          </section>
        </ScrollReavel>


        {/* Benefits Grid */}
        <ScrollReavel>

          <section className="flex flex-col gap-8 mb-12">

            <h2 className="text-center text-2xl font-bold text-primary md:text-3xl">
              كيف تساعدك مهمة؟
            </h2>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 ">

{benefits.map((item, index) => (
  <div
    key={index}
    className="relative soft-floating flex flex-col items-center gap-4 rounded-[32px] border border-outline-variant bg-surface-container-low p-8 text-center"
  >
    {item.comming && (
      <div className="absolute right-3 top-3 rounded-full bg-primary-container px-3 py-1 text-sm font-medium text-on-primary-container">
        قريبًا
      </div>
    )}

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
  </div>
))}

            </div>
          </section>
        </ScrollReavel>


      </main>
    </div>
  );
};

export default HomePage;