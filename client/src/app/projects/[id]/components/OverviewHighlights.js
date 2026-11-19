"use client";
import { CheckCircle2 } from "lucide-react";
import { Container, Reveal, WordReveal, Eyebrow, SERIF, SANS } from "@/components/ui/Animations";

const OverviewHighlights = ({ project }) => {
  const highlights = project.architecturalHighlights || [];

  return (
    <section className={`${SANS} w-full min-w-0 bg-[#FAF9F6] py-16 border-y border-[#EDEBE4]`}>
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div>
            <Eyebrow className="!text-[10px]">Development Narrative</Eyebrow>
            <h2 className={`${SERIF} mt-4 text-[#0B1F3A] text-3xl sm:text-4xl leading-[1.15]`}>
              <WordReveal text={`Crafted Architecture & Vision.`} />
            </h2>
            <Reveal delay={0.2} className="mt-5 text-[#44474D] text-[15px] leading-relaxed">
              <p>{project.projectOverview}</p>
            </Reveal>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.18em] text-[#A0824E] mb-6">
              Architectural & Master Highlights
            </h3>
            {highlights.length === 0 ? (
              <p className="text-sm text-[#77787D]">Details available on private enquiry.</p>
            ) : (
              <div className="space-y-4">
                {highlights.map((h, i) => (
                  <Reveal key={i} delay={i * 0.08} y={20}>
                    <div className="flex items-start gap-4 border border-[#E6E4DC] bg-white p-4">
                      <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-[#336192]" />
                      <p className="text-sm leading-relaxed text-[#171C22]">{h}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default OverviewHighlights;