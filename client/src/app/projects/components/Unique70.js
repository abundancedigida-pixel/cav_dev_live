"use client";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import {
  Container,
  Reveal,
  WordReveal,
  SERIF,
  SANS,
} from "@/components/ui/Animations";
import { cloudinary } from "@/assets/Cloudinary";
const IMG = cloudinary.projects.unique;

const facts = [
  { k: "Planned Scale", v: "70 Custom Residences" },
  { k: "Configuration Types", v: "2BHK & 3BHK Villas" },
  { k: "Enclave Security", v: "Private Gated Parameter" },
  { k: "Allocation Protocol", v: "Founding Edition Register" },
];

const Unique70 = () => {
  return (
    <section
      className={`${SANS} w-full min-w-0 overflow-hidden bg-[#F1F0EB] py-16`}
    >
      <Container>
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 pb-8 border-b border-[#E4E2DA]">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <span className="bg-[#0B1F3A] px-3 py-1.5 text-[10px] font-bold uppercase tracking-wide text-white">
                Flagship Residential Concept
              </span>
              <span className="text-[10px] font-medium uppercase tracking-wide text-[#44474D]">
                Ranipet, Tamil Nadu
              </span>
            </div>
            <h2
              className={`${SERIF} mt-4 text-[#0B1F3A] text-3xl sm:text-3xl md:text-4xl lg:text-5xl leading-[1.1]`}
            >
              <WordReveal text="UNIQUE 70 — India’s Founding Elite Homes" />
            </h2>
          </div>
          <Reveal delay={0.3} className="shrink-0">
            <span className="inline-block bg-white px-3 py-2 text-[10px] font-semibold uppercase tracking-wide text-[#9A7B3F]">
              • 70 Residences · Limited Founding Edition
            </span>
          </Reveal>
        </div>

        {/* Body */}
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-[1.35fr_1fr] bg-white">
          <Reveal y={50}>
            <div className="group relative h-[380px] sm:h-[460px] lg:h-full lg:min-h-[750px] overflow-hidden">
              <Image
                src={IMG}
                alt="UNIQUE 70 enclave with villas, pool and landscaped lane at dusk"
                fill
                sizes="(min-width: 1024px) 58vw, 100vw"
                className="object-cover transition-transform duration-[1800ms] ease-out group-hover:scale-[1.05]"
              />
              <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 bg-[#0B1F3AE5] backdrop-blur-sm p-4 sm:p-5">
                <p className="text-[9px] font-semibold uppercase tracking-[0.15em] text-[#FFDEA9]">
                  Brand Triad
                </p>
                <p className="mt-1.5 text-base sm:text-lg text-white">
                  Prestige • Exclusivity • Legacy
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal y={40} delay={0.15}>
            <div className="flex h-full flex-col justify-center p-6 md:p-8 lg:p-12">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#9A7B3F]">
                The Collector’s Enclave
              </p>
              <h3
                className={`${SERIF} mt-4 max-w-sm text-2xl leading-snug text-[#171C22]`}
              >
                A Sanctum of 70 Bespoke Living Sanctuaries
              </h3>
              <p className="mt-6 max-w-sm text-sm leading-[1.75] text-[#44474D]">
                An exclusive residential concept built around a limited edition
                of 70 homes, with individual residence identities and a focus on
                privacy, ownership, and lasting legacy. Each residence commands
                generous floor plans, custom breezeway masonry, and private
                inner gardens.
              </p>

              <div className="mt-8">
                {facts.map((f) => (
                  <div
                    key={f.k}
                    className="flex items-center justify-between gap-4 border-b border-[#EDEBE4] py-4 text-sm"
                  >
                    <span className="text-[#44474D]">{f.k}</span>
                    <span className="text-right font-medium text-[#171C22]">
                      {f.v}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/projects/unique70"
                  className="group inline-flex items-center gap-8 bg-[#0B1F3A] px-6 py-3.5 text-xs font-medium uppercase tracking-wide text-white transition-colors hover:bg-[#1B4B7F]"
                >
                  Explore UNIQUE 70
                  <ArrowRight
                    size={14}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </Link>
                <Link
                  href="/contact-us"
                  className="border border-[#D9D6CC] px-6 py-3.5 text-xs font-medium uppercase tracking-wide text-[#0B1F3A] transition-colors hover:border-[#0B1F3A]"
                >
                  Inquire on Enclave
                </Link>
              </div>
              <p className="mt-5 max-w-xs text-[10px] leading-relaxed tracking-wide text-[#4A5568]">
                Technical elevation and master architectural dossier accessible
                by private advisory briefing.
              </p>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
};

export default Unique70;
