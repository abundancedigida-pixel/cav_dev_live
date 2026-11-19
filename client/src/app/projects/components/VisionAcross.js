"use client";
import { Container, Reveal, WordReveal, SERIF, SANS } from "@/components/ui/Animations";

const cards = [
  { tag: "Spatial Mandate", title: "Holistic Masterplanning" },
  { tag: "Execution Rigor", title: "Founding Craftsmanship" },
  { tag: "Horizon Span", title: "Multi-Domain Estates" },
];

const VisionAcross = () => {
  return (
    <section className={`${SANS} w-full min-w-0 overflow-hidden bg-white py-16`}>
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left */}
          <div>
            <div className="flex items-center gap-3">
              <span className="h-2 w-2 bg-[#164A7A]" />
              <p className="text-[11px] font-extrabold uppercase tracking-[0.22em] text-[#171C22]">
                A Vision Across Developments
              </p>
            </div>
            <h2 className={`${SERIF} mt-6 max-w-md text-[#171C22] text-3xl sm:text-3xl md:text-4xl lg:text-5xl leading-[1.1]`}>
              <WordReveal text="More Than Buildings. A Vision for What Comes Next." />
            </h2>
          </div>

          {/* Right */}
          <div>
            <Reveal delay={0.2}>
              <p className="max-w-xl text-lg leading-relaxed text-[#171C22]">
                From residential living to specialised development initiatives, Abundance Group explores
                opportunities to create thoughtfully planned spaces that bring people, ideas, and experiences
                together.
              </p>
            </Reveal>
            <Reveal delay={0.3}>
              <p className="mt-6 max-w-xl text-[15px] leading-[1.75] text-[#44474D]">
                Our portfolio is anchored in architectural longevity—synthesizing local materials, high-density
                green corridors, and human-centric infrastructure. Every initiative is calibrated to transcend
                transient real-estate cycles and establish permanent civic and domestic value.
              </p>
            </Reveal>

            <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4">
              {cards.map((c, i) => (
                <Reveal key={c.title} delay={0.1 * (i + 1)} y={30}>
                  <div className="h-full bg-[#0B1F3A] px-5 py-6">
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#E8C27A]">{c.tag}</p>
                    <p className="mt-3 text-xl leading-snug text-white">{c.title}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default VisionAcross;