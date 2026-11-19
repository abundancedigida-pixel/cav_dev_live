"use client";
import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Container, Reveal, WordReveal, Eyebrow, SERIF, SANS } from "@/components/ui/Animations";

/* NOTE: only the first answer comes from the design. Please review/replace the rest with your approved copy. */
const faqs = [
  {
    q: "Can I build a home around my own requirements?",
    a: "The tailor-made enquiry process is designed to understand your requirements and discuss a suitable home concept with the Abundance Group team. The final scope depends on feasibility and the agreed project brief.",
  },
  {
    q: "Can I discuss a design for my existing plot?",
    a: "Yes. Share your plot details and location, and the team can discuss how a home concept may suit your site, orientation, and approvals. Final design direction depends on a feasibility review of the plot.",
  },
  {
    q: "Can I choose the layout and finishes?",
    a: "Layout and finish preferences are a core part of the conversation. Options are discussed in relation to your requirements, technical feasibility, and the agreed scope of work.",
  },
  {
    q: "How much will my home cost?",
    a: "Cost depends on factors such as plot size, design complexity, specifications, and scope. After understanding your requirements, the team can discuss an approach and budget range suited to your project.",
  },
  {
    q: "What information should I provide for an enquiry?",
    a: "Your contact details, plot location and approximate area (if you have one), the type of home you have in mind, and a short note on your priorities are enough to begin the conversation.",
  },
];

const TailorFAQ = () => {
  const [open, setOpen] = useState(0);

  return (
    <section className={`${SANS} w-full min-w-0 overflow-hidden bg-[#F1F0EB] py-12 md:py-16`}>
      <Container>
        <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
          <Eyebrow className="!text-[9px] !font-medium !tracking-[0.2em]">Clarity &amp; Protocol</Eyebrow>
          <h2 className={`${SERIF} mt-3 text-[#0B1F3A] text-3xl sm:text-4xl lg:text-5xl leading-[1.12]`}>
            <WordReveal text="Common Questions About Tailor-Made Homes." />
          </h2>
          <Reveal delay={0.2} className="mt-3">
            <p className="text-[15px] leading-relaxed text-[#44474D]">
              Transparent guidelines on our design engagement, site evaluations, and feasibility parameters.
            </p>
          </Reveal>
        </div>

        <div className="mx-auto mt-10 max-w-5xl space-y-2">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={f.q} delay={i * 0.06} y={24}>
                <div className="bg-white shadow-[0_1px_6px_-4px_rgba(11,31,58,0.25)]">
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? -1 : i)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-4 px-5 sm:px-7 py-5 text-left"
                  >
                    <span className="text-base font-medium text-[#0B1F3A]">{f.q}</span>
                    <ChevronDown
                      size={18}
                      className={`shrink-0 text-[#336192] transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                    />
                  </button>
                  <div className={`grid transition-all duration-300 ease-in-out ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                    <div className="overflow-hidden">
                      <p className="max-w-2xl px-5 sm:px-7 pb-6 text-sm leading-[1.8] text-[#44474D]">{f.a}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
};

export default TailorFAQ;