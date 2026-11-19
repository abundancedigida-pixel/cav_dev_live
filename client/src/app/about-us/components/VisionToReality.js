"use client";
import { Container, Reveal, WordReveal, Eyebrow, SERIF, SANS } from "@/components/ui/Animations";

const steps = [
  {
    n: "01",
    title: "Understand",
    text: "Exhaustive briefing on spatial desires, microclimate mapping, geotechnical soil bore testing, and zoning compliance audits.",
    foot: "Phase duration: 3-4 weeks",
  },
  {
    n: "02",
    title: "Plan",
    text: "Volumetric massing studies, structural core schematics, sun path solar shading simulation, and detailed initial cost estimation.",
    foot: "Phase duration: 4-6 weeks",
  },
  {
    n: "03",
    title: "Design",
    text: "Full BIM 3D coordination, coordinated MEP routing, bespoke timber/stone selection palettes, and final municipality submissions.",
    foot: "Phase duration: 6-8 weeks",
  },
  {
    n: "04",
    title: "Build",
    text: "Laser-guided ground execution, precast slab placement, automated batching logs, daily photographic audit portals, and site safety controls.",
    foot: "Live telemetry dashboard",
  },
  {
    n: "05",
    title: "Deliver",
    text: "A comprehensive 350+ point quality handover protocol, MEP air/water commissioning, complete documentation vault, and key handover.",
    foot: "Zero-snag guarantee",
  },
];

const VisionToReality = () => {
  return (
    <section className={`${SANS} w-full min-w-0 overflow-hidden bg-white pt-8 pb-16`}>
      <Container>
        <Eyebrow className="!text-[10px] !font-semibold !tracking-[0.15em]">Rigorous Timeline</Eyebrow>
        <h2 className={`${SERIF} mt-4 text-[#0B1F3A] text-3xl md:text-4xl lg:text-5xl leading-[1.1]`}>
          <WordReveal text="From Vision to Reality." />
        </h2>
        <Reveal delay={0.2} className="mt-4 max-w-xl">
          <p className="text-[15px] leading-relaxed text-[#4F5963]">
            To Build 1 Million Quality Homes &amp; Empowering 1 Million Families with Faith, Dignity &amp; Abundance.
          </p>
        </Reveal>

        <div className="mt-10 md:mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 lg:gap-6">
          {steps.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.1} y={40} className="relative">
              <div className="group relative flex h-full flex-col bg-[#F7F8FD] px-5 pt-6 pb-6 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_24px_50px_-28px_rgba(11,31,58,0.35)]">
                <span className="flex h-8 w-8 items-center justify-center bg-[#0B1F3A] text-xs font-semibold tabular-nums text-white">
                  {s.n}
                </span>
                <h3 className="mt-5 text-[17px] font-medium uppercase tracking-wide text-[#171C22]">{s.title}</h3>
                <p className="mt-3 text-[12px] leading-[1.7] text-[#44474D]">{s.text}</p>
                <p className="mt-auto pt-8 text-[9px] font-bold uppercase tracking-[0.08em] text-[#1B4B7F]">{s.foot}</p>
              </div>
              {i < steps.length - 1 && (
                <span className="absolute -right-6 top-[38px] hidden h-px w-6 bg-[#C4C6CE] lg:block" />
              )}
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default VisionToReality;