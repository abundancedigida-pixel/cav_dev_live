"use client";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, BadgeCheck, Building2, Gauge, Ruler } from "lucide-react";
import { Container, Reveal, WordReveal, Counter, SERIF, SANS } from "@/components/ui/Animations";
import Img from "@/assets/HomeImages/Methodology.webp";

const pillars = [
  {
    Icon: Ruler,
    title: "Precision",
    text: "Millimeter-accurate robotic casting, laser-verified geometry, and plumb-line structural integrity without variance.",
  },
  {
    Icon: Gauge,
    title: "Faster Construction",
    text: "40% to 55% reduction in overall project handover cycles through synchronized off-site fabrication and concurrent site prep.",
  },
  {
    Icon: BadgeCheck,
    title: "Consistent Quality",
    text: "Factory-grade M40-M60 concrete poured in regulated temperature chambers, impervious to weather anomalies.",
  },
  {
    Icon: Building2,
    title: "Scalable Execution",
    text: "Seamless industrial scaling for Grade-A IT parks, commercial towers, and large-format high-density residential enclaves.",
  },
];

const stages = [
  { title: "Precast Component Manufacturing", text: "Computer-controlled curing, German batching plants, and zero weather interference." },
  { title: "Quality-Controlled Production", text: "Laser-calibrated dimensional tolerance to ±1.5mm, 350+ stress and density tests." },
  { title: "Secure Specialized Transportation", text: "Custom shock-isolated flatbed logistics corridors across metro hubs." },
  { title: "On-Site Tower Crane Assembly", text: "Monolithic mechanical interlocking, rapid dry-joint precision installation." },
  { title: "Final Structural Integration", text: "Post-tensioned monolithic lock with seismic resilience & seamless architectural finish.", gold: true },
];

const PrecastMethodology = () => {
  return (
    <section className={`${SANS} w-full min-w-0 overflow-hidden bg-[#0B1F3A] py-16 text-white`}>
      <Container>
        <Reveal y={20}>
          <span className="inline-flex items-center gap-2 border border-[#A0824E4D] bg-[#FFFFFF1A] px-2 py-1.5 text-[9px] sm:text-[10px] font-semibold uppercase tracking-[0.18em] text-[#FFDEA9]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#E8C27A]" />
            Engineering & Industrial Advancement // Precast Methodology
          </span>
        </Reveal>

        <div className="mt-6 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 pb-10 border-b border-white/10">
          <div className="max-w-3xl">
            <h2 className={`${SERIF} text-3xl sm:text-3xl md:text-4xl lg:text-5xl leading-[1.08]`}>
              <WordReveal text="Built with Precision. Delivered with Efficiency." />
            </h2>
            <Reveal delay={0.2} className="mt-6">
              <p className="max-w-2xl text-[15px] md:text-base leading-relaxed text-white/80">
                Through modern precast construction methods, we combine controlled manufacturing,
                consistent quality, structural precision, and faster on-site execution to deliver
                high-performance developments at scale.
              </p>
            </Reveal>
          </div>
          <Reveal delay={0.3} className="shrink-0">
            <Link
              href="/pre-cast-homes"
              className="group inline-flex items-center gap-2 border border-[#C9A55C] px-6 py-4 text-xs font-extrabold uppercase tracking-wide text-[#FFDEA9] transition-all duration-300 hover:bg-[#FFDEA9] hover:text-[#0A1F3C]"
            >
              Explore precast construction
              <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </Reveal>
        </div>

        {/* Image + pillars */}
        <div className="mt-10 md:mt-12 grid grid-cols-1 lg:grid-cols-[1.9fr_1fr] gap-6 lg:gap-8">
          <Reveal y={50}>
            <div className="group relative h-[380px] sm:h-[460px] lg:h-full lg:min-h-[750px] overflow-hidden border border-[#C4C6CE40] bg-[#13294A]">
              <Image
                src={Img}
                alt="Precast component plant and tower crane assembly"
                fill
                sizes="(min-width: 1024px) 60vw, 100vw"
                className="object-cover transition-transform duration-[1800ms] ease-out group-hover:scale-[1.05]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F3A] via-[#0B1F3A33] to-[#0B1F3A00]" />
              <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
                <div className="max-w-md border border-[#C4C6CE4D] bg-[#0B1F3AE5] backdrop-blur-sm p-4 sm:p-5">
                  <p className="text-[9px] font-semibold uppercase tracking-[0.15em] text-[#FFDEA9]">
                    Controlled Plant Environment
                  </p>
                  <p className="mt-2 text-base sm:text-lg">Precision Precast Component Plant & Assembly</p>
                  <p className="mt-1.5 text-xs text-[#DEE3EBCC]">
                    Computer-calibrated cast-in-place monoliths, Fe-550D reinforcement cages, and
                    automated curing chambers.
                  </p>
                </div>
                <div className="w-fit border border-[#C4C6CE4D] bg-[#FFFFFF26] backdrop-blur-sm px-5 py-4 text-center">
                  <p className={`${SERIF} text-2xl sm:text-3xl`}>
                    ±<Counter to={1.5} decimals={1} suffix=" mm" />
                  </p>
                  <p className="mt-1 text-[9px] uppercase tracking-wide text-[#DEE3EB]">Dimensional Tolerance</p>
                </div>
              </div>
            </div>
          </Reveal>

          <div className="flex flex-col gap-4">
            {pillars.map(({ Icon, title, text }, i) => (
              <Reveal key={title} delay={0.1 * (i + 1)} x={30} y={20} className="flex-1">
                <div className="group h-full border border-white/10 bg-[#FFFFFF0D] p-5 md:p-6 transition-all duration-500 hover:border-[#C9A55C]/60 hover:bg-[#13305A]">
                  <div className="flex items-start justify-between">
                    <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-[#FFDEA9]">
                      Core Pillar {String(i + 1).padStart(2, "0")}
                    </p>
                    <Icon size={16} className="text-[#D2E4FF] transition-colors group-hover:text-[#FFDEA9]" />
                  </div>
                  <h3 className="mt-3 text-xl font-medium">{title}</h3>
                  <p className="mt-2.5 text-[13px] leading-relaxed text-[#DEE3EBCC]">{text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Workflow */}
        <div className="mt-14 md:mt-16 border-t border-white/10 pt-8">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
            <div>
              <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-white">End-to-end methodology</p>
              <h3 className={`${SERIF} mt-2 text-2xl md:text-[28px]`}>Precast 5-Stage Engineering Workflow</h3>
            </div>
            <p className="text-[10px] uppercase tracking-wide text-white/90">ISO 9001 / DIN Standard Calibrated</p>
          </div>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {stages.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.1} y={40}>
                <div className="group h-full border border-white/40 bg-[#FFFFFF0D] p-5 transition-all duration-500 hover:-translate-y-1.5 hover:border-[#C9A55C]/60">
                  <span
                    className={`inline-block px-2 py-1 text-[9px] font-semibold uppercase tracking-[0.15em] ${
                      s.gold ? "bg-[#C9A55C]/25 text-[#E8C27A]" : "bg-white/10 text-white/80"
                    }`}
                  >
                    Stage {String(i + 1).padStart(2, "0")}
                  </span>
                  <h4 className="mt-4 text-[17px] font-medium leading-snug">{s.title}</h4>
                  <p className="mt-3 text-[13px] leading-relaxed text-white/65">{s.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default PrecastMethodology;