"use client";
import Link from "next/link";
import {
  Container,
  Reveal,
  WordReveal,
  ParallaxImage,
  SERIF,
  SANS,
} from "@/components/ui/Animations";
import { cloudinary } from "@/assets/Cloudinary";
const IMG = cloudinary.blogImages.hero;

const stats = [
  { v: "18+", k: "Archived Essays" },
  { v: "6", k: "Disciplines" },
  { v: "Quarterly", k: "Print Monographs" },
];

const InsightsHero = () => {
  return (
    <section
      className={`${SANS} w-full min-w-0 overflow-hidden bg-white py-16`}
    >
      <Container>
        <Reveal y={12}>
          <p className="text-[10px] font-medium uppercase tracking-[0.12em] text-[#44474D]">
            <Link href="/" className="transition-colors hover:text-[#0B1F3A]">
              Home
            </Link>
            <span className="mx-1.5">/</span>
            <span className="font-bold text-[#171C22]">Insights</span>
          </p>
        </Reveal>

        <div className="mt-4 md:mt-8 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left */}
          <div>
            <Reveal y={16} className="flex items-center gap-3">
              <span className="h-px w-8 bg-[#C5A46D]" />
              <p className="text-[10px] font-medium uppercase tracking-[0.12em] text-[#B08D4A]">
                Abundance Group I Insights
              </p>
            </Reveal>

            <h1
              className={`${SERIF} mt-5 text-[#171C22] text-3xl sm:text-3xl md:text-4xl lg:text-5xl leading-[1.15]`}
            >
              <span className="block">
                <WordReveal text="Ideas for Better Living." />
              </span>
              <span className="block text-[#336192]">
                <WordReveal text="Perspectives" delay={0.3} />
              </span>
              <span className="block text-[#336192]">
                <WordReveal text="for Better Building." delay={0.45} />
              </span>
            </h1>

            <Reveal delay={0.3} className="mt-6 max-w-md">
              <p className="text-[15px] md:text-base leading-[1.85] text-[#44474D]">
                Explore ideas, practical guidance, design inspiration, and
                perspectives on homes, architecture, construction, and the
                spaces we inhabit across Southern India.
              </p>
            </Reveal>

            <Reveal delay={0.4} y={24} className="mt-10 max-w-xl">
              <div className="flex flex-wrap items-start gap-x-8 gap-y-5 sm:gap-0 border-t border-[#EDEBE4] pt-6">
                {stats.map((s, i) => (
                  <div
                    key={s.k}
                    className={`${i > 0 ? "sm:ml-6 sm:border-l sm:border-[#E6E4DC] sm:pl-6" : ""}`}
                  >
                    <p
                      className={`${SERIF} text-xl sm:text-2xl text-[#171C22]`}
                    >
                      {s.v}
                    </p>
                    <p className="mt-1.5 text-[9px] font-medium uppercase tracking-[0.1em] text-[#44474D]">
                      {s.k}
                    </p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          {/* Right */}
          <Reveal y={50} delay={0.15}>
            <div className="relative shadow-[0_28px_60px_-30px_rgba(11,31,58,0.4)]">
              <ParallaxImage
                src={IMG}
                alt="Courtyard pavilion residence with a reflecting pool"
                className="h-[300px] sm:h-[400px] lg:h-[480px] w-full"
                strength={6}
                reveal={false}
                priority
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0B1F3AE6] via-[#0B1F3A00] to-[#0B1F3A00]" />
              <div className="absolute inset-x-4 bottom-4 sm:inset-x-6 sm:bottom-5 flex items-end justify-between gap-4">
                <div>
                  <p className="text-[9px] font-semibold uppercase tracking-[0.15em] text-[#E8C27A]">
                    Estate Feature
                  </p>
                  <p className="mt-1.5 text-base sm:text-xl font-medium text-white">
                    The Courtyard Pavilion Residence, Vellore
                  </p>
                </div>
                <p className="hidden sm:block shrink-0 text-[9px] font-medium uppercase tracking-[0.15em] text-white">
                  Volume IV · Folio 02
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
};

export default InsightsHero;
