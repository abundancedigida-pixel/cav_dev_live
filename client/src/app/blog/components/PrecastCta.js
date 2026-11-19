"use client";
import Link from "next/link";
import Image from "next/image";
import { Download, UserCog } from "lucide-react";
import {
  Container,
  Reveal,
  WordReveal,
  SERIF,
  SANS,
} from "@/components/ui/Animations";
import { cloudinary } from "@/assets/Cloudinary";
const IMG = cloudinary.blogImages.precastCTA;

const stats = [
  { v: "60%", k: "Faster Construction" },
  { v: "M50", k: "High-Grade Concrete" },
  { v: "100 Yr", k: "Structural Longevity" },
];

const PrecastCta = () => {
  return (
    <section
      className={`${SANS} w-full min-w-0 overflow-hidden bg-[#F1F0EB] py-12 md:py-16`}
    >
      <Container>
        <Reveal y={50}>
          <div className="relative overflow-hidden bg-white px-6 py-10 sm:px-10 lg:px-14 lg:py-16 shadow-[0_24px_60px_-30px_rgba(11,31,58,0.35)]">
            <span className="pointer-events-none absolute right-0 top-0 h-32 w-32 sm:h-40 sm:w-40 rounded-bl-full bg-[#EEF3FC]" />

            <div className="relative grid grid-cols-1 lg:grid-cols-[1.15fr_1fr] gap-10 lg:gap-14 items-center">
              {/* Left */}
              <div>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[9px] uppercase tracking-[0.12em]">
                  <span className="font-semibold text-[#B08D4A]">
                    Engineering Initiative
                  </span>
                  <span className="text-[#C4C6CE]">•</span>
                  <span className="font-medium text-[#44474D]">
                    An Initiative of Abundance Edward
                  </span>
                </div>

                <h2
                  className={`${SERIF} mt-5 max-w-lg text-[#171C22] text-4xl sm:text-5xl leading-[1.15]`}
                >
                  <WordReveal text="Discover a Different Approach to Home Building." />
                </h2>

                <Reveal delay={0.2} className="mt-5 max-w-lg">
                  <p className="text-[15px] leading-[1.75] text-[#44474D]">
                    Explore our precast home offering, discover available
                    structural categories, and learn about the precision
                    involved in factory casting, rapid logistics, and immaculate
                    site assembly.
                  </p>
                </Reveal>

                <div className="mt-8 grid max-w-xl grid-cols-1 sm:grid-cols-3 gap-3">
                  {stats.map((s, i) => (
                    <Reveal key={s.k} delay={i * 0.1} y={24}>
                      <div className="h-full bg-[#E8EDF6] p-4">
                        <p
                          className={`${SERIF} whitespace-nowrap text-2xl text-[#336192]`}
                        >
                          {s.v}
                        </p>
                        <p className="mt-2 text-[9px] font-semibold uppercase tracking-[0.08em] text-[#171C22]">
                          {s.k}
                        </p>
                      </div>
                    </Reveal>
                  ))}
                </div>

                <Reveal
                  delay={0.3}
                  className="mt-8 flex flex-col items-start gap-5"
                >
                  <Link
                    href="/pre-cast-homes"
                    className="inline-flex items-center gap-3 bg-[#0B1F3A] px-6 py-4 text-[11px] font-medium uppercase tracking-wide text-white transition-colors duration-300 hover:bg-[#1B4B7F]"
                  >
                    Explore Precast Homes <UserCog size={15} />
                  </Link>
                  <a
                    href="#"
                    className="inline-flex items-center gap-2 px-6 text-[11px] font-medium uppercase tracking-wide text-[#171C22] transition-colors hover:text-[#336192]"
                  >
                    Download Precast Monograph <Download size={12} />
                  </a>
                </Reveal>
              </div>

              {/* Right */}
              <Reveal y={40} delay={0.15}>
                <div className="group relative h-[300px] sm:h-[360px] lg:h-[384px] overflow-hidden shadow-[0_16px_40px_-24px_rgba(11,31,58,0.5)]">
                  <Image
                    src={IMG}
                    alt="Precast villa lit up at dusk"
                    fill
                    sizes="(min-width: 1024px) 40vw, 100vw"
                    className="object-cover transition-transform duration-[1600ms] ease-out group-hover:scale-[1.05]"
                  />
                  <div className="absolute inset-x-4 bottom-0 bg-[#0B1F3AE6] p-4">
                    <p className="text-lg font-medium text-white">
                      Precast Villa Alpha 04
                    </p>
                    <p className="mt-1 text-xs leading-relaxed text-white/60">
                      Modular factory engineered in Tamil Nadu · Assembled in 42
                      days
                    </p>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
};

export default PrecastCta;
