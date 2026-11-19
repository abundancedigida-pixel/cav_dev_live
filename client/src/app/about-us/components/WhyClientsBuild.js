"use client";
import { Container, Reveal, WordReveal, Eyebrow, SERIF, SANS } from "@/components/ui/Animations";

const reasons = [
  {
    n: "01",
    title: "Design Excellence",
    text: "We don't build generic boxes with superficial decoration. Our in-house architectural studio designs spatial journeys balancing natural ventilation, acoustics, and sculptural proportions.",
    tag: "AIA & IIA Certified Architects",
  },
  {
    n: "02",
    title: "Quality Construction",
    text: "Zero compromises on raw ingredient specs. Every batch of cement, rebar heat number, and waterproofing membrane is lab-verified prior to on-site application.",
    tag: "National Testing House Audited",
  },
  {
    n: "03",
    title: "Transparent Process",
    text: "Transparent milestone-based escrow accounts, real-time photographic site logs, and itemized billing prevent cost overruns and arbitrary delays.",
    tag: "Escrow Protected Milestones",
  },
  {
    n: "04",
    title: "Modern Construction Methods",
    text: "We match each project with its optimal structural solution: whether fast-track precast walling, post-tensioned slabs, or monolithic seismic-rated pours.",
    tag: "Modular Precast & Monolithic",
  },
  {
    n: "05",
    title: "Long-Term Generational Value",
    text: "Homes and commercial assets planned to withstand extreme tropical weather cycles, minimizing maintenance costs and ensuring maximum generational capital appreciation.",
    tag: "10-Year Structural Warranty",
  },
];

const badges = [
  { t: "RERA Registered", s: "100% Compliant Deliveries" },
  { t: "IGBC Platinum", s: "Certified Green Buildings" },
  { t: "COA Empanelled", s: "Chartered Architects" },
  { t: "CREDAI Apex", s: "Governed Practice" },
];

const WhyClientsBuild = () => {
  return (
    <section className={`${SANS} w-full min-w-0 overflow-hidden bg-[#F1F0EB] py-16`}>
      <Container>
        <Eyebrow className="!text-[11px] !font-semibold !tracking-[0.12em]">The Vanguard Standard</Eyebrow>
        <h2 className={`${SERIF} mt-3 text-[#0B1F3A] text-3xl md:text-4xl lg:text-5xl leading-[1.1]`}>
          <WordReveal text="Why Clients Build With Us." />
        </h2>
        <Reveal delay={0.2} className="mt-4 max-w-2xl">
          <p className="text-[15px] leading-relaxed text-[#44474D]">
            Discerning families, institutional investors, and global Indians partner with Vanguard &amp; Co.
            because we substitute construction uncertainty with predictable, audited permanence.
          </p>
        </Reveal>

        <div className="mt-10 space-y-3">
          {reasons.map((r, i) => (
            <Reveal key={r.n} delay={i * 0.08} y={30}>
              <div className="group flex flex-col gap-3 bg-white px-5 py-5 md:flex-row md:items-center md:justify-between md:gap-8 md:px-6 transition-all duration-500 hover:translate-x-1.5 hover:shadow-[0_16px_40px_-24px_rgba(11,31,58,0.35)]">
                <div className="flex gap-4">
                  <span className={`${SERIF} text-xl text-[#336192] tabular-nums`}>{r.n}</span>
                  <div>
                    <h3 className="text-base md:text-[17px] font-medium text-[#171C22]">{r.title}</h3>
                    <p className="mt-1.5 max-w-xl text-[12px] leading-relaxed text-[#44474D]">{r.text}</p>
                  </div>
                </div>
                <span className="shrink-0 pl-9 md:pl-0 text-[9px] font-bold uppercase tracking-[0.08em] text-[#1B4B7F]">
                  {r.tag}
                </span>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal y={30} delay={0.1} className="mt-10">
          <div className="grid grid-cols-2 gap-6 bg-[#E8EDF6] px-6 py-6 text-center lg:grid-cols-4">
            {badges.map((b) => (
              <div key={b.t}>
                <p className="text-[10px] font-semibold uppercase tracking-wide text-[#171C22]">{b.t}</p>
                <p className="mt-1.5 text-xs text-[#44474D]">{b.s}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  );
};

export default WhyClientsBuild;