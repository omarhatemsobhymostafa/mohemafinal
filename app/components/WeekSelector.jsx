import axios from "axios";
import Link from "next/link";

const WeekSelector = async () => {
    const weeksData = await axios.get('https://mohema.onrender.com/weeksdata/')
    return (
        <section
            aria-label="اختيار الأسبوع"
            className="rounded-xl border border-outline-variant bg-surface-container-lowest p-4"
        >
            <div className="mb-3 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">
                    calendar_month
                </span>

                <h2 className="font-semibold text-on-surface">
                    اختر أسبوع الحمل
                </h2>
            </div>

            <div className="hide-scrollbar flex gap-unit overflow-x-auto py-2">

                {weeksData.data.map((item) => (
                    <Link
                        key={item.weekNumber}
                        href={`/journey/${item.weekNumber}`}
                        className="shrink-0 whitespace-nowrap rounded-full bg-surface-container px-6 py-2 text-label-md text-on-surface focus:bg-primary-containe"
                    >
                        الأسبوع {item.weekNumber.replace('week_','')}
                    </Link>
                ))}




            </div>
        </section>
    );
};

export default WeekSelector;