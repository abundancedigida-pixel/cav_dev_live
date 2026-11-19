"use client";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Check, PenTool } from "lucide-react";
import { Container, Reveal, WordReveal, Counter, Eyebrow, SERIF, SANS } from "@/components/ui/Animations";
import TypeOne from "@/assets/HomeImages/Type.webp";
import TypeTwo from "@/assets/HomeImages/Type2.webp";

const cards = [
  {
    tag: "Enclaves & Mansions",
    title: "Luxury Signature Villas",
    text: "Gated coastal sanctuaries combining courtyard architecture, private plunge pools, and low-density footprint design.",
    foot: "Carpet-First Layouts",
    img: TypeOne,
    href: "/properties",
  },
  {
    tag: "High-Rise Living",
    title: "Apartments & Sky Villas",
    text: "Acoustically isolated urban communities with double-height verandas, high-speed gearless elevators, and zero common walls.",
    foot: "Panoramic Vistas",
    img: TypeTwo,
    href: "/properties",
  },
];

const checks = ["Fixed Itemized BOQ Schedule", "Bi-Weekly 4K Drone Updates", "10-Year Structural Guarantee"];

const ExploreDreamHomes = () => {
  return (
    <section className={`${SANS} w-full min-w-0 overflow-hidden bg-[#F3F1EB] py-16`}>
      <Container>
        <Eyebrow>Architectural Typologies // 04</Eyebrow>
        <h2 className={`${SERIF} mt-4 text-[#0B1F3A] text-3xl sm:text-3xl md:text-4xl lg:text-5xl leading-[1.1]`}>
          <WordReveal text="Explore your Dream Homes" />
        </h2>
        <Reveal delay={0.2} className="mt-4 max-w-2xl">
          <p className="text-[15px] leading-relaxed text-[#44474D]">
            We operate across diverse spatial scales with singular structural discipline, ensuring
            each project carries our hallmark spatial elegance.
          </p>
        </Reveal>

        <div className="mt-6 md:mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Bespoke */}
          <Reveal y={50} className="md:col-span-2 lg:col-span-1">
            <div className="h-full bg-[#000615] text-white p-7 md:p-9 flex flex-col shadow-[0_24px_60px_-20px_rgba(2,8,23,0.6)]">
              <span className="inline-flex w-fit items-center gap-2 bg-white/10 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.15em] text-[#FFDEA9]">
                <PenTool size={12} /> Bespoke Commission
              </span>
              <h3 className={`${SERIF} mt-6 text-3xl leading-tight`}>Tailor-Made Residences</h3>
              <p className="mt-5 text-[15px] leading-relaxed text-[#DEE3EBCC] max-w-sm">
                Your land, your architectural signature. We manage complete design-and-build
                execution from soil core testing to turnkey handover on your private plot.
              </p>
              <ul className="mt-10 space-y-3 text-[13px] text-[#DEE3EBE5]">
                {checks.map((c) => (
                  <li key={c} className="flex items-center gap-2.5">
                    <Check size={14} className="text-[#FFDEA9]" /> {c}
                  </li>
                ))}
              </ul>
              <Link
                href="/tailor-made"
                className="group mt-6 inline-flex items-center justify-center gap-2 bg-[#D6E3FF] px-5 py-3.5 text-xs font-bold uppercase tracking-wide text-[#0B1F3A] transition-colors hover:bg-white"
              >
                Start custom brief
                <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </Reveal>

          {cards.map((c, i) => (
            <Reveal key={c.title} delay={0.12 * (i + 1)} y={50}>
              <Link
                href={c.href}
                className="group flex h-full flex-col bg-white p-6 md:p-8 shadow-[0_10px_40px_-24px_rgba(11,31,58,0.35)] transition-shadow duration-500 hover:shadow-[0_24px_60px_-24px_rgba(11,31,58,0.45)]"
              >
                <div className="relative h-[190px] md:h-[200px] overflow-hidden">
                  <Image
                    src={c.img}
                    alt={c.title}
                    fill
                    sizes="(min-width: 1024px) 33vw, 100vw"
                    className="object-cover transition-transform duration-[1600ms] ease-out group-hover:scale-[1.07]"
                  />
                </div>
                <p className="mt-5 text-[11px] font-bold uppercase tracking-[0.18em] text-[#336192]">{c.tag}</p>
                <h3 className="mt-3 text-2xl font-light text-[#0B1F3A]">{c.title}</h3>
                <p className="mt-4 text-[15px] leading-relaxed text-[#44474D]">{c.text}</p>
                <div className="mt-auto pt-5">
                  <div className="flex items-center justify-between border-t border-[#E4E2DA] pt-4 text-xs text-[#44474D]">
                    {c.foot}
                    <ArrowRight size={18} className="text-[#336192] transition-transform duration-300 group-hover:translate-x-1.5" />
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        {/* Commercial */}
        <Reveal y={40} className="mt-6">
          <div className="bg-white p-7 md:p-10 flex flex-col md:flex-row md:items-center md:justify-between gap-8">
            <div className="max-w-3xl">
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#336192]">Corporate Real Estate</p>
              <h3 className="mt-3 text-2xl md:text-[32px] font-light text-[#0B1F3A]">Commercial Parks & IT Campuses</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-[#44474D]">
                Grade-A institutional campuses featuring column-free floor plates, LEED Platinum
                envelope engineering, and dual power infrastructure tailored for Fortune 500 tenants.
              </p>
            </div>
            <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-center md:gap-8">
              <div className="md:text-right">
                <p className="text-2xl font-light text-[#0B1F3A]">
                  <Counter to={1.8} decimals={1} suffix="M Sq.Ft." />
                </p>
                <p className="mt-1 text-xs text-[#44474D]">Built Commercial Portfolio</p>
              </div>
              <Link
                href="/projects"
                className="w-full sm:w-auto bg-[#0B1F3A] px-6 py-3.5 text-center text-xs font-medium uppercase tracking-wide text-white transition-colors hover:bg-[#164A7A] whitespace-nowrap"
              >
                View Commercial Projects
              </Link>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
};

export default ExploreDreamHomes;