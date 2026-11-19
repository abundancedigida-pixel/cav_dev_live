"use client";
import Link from "next/link";
import { House, PencilRuler, Factory } from "lucide-react";
import { Container, Reveal, WordReveal, Eyebrow, SERIF, SANS } from "@/components/ui/Animations";

const cards = [
  {
    Icon: House,
    title: "Find a Property",
    text: "Explore curated inventory across premier locations in Vellore, Chennai, and Bengaluru. Ready-to-occupy villas, plotted developments, and gated estates.",
    cta: "Explore Properties",
    href: "/properties",
  },
  {
    Icon: PencilRuler,
    title: "Plan a Custom Home",
    text: "Engage directly with our master architects. From conceptual sketches and structural blueprints to full turnkey interior execution on your land.",
    cta: "Learn about Custom Homes",
    href: "/tailor-made",
  },
  {
    Icon: Factory,
    title: "Explore Precast Homes",
    text: "Engineered modular durability erected in a fraction of standard construction time. Superior thermal insulation, zero dampness, and monolithic precision.",
    cta: "Discover Precast Tech",
    href: "/pre-cast-homes",
  },
];

const StreamlinedAdvisory = () => {
  return (
    <section className={`${SANS} w-full min-w-0 overflow-hidden bg-[#EFF3FC] py-12 md:py-16`}>
      <Container>
        <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
          <Eyebrow className="!text-[10px] !font-medium !tracking-[0.18em]">Streamlined Advisory</Eyebrow>
          <h2 className={`${SERIF} mt-3 text-[#0B1F3A] text-3xl md:text-4xl leading-[1.15]`}>
            <WordReveal text="One Enquiry. The Right Direction." />
          </h2>
          <Reveal delay={0.2} className="mt-3">
            <p className="text-[15px] leading-relaxed text-[#44474D]">
              From acquiring a landmark residence to exploring bespoke fabrication or modular precast
              technology, our specialized practices guide you with definitive clarity.
            </p>
          </Reveal>
        </div>

        <div className="mt-8 md:mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map(({ Icon, title, text, cta, href }, i) => (
            <Reveal key={title} delay={i * 0.12} y={40} className={i === 2 ? "md:col-span-2 lg:col-span-1" : ""}>
              <Link
                href={href}
                className="group flex h-full flex-col bg-white p-7 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_24px_50px_-28px_rgba(11,31,58,0.4)]"
              >
                <span className="flex h-12 w-12 items-center justify-center bg-[#E8EDF6] text-[#1B4B7F] transition-colors duration-300 group-hover:bg-[#0B1F3A] group-hover:text-white">
                  <Icon size={22} />
                </span>
                <h3 className={`${SERIF} mt-8 text-2xl text-[#0B1F3A]`}>{title}</h3>
                <p className="mt-3 max-w-[22rem] text-[13px] leading-[1.7] text-[#44474D]">{text}</p>
                <span className="mt-auto pt-5 text-[10px] font-semibold uppercase tracking-[0.06em] text-[#171C22]">
                  {cta}{" "}
                  <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default StreamlinedAdvisory;