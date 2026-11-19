"use client";
import Link from "next/link";
import { BadgeCheck, ArrowDown } from "lucide-react";
import { Container, Reveal, WordReveal, ParallaxImage, SERIF, SANS } from "@/components/ui/Animations";
import { cloudinary } from "@/assets/Cloudinary";
const IMG = cloudinary.tailorMade.hero;

const TailorHero = () => {
  return (
    <section className={`${SANS} w-full min-w-0 overflow-hidden bg-white py-12 md:py-16 lg:py-20`}>
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left */}
          <div>
            <Reveal y={16} className="flex items-center gap-2">
              <span className="h-px w-8 bg-[#1B4B7F]" />
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#1B4B7F]">
                Your home. Your vision.
              </p>
            </Reveal>

            <h1 className={`${SERIF} mt-5 text-[#0B1F3A] text-4xl sm:text-5xl lg:text-6xl leading-[1.1]`}>
              <WordReveal text="A Home Designed Around You." />
            </h1>

            <Reveal delay={0.3} className="mt-6 max-w-xl">
              <p className="text-[15px] md:text-base leading-[1.75] text-[#44474D]">
                Your home should reflect the way you live. From the layout and spaces you need to the details
                that make a house feel like yours, Abundance Group helps you explore a home designed around
                your requirements.
              </p>
            </Reveal>

            <Reveal delay={0.4} className="mt-8">
              <p className="inline-flex items-center gap-2 bg-[#EEF3FC] px-3 py-2 text-[9px] sm:text-[10px] font-semibold uppercase tracking-[0.06em] text-[#0B1F3A]">
                <BadgeCheck size={14} className="shrink-0 text-[#1B4B7F]" />
                Thoughtful Design · Functional Spaces · Personalised Planning
              </p>
            </Reveal>

            <Reveal delay={0.5} className="mt-8 flex flex-wrap items-center gap-6">
              <Link
                href="#enquiry"
                className="bg-[#0B1F3A] px-7 py-4 text-xs font-medium uppercase tracking-wide text-white transition-colors duration-300 hover:bg-[#1B4B7F]"
              >
                Start your home enquiry
              </Link>
              <Link
                href="#approach"
                className="group inline-flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-[#0B1F3A]"
              >
                Explore our approach
                <ArrowDown size={14} className="transition-transform duration-300 group-hover:translate-y-1" />
              </Link>
            </Reveal>
          </div>

          {/* Right */}
          <div className="relative pb-10 lg:pl-6">
            <div className="relative shadow-[0_28px_60px_-30px_rgba(11,31,58,0.4)]">
              <ParallaxImage
                src={IMG}
                alt="Courtyard home with a lily pond and tiled roofs"
                className="h-[320px] sm:h-[420px] lg:h-[480px] w-full"
                strength={6}
                reveal={false}
                priority
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0B1F3AE6] via-[#0B1F3A00] to-[#0B1F3A00]" />
              <p className={`${SERIF} absolute bottom-4 right-5 text-xl sm:text-2xl text-white`}>
                Reflection Pavilion
              </p>
            </div>
            <Reveal delay={0.6} y={30} className="absolute bottom-0 left-0 lg:left-0">
              <div className="w-[210px] bg-[#E8EDF6] px-4 py-3.5 shadow-xl">
                <p className="text-[9px] font-medium uppercase tracking-[0.08em] text-[#44474D]">Scale &amp; Context</p>
                <p className="mt-1.5 text-[13px] font-medium leading-snug text-[#171C22]">
                  Bespoke Micro-Climate &amp; Passive Cooling
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default TailorHero;