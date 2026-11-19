"use client";
import { Compass, Hammer, Bot, ShieldCheck, Network } from "lucide-react";
import {
  Container,
  Reveal,
  WordReveal,
  SERIF,
  SANS,
} from "@/components/ui/Animations";

const principles = [
  {
    tag: "01 / Discipline",
    title: "Planning & Design",
    text: "Context-aware masterplanning prioritizing natural wind vectors, daylight optimization, and human-first ergonomics.",
    Icon: Compass,
  },
  {
    tag: "02 / Rigor",
    title: "Quality Construction",
    text: "Stringent material procurement, rigorous concrete batch testing, and artisanal masonry engineered for multigenerational endurance.",
    Icon: Hammer,
  },
  {
    tag: "03 / Precision",
    title: "Modern Methods",
    text: "Selective precast engineering modules for millimeter structural accuracy, minimal on-site dust, and accelerated timelines.",
    Icon: Bot,
  },
  {
    tag: "04 / Integrity",
    title: "Full Compliance",
    text: "100% transparent statutory approvals, indisputable legal title deeds, and stringent RERA and IGBC environmental benchmarks.",
    Icon: ShieldCheck,
  },
  {
    tag: "05 / Direction",
    title: "Coordination",
    text: "Real-time digital milestone auditing and synchronized structural, MEP, and landscape team coordination.",
    Icon: Network,
  },
];

const OurMethodology = () => {
  return (
    <section
      className={`${SANS} w-full min-w-0 overflow-hidden bg-[#F1F0EB] py-16`}
    >
      <Container>
        <Reveal y={16} className="flex items-center gap-2">
          <div
            aria-hidden="true"
            className="h-2 w-2 min-h-[8px] min-w-[8px] shrink-0 bg-[#9A7B3F]"
            style={{ width: 8, height: 8, backgroundColor: "#9A7B3F" }}
          />
          <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#9A7B3F]">
            Our Methodology
          </p>
        </Reveal>
        <h2
          className={`${SERIF} mt-3 text-[#171C22] text-3xl md:text-4xl lg:text-5xl leading-[1.12]`}
        >
          <span className="block">
            <WordReveal text="Thoughtful Planning." />
          </span>
          <span className="block">
            <WordReveal text="Responsible Execution." delay={0.25} />
          </span>
        </h2>
        <Reveal delay={0.3} className="mt-4 max-w-2xl">
          <p className="text-[15px] leading-[1.7] text-[#44474D]">
            Every landmark by Abundance Group is rooted in structural precision,
            environmental context, and absolute governance. We eliminate
            guesswork with five non-negotiable operational principles.
          </p>
        </Reveal>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 items-stretch">
          {principles.map(({ tag, title, text, Icon }, i) => (
            <Reveal
              key={title}
              delay={i * 0.1}
              y={40}
              className="h-full w-full"
            >
              <div className="group flex h-full flex-col bg-white p-6 shadow-[0_2px_10px_-6px_rgba(11,31,58,0.2)] transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_24px_50px_-28px_rgba(11,31,58,0.4)]">
                <p className="text-[9px] font-bold uppercase tracking-[0.12em] text-[#336192]">
                  {tag}
                </p>
                <h3 className="mt-5 text-xl font-medium leading-snug text-[#171C22]">
                  {title}
                </h3>
                <p className="mt-3 text-[13px] leading-[1.75] text-[#44474D]">
                  {text}
                </p>
                <div className="mt-auto pt-6">
                  <Icon
                    size={20}
                    strokeWidth={1.5}
                    className="block shrink-0 text-[#9A7B3F] transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default OurMethodology;
