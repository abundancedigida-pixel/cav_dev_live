"use client";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Container, Reveal, WordReveal, Eyebrow, SERIF, SANS } from "@/components/ui/Animations";
import IMG from "@/assets/HomeImages/Disciplines.webp";

const types = [
  {
    tag: "Type A · Private Parcels",
    count: "01 / 03",
    title: "Individual Generational Residences",
    text: "Single-family private residences engineered on owned plots. Built with heavy acoustic mass, dual-envelope thermal insulation, and integrated service quarters.",
    foot: "3,500 – 14,000 sq.ft. footprint",
    href: "/properties",
  },
  {
    tag: "Type B · High Density",
    count: "02 / 03",
    title: "Masterplanned Apartments & Penthouses",
    text: "Low-density vertical enclaves featuring cantilevered private verandas, panoramic corner facades, private plunge pools, and dual-car parking elevators.",
    foot: "Zero Shared Living Walls",
    href: "/properties",
  },
  {
    tag: "Type C · Institutional",
    count: "03 / 03",
    title: "IT Parks & Corporate Campuses",
    text: "Grade-A enterprise spaces with IGBC Platinum certification, dynamic louvered solar skins, high-speed destination elevators, and sustainable civic concourses.",
    foot: "Up to 2.5M sq.ft. single campus",
    href: "/projects",
  },
];

const specs = [
  { k: "Masonry", v: "Monolithic Basalt" },
  { k: "Courtyards", v: "Passive Thermal Cooling" },
  { k: "Customisation", v: "100% Bespoke Plan" },
];

const ArchitecturalDisciplines = () => {
  return (
    <section className={`${SANS} w-full min-w-0 overflow-hidden bg-white py-16`}>
      <Container>
        <Eyebrow className="!text-[10px]">Our Architectural Disciplines</Eyebrow>
        <h2 className="mt-4 text-[#0B1F3A] font-medium tracking-[-0.03em] leading-[1.08] text-3xl sm:text-3xl md:text-4xl lg:text-5xl max-w-2xl">
          <WordReveal text="From Personal Spaces to Landmark Developments." />
        </h2>
        <Reveal delay={0.2} className="mt-5 max-w-2xl">
          <p className="text-[15px] leading-relaxed text-[#44474D]">
            We reject assembly-line building. Whether engineering a bespoke single-family plinth or
            a 1.5 million-square-foot institutional tech park, our practice operates with unyielding
            tectonic precision.
          </p>
        </Reveal>

        <div className="mt-10 md:mt-12 grid grid-cols-1 lg:grid-cols-[1.35fr_1fr] gap-6">
          {/* Feature card */}
          <Reveal y={50}>
            <div className="group flex h-full flex-col border border-[#C4C6CE4D] bg-white">
              <div className="relative min-h-[300px] flex-1 overflow-hidden">
                <Image
                  src={IMG}
                  alt="Tailor-made homes and luxury villas atelier"
                  fill
                  sizes="(min-width: 1024px) 55vw, 100vw"
                  className="object-cover transition-transform duration-[1600ms] ease-out group-hover:scale-[1.05]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F3ACC] via-[#0B1F3A00] to-[#0B1F3A00]" />
                <div className="absolute bottom-0 left-0 p-6 md:p-8">
                  <p className="text-[9px] uppercase tracking-[0.2em] text-white">Atelier Showcase</p>
                  <h3 className={`${SERIF} mt-2 text-2xl md:text-[32px] text-white leading-tight`}>
                    Tailor-Made Homes & Luxury Villas
                  </h3>
                </div>
              </div>
              <div className="p-6 md:p-8">
                <p className="text-sm leading-[1.75] text-[#44474D] max-w-lg">
                  Every private commission begins with an open terrain and your personal narrative. We
                  synthesize raw cast-in-place concrete, seasoned CP teakwood joinery, and local
                  basalt stone to form single-family sanctuaries that outlive generations.
                </p>
                <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-[#C4C6CE33] pt-5">
                  {specs.map((s) => (
                    <div key={s.k}>
                      <p className="text-[9px] font-bold uppercase tracking-[0.15em] text-[#44474D]">{s.k}</p>
                      <p className="mt-1 text-[13px] font-medium text-[#171C22]">{s.v}</p>
                    </div>
                  ))}
                </div>
                <Link
                  href="/tailor-made"
                  className="mt-6 inline-flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-wide text-[#336192] transition-colors hover:text-[#0B1F3A]"
                >
                  Explore the custom atelier
                  <ArrowRight size={13} className="transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </Reveal>

          {/* Types */}
          <div className="flex flex-col gap-6">
            {types.map((t, i) => (
              <Reveal key={t.title} delay={0.12 * (i + 1)} y={40} className="flex-1">
                <Link
                  href={t.href}
                  className="group flex h-full flex-col border border-[#EDEBE4] bg-white p-6 transition-all duration-500 hover:-translate-y-1 hover:border-[#C9A55C] hover:shadow-[0_24px_50px_-28px_rgba(11,31,58,0.4)]"
                >
                  <div className="flex items-center justify-between text-[9px] font-semibold uppercase tracking-[0.15em]">
                    <span className="text-[#A0824E]">{t.tag}</span>
                    <span className="text-[#44474D]">{t.count}</span>
                  </div>
                  <h3 className="mt-4 text-xl md:text-[22px] font-light leading-snug text-[#171C22]">{t.title}</h3>
                  <p className="mt-3 text-[13px] leading-relaxed text-[#44474D]">{t.text}</p>
                  <div className="mt-auto pt-5">
                    <div className="flex items-center justify-between border-t border-[#C4C6CE26] pt-4 text-[11px] tracking-wide text-[#171C22]">
                      {t.foot}
                      <ArrowRight size={16} className="text-[#336192] transition-transform duration-300 group-hover:translate-x-1.5" />
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default ArchitecturalDisciplines;