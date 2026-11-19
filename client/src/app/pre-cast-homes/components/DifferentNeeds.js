"use client";
import { ArrowRight, BadgeCheck } from "lucide-react";
import { Container, Reveal, WordReveal, SERIF, SANS } from "@/components/ui/Animations";

const cards = [
  {
    n: "01",
    title: "Product Choices",
    text: "Explore different home types and potential applications across residential, commercial, and utility formats configured for distinct geographic contexts.",
    foot: "Diverse Archetypes",
  },
  {
    n: "02",
    title: "Practical Planning",
    text: "Discuss site requirements, layout preferences, specifications, soil bearing capacity, and intended residential or commercial use with our engineering advisors.",
    foot: "Site Alignment",
  },
  {
    n: "03",
    title: "From Selection to Handover",
    text: "Understand the transparent stages involved in discussing, manufacturing, transporting, and methodically installing your precast home on designated plinths.",
    foot: "Full Spectrum Ownership",
  },
];

const DifferentNeeds = () => {
  return (
    <section className={`${SANS} w-full min-w-0 overflow-hidden bg-[#EFF3FC] py-12 md:py-16`}>
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">
          <div>
            <p className="text-[10px] font-medium uppercase tracking-[0.15em] text-[#A0824E]">Constructive Clarity</p>
            <h2 className={`${SERIF} mt-3 text-[#0B1F3A] text-3xl md:text-4xl lg:text-[44px] leading-[1.15]`}>
              <span className="block"><WordReveal text="A Home for Different Needs." /></span>
              <span className="block"><WordReveal text="A Process Built Around Clarity." delay={0.25} /></span>
            </h2>
            <Reveal delay={0.3} className="mt-5 max-w-xl">
              <p className="text-[15px] leading-[1.75] text-[#44474D]">
                From compact residential spaces to larger independent homes, explore the precast home categories
                available through Abundance Group. Share your requirements to discuss suitable designs,
                specifications, and site considerations.
              </p>
            </Reveal>
          </div>

          <Reveal y={40} delay={0.2}>
            <div className="flex gap-4 bg-white p-6 sm:p-7 shadow-[0_2px_12px_-8px_rgba(11,31,58,0.25)]">
              <BadgeCheck size={28} className="mt-0.5 shrink-0 text-[#336192]" />
              <div>
                <h3 className="text-base font-medium text-[#0B1F3A]">Pre-Engineered Permanence</h3>
                <p className="mt-2 max-w-md text-xs leading-[1.8] text-[#44474D]">
                  Unlike traditional wet-construction plagued by monsoon delays and variable batching, Abundance
                  Group precast panels are manufactured in climate-controlled fabrication yards with automated
                  curing, yielding superior compressive resilience and micro-crack resistance.
                </p>
              </div>
            </div>
          </Reveal>
        </div>

        <div className="mt-10 md:mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((c, i) => (
            <Reveal key={c.n} delay={i * 0.12} y={40} className={i === 2 ? "md:col-span-2 lg:col-span-1" : ""}>
              <div className="group flex h-full flex-col bg-white p-7 shadow-[0_2px_10px_-6px_rgba(11,31,58,0.2)] transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_24px_50px_-28px_rgba(11,31,58,0.4)]">
                <p className={`${SERIF} text-6xl text-[#C5D3E8] transition-colors duration-500 group-hover:text-[#336192]`}>{c.n}</p>
                <h3 className="mt-5 text-xl font-medium text-[#171C22]">{c.title}</h3>
                <p className="mt-3 max-w-xs text-[15px] leading-[1.75] text-[#44474D]">{c.text}</p>
                <p className="mt-auto flex items-center gap-1.5 pt-10 text-[9px] font-bold uppercase tracking-[0.08em] text-[#336192]">
                  {c.foot}
                  <ArrowRight size={12} className="transition-transform duration-300 group-hover:translate-x-1" />
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default DifferentNeeds;