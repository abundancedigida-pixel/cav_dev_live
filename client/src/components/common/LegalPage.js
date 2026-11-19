"use client";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Reveal, SANS } from "@/components/ui/Animations";

/**
 * Reusable legal / policy page body (header & footer come from the layout).
 *
 * @param {{
 *   title: string,
 *   sections: { heading: string, content: string | string[] }[],
 *   backLabel?: string,
 *   backHref?: string,   // if set, "Back" goes here; otherwise router.back()
 * }} props
 */
const LegalPage = ({ title, sections = [], backLabel = "Back", backHref }) => {
  const router = useRouter();

  const handleBack = () => (backHref ? router.push(backHref) : router.back());

  return (
    <main className={`${SANS} w-full min-w-0 overflow-hidden bg-white pt-4 pb-16`}>
      <div className="w-full min-w-0 mx-auto max-w-5xl mx-auto px-3 sm:px-3 lg:px-4 xl:px-10">
        <Reveal y={16}>
          <button
            type="button"
            onClick={handleBack}
            className="group inline-flex items-center gap-2 bg-[#0B1F3A] rounded px-5 py-3 text-[10px] font-semibold uppercase tracking-wide text-white shadow-[0_10px_24px_-12px_rgba(11,31,58,0.6)] transition-colors duration-300 hover:bg-[#1B4B7F]"
          >
            <ArrowLeft size={13} className="transition-transform duration-300 group-hover:-translate-x-1" />
            {backLabel}
          </button>
        </Reveal>

        <article className="mt-4 md:mt-5 bg-[#EEF3FC] px-5 py-10 sm:px-10 sm:py-14 lg:px-20 lg:py-20">
          <div className="max-w-5xl">
            <Reveal y={20}>
              <h1 className="text-2xl sm:text-3xl font-semibold text-[#0B1F3A]">{title}</h1>
            </Reveal>

            <div className="mt-6 space-y-6 md:space-y-7">
              {sections.map((s) => {
                const paragraphs = Array.isArray(s.content) ? s.content : [s.content];
                return (
                  <Reveal key={s.heading} y={20}>
                    <section>
                      <h2 className="text-base md:text-lg font-bold text-[#171C22]">{s.heading}</h2>
                      <div className="mt-2 space-y-3">
                        {paragraphs.map((p, i) => (
                          <p key={i} className="text-[13px] md:text-sm leading-[1.8] font-regular text-[#44474D]">
                            {p}
                          </p>
                        ))}
                      </div>
                    </section>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </article>
      </div>
    </main>
  );
};

export default LegalPage;