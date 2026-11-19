"use client";
import { Accessibility, Wind, Ruler, BadgeCheck, Compass, Shield } from "lucide-react";
import { Container, Reveal, WordReveal, Eyebrow, SERIF, SANS } from "@/components/ui/Animations";

const principles = [
  {
    n: "01",
    tag: "Ergonomics",
    title: "Understanding the User",
    text: "We calibrate room depths, acoustic separations, and cross-circulation paths around actual human rhythms, ensuring serene privacy and effortless movement.",
    foot: "Contextual Scale",
    Icon: Accessibility,
  },
  {
    n: "02",
    tag: "Bioclimatic",
    title: "Thoughtful Planning",
    text: "Solar orientation, prevailing wind vectors, and internal courtyards are factored before drafting walls, minimizing artificial cooling loads by up to 34%.",
    foot: "Wind & Solar Modeling",
    Icon: Wind,
  },
  {
    n: "03",
    tag: "Massing",
    title: "Functional Architecture",
    text: "Every overhang, facade perforation, and structural cantilever serves an explicit climatic and structural purpose—never hollow visual excess.",
    foot: "Purposeful Geometry",
    Icon: Ruler,
  },
  {
    n: "04",
    tag: "Substance",
    title: "Quality Materials",
    text: "Strict adherence to M40/M50 grade precast matrices, certified primary-producer rebar, seasoned Burma and CP teak, and regionally sourced granite stone.",
    foot: "Lab-Tested Ingot & Batch",
    Icon: BadgeCheck,
  },
  {
    n: "05",
    tag: "Craft Execution",
    title: "Construction Precision",
    text: "Sub-millimeter shuttering alignments, laser-leveled screeds, and precast tongue-and-groove jointing guarantee seismic integrity and leak-proof envelopes.",
    foot: "±1.5mm Tolerances",
    Icon: Compass,
  },
  {
    n: "06",
    tag: "Legacy",
    title: "Long-Term Value",
    text: "Designed for multi-generational wealth preservation. Buildings require radically lower life-cycle upkeep while outperforming local appreciation benchmarks.",
    foot: "Generational Asset",
    Icon: Shield,
  },
];

const DesignPrinciples = () => {
  return (
    <section className={`${SANS} w-full min-w-0 overflow-hidden bg-[#F0F4FC] py-16`}>
      <Container>
        <Eyebrow className="!text-[10px] !font-semibold !tracking-[0.15em]">The Vanguard Principles</Eyebrow>
        <h2 className={`${SERIF} mt-4 max-w-2xl text-[#171C22] text-3xl md:text-4xl lg:text-5xl leading-[1.12]`}>
          <WordReveal text="Good Buildings Begin With Good Thinking." />
        </h2>
        <Reveal delay={0.2} className="mt-5 max-w-2xl">
          <p className="text-[15px] leading-[1.75] text-[#44474D]">
            Architecture is neither pure sculpture nor mere utility. It is an immutable spatial commitment
            that shapes family rituals, environmental footprints, and civic dignity for decades.
          </p>
        </Reveal>

        <div className="mt-10 md:mt-12 grid grid-cols-1 lg:grid-cols-[0.7fr_1fr] gap-4">
          {/* Navy panel (swap bg for an <Image fill /> if you have a photo) */}
          <Reveal y={50} className="min-h-[360px] lg:min-h-0">
            <div className="relative flex h-full min-h-[360px] items-end bg-[#0B1F3A] p-4 sm:p-6">
              <div className="w-full bg-[#D5D9E4] p-4 sm:p-5">
                <p className="text-[9px] font-semibold uppercase tracking-[0.15em] text-[#336192]">
                  Monolithic Composure
                </p>
                <p className="mt-2 max-w-md text-[13px] leading-relaxed text-[#171C22]">
                  &ldquo;We do not design buildings to follow fleeting decor trends. We build stone plinths and
                  cantilevered volumes that age with sovereign grace.&rdquo;
                </p>
              </div>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {principles.map(({ n, tag, title, text, foot, Icon }, i) => (
              <Reveal key={n} delay={(i % 2) * 0.1} y={40}>
                <div className="group flex h-full flex-col bg-white p-6 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_24px_50px_-28px_rgba(11,31,58,0.35)]">
                  <p className="text-[9px] font-bold uppercase tracking-[0.15em] text-[#336192]">
                    {n} • {tag}
                  </p>
                  <h3 className="mt-4 text-xl font-medium text-[#171C22]">{title}</h3>
                  <p className="mt-3 max-w-[16rem] text-[13px] leading-[1.7] text-[#44474D]">{text}</p>
                  <p className="mt-auto flex items-center gap-2 pt-8 text-[9px] font-semibold uppercase tracking-[0.15em] text-[#171C22]">
                    <Icon size={13} className="text-[#171C22]" />
                    {foot}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default DesignPrinciples;