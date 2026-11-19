"use client";
import Link from "next/link";
import {
  Container,
  Reveal,
  WordReveal,
  Eyebrow,
  SERIF,
  SANS,
} from "@/components/ui/Animations";

const UpcomingHomes = ({ properties = [] }) => {
  if (!properties || properties.length === 0) {
    return null;
  }

  return (
    <section className={`${SANS} w-full min-w-0 overflow-hidden bg-[#F1F0EB] py-16`}>
      <Container>
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
          <div>
            <Eyebrow className="!text-[10px]">Upcoming Abundance Homes</Eyebrow>
            <h2
              className={`${SERIF} mt-4 max-w-xl text-[#171C22] text-3xl sm:text-3xl md:text-4xl lg:text-5xl leading-[1.1]`}
            >
              <WordReveal text="Something New Is Taking Shape." />
            </h2>
          </div>
          <Reveal delay={0.2} className="shrink-0">
            <p className="max-w-xs text-[15px] leading-relaxed text-[#44474D]">
              Be among the first to discover upcoming Abundance developments.
            </p>
          </Reveal>
        </div>

        <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-6">
          {properties.map((it, i) => {
            const href = it.slug ? `/properties/${it.slug}` : "/contact-us";

            return (
              <Reveal key={it._id || i} delay={i * 0.12} y={40}>
                <div className="flex h-full flex-col bg-white p-6 md:p-8">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <p className="text-[10px] font-bold uppercase tracking-wide text-[#1B4B7F]">
                      {it.location}
                    </p>
                    <span className="bg-[#E8C27A] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wide text-[#0B1F3A]">
                      {it.developmentStatus}
                    </span>
                  </div>
                  <h3 className={`${SERIF} mt-4 text-3xl text-[#171C22]`}>
                    {it.propertyName}
                  </h3>
                  <p className="mt-3 max-w-lg text-[15px] leading-relaxed text-[#44474D]">
                    {it.description}
                  </p>
                  <div className="mt-5 flex flex-wrap gap-x-8 gap-y-2 text-sm text-[#44474D]">
                    <p>
                      <span className="font-medium text-[#171C22]">Typology:</span>{" "}
                      {it.propertyType}
                    </p>
                    <p>
                      <span className="font-medium text-[#171C22]">Built-up Area:</span>{" "}
                      {it.builtUpArea ? `${it.builtUpArea.toLocaleString("en-IN")} sq.ft.` : "On Request"}
                    </p>
                  </div>
                  <div className="mt-auto pt-6">
                    <div className="flex flex-col gap-4 border-t border-[#EDEBE4] pt-5 sm:flex-row sm:items-center sm:justify-between">
                      <p className="text-[10px] font-bold uppercase tracking-wide text-[#1B4B7F]">
                        Active Development
                      </p>

                      <Link
                        href={href}
                        className="inline-flex w-full items-center justify-center bg-[#0B1F3A] px-5 py-3 text-[11px] font-medium uppercase tracking-wide text-white transition-colors duration-300 hover:bg-[#164A7A] sm:w-auto"
                      >
                        Get Updates
                      </Link>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
};

export default UpcomingHomes;