import Image from "next/image";
import Link from "next/link";

const HomePage = () => {
  const benefits = [
    {
      icon: "calendar_month",
      title: "متابعة الحمل",
      color: "bg-secondary-fixed/30",
      text: "text-secondary",
    },
    {
      icon: "child_care",
      title: "تطور طفلك",
      color: "bg-primary-fixed/30",
      text: "text-primary",
    },
    {
      icon: "menu_book",
      title: "معلومات موثوقة",
      color: "bg-tertiary-fixed/30",
      text: "text-tertiary",
    },
    {
      icon: "favorite",
      title: "متابعة صحتك",
      color: "bg-error-container/30",
      text: "text-on-error-container",
    },
  ];

  const steps = [
    {
      step: 1,
      text: "جاوبي على 3 أسئلة بسيطة",
    },
    {
      step: 2,
      text: "احسبي مرحلة حملك",
    },
    {
      step: 3,
      text: "ابدئي رحلتك مع مهمة",
      active: true,
    },
  ];

  return (
    <div className="flex flex-col">
      <main className="mx-auto flex max-w-7xl flex-col gap-20 px-container-padding py-10 md:py-20">

        {/* Hero Section */}
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
            رحلتك في الحمل...
            <br />
            خطوة بخطوة
          </h1>

          <p className="max-w-2xl text-lg leading-relaxed text-on-surface-variant md:text-xl">
            مهمة تساعدك تتابعي حملك، تعرفي تطورات طفلك، وتحافظي على صحتك في كل
            مرحلة. رفيقك الرقمي لرحلة أمومة آمنة وسعيدة.
          </p>

          <div className="mt-4 flex w-full flex-col gap-4 md:flex-row md:justify-center">

            <Link
              href="/journey/week_4"
              className="rounded-full bg-primary-container px-10 py-4 text-lg font-bold text-on-primary-container transition-all hover:brightness-110"
            >
              ابدئي رحلتك
            </Link>

            <Link
              href="/product"
              className="rounded-full border border-outline-variant bg-surface-container-lowest px-10 py-4 text-lg font-medium text-on-surface transition-colors hover:bg-surface-container-low"
            >
              &quot;اكتشفي &quot;قرة عيني
            </Link>

          </div>
        </section>

        {/* Benefits Grid */}
        <section className="flex flex-col gap-8">

          <h2 className="text-center text-2xl font-bold text-primary md:text-3xl">
            كيف تساعدك مهمة؟
          </h2>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">

            {benefits.map((item, index) => (
              <div
                key={index}
                className="soft-floating flex flex-col items-center gap-4 rounded-[32px] border border-outline-variant bg-surface-container-low p-8 text-center"
              >
                <div className={`${item.color} ${item.text} rounded-full p-5 w-16 h-16 shadow-md `}>
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

        {/* Steps Section */}
        <section className="flex flex-col items-center gap-10 rounded-3xl border border-surface-variant bg-surface-container-low p-10">

          <h2 className="text-3xl font-bold text-primary">
            خطوات بسيطة للبدء
          </h2>

          <div className="flex w-full max-w-4xl flex-col justify-between gap-10 md:flex-row">

            {steps.map((item, index) => (
              <div
                key={index}
                className={`flex flex-1 flex-col items-center gap-4 text-center ${
                  item.active ? "scale-105" : ""
                }`}
              >

                <div
                  className={`flex h-16 w-16 items-center justify-center rounded-full text-2xl font-bold ${
                    item.active
                      ? "bg-primary text-on-primary shadow-lg shadow-primary/20"
                      : "bg-primary-container text-on-primary-container"
                  }`}
                >
                  {item.step}
                </div>

                <span
                  className={`text-lg ${
                    item.active
                      ? "font-bold text-primary"
                      : "text-on-surface"
                  }`}
                >
                  {item.text}
                </span>

              </div>
            ))}

          </div>
        </section>

      </main>
    </div>
  );
};

export default HomePage;