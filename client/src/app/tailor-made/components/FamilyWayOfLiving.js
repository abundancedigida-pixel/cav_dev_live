"use client";
import { Container, Reveal, WordReveal, Eyebrow, SERIF, SANS } from "@/components/ui/Animations";

const cards = [
  {
    n: "01",
    title: "Your Requirements",
    text: "Start with the spaces, priorities, and practical needs that matter to your household. We map routines, living cycles, and personal priorities before drafting a single wall.",
    foot: "Functional Foundations",
  },
  {
    n: "02",
    title: "Your Space",
    text: "Consider the available plot, spatial planning, circulation, and the way rooms connect. We study sun paths, breezes, and plot alignments to create seamless indoor-outdoor transitions.",
    foot: "Site Topography & Light",
  },
  {
    n: "03",
    title: "Your Preferences",
    text: "Explore architectural styles, finishes, and design choices appropriate to your requirements and project scope. Material durability and understated elegance remain at the core.",
    foot: "Artisanal Materials",
  },
];

const FamilyWayOfLiving = () => {
  return (
    <section id="approach" className={`${SANS} w-full min-w-0 overflow-hidden bg-[#F1F0EB] py-12 md:py-16 scroll-mt-20`}>
      <Container>
        <Eyebrow className="!text-[10px] !font-medium !tracking-[0.2em]">Made for your way of living</Eyebrow>
        <h2 className={`${SERIF} mt-3 max-w-3xl text-[#0B1F3A] text-3xl sm:text-4xl lg:text-5xl leading-[1.12]`}>
          <WordReveal text="Not Every Family Lives the Same Way. Every Home Should Reflect That." stagger={0.06} />
        </h2>
        <Reveal delay={0.2} className="mt-5 max-w-3xl">
          <p className="text-[15px] md:text-base leading-[1.75] text-[#44474D]">
            From everyday family routines to the way you entertain, work, relax, and grow, the right home begins
            with understanding what matters to you. Our tailor-made approach starts with your requirements and
            helps shape a home concept around your needs, site, and preferences.
          </p>
        </Reveal>

        <div className="mt-10 md:mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((c, i) => (
            <Reveal key={c.n} delay={i * 0.12} y={40} className={i === 2 ? "md:col-span-2 lg:col-span-1" : ""}>
              <div className="group flex h-full flex-col bg-white p-7 shadow-[0_2px_10px_-6px_rgba(11,31,58,0.2)] transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_24px_50px_-28px_rgba(11,31,58,0.4)]">
                <p className={`${SERIF} text-4xl text-[#C5D3E8] transition-colors duration-500 group-hover:text-[#336192]`}>{c.n}</p>
                <h3 className={`${SERIF} mt-3 text-2xl text-[#0B1F3A]`}>{c.title}</h3>
                <p className="mt-3 max-w-xs text-[13px] leading-[1.75] text-[#44474D]">{c.text}</p>
                <p className="mt-auto pt-10 text-[9px] font-bold uppercase tracking-[0.1em] text-[#336192]">{c.foot}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default FamilyWayOfLiving;