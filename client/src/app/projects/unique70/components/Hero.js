"use client";
import Link from "next/link";
import { House } from "lucide-react";
import {
  Container,
  Reveal,
  WordReveal,
  ParallaxImage,
  Eyebrow,
  SERIF,
  SANS,
} from "@/components/ui/Animations";
import { cloudinary } from "@/assets/Cloudinary";
const IMG = cloudinary.projectDetails.hero;

const specs = [
  { k: "Typology", v: "Residential Development", s: "Private Gated Enclave" },
  { k: "Edition Size", v: "70 Planned Residences", s: "Strictly Closed Cohort" },
  { k: "Configurations", v: "2BHK & 3BHK Villas", s: "Architectural Courtyard Homes" },
  { k: "Location", v: "Ranipet, Tamil Nadu", s: "Proposed Regional Sanctuary" },
];

const Hero = () => {
  return (
    <section className={`${SANS} w-full min-w-0 overflow-hidden bg-white py-16`}>
      <Container>
        {/* Breadcrumb row */}
        <Reveal y={12}>
          <nav
            aria-label="Breadcrumb"
            className="flex items-center justify-between gap-4 border-b border-[#E6E4DC] pb-4"
          >
            <ol className="flex flex-wrap items-center gap-2 text-[10px] font-medium uppercase tracking-[0.12em] text-[#44474D]">
              <li>
                <Link href="/" className="transition-colors hover:text-[#0B1F3A]">Home</Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link href="/projects" className="transition-colors hover:text-[#0B1F3A]">Projects</Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="font-bold text-[#0B1F3A]">Unique 70</li>
            </ol>
            <span className="hidden sm:inline-flex shrink-0 items-center gap-2 rounded-full bg-[#E8EDF6] px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[0.1em] text-[#164A7A]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#336192]" />
              Abundance Group Presents
            </span>
          </nav>
        </Reveal>

        {/* Title + intro */}
        <div className="mt-8 md:mt-10 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          <div>
            <div className="flex flex-wrap items-end gap-x-4 gap-y-2">
              <h1 className={`${SERIF} text-[#0B1F3A] text-5xl sm:text-6xl lg:text-7xl leading-[1]`}>
                <WordReveal text="UNIQUE 70" />
              </h1>
              <Reveal delay={0.5} y={12} className="pb-1.5 lg:pb-3">
                <span className="inline-block border border-[#D5D9E4] bg-[#E8EDF6] px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[0.08em] text-[#171C22]">
                  Ranipet, Tamil Nadu
                </span>
              </Reveal>
            </div>

            <Reveal delay={0.25} y={12}>
              <Eyebrow className="mt-3 !text-[11px] !font-medium !tracking-[0.12em]">
                India&apos;s Founding Elite Homes
              </Eyebrow>
            </Reveal>

            <h2 className={`${SERIF} mt-5 text-[#0B1F3A] text-2xl sm:text-3xl lg:text-[40px] leading-[1.2]`}>
              <WordReveal text="70 Homes. 70 Families. One Legacy." delay={0.3} />
            </h2>
          </div>

          <div className="max-w-[34rem] lg:justify-self-end lg:pt-3">
            <Reveal delay={0.3}>
              <p className="text-[15px] md:text-base font-light leading-[1.75] text-[#44474D]">
                An exclusive residential concept in Ranipet, created around a limited edition of 70
                homes, where every residence carries its own identity and every address becomes part
                of a lasting story.
              </p>
            </Reveal>
            <Reveal delay={0.45} className="mt-6 flex flex-wrap items-center gap-3">
              <Link
                href="#concept"
                className="bg-[#0B1F3A] px-6 py-4 text-[11px] font-medium uppercase tracking-wide text-white transition-colors duration-300 hover:bg-[#1B4B7F]"
              >
                Explore the founding concept
              </Link>
              <Link
                href="#enquiry"
                className="border border-[#C4C6CE] bg-white px-6 py-4 text-[11px] font-medium uppercase tracking-wide text-[#0B1F3A] transition-colors duration-300 hover:border-[#0B1F3A]"
              >
                Enquire about Unique 70
              </Link>
            </Reveal>
          </div>
        </div>

        {/* Hero image */}
        <Reveal y={50} delay={0.2} className="mt-10">
          <div className="relative shadow-[0_28px_60px_-30px_rgba(11,31,58,0.4)]">
            <ParallaxImage
              src={IMG}
              alt="Row of contemporary courtyard villas at dusk in Ranipet"
              className="h-[320px] sm:h-[420px] lg:h-[494px] w-full"
              strength={6}
              reveal={false}
              priority
              sizes="100vw"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#061525CC] via-[#06152500] to-[#06152526]" />

            {/* <div className="absolute right-3 top-3 sm:right-6 sm:top-6 flex items-center gap-2 bg-[#0B1F3AE6] px-3 py-2.5 text-[9px] sm:text-[10px] font-semibold uppercase tracking-[0.1em] text-white">
              <BadgeCheck size={14} className="shrink-0 text-[#E8C27A]" />
              No. 01-70 / Limited Founding Edition
            </div> */}

            <div className="absolute inset-x-3 bottom-3 sm:inset-x-6 sm:bottom-5 flex flex-wrap items-end justify-between gap-3">
              <p className="flex items-center gap-2.5 text-[9px] sm:text-[10px] font-semibold uppercase tracking-[0.1em] text-white">
                <House size={16} className="shrink-0" />
                Ranipet Enclave · Monolithic Brick &amp; Basalt Architecture
              </p>
              <p className="border border-white/70 bg-[#0B1F3A99] px-3 py-2 text-[9px] font-semibold uppercase tracking-[0.1em] text-white">
                Private Register: Prioritized Reservation
              </p>
            </div>
          </div>
        </Reveal>

        {/* Spec strip */}
        <Reveal y={30} delay={0.1} className="mt-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-6 border border-[#F0EFEA] bg-white px-4 py-5 sm:px-5 shadow-[0_2px_12px_-6px_rgba(11,31,58,0.12)]">
            {specs.map((s) => (
              <div key={s.k}>
                <p className="text-[9px] font-semibold uppercase tracking-[0.12em] text-[#44474D]">{s.k}</p>
                <p className="mt-2 text-base sm:text-xl font-medium text-[#0B1F3A]">{s.v}</p>
                <p className="mt-1.5 text-xs sm:text-[13px] text-[#44474D]">{s.s}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  );
};

export default Hero;