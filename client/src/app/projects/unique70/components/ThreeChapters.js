"use client";
import { ArrowRight, Clock, Lock } from "lucide-react";
import { Container, Reveal, WordReveal, Eyebrow, SERIF, SANS } from "@/components/ui/Animations";

const chapters = [
  {
    stage: "Stage 1",
    count: "10 Homes",
    title: "The Founders",
    range: "Residences 01 – 10",
    text: "Adjoining the central landscaped boulevard. Includes signature stonework detailing, prime orientation, and inaugural reservation sequence.",
    top: "border-[#0B1F3A]",
    badge: "bg-[#0B1F3A] text-white",
    foot: "Chapter 1 Allocation",
    FootIcon: ArrowRight,
    active: true,
  },
  {
    stage: "Stage 2",
    count: "30 Homes",
    title: "The Pioneers",
    range: "Residences 11 – 40",
    text: "Expansive plots with direct access to secondary parkways, balanced courtyard garden orientations, and unified estate infrastructure.",
    top: "border-[#336192]",
    badge: "bg-[#E8EDF6] text-[#171C22]",
    foot: "Chapter 2 Sequenced",
    FootIcon: Clock,
  },
  {
    stage: "Stage 3",
    count: "30 Homes",
    title: "The Legacy",
    range: "Residences 41 – 70",
    text: "The final edition chapter. Upon reservation of Residence No. 70, the master register is permanently sealed, preserving scarcity forever.",
    top: "border-[#77787D]",
    badge: "bg-[#E8EDF6] text-[#171C22]",
    foot: "Edition Sealed at 70",
    FootIcon: Lock,
  },
];

const ThreeChapters = () => {
  return (
    <section className={`${SANS} w-full min-w-0 overflow-hidden bg-[#F1F0EB] py-12 md:py-16`}>
      <Container>
        <Eyebrow className="!text-[10px] !font-medium !tracking-[0.15em]">The First 70</Eyebrow>
        <h2 className={`${SERIF} mt-3 text-[#0B1F3A] text-3xl sm:text-4xl lg:text-5xl leading-[1.12]`}>
          <WordReveal text="Three Chapters. One Founding Edition." />
        </h2>
        <Reveal delay={0.2} className="mt-3 max-w-2xl">
          <p className="text-[15px] leading-relaxed text-[#44474D]">
            The 70 residences are organized into three intentional chapters, sequenced in order of release.
          </p>
        </Reveal>

        <div className="mt-8 md:mt-10 grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {chapters.map((c, i) => (
            <Reveal key={c.title} delay={i * 0.12} y={40}>
              <div
                className={`group flex h-full flex-col border-t-4 ${c.top} bg-white p-6 sm:p-8 shadow-[0_2px_10px_-6px_rgba(11,31,58,0.2)] transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_24px_50px_-28px_rgba(11,31,58,0.4)]`}
              >
                <div className="flex items-center justify-between gap-3">
                  <p className="text-[9px] font-semibold uppercase tracking-[0.12em] text-[#336192]">{c.stage}</p>
                  <span className={`px-2.5 py-1.5 text-[9px] font-bold uppercase tracking-[0.15em] ${c.badge}`}>
                    {c.count}
                  </span>
                </div>
                <h3 className={`${SERIF} mt-5 text-2xl sm:text-[26px] text-[#0B1F3A]`}>{c.title}</h3>
                <p className="mt-3 text-[9px] font-semibold uppercase tracking-[0.12em] text-[#44474D]">{c.range}</p>
                <p className="mt-4 max-w-[17rem] text-[15px] leading-[1.75] text-[#44474D]">{c.text}</p>

                <div
                  className={`mt-auto flex items-center justify-between gap-3 border-t border-[#EDEBE4] pt-4 text-[13px] ${
                    c.active ? "font-bold text-[#336192]" : "text-[#44474D]"
                  }`}
                >
                  <span className="mt-6">{c.foot}</span>
                  <c.FootIcon
                    size={18}
                    className={`mt-6 ${c.active ? "text-[#336192] transition-transform duration-300 group-hover:translate-x-1" : "text-[#171C22]"}`}
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

export default ThreeChapters;